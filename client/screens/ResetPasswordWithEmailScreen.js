import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import branch, { BranchEvent } from 'react-native-branch'
import axios from 'axios';

//Components
import BackButton from '../components/PublicComponent/BackButton';
import SendResetPasswordButton from '../components/PublicComponent/BigButton';
import FormInput from '../components/PublicComponent/FormInput';
import NotActiveButton from '../components/PublicComponent/NotActiveButton';
import ErrorMessage from '../components/PublicComponent/ErrorMessage';
import LoadingSpinner from '../components/PublicComponent/LoadingSpinner';

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

      let getResetPasswordToken = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/password/get-reset-token', {
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
              token: getResetPasswordToken.data.token
            }
          }
        });
        
        let linkProperties = {
          feature: 'reset password',
          channel: 'tannoi'
        };
        
        let controlParams = {
          $desktop_url: 'https://www.entervalhalla.tech/'
        };
        
        let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);
        
        let resetPasswordRequest =  await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/password/send-reset-token', {
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
      console.log(error);
      setEmailCheck(!emailCheck)
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
                        height: "100%"
                      }
                    }
                    buttonType="functionButton"
                    buttonFunction={resetPassword}
                />
              ) : (
                <NotActiveButton 
                  buttonTitle="Send"
                  buttonHeight="100%"
                />
              )
            }
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
    fontWeight: "bold",
    marginBottom: 16
  },

  resetPasswordWithEmailbuttonContainerStyle: {
    height: 50
  },

  resetPasswordWithEmailScreenInstructionStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#73798C",
    marginBottom: 40
  }
});

export default ResetPasswordWithEmailScreen;