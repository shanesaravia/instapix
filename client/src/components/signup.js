// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Third Party
import Swal from 'sweetalert2';
// Requests
import axios from 'axios';
// Auth
import Auth from 'src/auth/auth';

const auth = new Auth();

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    componentWillMount() {
        // Redirect to root 
        if (auth.isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    /**
     * Sets state based on data in username input
     */
    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }    

    /**
     * Sets state based on data in email input
     */
    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }    

    /**
     * Sets state based on data in password input
     */
    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    /**
     * Sets state based on data in confirm password input
     */
    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    /**
     * Validates password and submits data to signup auth call
     * If invalid, displays error
     */
    onFormSubmit(event) {
        event.preventDefault();
        const validated = this.validatePassword(this.state.password,
                                                this.state.confirmPassword)
        if (validated) {
            auth.signup({username: this.state.username,
                         email: this.state.email,
                         password: this.state.password});
        } else {
            Swal({
                title: 'Password Error',
                text: 'Passwords don\'t match.',
                type: 'error'
            })
        }
    }

    /**
     * Validates that password and confirm password
     * input fields match
     * @param  {str} pass        users password
     * @param  {str} confirmPass users confirmed password
     * @return {bool}
     */
    validatePassword(pass, confirmPass) {
        if (pass == confirmPass) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div className="bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Join Instapix</h5>
                                    <form onSubmit={this.onFormSubmit} className="form-signin">
                                        <div className="form-label-group">
                                            <input onChange={this.onUsernameChange} value={this.state.username} type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
                                            <label htmlFor="inputUsername">Username</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input onChange={this.onEmailChange} value={this.state.email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input onChange={this.onPasswordChange} value={this.state.password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input onChange={this.onConfirmPasswordChange} value={this.state.confirmPassword} type="password" id="inputConfirmPassword" className="form-control" placeholder="Confirm Password" required />
                                            <label htmlFor="inputConfirmPassword">Confirm Password</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up</button>
                                        <div className="text-center pt-2">
                                            <small>Already have an account?{' '}
                                            <Link to="/login">Login</Link>
                                            </small>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}