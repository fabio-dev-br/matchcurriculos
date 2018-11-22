import axios from 'axios';
import qs from 'qs';
import { store } from './../store'

const API_URL = process.env.VUE_APP_BASE_URI;

export default {
    get(url, data) {
        return this.request('GET', url, qs.stringify(data));
    },
    post(url, data) {
        return this.request('POST', url, qs.stringify(data));
    },
    postFile(url, data) {
        return this.request('POST', url, data, {
            'Content-Type': 'multipart/form-data'
        });
    },
    put(url, data) {
        return this.request('PUT', url, qs.stringify(data));
    },
    patch(url, data) {
        return this.request('PATCH', url, qs.stringify(data));
    },
    delete(url, data) {
        return this.request('DELETE', url, qs.stringify(data));
    },
    request(method, url, data = {}, headers = {'Content-Type': 'application/x-www-form-urlencoded'}) {

        if(store.getters.authToken) {
            headers['Authorization'] = 'Bearer ' + store.getters.authToken;
        }
        return axios(API_URL + url, {
          method: method,
          data,
          headers
        });
    }
}