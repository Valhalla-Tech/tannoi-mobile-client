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
        console.log(getOneCommunityRequest.data)
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


export const getCommunityMember = (id) => {
  return async dispatch => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getCommunityMemberRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/list-members/${id}`,
        headers: {
          token: access_token,
        },
      });

      if (getCommunityMemberRequest.data) {
        dispatch({
          type: 'GET_ALL_COMMUNITY_MEMBERS',
          payload: {
            data: getCommunityMemberRequest.data.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const clearUserComunity = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_USER_COMMUNITY',
    });
  };
};

export const deleteCommunityMember = (user_id, community_id) => {
  return async dispatch => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let deleteCommunityMemberRequest = await axios({
        method: 'DELETE',
        url: `${BaseUrl}/communities/remove-member`,
        headers: {
          token: access_token,
        },
        data: {
          user_id,
          community_id,
        },
      });

      if (deleteCommunityMemberRequest.msg === 'Sucess') {
        dispatch({
          type: 'DELETE_COMMUNITY_MEMBER',
          payload: {
            msg: 'member has been deleted!',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMemberPrivilege = (user_id, community_id, type) => {
  return async dispatch => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let updateMemberPrivilegeRequest = await axios({
        method: 'PUT',
        url: `${BaseUrl}/communities/edit-members`,
        headers: {
          token: access_token,
        },
        data: {
          user_id,
          community_id,
          type,
        },
      });
      console.log(updateMemberPrivilegeRequest)
      if (updateMemberPrivilegeRequest.status === 200) {
        dispatch({
          type: 'EDIT_COMMUNITY_MEMBER',
          payload: {
            status: 200,
            msg: 'member has been updated!',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
