import React from 'react';
import {
  Text
} from 'react-native';

const ErrorMessage = props => {
  const { message } = props;

  return (
    <Text style={{color: 'red'}}>{message}</Text>
  )
};

export default ErrorMessage;