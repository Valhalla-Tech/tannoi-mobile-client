import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import BackButtonIcon from '../../assets/publicAssets/back-button.svg';

const BackButton = (props) => {
  const {
    navigation,
    screen,
    screenOption,
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
          navigation.navigate(screen, screenOption);
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
  backButtonStyle: {},
});

export default BackButton;
