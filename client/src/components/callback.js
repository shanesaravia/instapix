// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Auth
import Auth from '../auth/auth';
// Components
import Error500 from '../components/errors/Error500';
// Third Party
import qs from 'query-string';
import swal from 'sweetalert2';
// Requests
import { instaAPI } from '../utils/axios';
// Configs
import { apiConfig } from '../../configs/config';

const auth = new Auth();

export default class Callback extends Component {
	constructor(props) {
		super(props);
	}

    componentWillMount() {
        if (!this.props.location.hash) {
            // Only needs to be called if directed from email verification
            this.handleEmailVerification();
        }
        // Handles normal auth0 authentication
        this.handleAuth();
    }

    /**
     * Handles auth0 authentication data and
     * redirects to verify page or index page
     */
    async handleAuth() {
        const resp = await auth.handleAuthentication();
        const auth_id = resp.idTokenPayload.sub;
        const access_token = resp.accessToken;

        // const access_token = localStorage.getItem('access_token');
        const instapix_id = localStorage.getItem('instapix_id');

        if (instapix_id) {
            // Save instapix_id to auth0 metadata
            // instaAPI.patch(`/public/setMetadata/${auth_id}`, {instapix_id})
            instaAPI.patch(apiConfig.endpoints.metadata_path + auth_id, {instapix_id})
            .then((success) => {
                if (!success) {
                    console.log('Unable to set instapix_id in auth0 metadata.');
                }
            })
        }

        // Check if email has been verified and redirect
        if (!resp.idTokenPayload.email_verified) {
            this.props.history.push({
              pathname: '/verify',
              state: { 
                access_token: access_token,
                auth_id: auth_id,
                from: 'callback'
              }
            })
        } else {
            this.props.history.push('/');
        }
    }

    /**
     * Swal verification success popup
     * @return {swal popup}
     */
    showVerificationSuccess() {
        return swal({
            type: 'success',
            title: 'Verification Successful',
            text: 'Your email was verified. You can now continue using Instapix.'
        }).then(() => {
            this.props.history.push('/login');
        });
    }

    /**
     * Swal verification error popup
     * @return {swal popup}
     */
    showVerificationError() {
        return swal({
            type: 'error',
            title: 'Verification Error',
            text: 'There was an error with verification. Please try again.'
        }).then(() => {
            this.props.history.push('/login');
        });
    }

    /**
     * Only to be called by email verification click
     * Updates email_verified on instapix db to true
     * Displys verification success popup or error popup
     */
    async handleEmailVerification() {
        const parsed = await qs.parse(this.props.location.search);
        const email = parsed.email;

        if (parsed.success == 'true') {
            try {
                // Update email_verified
                instaAPI.patch(apiConfig.endpoints.update_email_verified_path + email)
            } catch(e) {
                console.log(`email_verified field was unable to be updated. ${e}`);
            }
            this.showVerificationSuccess();
        } else if (parsed.success == 'false') {
            this.showVerificationError();
        }
    }

	render() {
		return null;
	}
}
