import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';
import { trackWithMixPanel } from '../../helper/Mixpanel';
import { Platform } from 'react-native';

export const userLogin = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        loginStatus: true,
      },
    });
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    let userId = await AsyncStorage.getItem('userId');
    trackWithMixPanel('User: Logged Out', {
      distinct_id: userId,
    });
    const fcm_token = await AsyncStorage.getItem('fcm_token');
    if (fcm_token) {
      await axios({
        method: 'DELETE',
        url: BaseUrl + '/users/delete-firebase-token?token=' + fcm_token,
      });
    }
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
      payload: {
        loginStatus: false,
      },
    });
  };
};

export const GoogleSignIn = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      let googleSigninRequest = await axios.post(
        `${BaseUrl}/users/login/google`,
        {
          token: userInfo.idToken,
          device: Platform.OS,
        },
      );

      if (
        googleSigninRequest.data.access_token &&
        googleSigninRequest.data.refresh_token
      ) {
        await AsyncStorage.setItem(
          'access_token',
          googleSigninRequest.data.access_token,
        );
        await AsyncStorage.setItem(
          'refresh_token',
          googleSigninRequest.data.refresh_token,
        );

        if (!googleSigninRequest.data.isRegistered) {
          return { openRegisterModal: true };
        } else {
          dispatch({
            type: 'LOGIN',
            payload: {
              loginStatus: true,
            },
          });

          return { openRegisterModal: false };
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
};

export const FacebookSignIn = (callback) => {
  return async (dispatch) => {
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function (result) {
          if (result.isCancelled) {
            console.log('Login cancelled');
            callback({ openRegisterModal: false });
          } else {
            AccessToken.getCurrentAccessToken().then(async (data) => {
              try {
                console.log(data.accessToken);
                let facebookSigninRequest = await axios.post(
                  `${BaseUrl}/users/login/facebook`,
                  {
                    token: data.accessToken.toString(),
                    device: Platform.OS,
                  },
                );

                if (
                  facebookSigninRequest.data.access_token &&
                  facebookSigninRequest.data.refresh_token
                ) {
                  await AsyncStorage.setItem(
                    'access_token',
                    facebookSigninRequest.data.access_token,
                  );
                  await AsyncStorage.setItem(
                    'refresh_token',
                    facebookSigninRequest.data.refresh_token,
                  );

                  if (!facebookSigninRequest.data.isRegistered) {
                    callback({ openRegisterModal: true });
                  } else {
                    dispatch({
                      type: 'LOGIN',
                      payload: {
                        loginStatus: true,
                      },
                    });

                    callback({ openRegisterModal: false });
                  }
                }
              } catch (error) {
                console.log(error.response.data.msg);
              }
            });
          }
        },
        function (error) {
          console.log('Login fail with error: ' + error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTermsOfService = () => {
  return async () => {
    try {
      let getTermsOfServiceRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/terms-of-service`,
      });

      if (getTermsOfServiceRequest.data) {
        await AsyncStorage.setItem(
          'termsOfService',
          getTermsOfServiceRequest.data.content,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
