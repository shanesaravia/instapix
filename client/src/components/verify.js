// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Third Party
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Auth
import Auth from '../auth/auth';
// Actions
import { fetchAuthUser } from '../actions/authUser';
// Configs
import { apiConfig } from '../../configs/config';
// Requests
import { instaAPI } from '../utils/axios';

const mySwal = withReactContent(swal);
const auth = new Auth();

export default class Verify extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showPage: false,
		}

		this.sendMail = this.sendMail.bind(this);
		this.verifyPopup = this.verifyPopup.bind(this);
	}
	
	async componentWillMount() {
		// If directed from callback (Ideal flow)
		if (this.props.location.state.from === 'callback') {
			this.setState({
				showPage: true
			})
			auth.logout();
		} else {
			// If user accidentally lands here, redirect to feed
			location.assign('/');
		}
	}

	/**
	 * SweetAlert 2 error popup.
	 * @return {swal object} SWAL popup
	 */
	showVerificationError() {
		return swal({
			type: 'error',
			title: 'Server Error',
			text: 'Error sending verification email'
		}).then(() => {
			location.reload();
		})
	}

	/**
	 * Sends verification email to use via instapix api call.
	 * Redirects to /login if successful.
	 * @param  {event object} e Event handler for the DOM
	 */
	async sendMail(e) {
		e.preventDefault();
		const auth_id = this.props.location.state.auth_id;

		const emailVerify = await instaAPI.post(apiConfig.endpoints.verify_url, {
			'userId': auth_id,
		}, {
			headers: {'content-type': 'application/json'}
		}).then(resp => resp);

		if (emailVerify.data) {
			swal.close();
			swal({
				type: 'success',
				title: 'Verification Email Sent',
				text: 'Your email verification was sent successfully.',
			}).then(() => {
				location.assign('/login');
			})
		} else {
			this.showVerificationError();
		}
	}

	/**
	 * The SweetAlert 2 popup to prompt email verification.
	 * Calls sendMail method if footer clicked.
	 * Redirects to login if Ok clicked.
	 * @return {null}
	 */
	verifyPopup() {
		mySwal.fire({
			type: 'warning',
			title: 'Verify Your Email Address',
			text: 'Please verify your email address to continue using Instapix',
			footer: <a onClick={ this.sendMail } href="#">Send Verification Email</a>,
		}).then(() => {
			location.assign('/login');
		})
		return null;
	}

	render() {
		return(

			<div className="bg">
				{ this.state.showPage ? this.verifyPopup() : null }
			</div>
		)
	}
}
