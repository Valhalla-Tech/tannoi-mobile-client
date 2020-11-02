import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { bold } from '../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import { getResponse, getSingleResponse, clearResponse } from '../../store/actions/ResponseAction';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import DiscussionScreenPlayerCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import ClosedCard from '../../components/topicComponents/discussionScreenComponents/ClosedCard';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';

const ReplyScreen = ({route, navigation}) => {
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [selectedCard, setSelectedCard] = useState('response');

  const profilePicture = useSelector(state => state.ResponseReducer.profilePicture);
  const profileName = useSelector(state => state.ResponseReducer.profileName);
  const postTime = useSelector(state => state.ResponseReducer.postTime);
  const like = useSelector(state => state.ResponseReducer.like);
  const recordingFile = useSelector(state => state.ResponseReducer.recordingFile);
  const reply = useSelector(state => state.ResponseReducer.reply);
  const isLike = useSelector(state => state.ResponseReducer.isLike);
  const isDislike = useSelector(state => state.ResponseReducer.isDislike);
  const caption = useSelector(state => state.ResponseReducer.caption);

  const dispatch = useDispatch();

  const {
    responseId,
    discussionId,
  } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(clearResponse());
      dispatch(getSingleResponse(responseId));
      dispatch(getResponse(discussionId));
    });

    return unsubscribe;
  }, [navigation]);

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
                    nextPlayerAvailable={reply.length > 0 ? true : false}
                    changePlayer={changePlayer}
                    fromNextPreviousButton={fromNextPreviousButton}
                    updateFromNextPreviousButton={updateFromNextPreviousButton}
                    responseLike={like}
                    discussionId={discussionId}
                    responseId={responseId}
                    cardIndex="response"
                    getIsLikeAndIsDislike={getIsLikeAndIsDislike}
                    caption={caption}
                  />
                ) : (
                  <ClosedCard
                    profilePicture={profilePicture}
                    profileName={profileName}
                    cardIndex="response"
                    selectCard={selectCard}
                    postTime={postTime}
                    caption={caption}
                    responseLike={like}
                    responseReply={reply.length}
                    responsePlay={0}
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
                  nextPlayerAvailable={reply.length > 0 ? true : false}
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
                  caption={itemData.item.caption}
                />
              ) : (
                <ClosedCard
                  profilePicture={itemData.item.creator.profile_photo_path}
                  cardIndex={itemData.index}
                  selectCard={selectCard}
                  profileName={itemData.item.creator.name}
                  postTime={itemData.item.created_at}
                  caption={itemData.item.caption}
                  responseLike={itemData.item.likes}
                  responseReply={0}
                  responsePlay={0}
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
    paddingVertical: "3%",
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButtonAndTitleContainerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  titleStyle: {
    fontSize: 16,
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