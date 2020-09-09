import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Components
import LoadingSpinner from '../../PublicComponent/LoadingSpinner';
import ErrorMessage from '../../PublicComponent/ErrorMessage';
import CloseButton from '../../PublicComponent/CloseButton';

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
      let emailActivationRequest = await axios.get(`https://dev.entervalhalla.tech/api/tannoi/v1/users/activation?token=${getCode()}`);
      if(emailActivationRequest.data.msg === 'Email Activated'){
        setIsLoading(false);
        emailConfirmed();
        await AsyncStorage.setItem('access_token', emailActivationRequest.data.access_token)
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
      let resendCodeRequest = await axios.get(`https://dev.entervalhalla.tech/api/tannoi/v1/users/generate/${userId}`);
      
      dconsole.log(resendCodeRequest);
    } catch (error) {
      console.log(error);
    }
  };

  if (code4 !== '') {
    emailVerified();
    setCode4('');
  };

  return (
    <Modal
        animationType="slide"
        visible={openEmailConfirmationModal}
        transparent={true}
      >
      <View style={styles.backgroundShadowStyle}></View>
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
          <View style={styles.sendAgainEmailContainerStyle}>
            <Text>Didn't get an email? </Text>
            <TouchableOpacity
              onPress={resendCode}
            >
              <Text style={styles.sendAgainEmailButtonStyle}>Send again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {
        isLoading && (
          <LoadingSpinner />
        )
      }
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundShadowStyle: {
    backgroundColor:'rgba(0,0,0,0.8)', 
    width:"100%", 
    height:"100%"
  },

  confirmationModalStyle: {
    position: "absolute",
    top: 65,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    padding: 20
  },

  confirmationEmailModalTitleStyle: {
    marginTop: 45,
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold"
  },

  confirmationEmailModalInstructionStyle: {
    marginTop: 16,
    marginBottom: 5,
    fontSize: 16,
    lineHeight: 24,
    color: "#73798C"
  },

  codeBoxStyle: {
    flexDirection: "row",
    marginTop: 24
  },

  codeInputStyle: {
    borderWidth: 1,
    width: 56,
    height: 56,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    borderRadius: 5,
    borderColor: "#E3E6EB",
    marginRight: 12
  },

  sendAgainEmailContainerStyle: {
    flexDirection: "row",
    marginTop: 32
  },

  sendAgainEmailButtonStyle: {
    color: "#2f3dfa"
  }
});

export default EmailConfirmationModal;