import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  PermissionsAndroid,
  addResponseForResponse
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Icons
import RecordButton from '../../../assets/topicAssets/recordButton.svg';

//Components
import FormInput from '../../publicComponents/FormInput';
import Recorder from '../Recorder';

const AddResponse = props => {
  const [recordingFile, setRecordingFile] = useState('');
  const [caption, setCaption] = useState('');

  const {
    openAddResponseModal,
    closeAddResponseModal,
    discussionId,
    getResponse,
    responseId,
    addResponseForResponse
  } = props;

  const createResponse = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      console.log('masuk sini ')

      const uri = `file://${recordingFile}`;

      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];
      
      let formData = new FormData();
      
      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`
      });
      
      formData.append('caption', caption);

      if (addResponseForResponse) {
        formData.append('response_id', responseId)
      };

      let createResponseRequest = await axios({
        method: 'post',
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/${discussionId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': access_token
        },
        data: formData
      });

      console.log(createResponseRequest.data);

      if (createResponseRequest.data) {
        getResponse();
        closeAddResponseModal();
      };
    } catch (error) {
      console.log(error.response);
    }
  };

  const addRecordingFile = recordingFileInput => {
    setRecordingFile(recordingFileInput);
  };

  const inputCaption = captionInput => {
    setCaption(captionInput);
  };

  const playRecording = () => {
    setRecordingFile('/data/user/0/tannoi.client/files/responseRecord.mp4');
    clearTimer();

    player.playPause((error, paused) => {
      console.log(error);
    });
  };

  const stopPlayer = () => {
    player.stop((error) => {
      console.log(error);
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={openAddResponseModal}
      transparent={true}
    >
      <View style={styles.backgroundShadowStyle}>
        <TouchableOpacity style={{flex: 1}} onPress={() => closeAddResponseModal()} />
      </View>
      <View style={{flex: 1}} />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.addResponseModalStyle}>
          <View style={styles.titleAndPublishButtonContainerStyle}>
            <Text style={styles.addResponseTitleStyle}>Add response</Text>
            <TouchableOpacity
              onPress={() => createResponse()}
            >
              <Text style={styles.publishButtonTextStyle}>Publish</Text>
            </TouchableOpacity>
          </View>
          <FormInput
            formInputTitle="Add caption (Optional)"
            dataInput={inputCaption}
          />
          <Recorder
            addRecordingFile={addRecordingFile}
            recorderStyle={{marginTop: "30%"}}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundShadowStyle: {
    position: "absolute",
    backgroundColor:'rgba(0,0,0,0.8)',
    height:"100%",
    width: "100%"
  },

  addResponseModalStyle: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 55
  },

  titleAndPublishButtonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  addResponseTitleStyle: {
    fontSize: 20,
    fontFamily: bold,
    color: "#464D60"
  },

  publishButtonTextStyle: {
    fontSize: 16,
    color: "#0E4EF4",
    fontFamily: bold
  },

  addResponseRecorderContainerStyle: {
    marginTop: "30%",
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

export default AddResponse;