import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { bold, normal } from '../../../assets/FontSize';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import LoadingSpinner from '../../publicComponents/LoadingSpinner';
import ErrorMessage from '../../publicComponents/ErrorMessage';
import CloseButton from '../../publicComponents/CloseButton';
import Modal from '../../publicComponents/Modal';

const EmailConfirmationModal = props => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeValidation, setCodeValidation] = useState(false);

  const codeBox1 = useRef(null);
  const codeBox2 = useRef(null);
  const codeBox3 = useRef(null);
  const codeBox4 = useRef(null);

  const {
    openEmailConfirmationModal,
    closeEmailConfirmationModal,
    emailAddress,
    navigation,
    emailConfirmed,
    userId
  } = props;

  const getCode = () => {
    let codeInput = [code1, code2, code3, code4]
    let codeInputString = codeInput.join('');
    return codeInputString;
  };

  const emailVerified = async () => {
    try {
      setIsLoading(true);
      let emailActivationRequest = await axios.get(`${BaseUrl}/users/activation?token=${getCode()}&device=${Platform.OS}`);
      if(emailActivationRequest.data.msg === 'Email Activated'){
        setIsLoading(false);
        emailConfirmed();
        await AsyncStorage.setItem('access_token', emailActivationRequest.data.access_token)
        await AsyncStorage.setItem('refresh_token', emailActivationRequest.data.refresh_token);
        navigation.navigate('EnterYourProfileScreen');
      };
    } catch (error) {
      setIsLoading(false);
      setCodeValidation(true);
      console.log(error.response.data)
    }
  };

  const resendCode = async () => {
    try {
      let resendCodeRequest = await axios.get(`${BaseUrl}/users/generate/${userId}`);
      
      dconsole.log(resendCodeRequest);
    } catch (error) {
      console.log(error);
    }
  };

  if (code4 !== '') {
    emailVerified();
    setCode4('');
  };

  const InputBox = () => {
    return (
      <View style={styles.codeBoxStyle}>
        <TextInput
          ref={codeBox1}
          autoFocus={true}
          style={styles.codeInputStyle}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={value => {
            setCode1(value);
            if (value !== '') codeBox2.current.focus();
          }}
        />
        <TextInput 
          ref={codeBox2}
          style={styles.codeInputStyle}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={value => {
            setCode2(value);
            if (value !== '') codeBox3.current.focus();
            else codeBox1.current.focus();
          }}
        />
        <TextInput
          ref={codeBox3}
          style={styles.codeInputStyle}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={value => {
            setCode3(value);
            if (value !== '') codeBox4.current.focus();
            else codeBox2.current.focus();
          }}
        />
        <TextInput
          ref={codeBox4}
          style={styles.codeInputStyle}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={value => {
            setCode4(value);
            if (value === '') codeBox3.current.focus();
          }}
        />
      </View>
    );
  };

  const ModalContent = () => {
    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
        >
          <View
            style={styles.confirmationModalStyle}
          >
            <CloseButton closeFunction={closeEmailConfirmationModal} />
            <Text style={styles.confirmationEmailModalTitleStyle}>Confirm your email</Text>
            <Text style={styles.confirmationEmailModalInstructionStyle}>Enter the 4-digit code tannOi just sent to {emailAddress}</Text>
            {
              codeValidation && (
                <ErrorMessage message="Wrong code" />
              )
            }
            {InputBox()}
            <View style={styles.sendAgainEmailContainerStyle}>
              <Text style={styles.sendAgainEmailTextStyle}>Didn't get an email? </Text>
              <TouchableOpacity
                onPress={resendCode}
              >
                <Text style={styles.sendAgainEmailButtonTextStyle}>Send again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {
          isLoading && (
            <LoadingSpinner />
          )
      }
      </>
    );
  };

  return (
   <Modal
      openModal={openEmailConfirmationModal}
      closeModal={closeEmailConfirmationModal}
      child={ModalContent}
      animation="slide"
      customStyle={{
        width: "100%",
        height: "60%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "8%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
      customContainerStyle={{
        justifyContent: "flex-end"
      }}
   />
  );
};

const styles = StyleSheet.create({
  backgroundShadowStyle: {
    backgroundColor:'rgba(0,0,0,0.8)', 
    width:"100%", 
    height:"100%"
  },

  confirmationEmailModalTitleStyle: {
    marginTop: "10%",
    color: "#464D60",
    fontSize: 28,
    fontFamily: bold
  },

  confirmationEmailModalInstructionStyle: {
    marginTop: "5%",
    marginBottom: "2%",
    fontSize: 16,
    lineHeight: 24,
    color: "#73798C"
  },

  codeBoxStyle: {
    flexDirection: "row",
    marginTop: "8%"
  },

  codeInputStyle: {
    borderWidth: 1,
    width: "18%",
    height: 56,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    borderRadius: 5,
    borderColor: "#E3E6EB",
    marginRight: "5%"
  },

  sendAgainEmailContainerStyle: {
    flexDirection: "row",
    marginTop: "10%"
  },

  sendAgainEmailTextStyle: {
    fontSize: 16,
    fontFamily: normal
  },

  sendAgainEmailButtonTextStyle: {
    color: "#2f3dfa",
    fontSize: 16,
    fontFamily: normal
  }
});

export default EmailConfirmationModal;