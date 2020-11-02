import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import BackButtonIcon from '../../assets/publicAssets/back-button.svg';

const BackButton = props => {
  const { 
    navigation,
    screen,
    styleOption
  } = props;

  return (
    <>
      {
        screen ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screen);
              }}
            >
            <BackButtonIcon
              width={20}
              height={25}
              style={{...styles.backButtonStyle, ...styleOption}}
            />
          </TouchableOpacity>
        </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <BackButtonIcon 
                width={20}
                height={25}
                style={{...styles.backButtonStyle, ...styleOption}}
              />
            </TouchableOpacity>
          </>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    marginTop: 56,
    marginBottom: 44
  }
});

export default BackButton;