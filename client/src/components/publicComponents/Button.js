import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { medium } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';

import FacebookLogo from '../../assets/publicAssets/facebookIcon.svg';
import GoogleLogo from '../../assets/publicAssets/googleIcon.svg';

const WelcomePageButton = (props) => {
  const {
    buttonTitle,
    buttonStyle,
    navigation,
    navigationPage,
    buttonFunction,
    buttonType,
    buttonIconTitle,
    disableButton,
  } = props;

  return (
    <TouchableOpacity
      style={{
        ...styles.loginButtonContainerStyle,
        ...buttonStyle,
      }}
      onPress={
        buttonType === 'navigationButton'
          ? () => navigation.navigate(navigationPage)
          : buttonFunction
      }
      disabled={disableButton}>
      {buttonIconTitle === 'facebook' ? (
        <FacebookLogo style={styles.buttonIconStyle} />
      ) : buttonIconTitle === 'google' ? (
        <GoogleLogo style={styles.buttonIconStyle} />
      ) : null}
      <Text
        style={{
          ...styles.buttonTitleStyle,
          color: buttonStyle.color !== undefined ? buttonStyle.color : 'black',
          fontSize: buttonStyle.fontSize
            ? buttonStyle.fontSize
            : styles.buttonTitleStyle.fontSize,
        }}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButtonContainerStyle: {
    padding: '3%',
    borderRadius: 10,
    marginBottom: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },

  buttonTitleStyle: {
    fontSize: CalculateHeight(2),
    fontFamily: medium,
  },

  buttonIconStyle: {
    position: 'absolute',
    left: '5%',
  },
});

export default WelcomePageButton;
