import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import axios from 'axios';

//Components
import BackButton from '../../components/PublicComponent/BackButton';
import LoginScreenButton from '../../components/PublicComponent/BigButton';

const LoginScreen = ({ navigation }) => {

  const googleSignInSubmit = async googleAccessToken => {
    try {
      let googleSigninRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/login/google', {
        token: googleAccessToken
      });

      console.log(googleSigninRequest.data);

      Alert.alert(
        'Google Login',
        'Google login success, welcome to Tannoi',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error) 
    };
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      googleSignInSubmit(userInfo.idToken)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const facebookSignInSubmit = async facebookAccessToken => {
    try {
      let facebookSigninRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/login/facebook', {
        token: facebookAccessToken
      });

      console.log(facebookSigninRequest.data);

      Alert.alert(
        'Facebook Login',
        'Facebook login success, welcome to Tannoi',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error) 
    };
  };

  const facebookSignIn = async () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data.accessToken.toString());
              facebookSignInSubmit(data.accessToken.toString())
            }
          )
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.loginScreenContainerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.loginTitleStyle}>Login to TannOi</Text>
        <LoginScreenButton 
          buttonTitle="Log in with email"
          buttonStyle={
            {
              backgroundColor: "#5152D0",
              borderColor: "#5152D0",
              color: "#FFFFFF",
              width: "100%",
              height: "10%"
            }
          }
          navigation={navigation}
          navigationPage="LoginWithEmailScreen"
          buttonType="navigationButton"
        />
        <LoginScreenButton 
          buttonTitle="Continue with Facebook"
          buttonStyle={
            {
              backgroundColor: "#3B5998",
              borderColor: "#3B5998",
              color: "#FFFFFF",
              width: "100%",
              height: "10%"
            }
          }
          navigation={navigation}
          buttonIconTitle="facebook"
          buttonType="buttonFunction"
          buttonFunction={facebookSignIn}
        />
        <LoginScreenButton 
          buttonTitle="Continue with Google"
          buttonStyle={
            {
              backgroundColor: "#FFFFFF",
              borderColor: "#E2E2E2",
              color: "#464D60",
              width: "100%",
              height: "10%"
            }
          }
          navigation={navigation}
          buttonIconTitle="google"
          buttonType="buttonFunction"
          buttonFunction={googleSignIn}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  loginScreenContainerStyle: {
    paddingLeft: 24,
    paddingRight: 24
  },

  loginTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 44
  }
});

export default LoginScreen;