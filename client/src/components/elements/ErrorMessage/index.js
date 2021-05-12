import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Normal } from '../../../styles/FontSize';

const ErrorMessage = (props) => {
  const { message, customStyle } = props;

  return (
    <View style={{ ...styles.errorMessageCardStyle, ...customStyle }}>
      <Text style={styles.errorTextStyle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessageCardStyle: {},

  errorTextStyle: {
    fontFamily: Normal,
    color: 'red',
  },
});

export default ErrorMessage;
