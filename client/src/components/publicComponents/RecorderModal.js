import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  // Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
import { CalculateHeight } from '../../helper/CalculateSize';

//Components
import Modal from '../../components/publicComponents/Modal';
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
    forCommunity,
    joinCommunity,
    isCommunityDiscussion,
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
          dispatch(getDiscussion(discussionId, null, isCommunityDiscussion));
          dispatch(getResponse(discussionId));
        }
        setRecordingFile('');
        setCaption('');
        closeModal(openModalFromHeader);
        scrollDown && scrollDown();
      }
    } catch (error) {
      console.log(error.response.data.msg);
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

  const removeRecordingFile = () => {
    setRecordingFile('');
  };

  const onClose = () => {
    closeModal();
    setRecordingFile('');
    setCaption('');
    setValidation(false);
  };

  return (
    <Modal
      animation="slide"
      customContainerStyle={{ justifyContent: 'flex-end' }}
      customStyle={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      openModal={openModal}
      closeModal={() => onClose()}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentContainerStyle}>
          <View style={styles.titleAndPublishButtonContainerStyle}>
            <Text style={styles.addResponseTitleStyle}>
              {forCommunity
                ? 'Send a community join request'
                : forBio
                ? 'Record audio bio'
                : 'Add response'}
            </Text>
            <TouchableOpacity
              disabled={recordingFile !== '' ? false : true}
              onPress={() =>
                forCommunity
                  ? joinCommunity(recordingFile)
                  : forBio
                  ? setBioFile(recordingFile)
                  : createResponse()
              }>
              <Text
                style={
                  recordingFile !== ''
                    ? styles.publishButtonTextStyle
                    : { ...styles.publishButtonTextStyle, color: '#cccccc' }
                }>
                {forCommunity ? 'Submit' : forBio ? 'Save' : 'Publish'}
              </Text>
            </TouchableOpacity>
          </View>
          {!forBio && !forCommunity && (
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
            removeRecordingFile={removeRecordingFile}
          />
        </View>
      </TouchableWithoutFeedback>
      {isLoading && <LoadingSpinner />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: '20%',
    width: '100%'
  },
  titleAndPublishButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },

  addResponseTitleStyle: {
    fontSize: CalculateHeight(2.5),
    fontFamily: bold,
    color: '#464D60',
    width: '80%',
  },

  publishButtonTextStyle: {
    fontSize: CalculateHeight(2),
    color: '#0E4EF4',
    fontFamily: bold,
  },
});

export default RecorderModal;
