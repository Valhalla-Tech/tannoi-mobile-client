import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../../store/actions/LoginAction';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import axios from '../../../constants/ApiServices';
import { getTopic } from '../../../store/actions/TopicAction';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import BackButton from '../../../components/publicComponents/BackButton';
import Card from '../../../components/accountComponents/FollowSomeTopicsScreenComponents/Card';
import DoneButton from '../../../components/publicComponents/Button';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const numColumns = 3;

const FollowSomeTopicsScreen = ({ navigation }) => {
  const topics = useSelector((state) => state.TopicReducer.topics);
  const [allTopics, setAllTopics] = useState(topics);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getTopic());
  }, []);

  const dispatch = useDispatch();
  const lastRow = () => {
    if (allTopics.length === 0) {
      setAllTopics(topics);
    }

    const totalRows = Math.floor(allTopics.length / numColumns);
    let totalLastRow = allTopics.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      setAllTopics([
        ...allTopics,
        { key: 'blank', value: 'blank', empty: true },
      ]);
      totalLastRow++;
    }

    return allTopics;
  };

  const isSelected = (topicKey) => {
    let checkSelectedTopic = selectedTopic.indexOf(topicKey);
    if (checkSelectedTopic !== -1) return true;
    else return false;
  };

  const selectTopic = (topicKey) => {
    if (selectedTopic.length < 5) {
      setSelectedTopic([...selectedTopic, topicKey]);
    }
  };

  const followSomeTopicSubmit = async () => {
    try {
      setIsLoading(true);
      const access_token = await AsyncStorage.getItem('access_token');

      let followSomeTopicRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/topics/preferred-many`,
        headers: {
          token: access_token,
        },
        data: {
          topics_id: selectedTopic,
        },
      });

      if (followSomeTopicRequest.data.msg === 'Success') {
        setIsLoading(false);
        dispatch(userLogin());
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const deselectTopic = (topicKey) => {
    if (selectedTopic.length > 1) {
      setSelectedTopic(selectedTopic.filter((index) => index !== topicKey));
    } else {
      setSelectedTopic([]);
    }
  };

  return (
    <ScreenContainer isHeader={false}>
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
        {topics.length !== 0 && (
          <View>
            <FlatList
              data={lastRow(topics, numColumns)}
              contentContainerStyle={styles.cardsContainerStyle}
              numColumns={numColumns}
              style={{ marginBottom: '80%' }}
              renderItem={(itemData) => (
                <Card
                  cardData={itemData.item.name}
                  isEmpty={itemData.item.empty}
                  isSelected={isSelected}
                  topicKey={itemData.item.id}
                  selectTopic={selectTopic}
                  deselectTopic={deselectTopic}
                  cardImage={itemData.item.image_path}
                />
              )}
            />
          </View>
        )}
        <DoneButton
          buttonTitle="Done"
          buttonStyle={{
            position: 'absolute',
            marginHorizontal: 24,
            bottom: 35,
            backgroundColor: '#5152D0',
            borderColor: '#5152D0',
            color: '#FFFFFF',
            width: '100%',
            height: CalculateHeight(6),
            marginTop: 24,
          }}
          buttonType="functionButton"
          buttonFunction={followSomeTopicSubmit}
        />
      </View>
      {isLoading && <LoadingSpinner />}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  followSomeTopicsScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: '5.5%',
  },

  backButtonAndTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10%',
  },

  followSomeTopicsScreenTitleStyle: {
    color: '#464D60',
    marginLeft: '4.5%',
    fontSize: CalculateHeight(2.5),
    fontFamily: bold,
  },

  FollowSomeTopicsScreenInstructionStyle: {
    textAlign: 'center',
    fontSize: CalculateHeight(2),
    color: '#464D60',
    lineHeight: 24,
    marginBottom: '5%',
    fontFamily: normal,
  },

  cardsContainerStyle: {
    marginTop: '10%',
    paddingBottom: '30%',
  },
});

export default FollowSomeTopicsScreen;
