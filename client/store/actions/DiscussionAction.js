import axios from '../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

export const getAllDiscussion = (option, optionId, sort, page) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getAllDiscussionRequest = await axios({
        url: `${BaseUrl}/discussions/all${
          `?sort=${sort ? sort : 'newest'}`}${option ? `&${option}` : ''}${optionId ? optionId : ''}${`&page=${page ? page : '1'}`
        }`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getAllDiscussionRequest.data) {
        if (page && page > 1) {
          dispatch({
            type: 'ADD_DISCUSSION_LIST',
            payload: {
              discussions: getAllDiscussionRequest.data.data,
              discussionCount: getAllDiscussionRequest.data.numOfResult
            }
          });
        } else {
          dispatch({
            type: 'GET_ALL_DISCUSSION',
            payload: {
              discussions: getAllDiscussionRequest.data.data,
              discussionCount: getAllDiscussionRequest.data.numOfResult
            }
          });
        } 
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

export const getDiscussion = (discussionId, isLoading) => {
  return async (dispatch) => {
    try {
      if (isLoading) {
        dispatch({
          type: 'SET_IS_LOADING',
          payload: {
            isLoading: true
          }
        });
      }

      let access_token = await AsyncStorage.getItem('access_token');
      let getDiscussionRequest = await axios({
        url: `${BaseUrl}/discussions/single/${discussionId}`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getDiscussionRequest.data) {
        dispatch({
          type: 'GET_DISCUSSION',
          payload: {
            profileId: getDiscussionRequest.data.creator.id,
            profilePicture: getDiscussionRequest.data.creator.profile_photo_path,
            profileName: getDiscussionRequest.data.creator.name,
            postTime: getDiscussionRequest.data.timeSince,
            like: getDiscussionRequest.data.likes,
            topic: getDiscussionRequest.data.topic.name,
            discussionTitle: getDiscussionRequest.data.title,
            hashtags: getDiscussionRequest.data.hashtags,
            replies: getDiscussionRequest.data.response_count,
            plays: getDiscussionRequest.data.play_count,
            recordingFile: getDiscussionRequest.data.voice_note_path,
            isLike: getDiscussionRequest.data.isLike,
            isDislike: getDiscussionRequest.data.isDislike,
            type: getDiscussionRequest.data.type,
            userType: getDiscussionRequest.data.creator.type
          }
        });

        if (isLoading) {
          dispatch({
            type: 'SET_IS_LOADING',
            payload: {
              isLoading: false
            }
          });
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
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

export const getUserDiscussion = (userId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getUserDiscussionRequest = await axios({
        url: `${BaseUrl}/discussions/users?user_id=${userId}`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getUserDiscussionRequest.data) {
        dispatch({
          type: 'GET_USER_DISCUSSION',
          payload: {
            userDiscussion: getUserDiscussionRequest.data.data
          }
        });
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

export const clearDiscussion = (clearUserDiscussion) => {
  return (dispatch) => {
    if (clearUserDiscussion) {
      dispatch({
        type: 'CLEAR_USER_DISCUSSION'
      });
    } else {
      dispatch({
        type: 'CLEAR_DISCUSSION'
      });
    }
  }
};