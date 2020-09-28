import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { bold, normal, medium } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import DiscussionScreenDiscussionCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenDiscussionCard';

const DiscussionScreen = ({ route, navigation }) => {
  const [accessToken, setAcessToken] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profileName, setProfileName] = useState('');
  const [postTime, setPostTime] = useState('');
  const [like, setLike] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [replies, setReplies] = useState('');
  const [plays, setPlays] = useState('');
  const [recordingFile, setRecordingFile] = useState('');

  const {
    discussionId
  } = route.params;

  const getDiscussion = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        setAcessToken(access_token);
        let getDiscussionRequest = await axios({
          url: `https://dev.entervalhalla.tech/api/tannoi/v1/discussions/single/${discussionId}`,
          method: 'get',
          headers: {
            'token': access_token
          }
        });
        
        setProfilePicture(getDiscussionRequest.data.creator.profile_photo_path);
        setProfileName(getDiscussionRequest.data.creator.name);
        setPostTime(getDiscussionRequest.data.created_at);
        setLike(getDiscussionRequest.data.likes);
        setDiscussionTitle(getDiscussionRequest.data.title);
        setHashtags(getDiscussionRequest.data.hashtags);
        setReplies(getDiscussionRequest.data.response_count);
        setPlays(getDiscussionRequest.data.play_count);
        setRecordingFile(getDiscussionRequest.data.voice_note_path);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDiscussion();
  }, []);

  return (
    <View style={styles.discussionScreenContainerStyle}>
      <View style={styles.discussionUpperBarStyle}>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0
          }}
        />
        <TouchableOpacity
          style={styles.addResponseButtonStyle}
        >
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity>
      </View>
      <DiscussionScreenDiscussionCard
        profilePicture={profilePicture}
        profileName={profileName}
        postTime={postTime}
        like={like}
        discussionTitle={discussionTitle}
        hashtags={hashtags}
        replies={replies}
        plays={plays}
        recordingFile={recordingFile}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  discussionScreenContainerStyle: {
    flex: 1
  },

  discussionUpperBarStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },

  addResponseButtonStyle: {
    color: "#0E4EF4",
    fontSize: 16
  },

  addResponseButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  }
});

export default DiscussionScreen;