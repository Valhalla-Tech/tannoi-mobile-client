import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList
} from 'react-native';

//Components
import SearchBar from '../../components/homeComponents/SearchBar';
import ProfileBar from '../../components/homeComponents/ProfileBar';
import DiscussionOfTheWeek from '../../components/homeComponents/DiscussionOfTheWeek';
import TopUsers from '../../components/homeComponents/TopUsers';

const HomeScreen = () => {

  return (
    // <ScrollView>
    <FlatList
      ListHeaderComponent={
        <View style={styles.homeScreenContainerStyle}>
          <ProfileBar />
          <SearchBar />
          <DiscussionOfTheWeek />
          <TopUsers />
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