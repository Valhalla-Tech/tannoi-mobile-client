import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import axios from 'axios';

//Components
import BackButton from '../components/PublicComponent/BackButton';
import SendResetPasswordButton from '../components/PublicComponent/BigButton';
import FormInput from '../components/PublicComponent/FormInput';
import NotActiveButton from '../components/PublicComponent/NotActiveButton';

const ResetPasswordWithEmailScreen = ({ navigation }) => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');

  const emailInput = emailData => {
    setResetPasswordEmail(emailData);
  };

  const resetPassword = async () => {
    try {
      let resetPasswordRequest =  await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/password/reset-send-token', {
        email: resetPasswordEmail
      });
      
      if (resetPasswordRequest.data.msg === 'Success') {
        navigation.navigate('ResetPasswordWithEmailVerificationScreen');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.resetPasswordWithEmailScreenContainerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.resetPasswordWithEmailTitleStyle}>Reset password</Text>
        <Text style={styles.resetPasswordWithEmailScreenInstructionStyle}>
          Enter the email address you used when you joined, and we’ll send you the link to reset your password.
        </Text>
        <FormInput 
          formInputTitle="Email address"
          dataInput={emailInput}
        />
        {
          resetPasswordEmail ? (
            <SendResetPasswordButton
                buttonTitle="Send"
                buttonStyle={
                  {
                    backgroundColor: "#5152D0",
                    borderColor: "#5152D0",
                    color: "#FFFFFF",
                    width: "100%",
                    height: "7%"
                  }
                }
                buttonType="functionButton"
                buttonFunction={resetPassword}
            />
          ) : (
            <NotActiveButton 
              buttonTitle="Send"
              buttonHeight="7%"
            />
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  resetPasswordWithEmailScreenContainerStyle: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24
  },

  resetPasswordWithEmailTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16
  },

  resetPasswordWithEmailScreenInstructionStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#73798C",
    marginBottom: 40
  }
});

export default ResetPasswordWithEmailScreen;