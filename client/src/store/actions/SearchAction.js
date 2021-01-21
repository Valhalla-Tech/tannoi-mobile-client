import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

export const search = (keyword, page) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let searchRequest = await axios({
        url: `${BaseUrl}/search?query=${keyword}&page=${1}`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (searchRequest.data) {
        dispatch({
          type: 'GET_SEARCH',
          payload: {
            discussions: searchRequest.data.discussions.data,
            users: searchRequest.data.users.data
          }
        });
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data.msg === 'You have to login first') {
        dispatch({
          type: 'LOGOUT',
          payload: {
            loginStatus: false
          }
        });
      };
    }
  };
};