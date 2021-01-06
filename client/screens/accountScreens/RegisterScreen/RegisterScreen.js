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
import axios from '../../../constants/ApiServices';
import { bold, normal } from '../../../assets/FontSize';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import FormInput from '../../../components/publicComponents/FormInput';
import SaveAndContinueButton from '../../../components/publicComponents/Button';
import EmailConfirmationModal from '../../../components/accountComponents/RegisterScreenComponents/EmailConfirmationModal';
import BackButton from '../../../components/publicComponents/BackButton';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import TermsOfServiceModal from '../../../components/accountComponents/RegisterScreenComponents/TermsOfServiceModal';

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
  const [reEnterPassword, setReEnterPassword] = useState('');

  useEffect(() => {
    clearStorage();
  }, []);

  const emailInput = emailData => {
    setEmailRegister(emailData);
  };

  const passwordInput = passwordData => {
    setPasswordRegister(passwordData);
  };

  const clearStorage = async () => {
    await AsyncStorage.removeItem('access_token')
  };

  const emailConfirmation = async () => {
    try {
      if (passwordRegister.length >= 5 && passwordRegister.length <= 20 && passwordRegister === reEnterPassword) {
        setIsLoading(!isLoading);
        setPasswordCheck(!passwordCheck);
        let registerRequest = await axios.post(`${BaseUrl}/users/register`, {
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

  const TermsAndService = () => {
    return (
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
    );
  };

  const SignUpButton = () => {
    return (
      <View style={styles.signupButtonContainerStyle}>
        <SaveAndContinueButton
          buttonTitle="Save and Continue"
          buttonStyle={
            emailRegister && passwordRegister.length >= 5 ? {
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
          buttonType="funtionButton"
          buttonFunction={emailConfirmation}
          disableButton={emailRegister && passwordRegister.length >= 5 ? false : true}
        />
        <TermsAndService />
      </View>
    );
  };

  const RegisterForm = () => {
    return (
      <>
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
            <ErrorMessage
              message={reEnterPassword !== passwordRegister ? "Your passwords do not match" : passwordRegister.length >= 5 && passwordRegister.length <= 20 ? setPasswordCheck(false) : "Password must be 5 - 20 charachters" }
            />
          )
        }
        <FormInput
          formInputTitle="Password"
          dataInput={passwordInput}
          hidePassword={true}
          isEyeIcon={true}
        />
        <FormInput
          formInputTitle="Re-enter Password"
          dataInput={setReEnterPassword}
          hidePassword={true}
          isEyeIcon={true}
        />
      </>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{flex: 1}}>
        <View style={styles.registerPageContainerStyle}>
          <BackButton navigation={navigation} />
          <Text style={styles.registerTitleStyle}>Sign up to TannOi</Text>
          {RegisterForm()}
          <SignUpButton />
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
    fontFamily: bold,
    color: "#464D60",
    fontSize: 28,
    marginBottom: "15%"
  },

  signupButtonContainerStyle: {
    alignItems:"center",
    height: 55
  },

  termsOfServiceContainerStyle: {
    flexDirection: 'row', 
    justifyContent: 'center',
    flexWrap: "wrap"
  },

  signupTermsAndPrivacyStyle: {
    fontFamily: normal,
    fontSize: 12,
    textAlign: "center",
    color: "#73798C"
  }
});

export default RegisterPage;