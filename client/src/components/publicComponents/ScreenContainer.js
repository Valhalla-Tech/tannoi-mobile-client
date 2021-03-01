import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

const ScreenContainer = (props) => {
  const { children } = props;

  return (
    <SafeAreaView style={styles.rootStyle}>
      <View style={styles.containerStyle}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

  containerStyle: {
    backgroundColor: "#F5F7F9",
    flex: 1,
  }
});

export default ScreenContainer;
