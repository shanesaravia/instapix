// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Middleware
import thunk from 'redux-thunk';
import promise from 'redux-promise';
// Reducers
import reducers from './reducers';
// Components/Containers
import Index from './containers';
import Login from './components/login';
import Signup from './components/signup';
import Callback from './components/callback'
import Verify from './components/verify';
import Profile from './containers/profile';
// Errors
import Error404 from './components/errors/Error404';
// Private Routes
import PrivateRoute from './components/PrivateRoute';

// Test Components
import Test from './components/test';

const middlewares = [thunk, promise]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
  		<div>
	  		<Switch>
{/* 	  			<Route exact path="/" render={() => (<Redirect to="/login" />)} /> */}
				<PrivateRoute exact path="/" component={ Index }  />
	  			<Route path="/login" component={ Login } />
	  			<Route path="/signup" component={ Signup } />
	  			<Route path="/callback" component={ Callback } />
	  			<PrivateRoute path="/verify" component={ Verify } />
	  			<PrivateRoute path="/u/:uid" component={ Profile } />

	  			<Route path="/test" component={ Test } />
	  			<Route component={ Error404 } />
		  	</Switch>
	  	</div>
  	</BrowserRouter>
  </Provider>
, document.querySelector("#index"));