import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold } from '../../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussion, clearDiscussion } from '../../../store/actions/DiscussionAction';
import { getResponse, clearResponse } from '../../../store/actions/ResponseAction';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import DiscussionScreenDiscussionCard from '../../../components/topicComponents/discussionScreenComponents/DiscussionScreenDiscussionCard';
import DiscussionScreenPlayerCard from '../../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import AddResponse from '../../../components/publicComponents/RecorderModal';
import ClosedCard from '../../../components/topicComponents/discussionScreenComponents/ClosedCard';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const DiscussionScreen = ({ route, navigation }) => {
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('discussion');
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [openAddResponse, setOpenAddRespone] = useState(false);

  const profileId = useSelector(state => state.DiscussionReducer.profileId);
  const profilePicture = useSelector(state => state.DiscussionReducer.profilePicture);
  const profileName = useSelector(state => state.DiscussionReducer.profileName);
  const postTime = useSelector(state => state.DiscussionReducer.postTime);
  const like = useSelector(state => state.DiscussionReducer.like);
  const topic = useSelector(state => state.DiscussionReducer.topic);
  const discussionTitle = useSelector(state => state.DiscussionReducer.discussionTitle);
  const hashtags = useSelector(state => state.DiscussionReducer.hashtags);
  const replies = useSelector(state => state.DiscussionReducer.replies);
  const plays = useSelector(state => state.DiscussionReducer.plays);
  const recordingFile = useSelector(state => state.DiscussionReducer.recordingFile);
  const isLike = useSelector(state => state.DiscussionReducer.isLike);
  const isDislike = useSelector(state => state.DiscussionReducer.isDislike);
  const response = useSelector(state => state.ResponseReducer.response);
  const isResponse = useSelector(state => state.ResponseReducer.isResponse);
  const profileType = useSelector(state => state.DiscussionReducer.userType);
  const userId = useSelector(state => state.HomeReducer.user.id);
  const userType = useSelector(state => state.HomeReducer.user.type);

  const {
    discussionId,
    fromNewDiscussion
  } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setOpenAddRespone(false);
    dispatch(clearDiscussion());
    dispatch(clearResponse());
    dispatch(getDiscussion(discussionId, true));
    dispatch(getResponse(discussionId));
  }, [navigation]);
 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearDiscussion());
      dispatch(clearResponse());
      dispatch(getDiscussion(discussionId, true));
      dispatch(getResponse(discussionId));
    });

    return unsubscribe;
  }, [navigation]);

  const closeAddResponseModal = () => {
    setOpenAddResponseModal(false);
    setOpenAddRespone(false);
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

  return (
    <View>
      <View style={styles.discussionUpperBarStyle}>
        <BackButton
          navigation={navigation}
          screen={fromNewDiscussion && 'MainAppNavigation'}
          styleOption={{
            marginTop: 0,
            marginBottom: 0
          }}
        />
          <TouchableOpacity
            style={styles.addResponseButtonStyle}
            onPress={() => {
              userType !== 0 || userId === profileId ? (setOpenAddResponseModal(true), setOpenAddRespone(true)) : (navigation.navigate('VerificationNavigation'), setOpenAddRespone(true)) ;
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
                  topic={topic}
                  discussionTitle={discussionTitle}
                  hashtags={hashtags}
                  replies={replies}
                  plays={plays}
                  recordingFile={recordingFile}
                  discussionId={discussionId}
                  nextPlayerAvailable={replies > 0 ? true : false}
                  changePlayer={changePlayer}
                  cardIndex="discussion"
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  isLike={isLike}
                  isDislike={isDislike}
                  navigation={navigation}
                  profileId={profileId}
                  profileType={profileType}
                  userType={userType}
                  userId={userId}
                  isRecorderModalOpen={openAddResponse}
                />
              ) : (
                <ClosedCard
                  profilePicture={profilePicture}
                  profileName={profileName}
                  cardIndex="discussion"
                  selectCard={selectCard}
                  postTime={postTime}
                  discussionTitle={discussionTitle}
                  profileType={profileType}
                />
              )
            }
            <AddResponse
              openModal={openAddResponseModal}
              closeModal={closeAddResponseModal}
              discussionId={discussionId}
              addResponseForResponse={false}
            />
            {
              response.length === 0 && isResponse && (
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
                  nextPlayerAvailable={replies > 0 ? true : false}
                  cardIndex={itemData.index}
                  cardLength={response.length}
                  postTime={itemData.item.timeSince}
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  changePlayer={changePlayer}
                  discussionId={discussionId}
                  isLike={itemData.item.isLike}
                  isDislike={itemData.item.isDislike}
                  getIsLikeAndIsDislike={getIsLikeAndIsDislike}
                  caption={itemData.item.caption}
                  navigation={navigation}
                  profileId={itemData.item.creator.id}
                  profileType={itemData.item.creator.type}
                  userType={userType}
                  selectedCard={selectedCard}
                  isRecorderModalOpen={openAddResponse}
                  topResponse={itemData.item.chain_response}
                  responseCount={itemData.item.response_count}
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
                  navigation={navigation}
                  topResponse={itemData.item.chain_response}
                  responseCount={itemData.item.response_count}
                  discussionId={discussionId}
                  responseId={itemData.item.id}
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
    paddingLeft: "5%",
    paddingRight: "3.5%",
    paddingVertical: "3%",
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center"
  },

  addResponseButtonStyle: {
    marginTop: ".6%"
  },

  addResponseButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  }
});

export default DiscussionScreen;