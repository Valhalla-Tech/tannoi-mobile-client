import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const NotActiveButton = props => {
  const { 
    buttonTitle,
    buttonHeight
  } = props;

  return (
    <View style={{...styles.notActiveButtonContainerStyle, height: buttonHeight}}>
      <Text style={styles.notActiveButtonTitleStyle}>
        {buttonTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notActiveButtonContainerStyle: {
    backgroundColor: "#a1a5ab",
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  notActiveButtonTitleStyle: {
    fontSize: 16,
    fontWeight: "600", 
    color: "#FFFFFF"
  }
});

export default NotActiveButton;