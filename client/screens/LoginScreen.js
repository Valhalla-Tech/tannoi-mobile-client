import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import axios from 'axios';
// import * as Google from 'expo-google-app-auth';
// import * as Facebook from 'expo-facebook';

//Component
import BackButton from '../components/PublicComponent/BackButton';
import LoginScreenButton from '../components/PublicComponent/BigButton';

const LoginScreen = ({ navigation }) => {

  const loginWithGoogle = async googleAccessToken => {
    try {
      let googleSigninRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/login/google', {
        token: googleAccessToken
      });

      console.log(googleSigninRequest.data);
    } catch (error) {
      console.log(error)
    };
  };

  // const googleSignIn = async () => {
  //   try {
  //     const result = await Google.logInAsync({
  //       iosClientId: '1036887341767-8st29lm4inmbfncv8id51lvclb7cs51c.apps.googleusercontent.com',
  //       scopes: ['profile', 'email'],
  //     });

  //     if (result.type === 'success') {
  //       loginWithGoogle(result.idToken)
  //     } else {
  //       return { cancelled: true };
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  // async function facebookSignIn() {
  //   try {
  //     await Facebook.initializeAsync('277585429990268');
  //     const {
  //       type,
  //       token,
  //       expires,
  //       permissions,
  //       declinedPermissions,
  //     } = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ['public_profile'],
  //     });

  //     if (type === 'success') {
  //       console.log(token)
        
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //   }
  // }

  return (
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
        // buttonFunction={facebookSignIn}
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
        // buttonFunction={googleSignIn}
      />
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