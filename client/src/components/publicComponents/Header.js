import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
  const { child, customStyle } = props;

  const headerStyle = { ...styles.rootStyle, ...customStyle };

  return <View style={headerStyle}>{child && child()}</View>;
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: '#FFFFFF',
  },
});

export default Header;
