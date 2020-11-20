import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import { normal } from '../../assets/FontSize';

const FormInput = props => {
  const { 
    formInputTitle, 
    dataInput,
    formInputCustomStyle,
    formInputValue,
    capitalize
  } = props;

  return (
    <TextInput
      value={formInputValue}
      style={{...styles.formInputStyle, ...formInputCustomStyle}} 
      placeholder={formInputTitle}
      placeholderTextColor="#73798C"
      onChangeText={value => dataInput(value)}
      secureTextEntry={formInputTitle === 'Password' || formInputTitle === 'New password' || formInputTitle === 'Confirm new password' ? true : false}
      autoCapitalize={capitalize ? "sentences" : "none"}
      //   formInputTitle === 'Full name' || 
      //   formInputTitle === 'Add caption (Optional)' ||
      //   formInputTitle === 'Discussion title' ? "sentences" : "none"
      // }
    />
  );
};

const styles = StyleSheet.create({
  formInputStyle: {
    height: 47,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: 24,
    fontFamily: normal
  }
})

export default FormInput;