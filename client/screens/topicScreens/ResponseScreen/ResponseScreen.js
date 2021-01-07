import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { bold } from '../../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import { getResponse, getSingleResponse, clearResponse } from '../../../store/actions/ResponseAction';
import { CalculateHeight } from '../../../helper/CalculateSize';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import DiscussionScreenPlayerCard from '../../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import ClosedCard from '../../../components/topicComponents/discussionScreenComponents/ClosedCard';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const ReplyScreen = ({route, navigation}) => {
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [selectedCard, setSelectedCard] = useState('response');

  const profileId = useSelector(state => state.ResponseReducer.profileId);
  const profilePicture = useSelector(state => state.ResponseReducer.profilePicture);
  const profileName = useSelector(state => state.ResponseReducer.profileName);
  const postTime = useSelector(state => state.ResponseReducer.postTime);
  const like = useSelector(state => state.ResponseReducer.like);
  const recordingFile = useSelector(state => state.ResponseReducer.recordingFile);
  const reply = useSelector(state => state.ResponseReducer.reply);
  const isLike = useSelector(state => state.ResponseReducer.isLike);
  const isDislike = useSelector(state => state.ResponseReducer.isDislike);
  const caption = useSelector(state => state.ResponseReducer.caption);
  const play = useSelector(state => state.ResponseReducer.play);
  const profileType = useSelector(state => state.ResponseReducer.userType);
  const userType = useSelector(state => state.HomeReducer.user.type);

  const dispatch = useDispatch();

  const {
    responseId,
    discussionId,
    fromInbox
  } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedCard('response');
      dispatch(clearResponse());
      dispatch(getSingleResponse(responseId));
      // dispatch(getResponse(discussionId));
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
        <TouchableOpacity onPress={() => navigation.navigate('DiscussionScreen', {
            discussionId: discussionId
        })}>
          <Text style={styles.discussionButton}>Discussion</Text>
        </TouchableOpacity>
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
                    navigation={navigation}
                    profileId={profileId}
                    profileType={profileType}
                    userType={userType}
                    selectedCard={selectedCard}
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
                    responsePlay={play !== null ? play : 0}
                    profileType={profileType}
                  />
                )
              )
            }
          </View>
        }
        data={reply}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemData => (
          !fromInbox ? <>
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
                  postTime={itemData.item.timeSince}
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  changePlayer={changePlayer}
                  discussionId={discussionId}
                  responseCount={itemData.item.chain_response}
                  isChainResponse={true}
                  mainResponseId={responseId}
                  getIsLikeAndIsDislike={getIsLikeAndIsDislike}
                  caption={itemData.item.caption}
                  responseScreenResponseId={responseId}
                  navigation={navigation}
                  profileId={itemData.item.creator.id}
                  profileType={itemData.item.creator.type}
                  userType={userType}
                  selectedCard={selectedCard}
                />
              ) : (
                <ClosedCard
                  profilePicture={itemData.item.creator.profile_photo_path}
                  cardIndex={itemData.index}
                  selectCard={selectCard}
                  profileName={itemData.item.creator.name}
                  postTime={itemData.item.timeSince}
                  caption={itemData.item.caption}
                  responseLike={itemData.item.likes}
                  responseReply={itemData.item.response_count}
                  responsePlay={itemData.item.play_count !== null ? itemData.item.play_count : 0}
                  profileType={itemData.item.creator.type}
                />
              )
            }
          </> : null
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

  discussionButton: {
    fontFamily: bold,
    color: "#0E4EF4",
    fontSize: CalculateHeight(2)
  }
});

export default ReplyScreen;