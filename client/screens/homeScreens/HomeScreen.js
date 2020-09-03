import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';

//Profile picture example
import ProfilePictureExample from '../../assets/homeAssets/bigProfilePicture.png';

//Components
import SearchBar from '../../components/homeComponents/SearchBar';
import ProfileBar from '../../components/homeComponents/ProfileBar';
import DiscussionOfTheWeek from '../../components/homeComponents/HomeList';
import TopUsers from '../../components/homeComponents/TopUsers';
import Trending from '../../components/homeComponents/HomeList';

const DISCUSSION_OF_THE_WEEK_DATA = [
  {
    id: '1',
    name: 'Bob Brownfoot',
    title: 'Ronaldo & Messi beat McGrogy’s record',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '2',
    name: 'Monica Hall',
    title: 'Time capsule of 2020',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '3',
    name: 'Bertram Gilfoyle',
    title: 'How did you pick and get your job done?',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  }
];

const TRENDING_DATA = [
  {
    id: '1',
    name: 'Gavin Belson',
    title: "Who's your PL Team of the Year?",
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '2',
    name: 'Jack Barker',
    title: 'To what extent is national identity/pride important to you?',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '3',
    name: 'Richard Hendricks',
    title: 'Trivial things that annoy you',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '4',
    name: 'Laurie Bream',
    title: 'Can you speak another language?',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '5',
    name: 'Monical Hall',
    title: 'Which is the worst Prison of them all?',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  }
];

const HomeScreen = () => {

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.homeScreenContainerStyle}>
          <ProfileBar />
          <SearchBar />
          <DiscussionOfTheWeek
            listTitle="Discussion of the week"
            listData={DISCUSSION_OF_THE_WEEK_DATA}
          />
          <TopUsers />
          <Trending 
            listTitle="Trending"
            listData={TRENDING_DATA}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  homeScreenContainerStyle: {
    flex: 1
  }
});

export default HomeScreen;