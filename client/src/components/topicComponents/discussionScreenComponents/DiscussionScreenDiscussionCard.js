import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscussion } from '../../../store/actions/DiscussionAction';
import { getAuthorizedUsers } from '../../../store/actions/PrivateDiscussionAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { GenerateDeepLink } from '../../../helper/GenerateDeepLink';

//Icons
import Upvote from '../../../assets/topicAssets/upvote.svg';
import Downvote from '../../../assets/topicAssets/downvote.svg';
import ActiveUpvote from '../../../assets/topicAssets/activeUpvote.svg';
import ActiveDownvote from '../../../assets/topicAssets/activeDownvote.svg';
import TickIcon from '../../../assets/publicAssets/tickIcon.png';

//Components
import DiscussionScreenPlayerCard from './DiscussionScreenPlayerCard';
import LoadingSpinner from '../../publicComponents/LoadingSpinner';
import PrivateDiscussionModal from '../PrivateDiscussionModal';
import OptionButton from './OptionButton';

const DiscussionScreenCard = (props) => {
  const {
    profilePicture,
    profileName,
    postTime,
    like,
    topic,
    topicId,
    discussionTitle,
    hashtags,
    replies,
    plays,
    recordingFile,
    isLike,
    isDislike,
    discussionId,
    nextPlayerAvailable,
    changePlayer,
    cardIndex,
    fromNextPreviousButton,
    updateFromNextPreviousButton,
    navigation,
    profileId,
    userType,
    profileType,
    userId,
    isRecorderModalOpen,
  } = props;

  const [optionModal, setOptionModal] = useState(false);
  const [privateModal, setPrivateModal] = useState(false);

  const discussionType = useSelector((state) => state.DiscussionReducer.type);
  const isLoading = useSelector((state) => state.DiscussionReducer.isLoading);
  const response = useSelector((state) => state.ResponseReducer.response);
  const isResponse = useSelector((state) => state.ResponseReducer.isResponse);

  const dispatch = useDispatch();

  const upvote = async () => {
    try {
      if (userType !== 0 || profileId === userId) {
        const access_token = await AsyncStorage.getItem('access_token');

        GenerateDeepLink(
          'Like a Discussion',
          'This is a link to Discussion',
          'DiscussionScreen',
          {
            discussionId: discussionId.toString(),
          },
          'like discussion',
          async (url) => {
            try {
              let upvoteRequest = await axios({
                method: 'get',
                url: `${BaseUrl}/discussions/like/${discussionId}?deep_link=${url}`,
                headers: {
                  token: access_token,
                },
              });

              if (upvoteRequest.data) {
                dispatch(getDiscussion(discussionId));
              }
            } catch (error) {
              console.log(error);
            }
          },
        );
      } else {
        navigation.navigate('VerificationNavigation');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downvote = async () => {
    try {
      if (userType !== 0 || userType === userId) {
        const access_token = await AsyncStorage.getItem('access_token');

        let downvoteRequest = await axios({
          method: 'get',
          url: `${BaseUrl}/discussions/dislike/${discussionId}`,
          headers: {
            token: access_token,
          },
        });

        if (downvoteRequest.data) {
          dispatch(getDiscussion(discussionId));
        }
      } else {
        navigation.navigate('VerificationNavigation');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertHashtagForDisplay = (item, index) => (
    <Text
      onPress={() =>
        navigation.navigate('HashtagDetailScreen', {
          query: 'hashtag_id=',
          queryId: item.id,
          hashtagDetailTitle: item.name,
        })
      }
      key={index}>
      {item.name}{' '}
    </Text>
  );

  const openPrivateModal = () => {
    setPrivateModal(true);
    dispatch(getAuthorizedUsers(discussionId, false, true));
  };

  const closePrivateModal = () => {
    setPrivateModal(false);
  };

  const ProfileAndMenu = () => {
    return (
      <View style={styles.profileAndMenuContainerStyle}>
        <View>
          <View style={styles.profileContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('UserProfileScreen', {
                  userId: profileId,
                });
              }}>
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profileImageStyle}
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.push('UserProfileScreen', {
                  userId: profileId,
                });
              }}>
              <Text style={styles.profileNameStyle}>{profileName}</Text>
            </TouchableOpacity>
            {profileType === 1 && (
              <Image source={TickIcon} style={styles.tickIconStyle} />
            )}
          </View>
          <Text style={styles.postTimeStyle}>{postTime ? postTime : ''}</Text>
        </View>
        <OptionButton
          customStyle={styles.discussionCardMenuStyle}
          navigation={navigation}
          discussionId={discussionId}
          profileId={profileId}
          openPrivateModal={openPrivateModal}
          modalType="discussion"
          discussionTitle={discussionTitle}
        />
        {discussionType === 2 && userId === profileId && (
          <PrivateDiscussionModal
            openModal={privateModal}
            closeModal={closePrivateModal}
            fromDiscussionScreen={true}
            discussionId={discussionId}
            modalTitle="Invite your followers to a private discussion"
          />
        )}
      </View>
    );
  };

  const DiscussionVoteAndInfo = () => {
    return (
      <View style={styles.discussionVoteAndInfoContainerStyle}>
        <View style={styles.voteContainerStyle}>
          <TouchableOpacity onPress={() => upvote()}>
            {isLike ? <ActiveUpvote /> : <Upvote />}
          </TouchableOpacity>
          <Text style={styles.voteNumberStyle}>{like}</Text>
          <TouchableOpacity onPress={() => downvote()}>
            {isDislike ? <ActiveDownvote /> : <Downvote />}
          </TouchableOpacity>
        </View>
        <View style={styles.discussionInfoContainerStyle}>
          <Text style={styles.discussionTitleStyle}>{discussionTitle}</Text>
          <Text
            onPress={() => {
              navigation.navigate('TopicDetailScreen', {
                topicName: topic,
                topicId: topicId,
              });
            }}
            style={styles.topicStyle}>
            {topic}
          </Text>
          <Text style={styles.discussionHashtag}>
            {hashtags ? hashtags.map(convertHashtagForDisplay) : ''}
          </Text>
          <View style={styles.repliesAndPlaysNumberContainerStyle}>
            <Text style={styles.repliesAndPlaysNumberStyle}>
              {replies} Replies
            </Text>
            <Text style={styles.repliesAndPlaysNumberStyle}>
              {plays} Plays
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.discussionScreenCardContainerStyle}>
      {isLoading ? isResponse && response.length === 0  ? (
        <LoadingSpinner loadingSpinnerForComponent={true} />
      ) : (
        <LoadingSpinner loadingSpinnerForComponent={true} />
      ) : (
        <>
          <View style={styles.discussionInfoSectionStyle}>
            <ProfileAndMenu />
            <DiscussionVoteAndInfo />
          </View>
          {recordingFile !== '' && (
            <DiscussionScreenPlayerCard
              cardType="discussion"
              profilePicture={profilePicture}
              profileName={profileName}
              postTime={postTime}
              recordingFile={recordingFile}
              nextPlayerAvailable={nextPlayerAvailable}
              changePlayer={changePlayer}
              cardIndex={cardIndex}
              discussionId={discussionId}
              fromNextPreviousButton={fromNextPreviousButton}
              updateFromNextPreviousButton={updateFromNextPreviousButton}
              isRecorderModalOpen={isRecorderModalOpen}
              profileId={profileId}
              navigation={navigation}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  discussionScreenCardContainerStyle: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
  },

  discussionInfoSectionStyle: {
    padding: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
  },

  profileAndMenuContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profileContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    borderRadius: 50,
    height: 24,
    width: 24,
    marginRight: 12,
  },

  profileNameStyle: {
    color: '#464D60',
    fontFamily: bold,
  },

  tickIconStyle: {
    height: 15,
    width: 15,
    marginLeft: '2%',
  },

  postTimeStyle: {
    marginLeft: 36,
    fontFamily: normal,
    color: '#73798C',
    fontSize: 12,
    marginTop: '-5%',
  },

  discussionCardMenuStyle: {
    marginTop: 12,
    height: '30%',
    width: '10%',
    alignItems: 'center',
  },

  discussionVoteAndInfoContainerStyle: {
    flexDirection: 'row',
    marginTop: '3%',
  },

  voteContainerStyle: {
    alignItems: 'center',
  },

  voteNumberStyle: {
    marginVertical: 6,
    fontFamily: normal,
    fontSize: 14,
    color: '#73798C',
  },

  discussionInfoContainerStyle: {
    paddingLeft: '7.5%',
    maxWidth: '80%',
  },

  discussionTitleStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2.2),
  },

  topicStyle: {
    color: '#5152D0',
    fontFamily: bold,
  },

  discussionHashtag: {
    fontFamily: normal,
    fontSize: 14,
    lineHeight: 25,
    color: '#73798C',
  },

  repliesAndPlaysNumberContainerStyle: {
    flexDirection: 'row',
    marginTop: 16,
  },

  repliesAndPlaysNumberStyle: {
    fontSize: 12,
    marginRight: 16,
    color: '#73798C',
    fontFamily: normal,
  },
});

export default DiscussionScreenCard;
