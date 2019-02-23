import { FETCH_AUTH_USER } from './action-types';
import Auth from '../auth/auth';

/**
 * Fetches auth user data from auth0
 * @param  {str} accessToken Auth0 access_token
 * @return {action}             FETCH_AUTH_USER
 */
export async function fetchAuthUser(accessToken) {
	const auth = new Auth();
	let authData = await auth.getUserData(accessToken);
	authData.sub = authData.sub.substring(6);

	return {
		type: FETCH_AUTH_USER,
		payload: authData
	}
}