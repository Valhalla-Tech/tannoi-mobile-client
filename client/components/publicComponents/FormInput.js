import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { normal } from '../../assets/FontSize';

const FormInput = props => {
  const { 
    formInputTitle, 
    dataInput,
    formInputCustomStyle,
    formInputValue,
    capitalize,
    Icon,
    iconStyle,
    iconFunction
  } = props;

  return (
    <View style={styles.formInputContainerStyle}>
      <TextInput
        value={formInputValue ? formInputValue : null}
        style={{...styles.formInputStyle, ...formInputCustomStyle}} 
        placeholder={formInputTitle}
        placeholderTextColor="#73798C"
        onChangeText={value => dataInput(value)}
        secureTextEntry={formInputTitle === 'Password' || formInputTitle === 'New password' || formInputTitle === 'Confirm new password' ? true : false}
        autoCapitalize={capitalize ? "sentences" : "none"}
      />
      {Icon && (
        <TouchableOpacity onPress={iconFunction} style={{...iconStyle.margin}}>
          <Icon height={iconStyle.height} width={iconStyle.width} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formInputStyle: {
    flex: 1,
    height: 47,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: 24,
    fontFamily: normal
  },

  formInputContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  }
})

export default FormInput;