import React, { useEffect } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import branch, { BranchEvent } from 'react-native-branch';
import {
  useDispatch
} from 'react-redux';
import { userLogin } from '../../store/actions/LoginAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { bold, normal } from '../../assets/FontSize';

//Image
import TannoiWelcomeScreenImage from '../../assets/publicAssets/tannOiWelcomeScreenImage.png';

//Component
import WelcomePageButton from '../../components/publicComponents/BigButton';

const WelcomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const googleSignInSubmit = async googleAccessToken => {
    try {
      let googleSigninRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/login/google', {
        token: googleAccessToken
      });

      if (googleSigninRequest.data.access_token) {
        await AsyncStorage.setItem('access_token', googleSigninRequest.data.access_token);
        dispatch(userLogin());
      };
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

      if (facebookSigninRequest.data.access_token) {
        await AsyncStorage.setItem('access_token', facebookSigninRequest.data.access_token);
        dispatch(userLogin());
      };
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
              facebookSignInSubmit(data.accessToken.toString());
            }
          )
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };
  
  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1036887341767-4foinu1uvd66srmivikbplncka4ind72.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    branch.subscribe(({error, params, uri}) => {
      if (error) {
        console.error('Error from Branch: ' + error)
      }
    
      // params will never be null if error is null
    
      if (params['+non_branch_link']) {
        // Route non-Branch URL if appropriate.
      }
    
      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
      }

      if (params.screen !== undefined) {
        navigation.navigate(params.screen, {
          token: params.token
        })
      }
    })
  }, [])

  return (
    <View style={styles.welcomePageContainerStyle}>
      <View style={styles.welcomePageGreetingContainerStyle}>
      <Image source={TannoiWelcomeScreenImage} style={styles.welcomeImageStyle} />
        {/* <Text 
          style={{
            ...styles.welcomePageGreetingTextStyle, 
            fontSize:28,
            marginBottom: "1%",
            fontFamily: bold
          }}>
            Discover Everything
          </Text> */}
        {/* <Text 
          style={{
            ...styles.welcomePageGreetingTextStyle, 
            fontSize:16, 
            marginBottom:"25%",
            fontFamily: normal
          }}>
            Your place to talk with friends and {"\n"} communities
          </Text> */}
      </View>
      <View style={styles.welcomePageLoginButtonStyle}>
        <WelcomePageButton 
          buttonTitle="Sign up with email"
          buttonStyle={
            {
              backgroundColor: "#5152D0",
              borderColor: "#5152D0",
              color: "#FFFFFF",
              width: "75%",
              height: "18%"
            }
          }
          navigation={navigation}
          navigationPage="RegisterScreen"
          buttonType="navigationButton"
        />
        <WelcomePageButton 
          buttonTitle="Continue with Facebook"
          buttonStyle={
            {
              backgroundColor: "#3B5998",
              borderColor: "#3B5998",
              color: "#FFFFFF",
              width: "75%",
              height: "18%"
            }
          }
          buttonType="navigationButton"
          buttonIconTitle="facebook"
          buttonType="buttonFunction"
          buttonFunction={facebookSignIn}
        />
        <WelcomePageButton 
          buttonTitle="Continue with Google"
          buttonStyle={
            {
              backgroundColor: "#FFFFFF",
              borderColor: "#E2E2E2",
              color: "#464D60",
              width: "75%",
              height: "18%"
            }
          }
          navigation={navigation}
          buttonIconTitle="google"
          buttonType="buttonFunction"
          buttonFunction={googleSignIn}
        />
        <View style={{flexDirection:"row"}}>
          <Text style={styles.loginButtonTextStyle}>
            Already a member?
          </Text>
          <TouchableOpacity 
            style={{marginLeft: 5}}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
          >
            <Text style={{...styles.loginButtonTextStyle, fontFamily: bold}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  welcomePageContainerStyle: {
    flex: 1
  },
  
  welcomePageLoginButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  welcomePageGreetingContainerStyle: {
    flex: 1.9,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  welcomePageGreetingTextStyle: {
    color: "#FFFFFF",
    textAlign: "center"
  },

  loginButtonTextStyle: {
    color: "#73798C",
    fontFamily: normal
  },

  welcomeImageStyle: {
    resizeMode:"stretch", 
    width:"95%", 
    height:"100%"
  }
});

export default WelcomeScreen;