// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Auth
import Auth from '../auth/auth';
// Static
import userIcon from '../../static/images/user.png';

const auth = new Auth();

export default class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: ''
		}

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.test = this.test.bind(this);
	}

	componentDidMount() {
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

	test() {
		this.props.history.push('/profile');
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
		                <Link to={'/profile'}><img id="userIcon" src={ userIcon } /></Link>
		                <span className="navbar-brand"><Link to={'/login'} onClick={ auth.logout }>Logout</Link></span>
		            </div>
				</nav>
			</div>
		)
	}
}
