import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

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
  const [discussionOfTheWeek, setDiscussionOfTheWeek] = useState('');
  const [topUser, setTopUser] = useState('');
  const [trending, setTrending] = useState('');
  const [recommendedTopic, setRecommendedTopic] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    getHome();
  }, []);

  const getHome = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let getHomeRequest = await axios({
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/pages/home?sort=like&page=1',
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getHomeRequest.data) {
        setUser(getHomeRequest.data.user);
        setDiscussionOfTheWeek(getHomeRequest.data.discussion_of_the_week);
        setTopUser(getHomeRequest.data.top_user);
        setTrending(getHomeRequest.data.discussion.data);
        topicGroup(getHomeRequest.data.recommended_topic);
      };
    } catch (error) {
      console.log(error.response);
    }
  };

  const topicGroup = topicData => {
    let arrayGroup = []
    let topicGroupArray = []

    for (let topicIndex = 0; topicIndex < topicData.length; topicIndex++) {
      if (topicGroupArray.length === 3) {
        arrayGroup.push(topicGroupArray)
        topicGroupArray = [];
        topicGroupArray.push(topicData[topicIndex]);
      } else {
        topicGroupArray.push(topicData[topicIndex])
      }
    }

    arrayGroup.push(topicGroupArray);
    setRecommendedTopic(arrayGroup);
  };

  return (
    <View>
      <ProfileBar 
        user={user}
      />
      <FlatList
        ListHeaderComponent={
          <View style={styles.homeScreenContainerStyle}>
            <SearchBar
              searchBarIsOpen={false}
              navigation={navigation}
            />
            <DiscussionOfTheWeek
              listTitle="Discussion of the week"
              listData={discussionOfTheWeek}
              navigation={navigation}
            />
            <TopUsers
              topUserData={topUser}
            />
            <Trending 
              listTitle="Trending"
              listData={trending}
              navigation={navigation}
            />
            <RecommendedTopics
              topicData={recommendedTopic}
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