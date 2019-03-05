// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { fetchAuthUser } from 'src/actions/authUser';
import { fetchUser } from 'src/actions/user';
// Components/Containers
import Nav from 'containers/nav';
import { Loading } from 'src/components/loading';
import userIcon from 'static/images/user.png';
import AlbumsGrid from './albumsGrid';
import {withRouter} from 'react-router';

class UserProfile extends Component {
	constructor(props) {
		super(props);

        this.state = {
            token: localStorage.getItem('access_token'),
            user: null
        }

        this.showStats = this.showStats.bind(this);
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
		this.setState({user: this.props.user});
	}

    showStats() {
    	return (
		<div id="user-stats">
			<div id="profile-pic">
				<img src={ userIcon } />
			</div>
			<h2>{this.props.user.username}</h2>
			<span>Fame <strong>{this.props.user.fame}</strong></span>
			<br />
			<div id="follow-stats">
				<span>Followers <strong>{this.props.user.followers}</strong></span>
				<span>Following <strong>{this.props.user.following}</strong></span>
			</div>
		</div>)
    }

	render() {
		return(
			<div>
				<Nav />
				<div>
					{this.showStats()}
					<hr id="separator" />
					<AlbumsGrid userId={this.props.user.id} />
				</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));