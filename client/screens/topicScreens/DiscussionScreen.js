import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold } from '../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussion, clearDiscussion } from '../../store/actions/DiscussionAction';
import { getResponse, clearResponse } from '../../store/actions/ResponseAction';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import DiscussionScreenDiscussionCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenDiscussionCard';
import DiscussionScreenPlayerCard from '../../components/topicComponents/discussionScreenComponents/DiscussionScreenPlayerCard';
import AddResponse from '../../components/topicComponents/discussionScreenComponents/AddResponse';
import ClosedCard from '../../components/topicComponents/discussionScreenComponents/ClosedCard';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';

const DiscussionScreen = ({ route, navigation }) => {
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('discussion');
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);

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

  const {
    discussionId,
    fromNewDiscussion
  } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDiscussion());
    dispatch(clearResponse());
    dispatch(getDiscussion(discussionId));
    dispatch(getResponse(discussionId));
  }, []);

  const closeAddResponseModal = () => {
    setOpenAddResponseModal(false);
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
                />
              ) : (
                <ClosedCard
                  profilePicture={profilePicture}
                  profileName={profileName}
                  cardIndex="discussion"
                  selectCard={selectCard}
                  postTime={postTime}
                  discussionTitle={discussionTitle}
                />
              )
            }
            <AddResponse
              openAddResponseModal={openAddResponseModal}
              closeAddResponseModal={closeAddResponseModal}
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
                  postTime={itemData.item.created_at}
                  fromNextPreviousButton={fromNextPreviousButton}
                  updateFromNextPreviousButton={updateFromNextPreviousButton}
                  changePlayer={changePlayer}
                  discussionId={discussionId}
                  isLike={itemData.item.isLike}
                  isDislike={itemData.item.isDislike}
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