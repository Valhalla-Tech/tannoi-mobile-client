import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getDiscussion = (discussionId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getDiscussionRequest = await axios({
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/discussions/single/${discussionId}`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getDiscussionRequest.data) {
        dispatch({
          type: 'GET_DISCUSSION',
          payload: {
            profilePicture: getDiscussionRequest.data.creator.profile_photo_path,
            profileName: getDiscussionRequest.data.creator.name,
            postTime: getDiscussionRequest.data.created_at,
            like: getDiscussionRequest.data.likes,
            topic: getDiscussionRequest.data.topic.name,
            discussionTitle: getDiscussionRequest.data.title,
            hashtags: getDiscussionRequest.data.hashtags,
            replies: getDiscussionRequest.data.response_count,
            plays: getDiscussionRequest.data.play_count,
            recordingFile: getDiscussionRequest.data.voice_note_path,
            isLike: getDiscussionRequest.data.isLike,
            isDislike: getDiscussionRequest.data.isDislike
          }
        })
      }
    } catch (error) {
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

export const clearDiscussion = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_DISCUSSION'
    });
  }
};