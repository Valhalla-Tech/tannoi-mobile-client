import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { bold } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import {
  GoogleSignIn,
  FacebookSignIn,
} from '../../../store/actions/LoginAction';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
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

  const LoginScreenButton = (
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

  const LoginButton = () => {
    return (
      <>
        {LoginScreenButton(
          'Log in with email',
          {
            backgroundColor: '#5152D0',
            borderColor: '#5152D0',
            color: '#FFFFFF',
            width: '100%',
            height: '10%',
          },
          'LoginWithEmailScreen',
          'navigationButton',
          null,
          null,
        )}
        {LoginScreenButton(
          'Continue with Facebook',
          {
            backgroundColor: '#3B5998',
            borderColor: '#3B5998',
            color: '#FFFFFF',
            width: '100%',
            height: '10%',
          },
          null,
          'buttonFunction',
          facebookSignIn,
          'facebook',
        )}
        {LoginScreenButton(
          'Continue with Google',
          {
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E2E2',
            color: '#464D60',
            width: '100%',
            height: '10%',
          },
          null,
          'buttonFunction',
          googleSignIn,
          'google',
        )}
      </>
    );
  };

  return (
    // <View style={{ flex: 1 }}>
    <ScreenContainer isHeader={false}>
      <View style={styles.loginScreenContainerStyle}>
        <BackButton
          styleOption={{
            marginVertical: '10%',
          }}
          navigation={navigation}
        />
        <Text style={styles.loginTitleStyle}>Login to tannOi</Text>
        <LoginButton />
      </View>
    </ScreenContainer>
    // </View>
  );
};

const styles = StyleSheet.create({
  loginScreenContainerStyle: {
    paddingHorizontal: '5.5%',
  },

  loginTitleStyle: {
    color: '#464D60',
    fontSize: CalculateHeight(3.5),
    fontFamily: bold,
    marginBottom: '10%',
  },
});

export default LoginScreen;
