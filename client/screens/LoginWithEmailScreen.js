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

const LoginWithEmailScreen = ({ navigation }) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const emailInput = emailData => {
    setEmailLogin(emailData);
  };

  const passwordInput = passwordData => {
    setPasswordLogin(passwordData);
  };

  const userLogin = async () => {
    try {
      let loginRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/login', {
        email: emailLogin,
        password: passwordLogin
      })

      console.log(loginRequest.data);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.loginWithEmailScreenContainerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.loginTitleStyle}>Login to TannOi</Text>
        <FormInput 
          formInputTitle="Email address"
          dataInput={emailInput}
        />
        <FormInput 
          formInputTitle="Password"
          dataInput={passwordInput}
        />
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
                    height: "6.5%"
                  }
                }
                buttonType="funtionButton"
                buttonFunction={userLogin}
            />
          ) : (
            <NotActiveButton 
              buttonTitle="Log in"
              buttonHeight="6.5%"
            />
          )
        }
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