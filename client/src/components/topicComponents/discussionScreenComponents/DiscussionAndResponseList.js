import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { bold, normal } from '../../../assets/FontSize';
import {
  getResponse,
  getSingleResponse,
} from '../../../store/actions/ResponseAction';
import { useSelector, useDispatch } from 'react-redux';

//Components
import DiscussionScreenDiscussionCard from './DiscussionScreenDiscussionCard';
import DiscussionScreenPlayerCard from './DiscussionScreenPlayerCard';
import ClosedCard from './ClosedCard';
import LoadingSpinner from '../../publicComponents/LoadingSpinner';

const DiscussionAndResponseList = (props) => {
  const {
    isResponseScreen,
    changePlayer,
    discussionId,
    fromNextPreviousButton,
    updateFromNextPreviousButton,
    navigation,
    openAddResponse,
    selectCard,
    selectedCard,
    getIsLikeAndIsDislike,
    responseId,
    flatListRef,
    scrollDownForResponseScreen,
    responseScreenId,
    isCommunityDiscussion,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  //Discussion store
  const profileId = useSelector((state) => state.DiscussionReducer.profileId);
  const profilePicture = useSelector(
    (state) => state.DiscussionReducer.profilePicture,
  );
  const profileName = useSelector(
    (state) => state.DiscussionReducer.profileName,
  );
  const postTime = useSelector((state) => state.DiscussionReducer.postTime);
  const like = useSelector((state) => state.DiscussionReducer.like);
  const topic = useSelector((state) => state.DiscussionReducer.topic);
  const topicId = useSelector((state) => state.DiscussionReducer.topicId);
  const discussionTitle = useSelector(
    (state) => state.DiscussionReducer.discussionTitle,
  );
  const hashtags = useSelector((state) => state.DiscussionReducer.hashtags);
  const replies = useSelector((state) => state.DiscussionReducer.replies);
  const plays = useSelector((state) => state.DiscussionReducer.plays);
  const recordingFile = useSelector(
    (state) => state.DiscussionReducer.recordingFile,
  );
  const isLike = useSelector((state) => state.DiscussionReducer.isLike);
  const isDislike = useSelector((state) => state.DiscussionReducer.isDislike);
  const response = useSelector((state) => state.ResponseReducer.response);
  const isResponse = useSelector((state) => state.ResponseReducer.isResponse);
  const profileType = useSelector((state) => state.DiscussionReducer.userType);
  const userId = useSelector((state) => state.HomeReducer.user.id);
  const userType = useSelector((state) => state.HomeReducer.user.type);
  const responseCount = useSelector(
    (state) => state.ResponseReducer.responseCount,
  );

  //Response store
  const responseProfileId = useSelector(
    (state) => state.ResponseReducer.profileId,
  );
  const responseProfilePicture = useSelector(
    (state) => state.ResponseReducer.profilePicture,
  );
  const responseProfileName = useSelector(
    (state) => state.ResponseReducer.profileName,
  );
  const responsePostTime = useSelector(
    (state) => state.ResponseReducer.postTime,
  );
  const responseLike = useSelector((state) => state.ResponseReducer.like);
  const responseRecordingFile = useSelector(
    (state) => state.ResponseReducer.recordingFile,
  );
  const responseReply = useSelector((state) => state.ResponseReducer.reply);
  const responseCaption = useSelector((state) => state.ResponseReducer.caption);
  const responsePlay = useSelector((state) => state.ResponseReducer.play);
  const responseProfileType = useSelector(
    (state) => state.ResponseReducer.userType,
  );
  const responseUserType = useSelector((state) => state.HomeReducer.user.type);
  const responseForResponseCount = useSelector(
    (state) => state.ResponseReducer.responseForResponseCount,
  );

  useEffect(() => {
    response;
  }, [response]);

  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
    isResponseScreen
      ? dispatch(getSingleResponse(responseId, currentPage + 1))
      : dispatch(getResponse(discussionId, currentPage + 1));
  };

  return (
    <FlatList
      data={isResponseScreen ? responseReply : response}
      keyExtractor={(item, index) => index.toString()}
      ref={flatListRef}
      ListHeaderComponent={
        <View style={styles.ListContainerStyle}>
          {isResponseScreen ? (
            responseRecordingFile !== '' && selectedCard === 'response' ? (
              <DiscussionScreenPlayerCard
                cardType="response"
                profilePicture={responseProfilePicture}
                profileName={responseProfileName}
                postTime={responsePostTime}
                recordingFile={responseRecordingFile}
                nextPlayerAvailable={responseReply.length > 0 ? true : false}
                changePlayer={changePlayer}
                fromNextPreviousButton={fromNextPreviousButton}
                updateFromNextPreviousButton={updateFromNextPreviousButton}
                responseLike={responseLike}
                discussionId={discussionId}
                responseId={responseId}
                cardIndex="response"
                getIsLikeAndIsDislike={getIsLikeAndIsDislike}
                caption={responseCaption}
                navigation={navigation}
                profileId={responseProfileId}
                profileType={responseProfileType}
                userType={responseUserType}
                selectedCard={selectedCard}
                scrollDownForResponseScreen={scrollDownForResponseScreen}
                responseScreenResponseId={responseId}
              />
            ) : (
              <ClosedCard
                profilePicture={responseProfilePicture}
                profileName={responseProfileName}
                cardIndex="response"
                selectCard={selectCard}
                postTime={responsePostTime}
                caption={responseCaption}
                responseLike={responseLike}
                responseReply={responseReply.length}
                responsePlay={responsePlay !== null ? responsePlay : 0}
                profileType={responseProfileType}
              />
            )
          ) : selectedCard === 'discussion' ? (
            <>
              <DiscussionScreenDiscussionCard
                profilePicture={profilePicture}
                profileName={profileName}
                postTime={postTime}
                like={like}
                topic={topic}
                topicId={topicId}
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
                isCommunityDiscussion={isCommunityDiscussion}
              />
              {response.length === 0 && isResponse && (
                <LoadingSpinner loadingSpinnerForComponent={true} />
              )}
            </>
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
          )}
        </View>
      }
      renderItem={(itemData) => (
        <View style={{paddingHorizontal: '2%'}}>
          {selectedCard === itemData.index ? (
            <DiscussionScreenPlayerCard
              navigation={navigation}
              cardType="response"
              profilePicture={itemData.item.creator.profile_photo_path}
              profileName={itemData.item.creator.name}
              recordingFile={itemData.item.voice_note_path}
              like={isResponseScreen ? null : itemData.item.likes}
              responseId={itemData.item.id}
              getResponseFromDiscussion={isResponseScreen ? null : getResponse}
              nextPlayerAvailable={
                isResponseScreen
                  ? responseReply.length > 0
                    ? true
                    : false
                  : replies > 0
                  ? true
                  : false
              }
              cardIndex={itemData.index}
              cardLength={
                isResponseScreen ? responseReply.length : response.length
              }
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
              userType={isResponseScreen ? responseUserType : userType}
              selectedCard={selectedCard}
              isRecorderModalOpen={isResponseScreen ? null : openAddResponse}
              responseScreenResponseId={isResponseScreen ? responseId : null}
              deleteResponseFromResponseScreen={isResponseScreen ? true : false}
              responseScreenId={responseScreenId}
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
              responsePlay={
                itemData.item.play_count !== null ? itemData.item.play_count : 0
              }
              profileType={itemData.item.creator.type}
              navigation={navigation}
              topResponse={itemData.item.chain_response}
              responseCount={itemData.item.response_count}
              discussionId={discussionId}
              responseId={itemData.item.id}
            />
          )}
        </View>
      )}
      ListFooterComponent={
        (responseCount !== '' &&
          responseCount > 20 &&
          response.length < responseCount) ||
        (responseForResponseCount !== '' &&
          responseForResponseCount > 20 &&
          responseReply.length < responseForResponseCount) ? (
          <View
            style={
              isResponseScreen
                ? { ...styles.moreButtonContainerStyle, marginBottom: '8%' }
                : styles.moreButtonContainerStyle
            }>
            <TouchableOpacity onPress={nextPage}>
              <Text style={styles.moreResponseTextStyle}>+ More response</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ height: 100 }} />
        )
      }
    />
  );
};
const styles = StyleSheet.create({
  ListContainerStyle: {
    flex: 1,
    paddingHorizontal: '2%',
  },

  moreButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: '25%',
  },

  moreResponseTextStyle: {
    fontFamily: normal,
    color: '#5152D0',
    fontSize: CalculateHeight(2),
  },
});

export default DiscussionAndResponseList;
