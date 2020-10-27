import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getTopic = () => {
  try{
    return async (dispatch) => {
      let access_token = await AsyncStorage.getItem('access_token');
    
      let getTopicRequest = await axios({
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/topics',
        method: 'get',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAzNzU2OTI3fQ.9MAk6YemljsxYh1OykFCmdboG9vh9qzHoNVKiJ9zKTs'
        }
      });
      
      dispatch({
        type: 'GET_TOPIC',
        payload: {
          topics: getTopicRequest.data
        }
      });
    };
  } catch (error) {
    console.log(error);
  }
};