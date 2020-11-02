import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { clearHome, getHome } from '../../store/actions/HomeAction';

import BackButtonIcon from '../../assets/publicAssets/back-button.svg';

const BackButton = props => {
  const { 
    navigation,
    screen,
    styleOption
  } = props;

  const dispatch = useDispatch();

  return (
    <>
      {
        screen ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screen);
                if (screen === 'MainAppNavigation') {
                  dispatch(getHome());
                }
              }}
            >
            <BackButtonIcon 
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