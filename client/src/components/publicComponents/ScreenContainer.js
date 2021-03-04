import React, { Fragment } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

const ScreenContainer = (props) => {
  const { children, isHeader = true } = props;

  return (
    <>
      <SafeAreaView
        style={
          isHeader
            ? styles.rootStyle
            : { ...styles.rootStyle, backgroundColor: '#f2f2f2' }
        }>
        <View style={styles.containerStyle}>{children}</View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: '#f2f2f2' }} />
    </>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  containerStyle: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
});

export default ScreenContainer;
