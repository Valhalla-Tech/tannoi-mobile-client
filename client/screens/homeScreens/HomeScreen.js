import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

//Components
import SearchBar from '../../components/homeComponents/SearchBar';
import ProfileBar from '../../components/homeComponents/ProfileBar';
import DiscussionOfTheWeek from '../../components/homeComponents/DiscussionOfTheWeek';

const HomeScreen = () => {

  return (
    // <ScrollView>
    <FlatList
      ListHeaderComponent={
        <View style={styles.homeScreenContainerStyle}>
          <ProfileBar />
          <SearchBar />
          <DiscussionOfTheWeek />
        </View>
      }
    />
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeScreenContainerStyle: {
    flex: 1
  }
});

export default HomeScreen;