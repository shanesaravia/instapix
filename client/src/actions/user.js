import { FETCH_USER } from './action-types';
import { instaAPI } from '../utils/axios';
import axios from 'axios';
import { apiConfig } from '../../configs/config';

/**
 * Fetches user data from instapix
 * @param  {str} access_token - auth0 access token
 * @param  {String} instapix_id  Instapix user id
 * @return {action}              FETCH_USER
 */
export function fetchUser(access_token, instapix_id) {
	const url = apiConfig.endpoints.get_user_url.replace(':userId', instapix_id);
	const headers = {headers: {'authorization': `Bearer ${access_token}`}}
	const request = instaAPI.get(url, headers);

	return {
		type: FETCH_USER,
		payload: request
	}
}