import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <ScrollView>
      <View style={styles.homeScreenContainerStyle}>
        <Text>Home</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeScreenContainerStyle: {
    flex: 1
  }
});

export default HomeScreen;