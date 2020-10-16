import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import DiscussionScreenDiscussionCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenDiscussionCard';
import DiscussionScreenPlayerCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import AddResponse from '../../components/topicComponents/discussionScreenComponents/AddResponse';
import ClosedCard from '../../components/topicComponents/discussionScreenComponents/ClosedCard';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';

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
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [response, setResponse] = useState('');
  const [selectedCard, setSelectedCard] = useState('discussion');
  const [nextPlayerAvailable, setNextPlayerAvailable] = useState(false);
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);

  const {
    discussionId
  } = route.params;

  const closeAddResponseModal = () => {
    setOpenAddResponseModal(false);
  };

  const getDiscussion = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        getResponse();
        let getDiscussionRequest = await axios({
          url: `https://dev.entervalhalla.tech/api/tannoi/v1/discussions/single/${discussionId}`,
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
          setPostTime(getDiscussionRequest.data.created_at);
          setLike(getDiscussionRequest.data.likes);
          setDiscussionTitle(getDiscussionRequest.data.title);
          setHashtags(getDiscussionRequest.data.hashtags);
          setReplies(getDiscussionRequest.data.response_count);
          setPlays(getDiscussionRequest.data.play_count);
          setRecordingFile(getDiscussionRequest.data.voice_note_path);
          setIsLike(getDiscussionRequest.data.isLike);
          setIsDislike(getDiscussionRequest.data.isDislike);
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
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/discussion/${discussionId}?page=1`,
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

  const selectCard = cardIndex => {
    setSelectedCard(cardIndex);
  };

  const changePlayer = (cardIndex, action) => {
    let numberedCardIndex = Number(cardIndex);

    if (cardIndex === 'discussion' && action === 'next') {
      setSelectedCard(0);
    } else if (cardIndex === 0 && action === 'previous') {
      setSelectedCard('discussion')
    } else if (action === 'next') {
      setSelectedCard(numberedCardIndex + 1);
    } else if (action === 'previous') {
      setSelectedCard(numberedCardIndex - 1);
    }
  };

  const updateFromNextPreviousButton = fromNextPreviousButtonStatus => {
    setFromNextPreviousButton(fromNextPreviousButtonStatus)
  };

  const getIsLikeAndIsDislike = (input, responseIdInput) => {
    let isLikeAndIsDislike;

    response.forEach(response => {
      if (response.id === responseIdInput) {
        if (input === 'isLike') {
         isLikeAndIsDislike = response.isLike;
        } else if (input === 'isDislike') {
          isLikeAndIsDislike = response.isDislike;
        }
      }
    });

    return isLikeAndIsDislike
  };

  useEffect(() => {
    getDiscussion();
  }, []);

  return (
    <View>
      {/* {
        openAddResponseModal && <View style={{backgroundColor: "rgba(0,0,0,0.8)", height: "100%"}}></View>
      } */}
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
          onPress={() => {
            setOpenAddResponseModal(true);
          }}
        >
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={response}
        keyExtractor={(item, index) => index.toString()}
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
                  discussionId={discussionId}
                  nextPlayerAvailable={nextPlayerAvailable}
                  changePlayer={changePlayer}
                  cardIndex="discussion"
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  isLike={isLike}
                  isDislike={isDislike}
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
              discussionId={discussionId}
              getResponse={getResponse}
              addResponseForResponse={false}
            />
            {
              response === '' && (
                <LoadingSpinner loadingSpinnerForComponent={true} />
              )
            }
          </View>
        }
        renderItem={itemData => (
          <>
            {
              selectedCard === itemData.index ? (
                <DiscussionScreenPlayerCard
                  navigation={navigation}
                  cardType="response"
                  profilePicture={itemData.item.creator.profile_photo_path}
                  profileName={itemData.item.creator.name}
                  recordingFile={itemData.item.voice_note_path}
                  like={itemData.item.likes}
                  responseId={itemData.item.id}
                  getResponseFromDiscussion={getResponse}
                  nextPlayerAvailable={nextPlayerAvailable}
                  cardIndex={itemData.index}
                  cardLength={response.length}
                  postTime={itemData.item.created_at}
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  changePlayer={changePlayer}
                  discussionId={discussionId}
                  isLike={itemData.item.isLike}
                  isDislike={itemData.item.isDislike}
                  getIsLikeAndIsDislike={getIsLikeAndIsDislike}
                />
              ) : (
                <ClosedCard
                  profilePicture={itemData.item.creator.profile_photo_path}
                  cardIndex={itemData.index}
                  selectCard={selectCard}
                  profileName={itemData.item.creator.name}
                  postTime={itemData.item.created_at}
                  caption={itemData.item.caption}
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