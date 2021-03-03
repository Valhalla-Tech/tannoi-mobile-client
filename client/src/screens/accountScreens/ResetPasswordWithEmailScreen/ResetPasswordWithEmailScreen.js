import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from '../../../constants/ApiServices';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import BaseUrl from '../../../constants/BaseUrl';
import { GenerateDeepLink } from '../../../helper/GenerateDeepLink';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import BackButton from '../../../components/publicComponents/BackButton';
import SendResetPasswordButton from '../../../components/publicComponents/Button';
import FormInput from '../../../components/publicComponents/FormInput';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const ResetPasswordWithEmailScreen = ({ navigation }) => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const emailInput = (emailData) => {
    setResetPasswordEmail(emailData);
  };

  const resetPassword = async () => {
    try {
      setIsloading(true);

      let getResetPasswordToken = await axios.post(
        `${BaseUrl}/users/password/get-reset-token`,
        {
          email: resetPasswordEmail,
        },
      );

      if (getResetPasswordToken.data.token) {
        GenerateDeepLink(
          'Reset Your Password',
          'This is a link to reset password',
          'CreateNewPasswordScreen',
          {
            token: getResetPasswordToken.data.token,
          },
          'reset password',
          async (url) => {
            try {
              let resetPasswordRequest = await axios.post(
                `${BaseUrl}/users/password/send-reset-token`,
                {
                  link: url,
                  email: resetPasswordEmail,
                },
              );

              if (resetPasswordRequest.data.msg === 'Success') {
                setIsloading(false);
                navigation.navigate(
                  'ResetPasswordWithEmailVerificationScreen',
                  {
                    url: url,
                  },
                );
              }
            } catch (error) {
              console.log(error);
              setIsloading(false);
              setEmailCheck(!emailCheck);
            }
          },
        );
      }
    } catch (error) {
      setIsloading(false);
      setEmailCheck(!emailCheck);
      console.log(error);
    }
  };

  return (
    <ScreenContainer isHeader={false}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.resetPasswordWithEmailScreenContainerStyle}>
          <BackButton
            styleOption={{
              marginVertical: '10%',
            }}
            navigation={navigation}
          />
          <Text style={styles.resetPasswordWithEmailTitleStyle}>
            Reset password
          </Text>
          <Text style={styles.resetPasswordWithEmailScreenInstructionStyle}>
            Enter the email address you used when you joined, and we’ll send you
            the link to reset your password.
          </Text>
          {emailCheck && (
            <ErrorMessage message="Email address does not exist" />
          )}
          <FormInput formInputTitle="Email address" dataInput={emailInput} />
          <View></View>
          <View style={styles.resetPasswordWithEmailbuttonContainerStyle}>
            <SendResetPasswordButton
              buttonTitle="Send"
              buttonStyle={
                resetPasswordEmail
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
              buttonType="functionButton"
              buttonFunction={resetPassword}
              disableButton={resetPasswordEmail ? false : true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isLoading && <LoadingSpinner />}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  resetPasswordWithEmailScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: '5.5%',
  },

  resetPasswordWithEmailTitleStyle: {
    color: '#464D60',
    fontSize: CalculateHeight(3.5),
    fontFamily: bold,
    marginBottom: '5%',
  },

  resetPasswordWithEmailbuttonContainerStyle: {
    height: CalculateHeight(6),
  },

  resetPasswordWithEmailScreenInstructionStyle: {
    fontSize: CalculateHeight(2),
    color: '#73798C',
    marginBottom: '10%',
    fontFamily: normal,
  },
});

export default ResetPasswordWithEmailScreen;
