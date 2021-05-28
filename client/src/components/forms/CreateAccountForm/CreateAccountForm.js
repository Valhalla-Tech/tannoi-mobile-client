import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button, ErrorMessage } from '../../../components/elements';
import validate from './validate';
import styles from './styles';
import { FormInput } from '../../fields';

const CreateAccountForm = (props) => {
  const { onSubmit, errMsg, onPressTermsOfService } = props;

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validating, setValidating] = useState(false);

  const validationData = {
    email,
    fullName,
    password,
    confirmPassword,
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.rootStyle}>
        <Text style={styles.titleTextStyle}>Create account</Text>
        {errMsg !== '' && (
          <ErrorMessage
            message={errMsg}
            customStyle={styles.errorMessageFromServerStyle}
          />
        )}
        <View style={styles.contentContainerStyle}>
          <View>
            <FormInput
              placeholder="Your email"
              onChangeText={(value) => setEmail(value)}
              customRootStyle={styles.formInputStyle}
            />
            <FormInput
              placeholder="Full name"
              onChangeText={(value) => setFullName(value)}
              customRootStyle={styles.formInputStyle}
            />
            {validating && validate(validationData).passwordErrMsg !== '' && (
              <ErrorMessage
                customStyle={styles.errorMessageStyle}
                message={validate(validationData).passwordErrMsg}
              />
            )}
            <FormInput
              placeholder="Create password"
              onChangeText={(value) => setPassword(value)}
              customRootStyle={styles.formInputStyle}
              secureText={true}
            />
            {validating &&
              validate(validationData).confirmPasswordErrMsg !== '' && (
                <ErrorMessage
                  customStyle={styles.errorMessageStyle}
                  message={validate(validationData).confirmPasswordErrMsg}
                />
              )}
            <FormInput
              placeholder="Confirm password"
              onChangeText={(value) => setConfirmPassword(value)}
              customRootStyle={styles.formInputStyle}
              secureText={true}
            />
          </View>
          <View style={styles.actionButtonContainerStyle}>
            <Button
              customStyle={{
                backgroundColor: validate(validationData).validationStatus
                  ? '#7817FF'
                  : '#a1a5ab',
                borderWidth: 0,
                marginBottom: '2.5%',
                color: '#FFFFFF',
              }}
              name="Next"
              disabled={
                validate(validationData).validationStatus ? false : true
              }
              onPress={() => {
                const { passwordErrMsg, confirmPasswordErrMsg } = validate(
                  validationData,
                );

                setValidating(true);
                passwordErrMsg === '' &&
                  confirmPasswordErrMsg === '' &&
                  onSubmit({
                    name: fullName,
                    email: email,
                    password: password,
                  });
              }}
            />
            <Text style={styles.termsOfServiceTextStyle}>
              By signing up, you agree to our{' '}
              <Text
                onPress={() => onPressTermsOfService()}
                style={styles.termsOfServiceButtonTextStyle}>
                Terms of service and Privacy policy
              </Text>
              and to receive notice on event and services.
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateAccountForm;
