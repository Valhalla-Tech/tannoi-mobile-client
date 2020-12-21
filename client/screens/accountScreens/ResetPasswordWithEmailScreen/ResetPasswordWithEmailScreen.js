import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import branch from 'react-native-branch'
import axios from '../../../constants/ApiServices';
import { bold, normal } from '../../../assets/FontSize';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import SendResetPasswordButton from '../../../components/publicComponents/BigButton';
import FormInput from '../../../components/publicComponents/FormInput';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const ResetPasswordWithEmailScreen = ({ navigation }) => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const emailInput = emailData => {
    setResetPasswordEmail(emailData);
  };

  const resetPassword = async () => {
    try {
      setIsloading(true);

      let getResetPasswordToken = await axios.post(`${BaseUrl}/users/password/get-reset-token`, {
        email: resetPasswordEmail
      });
      
      if (getResetPasswordToken.data.token) {
        let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
          locallyIndex: true,
          title: 'Reset Your Password',
          contentDescription: 'This is a link to reset password',
          contentMetadata: {
            ratingAverage: 4.2,
            customMetadata: {
              screen: 'CreateNewPasswordScreen',
              payload: JSON.stringify({
                token: getResetPasswordToken.data.token
              })
            }
          }
        });
        
        let linkProperties = {
          feature: 'reset password',
          channel: 'tannoi'
        };
        
        let controlParams = {
          $desktop_url: 'https://www.tannoi.app/'
        };
        
        let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);
        
        let resetPasswordRequest =  await axios.post(`${BaseUrl}/users/password/send-reset-token`, {
          link: url,
          email: resetPasswordEmail
        });
        
        if (resetPasswordRequest.data.msg === 'Success') {
          setIsloading(false);
          navigation.navigate('ResetPasswordWithEmailVerificationScreen', {
            url: url
          });
        };
      };

    } catch (error) {
      setIsloading(false);
      setEmailCheck(!emailCheck)
      console.log(error);
    };
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{flex: 1}}>
        <View style={styles.resetPasswordWithEmailScreenContainerStyle}>
          <BackButton navigation={navigation} />
          <Text style={styles.resetPasswordWithEmailTitleStyle}>Reset password</Text>
          <Text style={styles.resetPasswordWithEmailScreenInstructionStyle}>
            Enter the email address you used when you joined, and we’ll send you the link to reset your password.
          </Text>
          {
            emailCheck && (
              <ErrorMessage message="Email address does not exist" />
            )
          }
          <FormInput 
            formInputTitle="Email address"
            dataInput={emailInput}
          />
          <View>
          </View>
          <View style={styles.resetPasswordWithEmailbuttonContainerStyle}>
            <SendResetPasswordButton
              buttonTitle="Send"
              buttonStyle={
                resetPasswordEmail ? {
                  backgroundColor: "#5152D0",
                  borderColor: "#5152D0",
                  color: "#FFFFFF",
                  width: "100%",
                  height: "100%"
                } : {
                  backgroundColor: "#a1a5ab",
                  borderColor: "#a1a5ab",
                  color: "#FFFFFF",
                  width: "100%",
                  height: "100%"
                }
              }
              buttonType="functionButton"
              buttonFunction={resetPassword}
              disableButton={resetPasswordEmail ? false : true}
            />
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
  resetPasswordWithEmailScreenContainerStyle: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24
  },

  resetPasswordWithEmailTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontFamily: bold,
    marginBottom: "5%"
  },

  resetPasswordWithEmailbuttonContainerStyle: {
    height: 55
  },

  resetPasswordWithEmailScreenInstructionStyle: {
    fontSize: 16,
    color: "#73798C",
    marginBottom: "10%",
    fontFamily: normal
  }
});

export default ResetPasswordWithEmailScreen;