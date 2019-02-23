import { apiConfig } from '../../configs/config';
// import { authManagerConfig } from '../../configs/config';
import axios from 'axios';

const instaAPI = axios.create({
    baseURL: apiConfig.apiRoot,
    timeout: 10000,
    headers: {
        'Accept-Version': 1,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    },
});

export {
    instaAPI
}