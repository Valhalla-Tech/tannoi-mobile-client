import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getHome = () => {
  return async (dispatch) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getHomeRequest = await axios({
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/pages/home?sort=newest&page=1',
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getHomeRequest.data) {
        dispatch({
          type: 'GET_HOME',
          payload: {
            user: getHomeRequest.data.user,
            discussionOfTheWeek: getHomeRequest.data.discussion_of_the_week,
            topUser: getHomeRequest.data.top_user,
            trending: getHomeRequest.data.discussion.data,
            recommendedTopic: getHomeRequest.data.recommended_topic
          }
        })
      };
    } catch (error) {
      console.log(error);
    }
  };
};