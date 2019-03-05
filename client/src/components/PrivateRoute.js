// React
import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
// Auth
import Auth from 'src/auth/auth';

const auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login'
        }}
      />
    )
  )} />
);

export default PrivateRoute; 