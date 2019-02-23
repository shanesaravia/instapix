// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { fetchAuthUser } from '../actions/authUser';
// Auth
import Auth from '../auth/auth';
// Static
import userIcon from '../../static/images/user.png';

const auth = new Auth();

class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: localStorage.getItem('access_token'),
			search: '',
			uid: null
		}

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	async componentDidMount() {
    	if (!this.props.authUserData) {
    		// Fetches user data from auth0
	    	await this.props.fetchAuthUser(this.state.token);
    	}
	}

	/**
	 * Sets state based on data in the search input
	 */
	onSearchChange(event) {
        this.setState({ search: event.target.value });
	}

	/**
	 * Console logs search input
	 */
	onFormSubmit(event) {
		event.preventDefault();
		console.log(this.state.search);
		this.setState({ search: '' })
	}

	render() {
		return (
			<div className="mb-5">
				<nav className="navbar py-3 sticky-top navbar-light bg-light justify-content-between">
				  	<span className="navbar-brand"><Link to={'/'}>Instapix</Link></span>
	                <form onSubmit={ this.onFormSubmit } className="form-inline search-form">
	                    <div className="search-form-group">
	                        <input onChange={ this.onSearchChange } value={ this.state.search } 
	                        type="search" id="" className="form-control mr-sm-2" placeholder="search..." />
	                    </div>
	                </form>
	                <div>
            			<Link to={this.props.authUserData ? `/u/${this.props.authUserData.sub}` : '#'}><img id="userIcon" src={ userIcon } /></Link>
		                <span className="navbar-brand"><Link to={'/login'} onClick={ auth.logout }>Logout</Link></span>
		            </div>
				</nav>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
    	authUserData: state.authUserData
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchAuthUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);