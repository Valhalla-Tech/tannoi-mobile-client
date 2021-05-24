import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Medium } from '../../../styles/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import IcClose from '../../../assets/ic_close.svg';
import IcBack from '../../../assets/ic_back.svg';

const Button = (props) => {
  const {
    name,
    customStyle,
    onPress,
    disabled,
    isCloseButton,
    isBackButton,
    CustomIcon,
    customIconStyle,
  } = props;

  const customRootStyle = { ...styles.rootStyle, ...customStyle };

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        ...customRootStyle,
        borderWidth:
          isBackButton || isCloseButton
            ? 0
            : customStyle !== undefined && customStyle.borderWidth !== undefined
            ? customStyle.borderWidth
            : 1,
      }}
      disabled={disabled}>
      {CustomIcon && <CustomIcon style={customIconStyle} />}
      {isBackButton ? (
        <IcBack />
      ) : isCloseButton ? (
        <IcClose />
      ) : (
        <Text
          style={{
            ...styles.nameStyle,
            color:
              customStyle !== undefined && customStyle.color !== undefined
                ? customStyle.color
                : null,
            fontSize:
              customStyle !== undefined && customStyle.fontSize !== undefined
                ? customStyle.fontSize
                : styles.nameStyle.fontSize,
          }}>
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    flexDirection: 'row',
  },

  nameStyle: {
    fontFamily: Medium,
    fontSize: CalculateHeight(2),
  },
});

export default Button;
