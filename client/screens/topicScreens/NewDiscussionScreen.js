import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { Picker } from '@react-native-community/picker';
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Icon
import RecordButton from '../../assets/topicAsset/recordButton.svg';

//Component
import BackButton from '../../components/PublicComponent/BackButton';
import FormInput from '../../components/PublicComponent/FormInput';

const NewDiscussionScreen = ({ navigation }) => {
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Select topic');
  const [hashtags, setHashtags] = useState([]);
  const [disableButton, setDissableButton] = useState(false);
  const [recordingFile, setRecordingFile] = useState('');

  const discussionTitleInput = input => {
    setDiscussionTitle(input);
  };

  const hashtagsInput = input => {
    setHashtags([input]);
  };

  const createNewDiscussion =  async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      
      const uri = `file:/${recordingFile}`
    
      let formData = new FormData();

      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];
      
      formData.append('title', discussionTitle);

      formData.append('topic_id', '1');

      formData.append('status', '1');

      formData.append('hashtag', hashtags);

      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/x-${fileType}`
      });


      console.log(formData._parts)

      let createNewDiscussionRequest = await axios({
        method: 'post',
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/discussions',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': access_token
        },
        data: formData
      });

      console.log(createNewDiscussionRequest.data);
    } catch (error) {
      console.log(error.message)
    }
  };

  const checkPermission = async () => {
    if (Platform.OS !== 'android') {
        return Promise.resolve(true);
    }

    let result;
    try {
        result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, { title:'Microphone Permission', message:'Enter the Gunbook needs access to your microphone so you can search with voice.' });
    } catch(error) {
        console.error('failed getting permission, result:', result);
    }
    console.log('permission result:', result);
    return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
  }

  const voiceRecord = () => {
    checkPermission();
    setDissableButton(true);

    // Start recording
    let rec = new Recorder("filename.mp4a").record();

    // Stop recording after approximately 3 seconds
    setTimeout(() => {
      console.log(rec)
      rec.stop((err) => {
        setDissableButton(false);
        setRecordingFile(rec._fsPath);
        // NOTE: In a real situation, handle possible errors here

        // Play the file after recording has stopped
        new Player("filename.mp4a")
        .play()
        .on('ended', () => {
          // Enable button again after playback finishes
        });
      });
    }, 3000);
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
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <FormInput
              formInputTitle="Add hashtags"
              dataInput={hashtagsInput}
            />
            <View style={styles.newDiscussionRecorderContainerStyle}>
              <TouchableOpacity
                disabled={disableButton}
                onPress={() => voiceRecord()}
              >
                <RecordButton />
              </TouchableOpacity>
            </View>
          </View>
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
    paddingBottom: "5%"
  }
});

export default NewDiscussionScreen;