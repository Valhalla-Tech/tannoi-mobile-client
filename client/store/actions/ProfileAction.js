import axios from '../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

export const getOneProfile = (id, forMeScreen) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getOneProfileRequest = await axios({
        method: 'get',
        url: id ? `${BaseUrl}/users/info/?id=${id}` : `${BaseUrl}/users/info`,
        headers: {
          'token': access_token
        }
      })

      if (getOneProfileRequest.data) {
        if (forMeScreen) {
          dispatch({
            type: 'GET_LOGGED_IN_USER_PROFILE',
            payload: {
              loggedinUserProfile: getOneProfileRequest.data
            }
          });
        } else {
          dispatch({
            type: 'GET_ONE_PROFILE',
            payload: {
              userProfile: getOneProfileRequest.data
            }
          });
        }
      };
    } catch (error) {
      console.log(error);
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

export const clearUserProfile = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_USER_PROFILE'
    });
  };
};