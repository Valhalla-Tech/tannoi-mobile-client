import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

export const searchUser = (searchInput, initialSearch, page) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let searchUserRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/users/all-users${
          searchInput ? `?search=${searchInput}` : ''
        }${searchInput ? '&' : '?'}page=${page ? page : '1'}`,
        headers: {
          token: access_token,
        },
      });

      if (searchUserRequest.data) {
        if (page && page > 1) {
          dispatch({
            type: 'ADD_USER',
            payload: {
              users: searchUserRequest.data.data,
            },
          });
        } else {
          dispatch({
            type: 'GET_USERS',
            payload: {
              users: searchUserRequest.data.data,
              userCount: searchUserRequest.data.numOfResult,
            },
          });
        }

        if (searchUserRequest.data.data.length === 0 && initialSearch) {
          dispatch({
            type: 'SET_USERS_STATUS',
            payload: {
              noUsers: true,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.msg === 'You have to login first') {
        dispatch({
          type: 'LOGOUT',
          payload: {
            loginStatus: false,
          },
        });
      }
    }
  };
};

export const getAuthorizedUsers = (
  discussionId,
  searchInput,
  initialSearch,
  page,
) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getAuthorizedUsersRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/discussions/see-private/${discussionId}${
          searchInput ? `?search=${searchInput}` : ''
        }${searchInput ? '&' : '?'}page=${page ? page : '1'}`,
        headers: {
          token: access_token,
        },
      });

      if (getAuthorizedUsersRequest.data) {
        let authorizedId = [];
        getAuthorizedUsersRequest.data.data.forEach((data) => {
          if (data.isAuthorized) {
            authorizedId.push(data.id);
          }
        });

        if (page && page > 1) {
          dispatch({
            type: 'ADD_AUTHORIZED',
            payload: {
              authorized: getAuthorizedUsersRequest.data.data,
              authorizedId: authorizedId,
            },
          });
        } else {
          dispatch({
            type: 'GET_AUTHORIZED',
            payload: {
              authorized: getAuthorizedUsersRequest.data.data,
              authorizedId: authorizedId,
              userCount: getAuthorizedUsersRequest.data.numOfResult,
            },
          });
        }

        if (getAuthorizedUsersRequest.data.data.length === 0 && initialSearch) {
          dispatch({
            type: 'SET_USERS_STATUS',
            payload: {
              noUsers: true,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.msg === 'You have to login first') {
        dispatch({
          type: 'LOGOUT',
          payload: {
            loginStatus: false,
          },
        });
      }
    }
  };
};
