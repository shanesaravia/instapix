import { FETCH_USER } from '../actions/action-types';
let initialState = null;

export default function(state = initialState, action) {
	switch (action.type) {

	case FETCH_USER:
		return { ...action.payload.data };
	    // return Object.assign({}, state, {data: action.payload});

	default:
		return state;
	}
}