import Fetch from '../../helper/Fetch';
import BaseUrl from '../../constants/BaseUrl';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { newGenerateDeepLink } from '../../helper/GenerateDeepLink';
import { getToken } from '../../helper/Store';

const DUMMY_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxODI3NDQ0LCJleHAiOjE2MjE4MjgzNDR9.mk0IfFWnFSyHWM5SA7iMHR54aRNoM9CoLisT311sGG4';

const loadingAction = (payload) => {
  return {
    type: 'REGISTER/LOADING',
    payload: {
      isLoading: payload,
    },
  };
};

const registerDataAction = (payload) => {
  return {
    type: 'REGISTER/REGISTER_DATA',
    payload: {
      registerData: payload,
    },
  };
};

const getTopicAction = (payload) => {
  return {
    type: 'REGISTER/TOPICS',
    payload: {
      topics: payload,
    },
  };
};

const getPeopleToHearAction = (payload) => {
  return {
    type: 'REGISTER/PEOPLE_TO_HEAR',
    payload: {
      people: payload,
    },
  };
};

const getCommunitiesAction = (payload) => {
  return {
    type: 'REGISTER/COMMUNITIES',
    payload: {
      communities: payload,
    },
  };
};

const getCommunityFromCodeAction = (payload) => {
  return {
    type: 'REGISTER/COMMUNITY_FROM_CODE',
    payload: {
      communityFromCode: payload,
    },
  };
};

const openJoinCommunityModalAction = (payload) => {
  return {
    type: 'REGISTER/JOIN_COMMUNITY_MODAL',
    payload: {
      joinCommunityModalIsOpen: payload,
    },
  };
};

export const createAccount = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const { email, password, name } = data;
      const createAccountRequestOption = {
        url: `${BaseUrl}/users/register`,
        method: 'post',
        data: {
          email: email.trim(),
          password: password,
          name: name,
        },
      };

      let createAccountRequest = await Fetch(createAccountRequestOption);

      if (createAccountRequest.data) {
        dispatch(loadingAction(false));
        const payload = {
          email: createAccountRequest.data.email,
          id: createAccountRequest.data.id,
        };
        dispatch(registerDataAction(payload));
        return { status: true };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const confirmEmail = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const { pin1Value, pin2Value, pin3Value, pin4Value } = data;
      let pin = `${pin1Value}${pin2Value}${pin3Value}${pin4Value}`;
      const confirmEmailRequestOption = {
        url: `${BaseUrl}/users/activation?token=${pin}&device=${Platform.OS}`,
        method: 'get',
      };
      const confirmEmailRequest = await Fetch(confirmEmailRequestOption);
      if (confirmEmailRequest.data) {
        dispatch(loadingAction(false));
        await AsyncStorage.setItem(
          'access_token',
          confirmEmailRequest.data.access_token,
        );
        await AsyncStorage.setItem(
          'refresh_token',
          confirmEmailRequest.data.refresh_token,
        );
        return { status: true, userData: confirmEmailRequest.data.userData };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const resendEmailConfirmationCode = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const resendEmailConfirmationCodeRequestOption = {
        url: `${BaseUrl}/users/generate/${userId}`,
        method: 'get',
      };

      let resendEmailConfirmationCodeRequest = await Fetch(
        resendEmailConfirmationCodeRequestOption,
      );

      if (resendEmailConfirmationCodeRequest.data) {
        dispatch(loadingAction(false));
        return { status: true };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const getTopic = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const getTopicRequestOption = {
        url: `${BaseUrl}/topics`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };
      const getTopicRequest = await Fetch(getTopicRequestOption);

      if (getTopicRequest.data) {
        dispatch(getTopicAction(getTopicRequest.data));
        dispatch(loadingAction(false));
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const followTopic = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const followTopicRequestOption = {
        method: 'post',
        url: `${BaseUrl}/topics/preferred-many`,
        headers: {
          token: await getToken(),
        },
        data: {
          topics_id: data,
        },
      };

      let followTopicRequest = await Fetch(followTopicRequestOption);

      if (followTopicRequest.data) {
        dispatch(loadingAction(false));
        return true;
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const getPeopleToHear = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const getPeopleToHearRequestOption = {
        url: `${BaseUrl}/users/top-users`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };
      const getPeopleToHearRequest = await Fetch(getPeopleToHearRequestOption);

      if (getPeopleToHearRequest.data) {
        dispatch(getPeopleToHearAction(getPeopleToHearRequest.data));
        dispatch(loadingAction(false));
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const followPeople = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const url = await newGenerateDeepLink(
        'Follow an Account',
        'This is a link to User Profile',
        'UserProfileScreen',
        {
          userId: userId,
        },
        'follow user',
      );

      const followPeopleRequestOption = {
        url: `${BaseUrl}/users/follow/${userId}?deep_link=${url}`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };

      let followPeopleRequest = await Fetch(followPeopleRequestOption);

      if (followPeopleRequest.data) {
        dispatch(loadingAction(false));
        return { status: true };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const unFollowPeople = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const unFollowPeopleRequestOption = {
        url: `${BaseUrl}/users/unfollow/${userId}`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };

      let unFollowPeopleRequest = await Fetch(unFollowPeopleRequestOption);

      if (unFollowPeopleRequest.data) {
        dispatch(loadingAction(false));
        return { status: true };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const getCommunities = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const getCommunitiesRequestOption = {
        url: `${BaseUrl}/communities/all?isNotMember=true&&isPublic=true`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };

      let getCommunitiesRequest = await Fetch(getCommunitiesRequestOption);

      if (getCommunitiesRequest.data) {
        dispatch(loadingAction(false));
        dispatch(getCommunitiesAction(getCommunitiesRequest.data.data));
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const joinCommunity = (communityId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const joinCommunityRequestOption = {
        url: `${BaseUrl}/communities/join-community/${communityId}`,
        method: 'post',
        headers: {
          token: await getToken(),
        },
      };

      const joinCommunityRequest = await Fetch(joinCommunityRequestOption);

      if (joinCommunityRequest.data) {
        dispatch(loadingAction(false));
        return { status: true };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const leaveCommunity = (communityId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const leaveCommunityRequestOption = {
        url: `${BaseUrl}/communities/leave-community/${communityId}`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };

      let leaveCommunityRequest = await Fetch(leaveCommunityRequestOption);

      if (leaveCommunityRequest.data) {
        dispatch(loadingAction(false));
        return { status: true };
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};

export const openJoinCommunityModal = (data) => {
  return (dispatch) => {
    dispatch(openJoinCommunityModalAction(data));
  };
};

export const searchCommunity = (communityCode) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));

      const searchCommunityOption = {
        url: `${BaseUrl}/communities/single-code/${communityCode}?isPublic=true`,
        method: 'get',
        headers: {
          token: await getToken(),
        },
      };

      let searchCommunityRequest = await Fetch(searchCommunityOption);

      if (searchCommunityRequest.data) {
        dispatch(loadingAction(false));
        const payload = {
          id: searchCommunityRequest.data.id,
          name: searchCommunityRequest.data.name,
        };
        dispatch(getCommunityFromCodeAction(payload));
        return { status: true };
      }
    } catch (error) {
      if (error.response.data.msg === 'This Community is Private') {
        dispatch(getCommunityFromCodeAction(error.response.data.msg));
      } else {
        dispatch(getCommunityFromCodeAction('Community Not Found'));
      }
      dispatch(loadingAction(false));
      return { status: false, msg: error.response.data.msg };
    }
  };
};
