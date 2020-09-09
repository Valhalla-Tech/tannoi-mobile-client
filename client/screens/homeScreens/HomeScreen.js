import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';

//Profile picture example
import ProfilePictureExample from '../../assets/homeAssets/bigProfilePicture.png';

//Icon
import carsTopicIcon from '../../assets/homeAssets/carsTopicIcon.png';

//Components
import SearchBar from '../../components/homeComponents/SearchBar';
import ProfileBar from '../../components/homeComponents/homeScreenComponents/ProfileBar';
import DiscussionOfTheWeek from '../../components/homeComponents/homeScreenComponents/HomeList';
import TopUsers from '../../components/homeComponents/homeScreenComponents/TopUsers';
import Trending from '../../components/homeComponents/homeScreenComponents/HomeList';
import RecommendedTopics from '../../components/homeComponents/homeScreenComponents/RecommendedTopics';

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

const RECOMMENDED_TOPICS_DATA = [
  {
    id: '1',
    imageUrl: carsTopicIcon,
    name: 'Cars',
    discussions: '14'
  },
  {
    id: '2',
    imageUrl: carsTopicIcon,
    name: 'Business',
    discussions: '14'
  },
  {
    id: '3',
    imageUrl: carsTopicIcon,
    name: 'Technology',
    discussions: '14'
  },
  {
    id: '4',
    imageUrl: carsTopicIcon,
    name: 'Entertainment',
    discussions: '14'
  },
  {
    id: '5',
    imageUrl: carsTopicIcon,
    name: 'Hobies & In...',
    discussions: '14'
  },
  {
    id: '6',
    imageUrl: carsTopicIcon,
    name: 'Health & fitness',
    discussions: '14'
  },
  {
    id: '7',
    imageUrl: carsTopicIcon,
    name: 'Cars',
    discussions: '14'
  },
  {
    id: '8',
    imageUrl: carsTopicIcon,
    name: 'Cars',
    discussions: '14'
  },
  {
    id: '9',
    imageUrl: carsTopicIcon,
    name: 'Cars',
    discussions: '14'
  }
]

const HomeScreen = ({ navigation }) => {

  return (
    <View>
      <ProfileBar />
      <FlatList
        ListHeaderComponent={
          <View style={styles.homeScreenContainerStyle}>
            <SearchBar
              searchBarIsOpen={false}
              navigation={navigation}
            />
            <DiscussionOfTheWeek
              listTitle="Discussion of the week"
              listData={DISCUSSION_OF_THE_WEEK_DATA}
            />
            <TopUsers />
            <Trending 
              listTitle="Trending"
              listData={TRENDING_DATA}
            />
            <RecommendedTopics
              topicData={RECOMMENDED_TOPICS_DATA}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenContainerStyle: {
    flex: 1
  }
});

export default HomeScreen;