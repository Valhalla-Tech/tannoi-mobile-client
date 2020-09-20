import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getTopic = () => {
  return async (dispatch) => {
    let access_token = await AsyncStorage.getItem('access_token');
  
    let getTopicRequest = await axios({
      url: 'https://dev.entervalhalla.tech/api/tannoi/v1/topics',
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
  };
};