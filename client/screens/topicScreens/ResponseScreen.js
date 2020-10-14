import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import DiscussionScreenPlayerCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import ClosedCard from '../../components/topicComponents/discussionScreenComponents/ClosedCard';
import LoadingScreen from '../../components/publicComponents/LoadingSpinner';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';

const ReplyScreen = ({route, navigation}) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [profileName, setProfileName] = useState('');
  const [postTime, setPostTime] = useState('');
  const [like, setLike] = useState('');
  const [recordingFile, setRecordingFile] = useState('');
  const [nextPlayerAvailable, setNextPlayerAvailable] = useState(false);
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [reply, setReply] = useState('');
  const [selectedCard, setSelectedCard] = useState('response');
  const [isLike, setIslike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const {
    responseId,
    discussionId,
  } = route.params;

  useEffect(() => {
    getResponse();
  }, []);

  const getResponse = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      if (access_token) {
        let getResponseRequest = await axios({
          url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/single/${responseId}`,
          method: 'get',
          headers: {
            'token': access_token
          }
        });
  
        if (getResponseRequest.data) {
          if (getResponseRequest.data.response_count !== 0) {
            setNextPlayerAvailable(true)
          };

          setProfilePicture(getResponseRequest.data.creator.profile_photo_path);
          setProfileName(getResponseRequest.data.creator.name);
          setPostTime(getResponseRequest.data.created_at);
          setLike(getResponseRequest.data.likes);
          setRecordingFile(getResponseRequest.data.voice_note_path);
          setReply(getResponseRequest.data.chain_response);
          setIslike(getResponseRequest.data.isLike);
          setIsDislike(getResponseRequest.data.isDislike);
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getIsLikeAndIsDislike = (input, responseIdInput) => {
    let isLikeAndIsDislike;

    if (responseIdInput === responseId && input === 'isLike') {
      return isLike;
    } else if (responseIdInput === responseId && input === 'isDislike') {
      return isDislike;
    };

    reply.forEach(response => {
      if (response.id === responseIdInput) {
        console.log(response)
        if (input === 'isLike') {
         isLikeAndIsDislike = response.isLike;
        } else if (input === 'isDislike') {
          isLikeAndIsDislike = response.isDislike;
        }
      }
    });

    return isLikeAndIsDislike
  };

  const updateFromNextPreviousButton = fromNextPreviousButtonStatus => {
    setFromNextPreviousButton(fromNextPreviousButtonStatus)
  };

  const changePlayer = (cardIndex, action) => {
    let numberedCardIndex = Number(cardIndex);

    if (cardIndex === 'response' && action === 'next') {
      setSelectedCard(0);
    } else if (cardIndex === 0 && action === 'previous') {
      setSelectedCard('response')
    } else if (action === 'next') {
      setSelectedCard(numberedCardIndex + 1);
    } else if (action === 'previous') {
      setSelectedCard(numberedCardIndex - 1);
    }
  };

  const selectCard = cardIndex => {
    setSelectedCard(cardIndex);
  };

  return (
    <View style={styles.replyScreenContainerStyle}>
      <View style={styles.upperBarStyle}>
        <View style={styles.backButtonAndTitleContainerStyle}>
          <BackButton
            navigation={navigation}
            styleOption={{
              marginTop: 0,
              marginBottom: 0
            }}
          />
          {
            profileName !== '' && (
              <Text style={styles.titleStyle}>{profileName}'s Reply</Text>
            )
          }
        </View>
        {/* <TouchableOpacity
          style={styles.addResponseButtonStyle}
          onPress={() => {
            // setOpenAddResponseModal(true);
          }}
        >
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity> */}
      </View>
      {
        !profileName && (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )
      }
      <FlatList
        ListHeaderComponent={
          <View>
            {
              recordingFile !== '' && (
                selectedCard === 'response' ? (
                  <DiscussionScreenPlayerCard
                    cardType="response"
                    profilePicture={profilePicture}
                    profileName={profileName}
                    postTime={postTime}
                    recordingFile={recordingFile}
                    nextPlayerAvailable={nextPlayerAvailable}
                    changePlayer={changePlayer}
                    fromNextPreviousButton={fromNextPreviousButton}
                    updateFromNextPreviousButton={updateFromNextPreviousButton}
                    responseLike={like}
                    getResponseFromDiscussion={getResponse}
                    discussionId={discussionId}
                    responseId={responseId}
                    cardIndex="response"
                    getIsLikeAndIsDislike={getIsLikeAndIsDislike}
                    />
                ) : (
                  <ClosedCard
                    profilePicture={profilePicture}
                    profileName={profileName}
                    cardIndex="response"
                    selectCard={selectCard}
                    postTime={postTime}
                  />
                )
              )
            }
          </View>
        }
        data={reply}
        keyExtractor={(item, index) => index.toString()}
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
                  responseId={itemData.item.id}
                  getResponseFromDiscussion={getResponse}
                  nextPlayerAvailable={nextPlayerAvailable}
                  cardIndex={itemData.index}
                  cardLength={reply.length}
                  postTime={itemData.item.created_at}
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  changePlayer={changePlayer}
                  discussionId={discussionId}
                  responseCount={itemData.item.chain_response.length}
                  isChainResponse={true}
                  mainResponseId={responseId}
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
      />
    </View>
  )
};

const styles = StyleSheet.create({
  replyScreenContainerStyle: {
    flex: 1
  },

  upperBarStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButtonAndTitleContainerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  titleStyle: {
    fontSize: 20,
    fontFamily: bold,
    color: "#464D60",
    marginLeft: "5%"
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

export default ReplyScreen;