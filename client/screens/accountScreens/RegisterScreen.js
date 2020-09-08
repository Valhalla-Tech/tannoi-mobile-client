import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Components
import FormInput from '../../components/PublicComponent/FormInput';
import SaveAndContinueButton from '../../components/PublicComponent/BigButton';
import EmailConfirmationModal from '../../components/accountComponents/RegisterScreenComponent/EmailConfirmationModal';
import BackButton from '../../components/PublicComponent/BackButton';
import NotActiveButton from '../../components/PublicComponent/NotActiveButton';
import ErrorMessage from '../../components/PublicComponent/ErrorMessage';
import LoadingSpinner from '../../components/PublicComponent/LoadingSpinner';
import TermsOfServiceModal from '../../components/accountComponents/RegisterScreenComponent/TermsOfServiceModal';

const RegisterPage = ({ navigation }) => {
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [emailCheck, setEmailCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsOfServiceModalIsOpen, setTermsOfServiceModalIsOpen] = useState(false);

  const emailInput = emailData => {
    setEmailRegister(emailData);
  };

  const passwordInput = passwordData => {
    setPasswordRegister(passwordData);
  };

  const clearStorage = async () => {
    await AsyncStorage.removeItem('access_token')
  };

  useEffect(() => {
    clearStorage
  }, []);

  const emailConfirmation = async () => {
    try {
      if (passwordRegister.length >= 5 && passwordRegister.length <= 20) {
        setIsLoading(!isLoading);
        let registerRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/register', {
          email: emailRegister,
          password: passwordRegister
        });

        if (registerRequest.data) {
          setIsLoading(false);
          setOpenConfirmationModal(!openConfirmationModal);
          setUserId(registerRequest.data.id);
        }
      } else {
        setPasswordCheck(!passwordCheck);
      }
    } catch (error) {
      setIsLoading(false);
       if (error.response.data.msg[0] === 'Must enter a valid email') {
        setEmailCheck(!emailCheck);
       } else if (error.response.data.msg === 'Email already registered') {
        setEmailAlreadyRegistered(!emailAlreadyRegistered);
       }
    }
  };

  const closeConfirmationModal = () => {
    setOpenConfirmationModal(!openConfirmationModal);
    setIsLoading(false);
  };

  const emailConfirmed = () => {
    setOpenConfirmationModal(false);
  };

  const closeTermsOfServiceModal = () => {
    setTermsOfServiceModalIsOpen(false);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{flex: 1}}>
        <View style={styles.registerPageContainerStyle}>
          <BackButton navigation={navigation} />
          <Text style={styles.registerTitleStyle}>Sign up to TannOi</Text>
          {
            emailCheck ? (
              <ErrorMessage message="Must enter a valid email" />
            ) : emailAlreadyRegistered && (
              <ErrorMessage message="Email already registered" />
            )
          }
          <FormInput 
            formInputTitle="Email address"
            dataInput={emailInput}
          />
          {
            passwordCheck && (
              <ErrorMessage message="Password must be 5 - 20 charachters" />
            )
          }
          <FormInput
            formInputTitle="Password"
            dataInput={passwordInput}
          />
          <View style={styles.signupButtonContainerStyle}>
            {
              emailRegister && passwordRegister.length >= 5 ? (
                <SaveAndContinueButton
                  buttonTitle="Save and Continue"
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
                  buttonFunction={emailConfirmation}
                />
              ) : (
                <NotActiveButton 
                  buttonTitle="Continue" 
                  buttonHeight="100%"
                />
              )
            }
          <View style={styles.termsOfServiceContainerStyle}>  
            <Text style={styles.signupTermsAndPrivacyStyle}>By signing up, you agree to our </Text>
            <TouchableOpacity
              onPress={() => setTermsOfServiceModalIsOpen(true)}
            >
              <Text style={{...styles.signupTermsAndPrivacyStyle, color: "#2f3dfa"}}>
                Terms of Service, Privacy Policies
              </Text>
            </TouchableOpacity>
            <Text style={styles.signupTermsAndPrivacyStyle}>
              and to receive notice on events and services.
            </Text>
          </View>
          </View>
          <EmailConfirmationModal 
            openEmailConfirmationModal={openConfirmationModal}
            closeEmailConfirmationModal={closeConfirmationModal}
            emailAddress={emailRegister}
            navigation={navigation}
            emailConfirmed={emailConfirmed}
            userId={userId}
          />
          <TermsOfServiceModal
            openTermsOfServiceModal={termsOfServiceModalIsOpen}
            closeTermsOfServiceModal={closeTermsOfServiceModal}
          />
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
  registerPageContainerStyle: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24
  },

  registerTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 44
  },

  formInputStyle: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16
  },

  signupButtonContainerStyle: {
    alignItems:"center",
    height: 50
  },

  termsOfServiceContainerStyle: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexWrap: "wrap"
  },

  signupTermsAndPrivacyStyle: {
    fontSize: 12,
    textAlign: "center"
  }
});

export default RegisterPage;