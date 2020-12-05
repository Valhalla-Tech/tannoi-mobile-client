import React, { useEffect } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  GoogleSignin
} from '@react-native-community/google-signin';
import branch from 'react-native-branch';
import {
  useDispatch
} from 'react-redux';
import { bold, normal } from '../../../assets/FontSize';
import { GoogleSignIn, FacebookSignIn } from '../../../store/actions/LoginAction'

//Image
import WelcomeScreenBackground from '../../../assets/accountAssets/WelcomeScreen/welcomeScreenBackground.png';

//Icon
import TannoiLogo from '../../../assets/publicAssets/tannoiLogo.svg';

//Component
import WelcomePageButton from '../../../components/publicComponents/BigButton';

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const googleSignIn = () => {
    dispatch(GoogleSignIn());
  };
  
  const facebookSignIn = () => {
    dispatch(FacebookSignIn());
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

  const WelcomePageUpperSection = () => {
    return (
      <View style={styles.welcomePageGreetingContainerStyle}>
        <Image 
          source={WelcomeScreenBackground} 
          style={styles.welcomeScreenBackgroundStyle} 
          resizeMode="stretch"/>
        <TannoiLogo />
        <Text style={styles.headerBoldTextStyle}>Discover Everything</Text>
        <Text style={styles.headerNormalTextStyle}>A place for you to talk with friends {'\n'} and communities</Text>
      </View>
    );
  };

  const WelcomePageLoginButton = () => {
    return (
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
    );
  };

  const WelcomePageButtonSection = () => {
    return (
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
        <WelcomePageLoginButton />
      </View>
    );
  };

  return (
    <View style={styles.welcomePageContainerStyle}>
      <WelcomePageUpperSection />
      <WelcomePageButtonSection />
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
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "20%",
    marginBottom: "20%",
  },

  welcomeScreenBackgroundStyle: {
    position: "absolute", 
    height: "95%", 
    width: "100%", 
    top: "40%"
  },

  headerBoldTextStyle: {
    fontFamily: bold,
    marginTop: "10%",
    fontSize: 22
  },

  headerNormalTextStyle: {
    fontFamily: normal,
    textAlign: "center",
    fontSize: 15
  },

  loginButtonTextStyle: {
    color: "#73798C",
    fontFamily: normal
  },

  welcomeImageStyle: {
    resizeMode:"stretch", 
    width:"80%", 
    height:"80%"
  }
});

export default WelcomeScreen;