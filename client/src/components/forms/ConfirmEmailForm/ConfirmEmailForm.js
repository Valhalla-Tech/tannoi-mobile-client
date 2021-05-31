import React, { useState, useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Text, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resendEmailConfirmationCode } from '../../../store/actions/RegisterAction';
import styles from './styles';
import { PinInput } from '../../fields';
import { ErrorMessage } from '../../elements';

const ConfirmEmailForm = (props) => {
  const { onSubmit, isLoading, errMsg } = props;

  const { registerData } = useSelector((state) => state.RegisterReducer);

  const [pin1Value, setPin1Value] = useState('');
  const [pin2Value, setPin2Value] = useState('');
  const [pin3Value, setPin3Value] = useState('');
  const [pin4Value, setPin4Value] = useState('');

  const dispatch = useDispatch();

  const pin1 = useRef();
  const pin2 = useRef();
  const pin3 = useRef();
  const pin4 = useRef();

  const CheckPin = async (filled, value) => {
    if (
      (pin1Value || filled === 1) &&
      (pin2Value || filled === 2) &&
      (pin3Value || filled === 3) &&
      (pin4Value || filled === 4)
    ) {
      const pinData = {
        pin1Value: pin1Value !== '' ? pin1Value : value,
        pin2Value: pin2Value !== '' ? pin2Value : value,
        pin3Value: pin3Value !== '' ? pin3Value : value,
        pin4Value: pin4Value !== '' ? pin4Value : value,
      };
      onSubmit(pinData);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.rootStyle}>
        <Text style={styles.titleTextStyle}>Confirm your email</Text>
        <Text style={styles.normalTextStyle}>
          Enter the 4-digit code tannOi just sent to {registerData.email}
        </Text>
        {errMsg !== '' && (
          <ErrorMessage
            customStyle={styles.errorMessageStyle}
            message={errMsg}
          />
        )}
        <View style={styles.pinInputContainerStyle}>
          <PinInput
            autoFocus={true}
            customStyle={styles.pinInputStyle}
            ref={pin1}
            onChangeText={(value) => {
              if (value !== '') {
                setPin1Value(value);
                CheckPin(1, value);
                pin2.current.focus();
              } else {
                setPin1Value('');
              }
            }}
          />

          <PinInput
            customStyle={styles.pinInputStyle}
            ref={pin2}
            onChangeText={(value) => {
              if (value !== '') {
                setPin2Value(value);
                CheckPin(2, value);
                pin3.current.focus();
              } else {
                setPin2Value('');
                pin1.current.focus();
              }
            }}
          />
          <PinInput
            customStyle={styles.pinInputStyle}
            ref={pin3}
            onChangeText={(value) => {
              if (value !== '') {
                setPin3Value(value);
                CheckPin(3, value);
                pin4.current.focus();
              } else {
                setPin3Value('');
                pin2.current.focus();
              }
            }}
          />
          <PinInput
            customStyle={styles.pinInputStyle}
            ref={pin4}
            onChangeText={(value) => {
              if (value !== '') {
                setPin4Value(value);
                CheckPin(4, value);
              } else {
                setPin4Value('');
                pin3.current.focus();
              }
            }}
          />
        </View>
        <Text style={styles.normalTextStyle}>
          Didn't get an email?{' '}
          <Text
            style={styles.buttonTextStyle}
            onPress={() =>
              dispatch(resendEmailConfirmationCode(registerData.id))
            }>
            Send again
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ConfirmEmailForm;
