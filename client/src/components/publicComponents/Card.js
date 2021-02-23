import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = (props) => {
  const { child, customStyle, children } = props;

  const cardStyle = { ...styles.rootStyle, ...customStyle };

  return <View style={cardStyle}>{children || (child && child())}</View>;
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: '#FFFFFF',
  },
});

export default Card;
