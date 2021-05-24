import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Normal } from '../../../styles/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import IcEye from '../../../assets/ic_eye.svg';

const FormInput = (props) => {
  const {
    placeholder,
    value,
    customRootStyle,
    customStyle,
    onChangeText,
    secureText,
    capitalize,
    capitalizeAll,
    icon,
  } = props;

  const [hideText, setHideText] = useState(true);

  return (
    <View style={{ ...styles.rootStyle, ...customRootStyle }}>
      <TextInput
        value={value}
        style={{ ...styles.formInputStyle, ...customStyle }}
        placeholder={placeholder}
        placeholderTextColor="#73798C"
        onChangeText={(value) => onChangeText(value)}
        secureTextEntry={hideText && secureText ? true : false}
        autoCapitalize={
          capitalizeAll ? 'characters' : capitalize ? 'sentences' : 'none'
        }
      />
      {secureText && (
        <TouchableOpacity
          onPress={() => setHideText((prevValue) => !prevValue)}
          style={styles.eyeIconStyle}>
          <IcEye width={CalculateWidth(6)} height={CalculateWidth(6)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  formInputStyle: {
    fontFamily: Normal,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(2),
    paddingBottom: '2%',
  },

  eyeIconStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    marginBottom: '-0.1%'
  },
});

export default FormInput;
