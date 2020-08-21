import React from 'react';
import { 
  StyleSheet, 
  Text,
  Image,
  TouchableOpacity 
} from 'react-native';

import FacebookLogo from '../../assets/PublicAsset/facebookIcon.svg';
import GoogleLogo from '../../assets/PublicAsset/googleIcon.svg';

const WelcomePageButton = props => {
  const { 
    buttonTitle, 
    buttonStyle, 
    buttonIcon,
    navigation,
    navigationPage,
    buttonFunction,
    buttonType,
    buttonIconTitle
  } = props;

  return (
    <TouchableOpacity  
      style={{
          ...styles.loginButtonContainerStyle, 
          ...buttonStyle,
        }}
      onPress={buttonType === "navigationButton" ? () => navigation.navigate(navigationPage) : buttonFunction}
    >
      {
        buttonIconTitle === 'facebook' ? (
          <FacebookLogo style={styles.buttonIconStyle} />
        ) :  buttonIconTitle === 'google' ? (
          <GoogleLogo style={styles.buttonIconStyle} />
        ) : (null)
      }
      <Text style={
          {
            ...styles.buttonTitleStyle,
            color: buttonStyle.color
          }
        }
      >{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButtonContainerStyle: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
  },

  buttonTitleStyle: {
    fontSize: 16,
    fontWeight: "600",
  },

  buttonIconStyle: {
    position:"absolute", 
    left:15
  }
});

export default WelcomePageButton;