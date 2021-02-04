import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { GlobalPadding } from '../../constants/Size';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';
import { bold, normal } from '../../assets/FontSize';
import { Picker } from '@react-native-community/picker';

//Components
import Header from '../../components/publicComponents/Header';
import BackButton from '../../components/publicComponents/BackButton';
import Card from '../../components/publicComponents/Card';
import FormInput from '../../components/publicComponents/FormInput';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';
import Recorder from '../../components/publicComponents/Recorder';
import ErrorMessage from '../../components/publicComponents/ErrorMessage';

const NewCommunityDiscussionScreen = (props) => {
  const { navigation, route } = props;

  const { communityId, communityTopics } = route.params;

  const [recordingFile, setRecordingFile] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Select topic');
  const [isLoading, setIsLoading] = useState(false);

  const addRecordingFile = (recordingFileInput) => {
    setRecordingFile(recordingFileInput);
  };

  const removeRecordingFile = () => {
    setRecordingFile('');
  };

  const discussionTitleInput = (value) => {
    setDiscussionTitle(value);
  };

  const createCommunityDiscussion = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      const uri = `file://${recordingFile}`;

      let formData = new FormData();

      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];

      formData.append('title', discussionTitle.trim());

      formData.append('community_topic_id', selectedTopic);

      formData.append('status', '1');

      formData.append('type', '1');

      formData.append('community_id', communityId);

      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`,
      });

      let createCommunityDiscussionRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/discussions`,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: access_token,
        },
        data: formData,
      });

      if (createCommunityDiscussionRequest.data) {
        console.log(createCommunityDiscussionRequest.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.backButtonAndTitleContainerStyle}>
          <BackButton
            navigation={navigation}
            styleOption={{
              marginTop: 0,
              marginBottom: 0,
              marginRight: '5%',
            }}
          />
          <Text style={styles.headerTextStyle}>New community discussion</Text>
        </View>
        <TouchableOpacity>
          <Text
            onPress={createCommunityDiscussion}
            style={styles.publishButtonTextStyle}>
            Publish
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const NewCommunityDiscussionForm = () => {
    return (
      <>
        <Recorder
          addRecordingFile={addRecordingFile}
          removeRecordingFile={removeRecordingFile}
        />
        <View style={styles.inputContainerStyle}>
          <FormInput
            formInputTitle="Discussion title"
            dataInput={discussionTitleInput}
            capitalize={true}
          />
          <Picker
            selectedValue={selectedTopic}
            style={styles.topicPickerStyle}
            selectedValue={selectedTopic}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTopic(itemValue)
            }>
            <Picker.Item label="Select topic" value="Select topic" />
            {communityTopics.map((topic, index) => (
              <Picker.Item key={index} label={topic.name} value={topic.id} />
            ))}
          </Picker>
        </View>
      </>
    );
  };

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.newCommunityDiscussionContainerStyle}>
        <Card
          child={NewCommunityDiscussionForm}
          customStyle={styles.newCommunityDiscussionFormStyle}
        />
      </View>
      {isLoading && <LoadingSpinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTextStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2.25),
    color: '#464D60',
  },

  publishButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
    fontFamily: bold,
  },

  newCommunityDiscussionContainerStyle: {
    marginHorizontal: GlobalPadding,
  },

  newCommunityDiscussionFormStyle: {
    marginTop: '2%',
    borderRadius: 8,
    padding: '5%',
  },

  inputContainerStyle: {
    marginTop: '10%',
  },

  topicPickerStyle: {
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(1.5),
    marginBottom: '5%',
    marginTop: '5%',
    marginLeft: -CalculateWidth(1.5),
    fontFamily: normal,
    color: '#73798C',
  },
});

export default NewCommunityDiscussionScreen;
