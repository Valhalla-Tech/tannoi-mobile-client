import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

//Components
import SearchBar from '../../components/homeComponents/SearchBar';
import ProfileBar from '../../components/homeComponents/ProfileBar';

const HomeScreen = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <ScrollView>
      <View style={styles.homeScreenContainerStyle}>
        <ProfileBar />
        <SearchBar />
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