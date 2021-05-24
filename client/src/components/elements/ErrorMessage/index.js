import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Normal } from '../../../styles/FontSize';

const ErrorMessage = (props) => {
  const { message, customStyle } = props;

  return (
    <View style={{ ...styles.errorMessageCardStyle, ...customStyle }}>
      <Text
        style={{
          ...styles.errorTextStyle,
          color:
            customStyle !== undefined && customStyle.color !== undefined
              ? customStyle.color
              : null,
        }}>
        {message}
      </Text>
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
