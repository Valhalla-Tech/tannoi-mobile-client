import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Spinner } from 'native-base';

const LoadingSpinner = () => {
  return (
    <View style={styles.loadingSpinnerContainerStyle}>
      <Spinner color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSpinnerContainerStyle: {
    position: "absolute", 
    justifyContent: "center", 
    alignItems: "center", 
    width: "100%", 
    height: "100%", 
    backgroundColor: "#a1a5ab50"
  }
});

export default LoadingSpinner;