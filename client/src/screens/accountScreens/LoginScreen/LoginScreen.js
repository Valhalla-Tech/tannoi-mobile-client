import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  useDispatch
} from 'react-redux';
import { bold } from '../../../assets/FontSize';
import { GoogleSignIn, FacebookSignIn } from '../../../store/actions/LoginAction';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import Button from '../../../components/publicComponents/Button';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const googleSignIn = () => {
    dispatch(GoogleSignIn());
  };

  const facebookSignIn = () => {
    dispatch(FacebookSignIn());
  };

  const LoginScreenButton = (title, customStyle, page, type, buttonFuntion, iconTitle) => {
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

  const LoginButton = () => {
    return (
      <>
        {
          LoginScreenButton(
            'Log in with email',
            {
              backgroundColor: "#5152D0",
              borderColor: "#5152D0",
              color: "#FFFFFF",
              width: "100%",
              height: "10%"
            },
            'LoginWithEmailScreen',
            'navigationButton',
            null,
            null
          )
        }
        {
          LoginScreenButton(
            'Continue with Facebook',
            {
              backgroundColor: "#3B5998",
              borderColor: "#3B5998",
              color: "#FFFFFF",
              width: "100%",
              height: "10%"
            },
            null,
            'buttonFunction',
            facebookSignIn,
            'facebook'
          )
        }
        {
          LoginScreenButton(
            'Continue with Google',
            {
              backgroundColor: "#FFFFFF",
              borderColor: "#E2E2E2",
              color: "#464D60",
              width: "100%",
              height: "10%"
            },
            null,
            'buttonFunction',
            googleSignIn,
            'google'
          )
        }
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.loginScreenContainerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.loginTitleStyle}>Login to tannOi</Text>
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