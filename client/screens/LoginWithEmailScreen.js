import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import axios from 'axios';

//Components
import BackButton from '../components/PublicComponent/BackButton';
import LoginButton from '../components/PublicComponent/BigButton';
import FormInput from '../components/PublicComponent/FormInput';
import NotActiveButton from '../components/PublicComponent/NotActiveButton';
import LoadingSpinner from '../components/PublicComponent/LoadingSpinner';
import ErrorMessage from '../components/PublicComponent/ErrorMessage';

const LoginWithEmailScreen = ({ navigation }) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginValidation, setLoginValidation] = useState(false)

  const emailInput = emailData => {
    setEmailLogin(emailData);
  };

  const passwordInput = passwordData => {
    setPasswordLogin(passwordData);
  };

  const userLogin = async () => {
    try {
      setIsLoading(!isLoading);
      let loginRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/login', {
        email: emailLogin,
        password: passwordLogin
      })

      if (loginRequest.data) {
        setIsLoading(false);

        Alert.alert(
          'You are logged in',
          loginRequest.data.user_data.name,
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
      }
    } catch (error) {
      if (error.response.data.msg) {
        setIsLoading(false);
        setLoginValidation(true);
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{flex: 1}}>
        <View style={styles.loginWithEmailScreenContainerStyle}>
          <BackButton navigation={navigation} />
          <Text style={styles.loginTitleStyle}>Login to TannOi</Text>
          {
            loginValidation && (
              <ErrorMessage message="Wrong username/password" />
            )
          }
          <FormInput 
            formInputTitle="Email address"
            dataInput={emailInput}
          />
          <FormInput 
            formInputTitle="Password"
            dataInput={passwordInput}
          />
          <View style={styles.loginWithEmailButtonContainerStyle}>
            {
              emailLogin && passwordLogin ? (
                <LoginButton
                    buttonTitle="Log in"
                    buttonStyle={
                      {
                        backgroundColor: "#5152D0",
                        borderColor: "#5152D0",
                        color: "#FFFFFF",
                        width: "100%",
                        height: "100%"
                      }
                    }
                    buttonType="funtionButton"
                    buttonFunction={userLogin}
                />
              ) : (
                <NotActiveButton 
                  buttonTitle="Log in"
                  buttonHeight="100%"
                />
              )
            }
          </View>
          <View style={styles.forgotPasswordButtonContainer}>
            <Text style={styles.loginButtonTextStyle}>
              Forgot password?
            </Text>
            <TouchableOpacity 
              style={{marginLeft: 5}}
              onPress={() => {
                navigation.navigate('ResetPasswordWithEmailScreen');
              }}
            >
              <Text style={{...styles.forgotPasswordButtonTextStyle, fontWeight:"bold"}}>Reset password</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          isLoading && (
            <LoadingSpinner />
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginWithEmailScreenContainerStyle: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24
  },

  loginTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 44
  },

  loginWithEmailButtonContainerStyle: {
    height: 50
  },

  forgotPasswordButtonContainer: {
    marginTop: 16,
    flexDirection:"row",
    justifyContent: "center"
  },

  forgotPasswordButtonTextStyle: {
    color: "#73798C"
  }
});

export default LoginWithEmailScreen;