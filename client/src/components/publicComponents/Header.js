import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
  const { child, customStyle, children } = props;

  const headerStyle = { ...styles.rootStyle, ...customStyle };

  return <View style={headerStyle}>{children || (child && child())}</View>;
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: '#FFFFFF',
  },
});

export default Header;
