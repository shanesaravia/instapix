
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { fetchAuthUser } from '../../actions/authUser';
import { fetchUser } from '../../actions/user';
// Components/Containers
import Nav from '../nav';
import { Loading } from '../../components/loading';
import userIcon from '../../../static/images/user.png';
import AlbumsGrid from './albumsGrid';

class Profile extends Component {
	constructor(props){
		super(props);

        this.state = {
            token: localStorage.getItem('access_token'),
        }

        this.showStats = this.showStats.bind(this);
	}

	async componentDidMount() {
		console.log('COMPONENT DID MOUNT PROFILE');
    	if (!this.props.userData) {
	    	if (!this.props.authUserData) {
	    		// Fetches user data from auth0
		    	await this.props.fetchAuthUser(this.state.token);
	    	}
	    	// Fetches user data from instapix API
    		await this.props.fetchUser(this.state.token, this.props.authUserData.sub);
		}
		console.log('userData: ', this.props.userData);
		console.log('authUserData: ', this.props.authUserData);
	}

    showStats() {
    	return (
		<div id="user-stats">
			<div id="profile-pic">
				<img src={ userIcon } />
			</div>
			<h2>{this.props.userData.username}</h2>
			<span>Fame <strong>{this.props.userData.fame}</strong></span>
			<br />
			<div id="follow-stats">
				<span>Followers <strong>{this.props.userData.followers}</strong></span>
				<span>Following <strong>{this.props.userData.following}</strong></span>
			</div>
		</div>)
    }

	render() {
		return(
			<div>
				<Nav />
				{this.props.userData
					?
					<div>
						{this.showStats()}
						<hr id="separator" />
						<AlbumsGrid userId={this.props.authUserData.sub} />
					</div>
					: <Loading />
				}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);