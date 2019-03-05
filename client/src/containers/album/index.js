// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { fetchAuthUser } from 'src/actions/authUser';
import { fetchUser } from 'src/actions/user';
// Containers / Components
import Nav from 'containers/nav';
import { Upload } from 'components/upload';
// Static
import albumBanner from 'static/images/saobanner.jpg';
import backButton from 'static/images/back-arrow.png';
import uploadPhotos from 'static/images/upload-photos.png';

class Album extends Component {
	constructor(props) {
		super(props);

		this.state = {
            token: localStorage.getItem('access_token')
		}
	}

	async componentDidMount() {
    	if (!this.props.userData) {
	    	if (!this.props.authUserData) {
	    		// Fetches user data from auth0
		    	await this.props.fetchAuthUser(this.state.token);
	    	}
	    	// Fetches user data from instapix API
    		await this.props.fetchUser(this.state.token, this.props.authUserData.sub);
		}
	}

	render() {
		const goBack = `/u/${this.props.match.params.uid}`;
		return (
			<div>
				<Nav />
				<div className='go-back'>
					<Link to={goBack}>
						<img className='back-arrow' src={ backButton } />
						<span className='go-back-text'>Back to albums list</span>
					</Link>
				</div>
				<div id='album-banner'>
					<img src={ albumBanner } />
					<h1 id='album-title'>{ this.props.match.params.album }</h1>
					<p id='photo-count'>10 Photos</p>
				</div>
				<Upload />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userData: state.userData,
    	authUserData: state.authUserData
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchAuthUser, fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);