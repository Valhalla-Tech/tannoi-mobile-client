import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';

const PinInput = React.forwardRef((props, ref) => {
  const { customStyle, autoFocus, onChangeText } = props;

  return (
    <TextInput
      style={{ ...styles.rootStyle, ...customStyle }}
      keyboardType="number-pad"
      maxLength={1}
      autoFocus={autoFocus}
      ref={ref}
      onChangeText={(value) => onChangeText(value)}
    />
  );
});

const styles = StyleSheet.create({
  rootStyle: {
    borderWidth: 1,
    width: '18%',
    height: CalculateWidth(15),
    borderRadius: 5,
    borderColor: '#E3E6EB',
    textAlign: 'center',
    fontSize: CalculateHeight(3),
  },
});

export default PinInput;
