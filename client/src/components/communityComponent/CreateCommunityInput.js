import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {CalculateHeight} from '../../helper/CalculateSize';

const CreateCommunityInput = (props) => {
  const {placeholder, inputFunction, customStyle, onBlur, value, autoFocus} = props;

  return (
    <TextInput
      onChangeText={(value) => inputFunction(value)}
      style={{...styles.textInputStyle, ...customStyle}}
      placeholder={placeholder}
      placeholderTextColor="#73798C"
      multiline={true}
      onBlur={onBlur ? onBlur : null}
      value={value}
      autoFocus={autoFocus}
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    paddingVertical: 0,
    flexWrap: 'wrap',
    fontSize: CalculateHeight(3.5),
    color: 'black'
  },
});

export default CreateCommunityInput;
