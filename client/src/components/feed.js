// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
// Requests
import axios from 'axios';
// Auth
import Auth from 'src/auth/auth';

// testing
import example from 'static/images/example.jpg';

const auth = new Auth();

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.changeState = this.changeState.bind(this);
        this.showData = this.showData(this);
    }

    componentDidMount() {
        // let test = await auth.handleAuthentication();
    }

    /**
     * Displays user data
     * @return {obj} {userData}
     */
    showData() {
        if (this.props.userData) {
            return this.props.userData;
        } else {
            return 'fake userdata';
        }
    }

    /**
     * Changes test state to true or false
     */
    changeState() {
        this.state.test ? this.setState({test:false}) : this.setState({test:true})
    }

    render() {
        return (
            <div>
                <Nav />
                <button onClick={this.changeState}>TOGGLE STATE</button>
                {this.state.test ? <Loading /> : null}
                <img src={ example } style={{width:'400px',marginLeft:'30%',marginTop:'50px'}} />
                <h4>{ this.showData }</h4>
            </div>
        )
    }
}
