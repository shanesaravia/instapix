// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { fetchAuthUser } from '../actions/authUser';
import { fetchUser } from '../actions/user';
// Custom
import Auth from '../auth/auth';
// Components
import Nav from '../components/nav';
import { Loading } from '../components/loading';
import Feed from '../components/feed';
import { Upload } from '../components/upload';

// testing
import example from '../../static/images/example.jpg';

const auth = new Auth();

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('access_token')
        }

        this.showData = this.showData.bind(this);
        this.checkEmailVerification = this.checkEmailVerification.bind(this);
    }

    async componentDidMount() {
    	if (!this.props.userData) {
	    	if (!this.props.authUserData) {
	    		// Fetches username and email from auth0
		    	await this.props.fetchAuthUser(this.state.token);
	    	}
            // Re-routes if email not verified
            this.checkEmailVerification();
	    	// Fetches user data from instapix API
    		await this.props.fetchUser(this.state.token, this.props.authUserData.sub);
    	}
    }

    /**
     * Checks if users email has been verified and
     * if not verified, redirects to verify page
     */
    checkEmailVerification() {
    	if (!this.props.authUserData.email_verified) {
    		this.props.history.push('/verify');
    	}
    }

    /**
     * Displays loading gif until data is retrieved and
     * then displays the users data
     * @return {userdata or loading}
     */
    showData() {
        if (this.props.userData) {
        	return <center>{this.props.userData.email}</center>
        } else {
            return <Loading />;
        }
    }

    render() {
        return (
            <div>
                <Nav history={this.props.history} />
                {this.props.userData ? <img src={ example } style={{width:'400px',marginLeft:'30%',marginTop:'50px'}} /> : null}
                <h4>{ this.showData() }</h4>
                <Upload history={this.props.history} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);