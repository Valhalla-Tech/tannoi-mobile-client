import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';

const FormInput = props => {
  const { formInputTitle, dataInput } = props;

  return (
    <TextInput
      style={styles.formInputStyle} 
      placeholder={formInputTitle}
      placeholderTextColor="#73798C"
      onChangeText={value => dataInput(value)}
      secureTextEntry={formInputTitle === 'Password' || formInputTitle === 'New password' || formInputTitle === 'Confirm new password' ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  formInputStyle: {
    height: 47,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: 24
  }
})

export default FormInput;