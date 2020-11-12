import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

export const getTopic = () => {
  try{
    return async (dispatch) => {
      let access_token = await AsyncStorage.getItem('access_token');
    
      let getTopicRequest = await axios({
        url: `${BaseUrl}/topics`,
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
  } catch (error) {
    console.log(error);
  }
};