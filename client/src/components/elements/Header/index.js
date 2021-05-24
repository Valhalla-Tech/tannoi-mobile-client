import React from 'react';
import { View, StyleSheet } from 'react-native';

const Header = (props) => {
  const { children, customStyle } = props;

  const customRootStyle = { ...styles.rootStyle, ...customStyle };

  return <View style={customRootStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: '#FFFFFF',
  },
});

export default Header;
