import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { bold } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import {
  GoogleSignIn,
  FacebookSignIn,
  appleSignIn,
} from '../../../store/actions/LoginAction';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import BackButton from '../../../components/publicComponents/BackButton';
import Button from '../../../components/publicComponents/Button';
import { SignInWithAppleButton } from '../../../components/publicComponents/SignInWithAppleButton';

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

  const appleSignInBtn = (result) => {
    console.log('Resssult',result);
    dispatch(appleSignIn(result))
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
          () => {
            dispatch(
              FacebookSignIn((value) => {
                if (value.openRegisterModal) {
                  navigation.navigate('WelcomeScreen', {
                    fromLoginScreen: true,
                  });
                }
              }),
            );
          },
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
          async () => {
            let googleSignInRequest = await dispatch(GoogleSignIn());

            if (googleSignInRequest.openRegisterModal) {
              navigation.push('WelcomeScreen', { fromLoginScreen: true });
            }
          },
          'google',
        )}
        {Platform.OS === 'ios' ? SignInWithAppleButton({
          buttonStyle: {
            width: '100%',
            height: '10%',
            backgroundColor: 'black',
            borderRadius: 10,
            marginBottom: '3%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderWidth: 1,
          }, 
          callBack: appleSignInBtn,
          buttonText: "Continue With Apple",
        }) : null}
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
