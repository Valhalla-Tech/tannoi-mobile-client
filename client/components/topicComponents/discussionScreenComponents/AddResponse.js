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
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Icons
import RecordButton from '../../../assets/topicAssets/recordButton.svg';

//Component
import FormInput from '../../publicComponents/FormInput';

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

      let addResponseForResponseUrl = '';

      if (addResponseForResponse) {
        console.log('masuk sini')
        addResponseForResponseUrl = `/${responseId}`;
      };

      let createResponseRequest = await axios({
        method: 'post',
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/${discussionId}${addResponseForResponseUrl}`,
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
        updateResponseId('');
        updateAddResponseForResponse(false);
      };
    } catch (error) {
      console.log(error.response);
    }
  };


  let rec = new Recorder("responseRecord.mp4");
  let player = new Player("file:///data/user/0/tannoi.client/files/responseRecord.mp4", {autoDestroy: false});

  let countDown;

  const checkPermission = async () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    let result;
    try {
        result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, { title:'Microphone Permission', message:'Tannoi needs access to your microphone to use voice feature.' });

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
    } catch(error) {
        console.error('failed getting permission, result:', result);
        return false
    }
  }

  const recordingTimer = option => {
      countDown = setTimeout(() => {
        voiceRecord(true);
      }, 30000);
  };
  
  const clearTimer = () => {
    clearTimeout(countDown);
  }

  const reloadRecorder = () => {
    if (rec) {
      rec.destroy();
    }

    rec = new Recorder("responseRecord.mp4"); 
  };

  const reloadPlayer = () => {
    if (player) {
      player.destroy();
    }

    let player = new Player("file:///data/user/0/tannoi.client/files/responseRecord.mp4", {autoDestroy: false});
  };

  const voiceRecord = toggleFromTimer => {
    if (player) {
      player.destroy();
    }
    
    let permission = checkPermission();
    
    permission.then((hasPermission) => {
      if (toggleFromTimer && rec.isRecording) {

        rec.toggleRecord((error, stopped) => {
          if (stopped) {
            reloadPlayer();
            reloadRecorder();
          }
          
          playRecording();
        });
      } else if (!toggleFromTimer) {
        rec.toggleRecord((error, stopped) => {
          if (stopped) {
            reloadPlayer();
            reloadRecorder();
          }
          
        });

        if (rec.isRecording) {
          playRecording();
        } else {
          recordingTimer();
        };
      }
    })
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
          <View style={styles.addResponseRecorderContainerStyle}>
            <TouchableOpacity
              onPress={() => recordingFile && stopPlayer() }
            >
              <View style={styles.stopButtonStyle}>
                <Text style={styles.stopButtonTextStyle}>Stop</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => voiceRecord(false)}
            >
              <RecordButton />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => recordingFile && playRecording() }
            >
              <View style={styles.playOrPauseButtonStyle}>
                <Text style={styles.playOrPauseButtonTextStyle}>Play / Pause</Text>
              </View>
            </TouchableOpacity>
          </View>
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