import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../store/actions/LoginAction';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import axios from '../../../constants/ApiServices';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import BaseUrl from '../../../constants/BaseUrl';
import { trackWithMixPanel } from '../../../helper/Mixpanel';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import BackButton from '../../../components/publicComponents/BackButton';
import LoginButton from '../../../components/publicComponents/Button';
import FormInput from '../../../components/publicComponents/FormInput';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';

const LoginWithEmailScreen = ({ navigation }) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginValidation, setLoginValidation] = useState(false);

  const dispatch = useDispatch();

  const emailInput = (emailData) => {
    setEmailLogin(emailData);
  };

  const passwordInput = (passwordData) => {
    setPasswordLogin(passwordData);
  };

  const login = async () => {
    try {
      setIsLoading(!isLoading);
      let loginRequest = await axios.post(`${BaseUrl}/users/login`, {
        email: emailLogin,
        password: passwordLogin,
        device: Platform.OS,
      });

      if (loginRequest.data) {
        setIsLoading(false);
        await AsyncStorage.setItem(
          'access_token',
          loginRequest.data.access_token,
        );
        await AsyncStorage.setItem(
          'refresh_token',
          loginRequest.data.refresh_token,
        );
        trackWithMixPanel('User: Logged In', {
          distinct_id: loginRequest.data.user_data.id,
        });
        dispatch(clearHome());
        dispatch(getHome());
        dispatch(userLogin());
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.msg) {
        setIsLoading(false);
        setLoginValidation(true);
      }
    }
  };

  const LoginWithEmailButton = () => {
    return (
      <View style={styles.loginWithEmailButtonContainerStyle}>
        <LoginButton
          buttonTitle="Log in"
          buttonStyle={
            emailLogin && passwordLogin
              ? {
                  backgroundColor: '#5152D0',
                  borderColor: '#5152D0',
                  color: '#FFFFFF',
                  width: '100%',
                  height: '100%',
                }
              : {
                  backgroundColor: '#a1a5ab',
                  borderColor: '#a1a5ab',
                  color: '#FFFFFF',
                  width: '100%',
                  height: '100%',
                }
          }
          buttonType="funtionButton"
          buttonFunction={login}
          disableButton={emailLogin && passwordLogin ? false : true}
        />
      </View>
    );
  };

  const ForgotPasswordButton = () => {
    return (
      <View style={styles.forgotPasswordButtonContainer}>
        <Text style={styles.forgotPasswordButtonTextStyle}>
          Forgot your password?
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate('ResetPasswordWithEmailScreen');
          }}>
          <Text
            style={{
              ...styles.forgotPasswordButtonTextStyle,
              fontFamily: bold,
            }}>
            Reset password
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const LoginForm = () => {
    return (
      <>
        {loginValidation && <ErrorMessage message="Wrong username/password" />}
        <FormInput formInputTitle="Email address" dataInput={emailInput} />
        <FormInput
          formInputTitle="Password"
          dataInput={passwordInput}
          hidePassword={true}
          isEyeIcon={true}
        />
      </>
    );
  };

  return (
    <ScreenContainer isHeader={false}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.loginWithEmailScreenContainerStyle}>
          <BackButton
            styleOption={{
              marginVertical: '10%',
            }}
            navigation={navigation}
          />
          <Text style={styles.loginTitleStyle}>Login to tannOi</Text>
          {LoginForm()}
          <LoginWithEmailButton />
          <ForgotPasswordButton />
        </View>
      </TouchableWithoutFeedback>
      {isLoading && <LoadingSpinner />}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loginWithEmailScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: '5%',
  },

  loginTitleStyle: {
    color: '#464D60',
    fontSize: CalculateHeight(3.5),
    marginBottom: '10%',
    fontFamily: bold,
  },

  loginWithEmailButtonContainerStyle: {
    height: CalculateHeight(6),
  },

  forgotPasswordButtonContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  forgotPasswordButtonTextStyle: {
    color: '#73798C',
    fontFamily: normal,
  },
});

export default LoginWithEmailScreen;
