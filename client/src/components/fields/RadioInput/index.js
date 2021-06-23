import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CalculateWidth } from '../../../helper/CalculateSize';

const RadioInput = (props) => {
  const { onChange, selected, customStyle } = props;

  return (
    <TouchableOpacity
      style={{
        ...customStyle,
        ...styles.rootStyle,
        backgroundColor: selected ? '#7817FF' : '#FFFFFF',
        borderWidth: selected ? 0 : 1,
      }}
      onPress={() => onChange()}
    />
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    borderRadius: 50,
    width: CalculateWidth(5),
    height: CalculateWidth(5),
    borderColor: '#464D60',
  },
});

export default RadioInput;
