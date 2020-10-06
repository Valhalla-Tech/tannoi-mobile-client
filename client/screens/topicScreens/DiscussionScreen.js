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
  const [nextPlayerAvailable, setNextPlayerAvailable] = useState(false);
  const [stopPlayer, setStopPlayer] = useState(false);

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
          url: `https://dev.entervalhalla.tech/api/tannoi/v1/discussions/single/1`,
          method: 'get',
          headers: {
            'token': access_token
          }
        });

        if (getDiscussionRequest.data) {
          if (getDiscussionRequest.data.response_count !== 0) {
            setNextPlayerAvailable(true)
          };

          setProfilePicture(getDiscussionRequest.data.creator.profile_photo_path);
          setProfileName(getDiscussionRequest.data.creator.name);
          setPostTime(convertPostTime(getDiscussionRequest.data.created_at));
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
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/discussion/1?page=1`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getResponseRequest.data) {
        setResponse(getResponseRequest.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getResponseLike = responseId => {
    let like;

    response.forEach(response => {
      if (response.id === responseId) {
        like = response.likes
      }
    });

    return like;
  };

  const selectCard = cardIndex => {
    setSelectedCard(cardIndex);
  };

  const changePlayer = (cardIndex, action) => {
    if (cardIndex === 'discussion' && action === 'next') {
      setSelectedCard(0);
    } else if (cardIndex === 0 && action === 'previous') {
      setSelectedCard('discussion')
    } else if (action === 'next') {
      let numberedCardIndex = Number(cardIndex);
      setSelectedCard(numberedCardIndex + 1)
    }
  };

  const convertPostTime = postTimeInput => {
    let postTimeToNewDate = new Date(postTimeInput);
    let postTimeToGMTString = postTimeToNewDate.toGMTString();
    let postTimeToNewDateSplitted = postTimeToGMTString.split(' ');
    
    
    let date = postTimeToNewDateSplitted[1];
    let month = postTimeToNewDateSplitted[2];
    let year = postTimeToNewDateSplitted[3];
    let time = postTimeToNewDateSplitted[4].substring(0, 5);
    
    if (date[0] === '0') {
      date = date[1]
    }

    return `${date} ${month} ${year}, ${time}`;
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
                  getDiscussion={getDiscussion}
                  discussionId="1"
                  nextPlayerAvailable={nextPlayerAvailable}
                  changePlayer={changePlayer}
                  cardIndex="discussion"
                />
              ) : (
                <ClosedCard
                  profilePicture={profilePicture}
                  profileName={profileName}
                  cardIndex="discussion"
                  selectCard={selectCard}
                  postTime={postTime}
                />
              )
            }
            <AddResponse
              openAddResponseModal={openAddResponseModal}
              closeAddResponseModal={closeAddResponseModal}
              discussionId="1"
              getResponse={getResponse}
            />
          </View>
        }
        renderItem={itemData => (
          <>
            {
              selectedCard === itemData.index ? (
                <DiscussionScreenPlayerCard
                  cardType="response"
                  profilePicture={itemData.item.user.profile_photo_path}
                  recordingFile={itemData.item.voice_note_path}
                  like={itemData.item.likes}
                  responseId={itemData.item.id}
                  getResponseLike={getResponseLike}
                  getResponseFromDiscussion={getResponse}
                  nextPlayerAvailable={nextPlayerAvailable}
                  cardIndex={itemData.index}
                  cardLength={response.length}
                  postTime={postTime}
                />
              ) : (
                <ClosedCard
                  profilePicture={itemData.item.user.profile_photo_path}
                  cardIndex={itemData.index}
                  selectCard={selectCard}
                  profileName={itemData.item.user.name}
                  postTime={postTime}
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