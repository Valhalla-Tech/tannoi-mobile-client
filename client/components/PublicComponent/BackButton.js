import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import BackButtonIcon from '../../assets/PublicAsset/back-button.svg';

const BackButton = props => {
  const { navigation } = props;

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
    >
      <BackButtonIcon 
      style={styles.backButtonStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    marginTop: 56,
    marginBottom: 44
  }
});

export default BackButton;