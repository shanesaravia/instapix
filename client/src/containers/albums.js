// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Albums extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {
	}

    render() {
    	return (
    		<div>Albums Loaded</div>
    	)
    }
}