// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components/Containers
import { Loading } from 'components/loading';
import MyProfile from 'containers/profile/myProfile';
import UserProfile from 'containers/profile/userProfile';
import UserNotFound from 'components/errors/UserNotFound';
// Actions
import { fetchAuthUser } from 'src/actions/authUser';
import { fetchUser } from 'src/actions/user';
// Axios
import { instaAPI } from 'src/utils/axios';
// Configs
import { apiConfig } from 'configs/config';

class Profile extends Component {
	constructor(props) {
		super(props);

        this.state = {
            token: localStorage.getItem('access_token'),
            user: null
        }

        this.getUser = this.getUser.bind(this);
	}

	async componentWillReceiveProps(nextProps) {
		if (this.state.user && this.state.user.id !== nextProps.match.params.uid) {
			const user = await this.getUser(nextProps.match.params.uid);
			this.setState({user: user.data});
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
		// Fetch user from database
		const user = await this.getUser(this.props.match.params.uid);
		this.setState({user: user.data});
	}

	getUser(uid) {
		const url = apiConfig.endpoints.get_user_url.replace(':userId', uid);
		const headers = {headers: {'authorization': `Bearer ${this.state.token}`}}
		const request = instaAPI.get(url, headers);
		return request;
	}

	render() {
		const user = this.state.user;
		if (user === null) {
			return <Loading />
		}

		if (user === false) {
			return <UserNotFound />
		}

		if (user.id === this.props.userData.id) {
			return <MyProfile user={user} createAlbum={true} />
		} else {
			return <UserProfile user={user} />
		}
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
