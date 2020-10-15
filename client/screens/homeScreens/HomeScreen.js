import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
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

const HomeScreen = ({ navigation }) => {
  const [discussionOfTheWeek, setDiscussionOfTheWeek] = useState('');
  const [topUser, setTopUser] = useState('');
  const [trending, setTrending] = useState('');
  const [recommendedTopic, setRecommendedTopic] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    getHome();
    SplashScreen.hide();
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