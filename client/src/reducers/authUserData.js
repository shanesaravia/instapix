import { FETCH_AUTH_USER } from '../actions/action-types';
let initialState = null;

export default function(state = initialState, action) {
	switch (action.type) {

		case FETCH_AUTH_USER:
			return { ...action.payload };

		default:
			return state;
	}
}