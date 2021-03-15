import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import {
  GoogleSignIn,
  FacebookSignIn,
  getTermsAndPolicies,
} from '../../../store/actions/LoginAction';

//Image
import WelcomeScreenBackground from '../../../assets/accountAssets/WelcomeScreen/welcomeScreenBackground.png';

//Icon
import TannoiLogo from '../../../assets/publicAssets/tannoiLogo.svg';

//Component
import Button from '../../../components/publicComponents/Button';

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const googleSignIn = () => {
    dispatch(GoogleSignIn());
  };

  const facebookSignIn = () => {
    dispatch(FacebookSignIn());
  };

  useEffect(() => {
    dispatch(getTermsAndPolicies());
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1036887341767-4foinu1uvd66srmivikbplncka4ind72.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  const WelcomeScreenUpperSection = () => {
    return (
      <View style={styles.welcomeScreenGreetingContainerStyle}>
        <Image
          source={WelcomeScreenBackground}
          style={styles.welcomeScreenBackgroundStyle}
          resizeMode="stretch"
        />
        <TannoiLogo />
        <Text style={styles.headerBoldTextStyle}>Discover Everything</Text>
        <Text style={styles.headerNormalTextStyle}>
          A place for you to talk with friends {'\n'} and communities
        </Text>
      </View>
    );
  };

  const WelcomeScreenLoginButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.loginButtonTextStyle}>Already a member?</Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={{ ...styles.loginButtonTextStyle, fontFamily: bold }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const WelcomeScreenButton = (
    title,
    customStyle,
    page,
    type,
    buttonFuntion,
    iconTitle,
  ) => {
    return (
      <Button
        buttonTitle={title}
        buttonStyle={customStyle}
        navigation={navigation}
        navigationPage={page}
        buttonType={type}
        buttonFunction={buttonFuntion}
        buttonIconTitle={iconTitle}
      />
    );
  };

  const WelcomeScreenButtonSection = () => {
    return (
      <View style={styles.welcomeScreenLoginButtonStyle}>
        {WelcomeScreenButton(
          'Sign up with email',
          {
            backgroundColor: '#5152D0',
            borderColor: '#5152D0',
            color: '#FFFFFF',
            width: '75%',
            height: '18%',
          },
          'RegisterScreen',
          'navigationButton',
        )}
        {WelcomeScreenButton(
          'Continue with Facebook',
          {
            backgroundColor: '#3B5998',
            borderColor: '#3B5998',
            color: '#FFFFFF',
            width: '75%',
            height: '18%',
          },
          null,
          'buttonFunction',
          facebookSignIn,
          'facebook',
        )}
        {WelcomeScreenButton(
          'Continue with Google',
          {
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E2E2',
            color: '#464D60',
            width: '75%',
            height: '18%',
          },
          null,
          'buttonFunction',
          googleSignIn,
          'google',
        )}
        <WelcomeScreenLoginButton />
      </View>
    );
  };

  return (
    <View style={styles.welcomeScreenContainerStyle}>
      <WelcomeScreenUpperSection />
      <WelcomeScreenButtonSection />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeScreenContainerStyle: {
    flex: 1,
  },

  welcomeScreenLoginButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeScreenGreetingContainerStyle: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
    marginBottom: '20%',
  },

  welcomeScreenBackgroundStyle: {
    position: 'absolute',
    height: '95%',
    width: '100%',
    top: '40%',
  },

  headerBoldTextStyle: {
    fontFamily: bold,
    marginTop: '10%',
    fontSize: CalculateHeight(3),
  },

  headerNormalTextStyle: {
    fontFamily: normal,
    textAlign: 'center',
    fontSize: CalculateHeight(2),
  },

  loginButtonTextStyle: {
    color: '#73798C',
    fontFamily: normal,
  },

  welcomeImageStyle: {
    resizeMode: 'stretch',
    width: '80%',
    height: '80%',
  },
});

export default WelcomeScreen;
