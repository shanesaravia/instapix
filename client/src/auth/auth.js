import React from 'react';
import auth0 from 'auth0-js';
import Swal from 'sweetalert2';
import { authConfig } from '../../configs/config';
import { instaAPI } from '../utils/axios';

export default class Auth {

  constructor() {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientID,
    redirectUri: authConfig.redirectUri,
    responseType: authConfig.responseType,
    callbackUri: authConfig.callbackUri,
    audience: authConfig.audience,
    scope: authConfig.scope
  });

/**
 * Handles signups with auth0 and logs the user in
 * @param  {obj} userData {username, email, password}
 */
  signup(userData) {
    const self = this;
    this.auth0.signup({
      connection: authConfig.signup.connection,
      username: userData.username,
      email: userData.email,
      password: userData.password
    }, function (err, success) {
      // Error
      if (err) {
        let errTitle;
        let errMessage;

        switch (err.code) {
          case 'user_exists':
            errTitle = 'Email Already In Use';
            errMessage = 'This email is already taken.';
            break;
          case 'username_exists':
            errTitle = 'Username Already In Use';
            errMessage = 'This username is already taken.';
            break;
          case 'invalid_password':
            errTitle = 'Invalid Password';
            errMessage = `<b>Must be:</b> ${err.policy.split('*').join('<br>')}`;
            break;
          default:
            errTitle = 'Error';
            errMessage = 'Something went wrong. Please try again.';
        }

        Swal({
          title: errTitle,
          html: errMessage,
          type: 'error'
        })
      } else {
        // Success
        const toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        toast({
          type: 'success',
          title: 'Signed up successfully!'
        })
        // Create user in instapix database
        instaAPI.post(`/public/createUser`, {
          username: userData.username,
          email: userData.email,
          auth_id: `auth0|${success.Id}`
        }).then((res) => {
          // Save instapix_id in localStorage
          // Callback will then retrieve and set in user_metadata for Auth0
          const instapix_id = res.data._id;
          localStorage.setItem('instapix_id', instapix_id);
        })
        // Login
        self.login(userData);
      }
    });
  }

/**
 * Logs the user in on auth0
 * @param  {obj} userData {email, password}
 */
  login(userData) {
    this.auth0.login({
      username: userData.email,
      password: userData.password
    },(err) => {
      if (err) {
        Swal({
          title: 'Unable to Sign In',
          html: err.description,
          type: 'error'
        })
      }
    });
  }

/**
 * Removes access token, id token, and token expiry from local storage.
 */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  /**
   * Handles authentication data from Auth0
   * @param  {Promise} (resolve, reject)       Takes data and sets session data.
   * @return {authResult}           User data
   */
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else if (err) {
          reject(err);
        }
      })
    })
  }

  /**
   * Sets the access token, id token, and token expiry in local storage.
   * @param {object} authResult Users auth data
   */
  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  /**
   * Check whether the current time is past the Access Token's expiry time.
   * @return {Boolean} true if token is still valid.
   */
  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  /**
   * Gets user data from auth0
   * @param  {str} idToken auth0 token
   * @return {Promise}         auth0 profile data
   */
  getUserData(idToken) {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(idToken, function (err, profile) {
        if (profile) {
          resolve(profile);
        } else if (err) {
          reject(err);
        }
      })
    })
  }
}