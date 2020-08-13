import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import { Header } from '@react-navigation/stack'

//Components
import FormInput from '../components/PublicComponent/FormInput';
import SaveAndContinueButton from '../components/PublicComponent/BigButton';
import EmailConfirmationModal from '../components/RegisterScreenComponent/EmailConfirmationModal';
import BackButton from '../components/PublicComponent/BackButton';
import NotActiveButton from '../components/PublicComponent/NotActiveButton';

const RegisterPage = ({ navigation }) => {
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [fullName, setFullName] = useState('');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const emailInput = emailData => {
    setEmailRegister(emailData);
  };

  const passwordInput = passwordData => {
    setPasswordRegister(passwordData);
  };

  const fullNameInput = fullNameData => {
    setFullName(fullNameData);
  };

  const clearStorage = async () => {
    await AsyncStorage.removeItem('access_token')
  };

  useEffect(() => {
    clearStorage
  }, [])

  const emailConfirmation = async () => {
    // try {
    //   let registerRequest = await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/register', {
    //     name: fullName,
    //     email: emailRegister,
    //     password: passwordRegister
    //   });
      
    //   if (registerRequest.data) {
        setOpenConfirmationModal(!openConfirmationModal);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const closeConfirmationModal = () => {
    setOpenConfirmationModal(!openConfirmationModal);
  };

  const emailConfirmed = () => {
    setOpenConfirmationModal(false);
  }


  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView 
        style={styles.registerPageContainerStyle}
        behavior="height"
      >
        <View>
          <BackButton navigation={navigation} />
          <Text style={styles.registerTitleStyle}>Sign up to TannOi</Text>
          <View>
            <FormInput 
              formInputTitle="Email address"
              dataInput={emailInput}
            />
            <FormInput 
              formInputTitle="Password"
              dataInput={passwordInput}
            />
            <FormInput 
              formInputTitle="Full Name"
              dataInput={fullNameInput}
            />
          </View>
          <View style={styles.signupButtonContainerStyle}>
            {
              emailRegister && passwordRegister && fullName ? (
                <SaveAndContinueButton
                  buttonTitle="Save and Continue"
                  buttonStyle={
                    {
                      backgroundColor: "#5152D0",
                      borderColor: "#5152D0",
                      color: "#FFFFFF",
                      width: "100%",
                      height: "25%"
                    }
                  }
                  buttonType="funtionButton"
                  buttonFunction={emailConfirmation}
                />
              ) : (
                <NotActiveButton 
                  buttonTitle="Save and Continue" 
                  buttonHeight="25%"
                />
              )
            }
          <Text style={styles.signupTermsAndPrivacyStyle}>
            By signing up, you agree to our Terms of service and Privacy policy and to receive notice on event and services.
          </Text>
          </View>
          <EmailConfirmationModal 
            openEmailConfirmationModal={openConfirmationModal}
            closeEmailConfirmationModal={closeConfirmationModal}
            emailAddress={emailRegister}
            navigation={navigation}
            emailConfirmed={emailConfirmed}
          />
        </View>
      </KeyboardAvoidingView>
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
    alignItems:"center"
  },
  signupTermsAndPrivacyStyle: {
    fontSize: 12,
    textAlign: "center"
  }
});

export default RegisterPage;