import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { normal } from '../../../assets/FontSize';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearData,
  createdCommunityMessage,
} from '../../../store/actions/CreateCommunityAction';
import { getUserCommunity, getOneCommunity } from '../../../store/actions/CommuitiesAction';
import { LinearTextGradient } from 'react-native-text-gradient';
import { trackWithMixPanel }  from '../../../helper/Mixpanel';

//Icon
import TopicIcon from '../../../assets/communitiesAssets/ic-topics.svg';

//Components
import CreateCommunityHeader from '../../../components/communityComponent/CreateCommunityHeader';
import CreateCommunityTopicInput from '../../../components/communityComponent/CreateCommunityTopicInput';
import CreateCommunityProgress from '../../../components/communityComponent/CreateCommunityProgress';
import Button from '../../../components/publicComponents/Button';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const CreateCommunityTopicScreen = ({ navigation, route }) => {
  const userId = useSelector((state) => state.HomeReducer.user.id);
  const {
    communityId,
    communityTopicsEdit,
  } = route.params;

  let topicValues = communityTopicsEdit ? communityTopicsEdit.map(el => ({name: el.name, value: el.name, id: el.id}))
  : [{ name: 'topic name', value: '', id: 1 }];

  const [inputList, setInputList] = useState(topicValues);

  const [topic, setTopic] = useState(communityTopicsEdit ? communityTopicsEdit.map(el => el.name) : []);
  const [inputHolder, setInputHolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const communityImage = useSelector(
    (state) => state.CreateCommunityReducer.communityImage,
  );
  const communityName = useSelector(
    (state) => state.CreateCommunityReducer.communityName,
  );
  const communityDescription = useSelector(
    (state) => state.CreateCommunityReducer.communityDescription,
  );
  const communityGuideline = useSelector(
    (state) => state.CreateCommunityReducer.communityGuideline,
  );
  const communityType = useSelector(
    (state) => state.CreateCommunityReducer.communityType,
  );

  const dispatch = useDispatch();

  const addTopic = (id) => {
    if (inputHolder.trim() !== '') {
      setTopic((prevValue) => [...prevValue, inputHolder]);
      inputList.forEach((data) => {
        if (data.id === id) {
          data.value = inputHolder;
        }
      });
      setInputHolder('');
    }
  };

  const inputTopic = (value) => {
    setInputHolder(value);
  };

  const removeTopic = (id) => {
    if (inputList.length > 1) {
      setInputList(inputList.filter((value) => value.id !== id));
      setTopic(topic.filter((value, index) => index !== id - 1));
    } else {
      setInputList([
        {
          name: 'topic name',
          value: '',
          id: 1,
        },
      ]);
      setTopic([]);
    }
  };

  const addInputList = () => {
    let newInputData = {
      name: 'topic name',
      value: '',
      id: inputList[inputList.length - 1].id + 1,
    };

    setInputList((prevValue) => [...prevValue, newInputData]);
  };

  const createCommunity = async () => {
    try {
      setIsLoading(true);
      let access_token = await AsyncStorage.getItem('access_token');

      let formData = new FormData();

      let filename = communityImage.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append('name', communityName);
      formData.append('description', communityDescription);
      formData.append('guidelines', communityGuideline);
      formData.append('type', communityType);
      formData.append('topicArr', JSON.stringify(topic));
      communityImage !== '' &&
        formData.append('image_path', {
          uri: communityImage,
          name: filename,
          type,
        });
      let linkSend = `${BaseUrl}/communities/${communityId ? 'edit/' + communityId : 'create'}`;
      let methodSend = communityId ? 'PUT' : 'POST';
      let createCommunityRequest = await axios({
        method: methodSend,
        url: linkSend,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: access_token,
        },
        data: formData,
      });
      if (createCommunityRequest.data) {
        setIsLoading(false);
        dispatch(clearData());
        if (communityId) {
          await dispatch(getOneCommunity(communityId));
          trackWithMixPanel('Community: Edited A Community', {
            distinct_id: userId,
            'Community Guideline': communityType,
            'Community Type': communityType === 1 ? 'Public' : 'Private',
            'Community Description': communityDescription,
            'Community Name': communityName,
            'Community Topic': topic,
          });
          return navigation.navigate('CommunitiesNavigation', {
            screen: 'CommunityProfileScreen',
            params: {
              communityId,
            },
          });
        }
        trackWithMixPanel('Community: Created A Community', {
          distinct_id: userId,
          'Community Guideline': communityType,
          'Community Type': communityType === 1 ? 'Public' : 'Private',
          'Community Description': communityDescription,
          'Community Name': communityName,
          'Community Topic': topic,
        });
        dispatch(createdCommunityMessage(true));
        dispatch(getUserCommunity());
        navigation.navigate('CommunitiesScreen');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const RemoveButton = (id) => {
    return (
      <TouchableOpacity onPress={() => removeTopic(id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    );
  };

  const AddTopicButton = () => {
    return (
      <TouchableOpacity
        onPress={() => addInputList()}
        style={styles.addTopicButtonStyle}>
        <Text style={styles.addTopicTextStyle}>Add more topic</Text>
      </TouchableOpacity>
    );
  };

  const CommunityInput = (item, index) => {
    return (
      <View key={index}>
        <View style={styles.topicInputAndDisplayContainerStyle}>
          <View style={styles.topicInputContainerStyle}>
            <View
              style={
                item.value !== ''
                  ? { ...styles.topicIconStyle, marginTop: '5%' }
                  : styles.topicIconStyle
              }>
              <TopicIcon />
            </View>
            {item.value !== '' ? (
              <LinearTextGradient
                style={{
                  fontFamily: normal,
                  fontSize: CalculateHeight(3),
                  marginLeft: '7.5%',
                }}
                locations={[0, 1]}
                colors={['#5051DB', '#7E37B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.topicDisplayStyle}>{item.value}</Text>
              </LinearTextGradient>
            ) : (
              <CreateCommunityTopicInput
                placeholder={item.name}
                customStyle={{
                  fontSize: CalculateHeight(3),
                  width: '75%',
                  marginLeft: '2%',
                }}
                inputFunction={inputTopic}
                onBlur={() => addTopic(item.id)}
              />
            )}
          </View>
          {item.value !== '' && <>{RemoveButton(item.id)}</>}
        </View>
        {item.value !== '' &&
          index + 1 === inputList.length &&
          topic.length < 25 && <>{AddTopicButton()}</>}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <CreateCommunityHeader navigation={navigation} />
          <View style={styles.createCommunityTopicContainerStyle}>
            <ScrollView>
              <View style={styles.inputListContainerStyle}>
                {inputList.map(CommunityInput)}
              </View>
            </ScrollView>
            <View style={styles.footerContainerStyle}>
              <CreateCommunityProgress stepNumber={4} />
              {topic.length > 0 && (
                <Button
                  buttonStyle={{
                    color: '#FFFFFF',
                    backgroundColor: '#5152D0',
                    borderWidth: 0,
                    width: '25%',
                    marginBottom: 0,
                    fontSize: 15,
                    padding: 0,
                    paddingVertical: '1%',
                  }}
                  buttonTitle="Save"
                  buttonFunction={createCommunity}
                />
              )}
            </View>
          </View>
          {isLoading && <LoadingSpinner />}
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  createCommunityTopicContainerStyle: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },

  inputListContainerStyle: {
    marginTop: '20%',
    paddingBottom: '20%',
  },

  topicInputAndDisplayContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '7%',
  },

  topicInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  topicIconStyle: {
    marginTop: '2.5%',
  },

  topicDisplayStyle: {
    marginLeft: '10%',
    fontSize: CalculateHeight(3),
  },

  footerContainerStyle: {
    height: '8%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  addTopicButtonStyle: {
    marginTop: '5%',
    marginLeft: '3%',
  },

  addTopicTextStyle: {
    fontSize: CalculateHeight(2),
    fontFamily: normal,
    color: '#5152D0',
  },

  removeButton: {
    color: '#73798C',
    fontFamily: normal,
  },
});

export default CreateCommunityTopicScreen;
