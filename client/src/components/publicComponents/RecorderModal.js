import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { bold } from '../../assets/FontSize';
import { useDispatch } from 'react-redux';
import { getHome, clearHome } from '../../store/actions/HomeAction';
import { getDiscussion } from '../../store/actions/DiscussionAction';
import {
  getResponse,
  getSingleResponse,
  getResponseData,
} from '../../store/actions/ResponseAction';
import { userLogout } from '../../store/actions/LoginAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Components
import FormInput from './FormInput';
import Recorder from './Recorder';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const RecorderModal = (props) => {
  const [recordingFile, setRecordingFile] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);

  const dispatch = useDispatch();

  const {
    openModal,
    closeModal,
    discussionId,
    responseId,
    addResponseForResponse,
    addResponseForResponseInResponseScreen,
    responseScreenResponseId,
    forBio,
    setBioFile,
    openModalFromHeader,
    dataForUpdate,
    scrollDown,
  } = props;

  const createResponse = async () => {
    try {
      setIsLoading(true);

      let access_token = await AsyncStorage.getItem('access_token');

      const uri = `file://${recordingFile}`;

      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];

      let formData = new FormData();

      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`,
      });

      formData.append('caption', caption.trim());

      if (addResponseForResponse) {
        formData.append('response_id', responseId);
      }

      let createResponseRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/responses/${discussionId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: access_token,
        },
        data: formData,
      });

      if (createResponseRequest.data) {
        setIsLoading(false);
        setValidation(false);
        if (addResponseForResponse) {
          dispatch(getResponseData(responseId, dataForUpdate));
          responseScreenResponseId &&
            dispatch(getSingleResponse(responseScreenResponseId));
        } else {
          dispatch(getDiscussion(discussionId));
          dispatch(getResponse(discussionId));
        }
        setRecordingFile('');
        setCaption('');
        closeModal(openModalFromHeader);
        scrollDown && scrollDown();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setValidation(true);
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      }
    }
  };

  const addRecordingFile = (recordingFileInput) => {
    setRecordingFile(recordingFileInput);
  };

  const inputCaption = (captionInput) => {
    setCaption(captionInput);
  };

  return (
    <Modal animationType="slide" visible={openModal} transparent={true}>
      <View style={styles.backgroundShadowStyle}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            closeModal();
            setRecordingFile('');
            setCaption('');
            setValidation(false);
          }}
        />
      </View>
      <View style={{ flex: 1 }} />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.addResponseModalStyle}>
          <View style={styles.contentContainerStyle}>
            <View style={styles.titleAndPublishButtonContainerStyle}>
              <Text style={styles.addResponseTitleStyle}>
                {forBio ? 'Record audio bio' : 'Add response'}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  forBio ? setBioFile(recordingFile) : createResponse()
                }>
                <Text style={styles.publishButtonTextStyle}>
                  {forBio ? 'Save' : 'Publish'}
                </Text>
              </TouchableOpacity>
            </View>
            {!forBio && (
              <FormInput
                formInputTitle="Add caption (optional)"
                dataInput={inputCaption}
                capitalize={true}
              />
            )}
            {validation && (
              <ErrorMessage message="All fields must be filled in, including a voice note!" />
            )}
            <Recorder
              addRecordingFile={addRecordingFile}
              openModal={openModal}
            />
          </View>
          {isLoading && <LoadingSpinner />}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundShadowStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '100%',
    width: '100%',
  },

  addResponseModalStyle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  contentContainerStyle: {
    padding: 20,
    paddingBottom: 55,
  },

  titleAndPublishButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addResponseTitleStyle: {
    fontSize: 20,
    fontFamily: bold,
    color: '#464D60',
  },

  publishButtonTextStyle: {
    fontSize: 16,
    color: '#0E4EF4',
    fontFamily: bold,
  },
});

export default RecorderModal;
