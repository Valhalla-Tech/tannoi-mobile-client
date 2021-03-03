import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { normal } from '../../assets/FontSize';
import { CalculateWidth, CalculateHeight } from '../../helper/CalculateSize';

//Icon
import EyeIcon from '../../assets/publicAssets/eyeIcon.svg';

const FormInput = (props) => {
  const {
    formInputTitle,
    dataInput,
    formInputCustomStyle,
    formInputValue,
    capitalize,
    capitalizeAll,
    Icon,
    iconStyle,
    iconFunction,
    isEyeIcon,
    customContainerStyle,
  } = props;

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View
      style={{ ...styles.formInputContainerStyle, ...customContainerStyle }}>
      <TextInput
        value={formInputValue ? formInputValue : null}
        style={{ ...styles.formInputStyle, ...formInputCustomStyle }}
        placeholder={formInputTitle}
        placeholderTextColor="#73798C"
        onChangeText={(value) => dataInput(value)}
        secureTextEntry={hidePassword && isEyeIcon ? true : false}
        autoCapitalize={
          capitalizeAll ? 'characters' : capitalize ? 'sentences' : 'none'
        }
      />
      {isEyeIcon && (
        <TouchableOpacity
          onPress={() => setHidePassword((prevValue) => !prevValue)}
          style={styles.eyeIconStyle}>
          <EyeIcon width={CalculateWidth(6)} height={CalculateWidth(6)} />
        </TouchableOpacity>
      )}
      {Icon && (
        <TouchableOpacity
          onPress={iconFunction}
          style={{ ...iconStyle.margin }}>
          <Icon height={iconStyle.height} width={iconStyle.width} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formInputStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(2),
    fontFamily: normal,
  },

  formInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'flex-end',
    marginBottom: '6%',
    minHeight: '5%',
  },

  eyeIconStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    paddingBottom: '2.5%',
  },
});

export default FormInput;
