import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';

const LoadingSpinner = (props) => {
  const { coverView } = props;

  return (
    <View style={coverView ? styles.coverViewStyle : styles.rootStyle}>
      <Spinner color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  coverViewStyle: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: '1.5%',
    paddingHorizontal: '8.5%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '50%',
    borderWidth: 1,
    borderColor: '#E3E6EB',
  },
});

export default LoadingSpinner;
