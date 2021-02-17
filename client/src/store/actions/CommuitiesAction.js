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
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
