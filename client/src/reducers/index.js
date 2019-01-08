// Redux
import { combineReducers } from 'redux';
// Reducers
import UserDataReducer from './userData';
import authUserDataReducer from './authUserData';

const rootReducer = combineReducers({
	authUserData: authUserDataReducer,
	userData: UserDataReducer
});

export default rootReducer;
