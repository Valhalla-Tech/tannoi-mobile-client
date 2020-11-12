import {
  GoogleSignin
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import BaseUrl from '../../constants/BaseUrl';

export const userLogin = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        loginStatus: true
      }
    });
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
      payload: {
        loginStatus: false
      }
    });
  };
};

export const GoogleSignIn = () => {
  return async (dispatch) => {    
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      let googleSigninRequest = await axios.post(`${BaseUrl}/users/login/google`, {
        token: userInfo.idToken
      });

      if (googleSigninRequest.data.access_token) {
        await AsyncStorage.setItem('access_token', googleSigninRequest.data.access_token);
        dispatch({
          type: 'LOGIN',
          payload: {
            loginStatus: true
          }
        });
      };
    } catch (error) {
      console.log(error.response.data.msg) ;
    };
  };
};

export const FacebookSignIn = () => {
  return async (dispatch) => {
    try {
      LoginManager.logInWithPermissions(['public_profile']).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then(
              async (data) => {
                let facebookSigninRequest = await axios.post(`${BaseUrl}/users/login/facebook`, {
                  token: data.accessToken.toString()
                });

                if (facebookSigninRequest.data.access_token) {
                  await AsyncStorage.setItem('access_token', facebookSigninRequest.data.access_token);
                  dispatch({
                    type: 'LOGIN',
                    payload: {
                      loginStatus: true
                    }
                  });
                };
              }
            )
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
    } catch (error) {
      console.log(error.data.response.msg);
    }
  };
};