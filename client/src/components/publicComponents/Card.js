import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = (props) => {
  const {child, customStyle} = props;

  const cardStyle = {...styles.rootStyle, ...customStyle};

  return <View style={cardStyle}>{child && child()}</View>;
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: '#FFFFFF',
  },
});

export default Card;
