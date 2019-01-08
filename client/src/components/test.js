import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth/auth';
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
    {/*                 <p>{this.auth.handleAuthentication()}</p> */}
        {/*             <div className="container"> */}
        {/*                 <div className="row"> */}
        {/*                     <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"> */}
        {/*                         <div className="card card-signin my-5"> */}
        {/*                             <div className="card-body"> */}
        {/*                                 <h5 className="card-title text-center">Sign In</h5> */}
        {/*                                 <form className="form-signin"> */}
        {/*                                     <div className="form-label-group"> */}
        {/*                                         <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus /> */}
        {/*                                         <label for="inputEmail">Email address</label> */}
        {/*                                     </div> */}
        {/*  */}
        {/*                                     <div className="form-label-group"> */}
        {/*                                         <input type="password" id="inputPassword" className="form-control" placeholder="Password" required /> */}
        {/*                                         <label for="inputPassword">Password</label> */}
        {/*                                     </div> */}
        {/*  */}
        {/*                                     <div className="custom-control custom-checkbox mb-3"> */}
        {/*                                         <input type="checkbox" className="custom-control-input" id="customCheck1" /> */}
        {/*                                         <label className="custom-control-label" for="customCheck1">Remember password</label> */}
        {/*                                     </div> */}
        {/*                                     <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button> */}
        {/*                                     <div className="text-center pt-2"> */}
        {/*                                         <small>Need an account? */}
        {/*                                         <Link to="/hello"> Sign Up</Link> */}
        {/*                                         </small> */}
        {/*                                     </div> */}
        {/*                                     <hr className="my-4" /> */}
        {/*                                     <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button> */}
        {/*                                     <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button> */}
        {/*                                 </form> */}
        {/*                             </div> */}
        {/*                         </div> */}
        {/*                     </div> */}
        {/*                 </div> */}
        {/*             </div> */}
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