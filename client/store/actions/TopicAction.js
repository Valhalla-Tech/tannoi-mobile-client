import axios from '../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

export const getTopic = () => {
  return async (dispatch) => {
    try{
      let access_token = await AsyncStorage.getItem('access_token');
    
      let getTopicRequest = await axios({
        url: `${BaseUrl}/topics`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });
      
      dispatch({
        type: 'GET_TOPIC',
        payload: {
          topics: getTopicRequest.data
        }
      });
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

export const getSingleTopic = (topicId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getSingleTopicRequest = await axios({
        url: `${BaseUrl}/topics/${topicId}`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getSingleTopicRequest.data) {
        dispatch({
          type: 'GET_SINGLE_TOPIC',
          payload: {
            topic: getSingleTopicRequest.data
          }
        })
      }
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

export const followTopic = (topicId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
  
      let followTopicRequest = await axios({
        url: `${BaseUrl}/topics/preferred/${topicId}`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });
  
      if (followTopicRequest.data) {
        dispatch(getTopic());
      }
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

export const unfollowTopic = (topicId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let followTopicRequest = await axios({
        url: `${BaseUrl}/topics/preferred/${topicId}`,
        method: 'delete',
        headers: {
          'token': access_token
        }
      });

      if (followTopicRequest.data) {
        dispatch(getTopic());
      }
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