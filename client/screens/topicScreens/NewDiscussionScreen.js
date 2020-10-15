import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { bold, normal, medium } from '../../assets/FontSize';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { getTopic } from '../../store/actions/GetTopicAction';
import axios from 'axios';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import FormInput from '../../components/publicComponents/FormInput';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';
import Recorder from '../../components/topicComponents/Recorder';

const NewDiscussionScreen = ({ navigation }) => {
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Select topic');
  const [hashtags, setHashtags] = useState([]);
  const [hashtagsFormDisplay, setHashtagsFormDisplay] = useState('');
  const [recordingFile, setRecordingFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const topics = useSelector(state => state.GetTopicReducer.topics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopic());
  }, [])

  const discussionTitleInput = input => {
    setDiscussionTitle(input);
  };

  const hashtagsInput = input => {
    let hashtagArray = [];
    let hashtagDisplay = '';
    let hashtag = '';

    for (let hashtagInputIndex = 0; hashtagInputIndex < input.length; hashtagInputIndex++) {
      if (input[hashtagInputIndex] === ' ') {
        if (hashtag[0] === '#') {
          hashtagDisplay += hashtag;
          hashtagArray.push(hashtag);
        } else {
          hashtagDisplay += `#${hashtag} `;
          hashtagArray.push(`#${hashtag}`);
        }
        hashtag = '';
      } else {
        hashtag += input[hashtagInputIndex];
      };
    };
    
    if (hashtag[0] === '#') {
      hashtagDisplay += hashtag;
      hashtagArray.push(hashtag);
    } else {
      hashtagDisplay += `#${hashtag} `;
      hashtagArray.push(`#${hashtag}`);
    }
    hashtag = '';

    setHashtags(hashtagArray);
    setHashtagsFormDisplay(hashtagDisplay);
  };

  const createNewDiscussion =  async () => {
    try {
      setIsLoading(true);

      let access_token = await AsyncStorage.getItem('access_token');
      
      const uri = `file://${recordingFile}`
    
      let formData = new FormData();

      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];
      
      formData.append('title', discussionTitle);

      formData.append('topic_id', selectedTopic);

      formData.append('status', '1');

      formData.append('hashtag', JSON.stringify(hashtags));

      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`
      });

      let createNewDiscussionRequest = await axios({
        method: 'post',
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/discussions',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': access_token
        },
        data: formData
      });

      if (createNewDiscussionRequest.data) {
        setIsLoading(false);
        console.log(createNewDiscussionRequest.data);
        navigation.navigate('DiscussionScreen', {
          discussionId: createNewDiscussionRequest.data.id
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const addRecordingFile = recordingFileInput => {
    setRecordingFile(recordingFileInput);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.newDiscussionContainerStyle}>
          <View style={styles.newDiscussionUpperBarStyle}>
            <View style={styles.backButtonAndTitleContainerStyle}>
              <BackButton
                navigation={navigation}
                styleOption={{
                  marginTop: 0,
                  marginBottom: 0
                }}
              />
              <Text style={styles.newDiscussionTitleStyle}>New discussion</Text>
            </View>
            <TouchableOpacity
              onPress={() => createNewDiscussion()}
            >
              <Text style={styles.publishButtonTextStyle}>Publish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newDiscussionFormContainerStyle}>
            <FormInput
              formInputTitle="Discussion title"
              dataInput={discussionTitleInput}
            />
            <Text style={styles.formInputTitleStyle}>Topic</Text>
            <Picker
              selectedValue={selectedTopic}
              style={styles.topicPickerStyle}
              selectedValue={selectedTopic}
              onValueChange={(itemValue, itemIndex) => setSelectedTopic(itemValue)}
            >
              <Picker.Item label="Select topic" value="Select topic" />
              { 
                topics.map((topic, index) => (
                  <Picker.Item key={index} label={topic.name} value={topic.id} />
                ))
              }
            </Picker>
            <FormInput
              formInputTitle="Add hashtags"
              dataInput={hashtagsInput}
            />
            <Recorder
              addRecordingFile={addRecordingFile}
            />
          </View>
          {
            isLoading && (
              <LoadingSpinner />
            )
          }
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  newDiscussionContainerStyle: {
    flex: 1
  },

  newDiscussionUpperBarStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  newDiscussionTitleStyle: {
    fontFamily: bold,
    fontSize: 20,
    color: "#464D60",
    marginLeft: 14
  },

  publishButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  },

  newDiscussionFormContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 4
  },

  formInputTitleStyle: {
    color: "#73798C",
    fontFamily: normal,
    fontSize: 14,
    marginBottom: 12
  },

  topicPickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: 24,
    fontFamily: normal,
    color: "#73798C"
  },

  newDiscussionRecorderContainerStyle: {
    marginTop: "50%",
    alignItems: "center",
    paddingBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-around"
  },

  stopButtonStyle: {
    borderWidth: 1,
    padding: "5%",
    borderRadius: 10,
    borderColor: "#de181f",
    height: 40,
    width: 100
  },

  stopButtonTextStyle: {
    color: "#de181f",
    fontFamily: bold,
    textAlign: "center"
  },
  
  playOrPauseButtonStyle: {
    borderWidth: 1,
    padding: "5%",
    borderRadius: 10,
    borderColor: "#5152D0",
    height: 40,
    width: 100
  },

  playOrPauseButtonTextStyle: {
    color: "#5152D0",
    fontFamily: bold,
    textAlign: "center"
  }
});

export default NewDiscussionScreen;