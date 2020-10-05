import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold, normal, medium } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Profile picture example
import ProfilePictureExample from '../../assets/publicAssets/bigProfilePicture.png';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import DiscussionScreenDiscussionCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenDiscussionCard';
import DiscussionScreenPlayerCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import AddResponse from '../../components/topicComponents/discussionScreenComponents/AddResponse';
import ClosedCard from '../../components/topicComponents/discussionScreenComponents/ClosedCard';

const DiscussionScreen = ({ route, navigation }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [profileName, setProfileName] = useState('');
  const [postTime, setPostTime] = useState('');
  const [like, setLike] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [replies, setReplies] = useState('');
  const [plays, setPlays] = useState('');
  const [recordingFile, setRecordingFile] = useState('');
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [response, setResponse] = useState('');
  const [selectedCard, setSelectedCard] = useState('discussion');

  // const {
  //   discussionId
  // } = route.params;

  const closeAddResponseModal = () => {
    setOpenAddResponseModal(false);
  };

  const getDiscussion = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        getResponse();
        let getDiscussionRequest = await axios({
          url: `https://dev.entervalhalla.tech/api/tannoi/v1/discussions/single/95`,
          method: 'get',
          headers: {
            'token': access_token
          }
        });

        if (getDiscussionRequest.data) {
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
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getResponse = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getResponseRequest = await axios({
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/discussion/95?page=1`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getResponseRequest.data) {
        console.log(getResponseRequest.data.data);
        setResponse(getResponseRequest.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const selectCard = cardId => {
    setSelectedCard(cardId);
  };

  useEffect(() => {
    getDiscussion();
  }, []);

  return (
    <View>
      {
        openAddResponseModal && <View style={{backgroundColor: "rgba(0,0,0,0.8)", height: "100%"}}></View>
      }
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
          onPress={() => setOpenAddResponseModal(true)}
        >
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={response}
        listKey={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.discussionScreenContainerStyle}>
            {
              selectedCard === 'discussion' ? (
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
              ) : (
                <ClosedCard
                  profilePicture={ProfilePictureExample}
                  name={profileName}
                  cardId="discussion"
                  selectCard={selectCard}
                />
              )
            }
            <AddResponse
              openAddResponseModal={openAddResponseModal}
              closeAddResponseModal={closeAddResponseModal}
              discussionId="95"
            />
          </View>
        }
        renderItem={itemData => (
          <>
            {
              selectedCard === itemData.item.id ? (
                <DiscussionScreenPlayerCard
                  cardType="response"
                  profilePicture={profilePicture}
                  recordingFile={itemData.item.voice_note_path}
                />
              ) : (
                <ClosedCard
                  profilePicture={ProfilePictureExample}
                  cardId={itemData.item.id}
                  selectCard={selectCard}
                />
              )
            }
          </>
        )}
        ListFooterComponent={
          <View style={{height: 100}} />
        }
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