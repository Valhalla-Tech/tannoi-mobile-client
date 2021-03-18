import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import IcOption from '../../assets/publicAssets/ic-option.svg';

const OptionButton = (props) => {
  const { customStyle, onPress } = props;

  return (
    <TouchableOpacity style={{ ...styles.buttonStyle, ...customStyle }} onPress={() => onPress()}>
      <IcOption />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: '3%',
    paddingLeft: '5%',
  }
});

export default OptionButton;
