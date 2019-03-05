// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Auth
import Auth from 'src/auth/auth';

const auth = new Auth();

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount() {
        // Redirect to root 
        if (auth.isAuthenticated()) {
            this.props.history.push('/');
        }
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
     * Sends login request
     */
    onFormSubmit(event) {
        event.preventDefault();
        auth.login({
            email: this.state.email,
            password: this.state.password
        }, (err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form onSubmit={this.onFormSubmit} className="form-signin">
                                        <div className="form-label-group">
                                            <input onChange={this.onEmailChange} value={this.state.email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input onChange={this.onPasswordChange} value={this.state.password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                        <div className="text-center pt-2">
                                            <small>Need an account?{' '}
                                            <Link to="/signup">Sign Up</Link>
                                            </small>
                                        </div>
                                        <hr className="my-4" />
                                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
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