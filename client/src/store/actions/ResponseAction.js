import axios from '../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

export const getResponse = (discussionId, page) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getResponseRequest = await axios({
        url: `${BaseUrl}/responses/discussion/${discussionId}?page=${
          page ? page : 1
        }`,
        method: 'get',
        headers: {
          token: access_token,
        },
      });

      if (getResponseRequest.data) {
        if (page > 1) {
          dispatch({
            type: 'ADD_RESPONSE',
            payload: {
              response: getResponseRequest.data.data,
              responseCount: getResponseRequest.data.numOfResult,
            },
          });
        } else {
          dispatch({
            type: 'GET_RESPONSE',
            payload: {
              response: getResponseRequest.data.data,
              responseCount: getResponseRequest.data.numOfResult,
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

export const getSingleResponse = (responseId, page) => {
  return async (dispatch) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        let getResponseRequest = await axios({
          url: `${BaseUrl}/responses/single/${responseId}?page=${
            page ? page : 1
          }`,
          method: 'get',
          headers: {
            token: access_token,
          },
        });

        if (getResponseRequest.data) {
          if (page > 1) {
            dispatch({
              type: 'ADD_RESPONSE_FOR_RESPONSE',
              payload: {
                reply: getResponseRequest.data.chain_response,
                responseForResponseCount: getResponseRequest.data.numOfResult,
              },
            });
          } else {
            dispatch({
              type: 'GET_SINGLE_RESPONSE',
              payload: {
                profileId: getResponseRequest.data.creator.id,
                profilePicture:
                  getResponseRequest.data.creator.profile_photo_path,
                profileName: getResponseRequest.data.creator.name,
                postTime: getResponseRequest.data.timeSince,
                like: getResponseRequest.data.likes,
                recordingFile: getResponseRequest.data.voice_note_path,
                reply: getResponseRequest.data.chain_response,
                play: getResponseRequest.data.play_count,
                isLike: getResponseRequest.data.isLike,
                isDislike: getResponseRequest.data.isDislike,
                caption: getResponseRequest.data.caption,
                userType: getResponseRequest.data.creator.type,
                responseForResponseCount: getResponseRequest.data.numOfResult,
              },
            });
          }
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
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

export const getResponseData = (responseId, data) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getResponseDataRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/responses/info/${responseId}`,
        headers: {
          token: access_token,
        },
      });

      if (getResponseDataRequest.data) {
        dispatch({
          type: 'GET_DATA_FOR_RESPONSE',
          payload: {
            likeForResponse: getResponseDataRequest.data.likes,
            isLikeForResponse: getResponseDataRequest.data.isLike,
            isDislikeForResponse: getResponseDataRequest.data.isDislike,
            responseCountForResponse:
              getResponseDataRequest.data.response_count,
            topResponsePreview: getResponseDataRequest.data.chain_response,
          },
        });

        if (data) {
          data.forEach((item) => {
            if (item.id === responseId) {
              item.response_count = getResponseDataRequest.data.response_count;
              item.chain_response = getResponseDataRequest.data.chain_response;
            }
          });

          dispatch({
            type: 'GET_RESPONSE',
            payload: {
              response: data,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editResponse = (
  data,
  id,
  editLike,
  editLikeStatus,
  editIsLike,
  isLikeStatus,
  editIsDislike,
  isDislikeStatus,
  editResponseCount,
) => {
  return (dispatch) => {
    data.forEach((data) => {
      if (data.id === id && editLike) {
        data.likes = editLikeStatus ? data.likes + 1 : data.likes - 1;
      }
      if (data.id === id && editIsLike) {
        data.isLike = isLikeStatus;
      }
      if (data.id === id && editIsDislike) {
        data.isDislike = isDislikeStatus;
      }
      if (data.id === id && editResponseCount) {
        data.response_count = data.response_count + 1;
      }
    });

    dispatch({
      type: 'GET_RESPONSE',
      payload: {
        response: data,
      },
    });
  };
};

export const clearResponse = (clearResponseData, clearResponses) => {
  return (dispatch) => {
    if (clearResponseData) {
      dispatch({
        type: 'CLEAR_RESPONSE_DATA',
      });
    } else if (clearResponses) {
      dispatch({
        type: 'CLEAR_RESPONSES',
      });
    } else {
      dispatch({
        type: 'CLEAR_RESPONSE',
      });
    }
  };
};
