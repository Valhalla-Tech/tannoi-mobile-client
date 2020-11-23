import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import BaseUrl from '../../constants/BaseUrl';

export const searchUser = (searchInput) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let searchUserRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/users/followers${searchInput ? `?search=${searchInput}` : ''}`,
        headers: {
          'token': access_token
        }
      });

      dispatch({
        type: 'GET_FOLLOWERS',
        payload: {
          followers: searchUserRequest.data.data
        }
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      if (error.response.data.msg === 'You have to login first') {
        dispatch({
          type: 'LOGOUT',
          payload: {
            loginStatus: false
          }
        })
      };
    }
  };
};