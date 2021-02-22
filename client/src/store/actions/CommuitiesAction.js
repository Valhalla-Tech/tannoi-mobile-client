import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

export const getUserCommunity = () => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getUserCommunityRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/all?communityMember=true`,
        headers: {
          token: access_token,
        },
      });

      if (getUserCommunityRequest.data) {
        dispatch({
          type: 'GET_USER_COMMUNITY',
          payload: {
            userCommunity: getUserCommunityRequest.data.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOneCommunity = (communityId) => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getOneCommunityRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/single/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (getOneCommunityRequest.data) {
        dispatch({
          type: 'GET_ONE_COMMUNITY',
          payload: {
            communityProfile: getOneCommunityRequest.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearCommunityProfile = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_COMMUNITY_PROFILE',
    });
  };
};

export const clearUserComunity = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_USER_COMMUNITY',
    });
  };
};
