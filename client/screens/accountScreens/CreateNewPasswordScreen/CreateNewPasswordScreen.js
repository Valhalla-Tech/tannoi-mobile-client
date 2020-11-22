import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { bold } from '../../../assets/FontSize';
import axios from 'axios';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import FormInput from '../../../components/publicComponents/FormInput';
import LoginButton from '../../../components/publicComponents/BigButton';
import NotActiveButton from '../../../components/publicComponents/NotActiveButton';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import BackButton from '../../../components/publicComponents/BackButton';

const CreateNewPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);

  const { token } = route.params;

  const inputNewPassword = newPasswordData => {
    setNewPassword(newPasswordData);
  };

  const inputConfirmPassword = confirmPasswordData => {
    setConfrimPassword(confirmPasswordData);
  };

  const submitNewPassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        setConfirmPasswordValidation(false);
        setPasswordValidation(false);

        if (newPassword.length >=5 && newPassword.length <= 20) {
          let submitNewPasswordRequest = await axios.post(`${BaseUrl}/users/password/reset?token=${token}`, {
            new_password: newPassword
          });
  
          console.log(submitNewPasswordRequest.data.msg);
  
          Alert.alert(
            'Reset Password Success',
            'Reset password success, welcome to Tannoi',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'OK', onPress: () => navigation.navigate('LoginWithEmailScreen') }
            ],
            { cancelable: false }
          );

        } else {
          setPasswordValidation(true);
        };
      } else {

        if (newPassword.length >= 5 && newPassword.length <= 20) {
          setPasswordValidation(false);
        } else {
          setPasswordValidation(true);
        }

        setConfirmPasswordValidation(true);
      };
    }  catch (error) {
      console.log(error);
    }
  };

  const CreateNewPasswordButton = () => {
    return (
      <View style={{height: 50}}>
        {
          newPassword.length >= 5 && confirmPassword.length >= 5 ? (
            <LoginButton
              buttonTitle="Change Password & Login"
              buttonStyle={
                {
                  backgroundColor: "#5152D0",
                  borderColor: "#5152D0",
                  color: "#FFFFFF",
                  width: "100%",
                  height: "100%"
                }
              }
              buttonType="functionButton"
              buttonFunction={submitNewPassword}
            />
          ) : (
            <NotActiveButton
              buttonTitle="Change Password & Login"
              buttonHeight="100%"
            />
          )
        }
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.createNewPasswordScreenContainerStyle}>
        <BackButton
          navigation={navigation}
          screen="WelcomeScreen"
        />
        <Text style={styles.createNewPasswordTitleStyle}>
          Create new password
        </Text>
        {
          passwordValidation && (
            <ErrorMessage message="Password must be 5 - 20 characters" />
          )
        }
        {
          confirmPasswordValidation && (
            <ErrorMessage message="Passwords do not match" />
          )
        }
        <View>
          <FormInput 
            formInputTitle="New password"
            dataInput={inputNewPassword}
          />
          <FormInput 
            formInputTitle="Confirm new password"
            dataInput={inputConfirmPassword}
          />
        </View>
        <CreateNewPasswordButton />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createNewPasswordScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: 24
  },

  createNewPasswordTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontFamily: bold,
    marginBottom: "6%"
  }
});

export default CreateNewPasswordScreen;