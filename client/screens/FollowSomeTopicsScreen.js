import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  AsyncStorage,
  Alert
} from 'react-native';
import axios from 'axios';

//Components
import BackButton from '../components/PublicComponent/BackButton';
import Card from '../components/FollowSomeTopicsScreen/Card';
import DoneButton from '../components/PublicComponent/BigButton';
import LoadingSpinner from '../components/PublicComponent/LoadingSpinner';

const numColumns = 3

const FollowSomeTopicsScreen = ({ navigation }) => {
  const [allTopics, setAllTopics] = useState('');
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getTopics = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      setAccessToken(access_token);
  
      let getTopicRequest = await axios({
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/topics',
        method: 'get',
        headers: {
          'token': access_token
        }
      });
  
      setAllTopics(getTopicRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopics();
  }, [])

  const lastRow = () => {
    const totalRows = Math.floor(allTopics.length / numColumns);
    let totalLastRow = allTopics.length - (totalRows * numColumns);

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      setAllTopics([...allTopics, {key: 'blank', value: 'blank', empty: true}])
      totalLastRow++
    }

    return allTopics;
  };

  const isSelected = topicKey => {
    let checkSelectedTopic = selectedTopic.indexOf(topicKey);
    if (checkSelectedTopic !== -1) return true;
    else return false;
  };

  const selectTopic = topicKey => {
    if (selectedTopic.length < 5) {
      setSelectedTopic([...selectedTopic, topicKey]);
    }
  };

  const followSomeTopicSubmit = async () => {
    try {
      setIsLoading(true);

      let followSomeTopicRequest = await axios({
        method: 'post',
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/topics/preferred-many',
        headers: {
          'token': accessToken
        },
        data: {
          topics_id: selectedTopic
        }
      });
      setIsLoading(false);

      console.log(followSomeTopicRequest.data);

      Alert.alert(
        'Register Success',
        'Register success, welcome to Tannoi',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => navigation.navigate('WelcomeScreen') }
        ],
        { cancelable: false }
      );
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };


  const deselectTopic = topicKey => {
    if (selectedTopic.length > 1) {
      setSelectedTopic(selectedTopic.filter(index => index !== topicKey));
    } else {
      setSelectedTopic([]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.followSomeTopicsScreenContainerStyle}>
        <View style={styles.backButtonAndTitleContainer}>
          <BackButton navigation={navigation} />
          <Text style={styles.followSomeTopicsScreenTitleStyle}>
            Follow some topics
          </Text>
        </View>
        <Text style={styles.FollowSomeTopicsScreenInstructionStyle}>
          Select 5 topics that interest you to get started
        </Text>
        <FlatList
          data={lastRow(allTopics, numColumns)}
          contentContainerStyle={styles.cardsContainerStyle}
          numColumns={numColumns}
          renderItem={itemData => (
            <Card 
              cardData={itemData.item.name} 
              isEmpty={itemData.item.empty}
              isSelected={isSelected}
              topicKey={itemData.item.id}
              selectTopic={selectTopic}
              deselectTopic={deselectTopic}
            />
          )}
        />
        <DoneButton 
          buttonTitle="Done"
          buttonStyle={
            {
              position: "absolute",
              marginHorizontal: 24,
              bottom: 35,
              backgroundColor: "#5152D0",
              borderColor: "#5152D0",
              color: "#FFFFFF",
              width: "100%",
              height: "7%",
              marginTop: 24
            }
          }
          buttonType="functionButton"
          buttonFunction={followSomeTopicSubmit}
        />
      </View>
      {
        isLoading && (
          <LoadingSpinner />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  followSomeTopicsScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: 24
  },

  backButtonAndTitleContainer: {
    flexDirection: "row"
  },

  followSomeTopicsScreenTitleStyle: {
    marginTop: 53.5,
    marginBottom: 44,
    marginLeft: 14,
    fontSize: 20,
    fontWeight: "600"
  },

  FollowSomeTopicsScreenInstructionStyle: {
    textAlign: "center", 
    fontSize: 16, 
    color: "#464D60", 
    lineHeight: 24
  },

  cardsContainerStyle: {
    marginTop: 32
  }
});

export default FollowSomeTopicsScreen;