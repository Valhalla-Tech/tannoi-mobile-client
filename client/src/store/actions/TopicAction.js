import axios from '../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';
import { trackWithMixPanel } from '../../helper/Mixpanel';

export const getTopic = () => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getTopicRequest = await axios({
        url: `${BaseUrl}/topics`,
        method: 'get',
        headers: {
          token: access_token,
        },
      });

      dispatch({
        type: 'GET_TOPIC',
        payload: {
          topics: getTopicRequest.data,
        },
      });
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

export const getSingleTopic = (topicId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getSingleTopicRequest = await axios({
        url: `${BaseUrl}/topics/${topicId}`,
        method: 'get',
        headers: {
          token: access_token,
        },
      });

      if (getSingleTopicRequest.data) {
        dispatch({
          type: 'GET_SINGLE_TOPIC',
          payload: {
            topic: getSingleTopicRequest.data,
          },
        });
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

export const followTopic = (topicId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let userId = await AsyncStorage.getItem('userId');

      let followTopicRequest = await axios({
        url: `${BaseUrl}/topics/preferred/${topicId}`,
        method: 'get',
        headers: {
          token: access_token,
        },
      });

      if (followTopicRequest.data) {
        trackWithMixPanel('User: Followed A Topic', {
          distinct_id: userId,
          topic_id: topicId,
        });
        dispatch(getTopic());
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

export const unfollowTopic = (topicId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let userId = await AsyncStorage.getItem('userId');

      let followTopicRequest = await axios({
        url: `${BaseUrl}/topics/preferred/${topicId}`,
        method: 'delete',
        headers: {
          token: access_token,
        },
      });

      if (followTopicRequest.data) {
        trackWithMixPanel('User: Unfollowed A Topic', {
          distinct_id: userId,
          topic_id: topicId,
        });
        dispatch(getTopic());
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

export const clearTopic = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_TOPIC',
    });
  };
};
