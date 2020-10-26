import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  useDispatch
} from 'react-redux';
import { bold } from '../../assets/FontSize';
import { GoogleSignIn, FacebookSignIn } from '../../store/actions/LoginAction';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import LoginScreenButton from '../../components/publicComponents/BigButton';

const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const googleSignIn = () => {
    dispatch(GoogleSignIn());
  };

  const facebookSignIn = () => {
    dispatch(FacebookSignIn());
  };

  const LoginButton = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.loginScreenContainerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.loginTitleStyle}>Login to TannOi</Text>
        <LoginButton />
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
    fontFamily: bold,
    marginBottom: "10%"
  }
});

export default LoginScreen;