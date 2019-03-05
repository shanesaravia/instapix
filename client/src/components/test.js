import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from 'src/auth/auth';
import qs from 'query-string';

// const auth = new Auth();
// auth.handleAuthentication();

class Test extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log('this props: ', this.props);
        const parsed = await qs.parse(location.search);
        console.log(parsed)
        // console.log(this.props.test);
    }

    // auth = new Auth();
    // auth.handleAuthentication();

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">Test Page</h1>
                        <span className="navbar-brand"><Link to={'/'}>Home</Link></span>
                </div>
                <h2>{this.props.test}</h2>
            </div>
        )
    }
}

// className Test extends Component {
//  render() {
//      return <div classNameName="test">This is Test!</div>
//  }
// }
// 
// 
// const Test = (props) => {
//   return <div classNameName="test">This is Test!</div>;
// };

export default Test;