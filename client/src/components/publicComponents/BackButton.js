import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import BackButtonIcon from '../../assets/publicAssets/back-button.svg';

const BackButton = (props) => {
  const {
    navigation,
    screen,
    styleOption,
    buttonFunction,
    buttonOption,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        if (buttonFunction) {
          buttonFunction();
        } else if (screen) {
          navigation.navigate(screen);
        } else if (buttonOption) {
          buttonOption();
          navigation.goBack();
        } else {
          navigation.goBack();
        }
      }}>
      <BackButtonIcon
        width={20}
        height={25}
        style={{ ...styles.backButtonStyle, ...styleOption }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    marginTop: 56,
    marginBottom: 44,
  },
});

export default BackButton;
