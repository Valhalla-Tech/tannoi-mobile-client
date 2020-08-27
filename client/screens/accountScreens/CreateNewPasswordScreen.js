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

//Icon
import BackButtonIcon from '../../assets/PublicAsset/back-button.svg';

//Components
import FormInput from '../../components/accountComponents/PublicComponent/FormInput';
import LoginButton from '../../components/accountComponents/PublicComponent/BigButton';
import NotActiveButton from '../../components/accountComponents/PublicComponent/NotActiveButton';
import ErrorMessage from '../../components/accountComponents/PublicComponent/ErrorMessage';

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
          let submitNewPasswordRequest = await axios.post(`https://dev.entervalhalla.tech/api/tannoi/v1/users/password/reset?token=${token}`, {
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
              { text: 'OK', onPress: () => navigation.navigate('WelcomeScreen') }
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

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.createNewPasswordScreenContainerStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('WelcomeScreen')}
        >
          <BackButtonIcon 
            style={styles.backButtonStyle}
          />
        </TouchableOpacity>
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
    fontWeight: "bold",
    marginBottom: 16
  },

  backButtonStyle: {
    marginTop: 56,
    marginBottom: 44
  }
});

export default CreateNewPasswordScreen;