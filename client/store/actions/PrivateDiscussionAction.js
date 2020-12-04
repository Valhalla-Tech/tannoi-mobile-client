import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import BaseUrl from '../../constants/BaseUrl';

export const searchUser = (searchInput, initialSearch) => {
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

      if (searchUserRequest.data) {
        dispatch({
          type: 'GET_FOLLOWERS',
          payload: {
            followers: searchUserRequest.data.data
          }
        });
        
        if (searchUserRequest.data.data.length === 0 && initialSearch) {
          dispatch({
            type: 'SET_FOLLOWERS_STATUS',
            payload: {
              noFollowers: true
            }
          })
        };

      };
    } catch (error) {
      console.log(error);
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

export const getAuthorizedFollowers = (discussionId, searchInput, initialSearch) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getAuthorizedFollowersRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/discussions/see-private/${discussionId}${searchInput ? `?search=${searchInput}` : ''}`,
        headers: {
          'token': access_token
        }
      });

      if (getAuthorizedFollowersRequest.data) {
        let authorizedId = []
        getAuthorizedFollowersRequest.data.data.forEach(data => {
          if (data.isAuthorized) {
            authorizedId.push(data.id);
          };
        });

        dispatch({
          type: 'GET_AUTHORIZED',
          payload: {
            authorized: getAuthorizedFollowersRequest.data.data,
            authorizedId: authorizedId
          }
        });

        if (getAuthorizedFollowersRequest.data.data.length === 0 && initialSearch) {
          dispatch({
            type: 'SET_FOLLOWERS_STATUS',
            payload: {
              noFollowers: true
            }
          })
        };

      };
    } catch (error) {
      console.log(error)
      if (error.response.data.msg === 'You have to login first') {
        dispatch({
          type: 'LOGOUT',
          payload: {
            loginStatus: false
          }
        })
      };
    };
  };
};