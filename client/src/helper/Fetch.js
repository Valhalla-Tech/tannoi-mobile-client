import axios from 'axios';
import BaseUrl from '../constants/BaseUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { userLogout } from '../store/actions/LoginAction';
import store from '../store';

const http = axios.create();

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.data.msg === 'Token Expired' &&
      originalRequest.url === BaseUrl + '/users/refresh-token'
    ) {
      store.dispatch(userLogout());
      return Promise.reject(error);
    }
    if (error.response.data.msg === 'jwt expired' && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      return http
        .post(BaseUrl + '/users/refresh-token', {
          refresh_token: refreshToken,
        })
        .then(async (res) => {
          if (res.status === 201) {
            await AsyncStorage.setItem('access_token', res.data.access_token);
            originalRequest.headers['token'] = res.data.access_token;
            return http.request(originalRequest);
          } else {
            store.dispatch(userLogout());
          }
        });
    }
    return Promise.reject(error);
  },
);

export default http;
