import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useDispatch } from 'react-redux';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { getDiscussion } from '../../../store/actions/DiscussionAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import BaseUrl from '../../../constants/BaseUrl';

//Icons
import DiscussionCardMenu from '../../../assets/topicAssets/discussionCardMenu.svg';
import Upvote from '../../../assets/topicAssets/upvote.svg';
import Downvote from '../../../assets/topicAssets/downvote.svg';
import ActiveUpvote from '../../../assets/topicAssets/activeUpvote.svg';
import ActiveDownvote from '../../../assets/topicAssets/activeDownvote.svg';
import TickIcon from '../../../assets/publicAssets/tickIcon.png';

//Components
import DiscussionScreenPlayerCard from './DiscussionScreenPlayerCard';
import LoadingSpinner from '../../publicComponents/LoadingSpinner';
import OptionModal from './OptionModal';
import PrivateDiscussionModal from '../PrivateDiscussionModal';

const DiscussionScreenCard = props => {
  const {
    profilePicture,
    profileName,
    postTime,
    like,
    topic,
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
    userId
  } = props;

  const [optionModal, setOptionModal] = useState(false);
  const [privateModal, setPrivateModal] = useState(false);

  const dispatch = useDispatch();

  const numberConverter = number => {
    let numberToString = number.toString();

    if (numberToString.length > 3 && numberToString.length <= 6) {
      return `${numberToString.substring(0, numberToString.length - 3)}k`;
    } else if (numberToString.length > 6 && numberToString.length <= 9) {
      return `${numberToString.substring(0, numberToString.length - 6)}m`;
    } else if (numberToString.length > 9) {
      return `${numberToString.substring(0, numberToString.length - 9)}b`;
    } else {
      return numberToString
    };
  };

  const upvote = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let upvoteRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/discussions/like/${discussionId}`,
        headers: {
          token: access_token
        }
      })

      if (upvoteRequest.data) {
        if (userType !== 0 || profileId === userId) {
          dispatch(getDiscussion(discussionId));
          dispatch(clearHome());
          dispatch(getHome());
        } else {
          navigation.navigate('VerificationNavigation');
        }
      }
    } catch (error) {
      console.log(error);
    };
  };

  const downvote = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let downvoteRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/discussions/dislike/${discussionId}`,
        headers: {
          token: access_token
        }
      })

      if (downvoteRequest.data) {
        if (userType !== 0 || userType === userId) {
          dispatch(getDiscussion(discussionId));
          dispatch(clearHome());
          dispatch(getHome());
        } else {
          navigation.navigate('VerificationNavigation');
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const convertHashtagForDisplay = hashtagsInput => {
    let hashtagDisplayOutput = '';

    hashtagsInput.forEach(hashtag => {
      hashtagDisplayOutput += `${hashtag.name} `;
    });

    return hashtagDisplayOutput;
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

  const closeOptionModal = () => {
    setOptionModal(false);
  };

  const openPrivateModal = () => {
    setPrivateModal(true);
  };

  const closePrivateModal = () => {
    setPrivateModal(false);
  };

  const ProfileAndMenu = () => {
    return (
      <View style={styles.profileAndMenuContainerStyle}>
        <View>
          <View style={styles.profileContainerStyle}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('UserProfile', {
                  userId: profileId
                });
            }}>
              <Image source={{uri: profilePicture}} style={styles.profileImageStyle} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('UserProfile', {
                  userId: profileId
                });
            }}>
              <Text style={styles.profileNameStyle}>{profileName}</Text>
            </TouchableOpacity>
            {userType === 1 && <Image source={TickIcon} style={styles.tickIconStyle} />}
          </View>
          <Text style={styles.postTimeStyle}>{postTime ? convertPostTime(postTime) : ''}</Text>
        </View>
        <TouchableOpacity onPress={() => setOptionModal(true)} style={styles.discussionCardMenuStyle}>
          <DiscussionCardMenu />
        </TouchableOpacity>
        <OptionModal 
          openOptionModal={optionModal}
          closeOptionModal={closeOptionModal}
          discussionId={discussionId}
          navigation={navigation}
          profileId={profileId}
          openPrivateModal={openPrivateModal}
        />
        <PrivateDiscussionModal
          openModal={privateModal}
          closeModal={closePrivateModal}
          fromDiscussionScreen={true}
          discussionId={discussionId}
        />
      </View>
    );
  };

  const DiscussionVoteAndInfo = () => {
    return (
      <View style={styles.discussionVoteAndInfoContainerStyle}>
        <View style={styles.voteContainerStyle}>
          <TouchableOpacity onPress={() => upvote()}>
            {
              isLike ? (
                <ActiveUpvote />
              ) : (
                <Upvote />
              )
            }
          </TouchableOpacity>
            <Text style={styles.voteNumberStyle}>{numberConverter(like)}</Text>
          <TouchableOpacity onPress={() => downvote()}>
            {
              isDislike ? (
                <ActiveDownvote />
              ) : (
                <Downvote />
              )
            }
          </TouchableOpacity>
        </View>
        <View style={styles.discussionInfoContainerStyle}>
          <Text style={styles.discussionTitleStyle}>{discussionTitle}</Text>
          <Text style={styles.topicStyle}>{topic}</Text>
          <Text style={styles.discussionHashtag}>{hashtags ? convertHashtagForDisplay(hashtags) : ''}</Text>
          <View style={styles.repliesAndPlaysNumberContainerStyle}>
            <Text style={styles.repliesAndPlaysNumberStyle}>{numberConverter(replies)} Replies</Text>
            <Text style={styles.repliesAndPlaysNumberStyle}>{numberConverter(plays)} Plays</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.discussionScreenCardContainerStyle}>
      {
        !profileName ? (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        ) : (
          <>
            <View style={styles.discussionInfoSectionStyle}>
              <ProfileAndMenu />
              <DiscussionVoteAndInfo />
            </View>
            {
              recordingFile !== '' && (
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
                />
              )
            }
          </>
        )
      }
    </View>
  )
};

const styles = StyleSheet.create({
  discussionScreenCardContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8
  },
  
  discussionInfoSectionStyle: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9"
  },

  profileAndMenuContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  
  profileContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  profileImageStyle: {
    borderRadius: 50,
    height: 24,
    width: 24,
    marginRight: 12
  },

  profileNameStyle: {
    color: "#464D60",
    fontFamily: bold
  },

  tickIconStyle: {
    height: 15, 
    width: 15, 
    marginLeft: "2%"
  },

  postTimeStyle: {
    marginLeft: 36,
    fontFamily: normal,
    color: "#73798C",
    fontSize: 12,
    marginTop: "-5%"
  },

  discussionCardMenuStyle: {
    marginTop: 12
  },

  discussionVoteAndInfoContainerStyle: {
    flexDirection: "row",
    marginTop: "3%"
  },

  voteContainerStyle: {
    alignItems: "center"
  },

  voteNumberStyle: {
    marginVertical: 6,
    fontFamily: normal,
    fontSize: 14,
    color: "#73798C"
  },

  discussionInfoContainerStyle: {
    paddingLeft: 24
  },

  discussionTitleStyle: {
    fontFamily: bold,
    fontSize: 20
  },

  topicStyle: {
    color: "#5152D0",
    fontFamily: bold
  },

  discussionHashtag: {
    fontFamily: normal,
    fontSize: 14,
    color: "#73798C"
  },

  repliesAndPlaysNumberContainerStyle: {
    flexDirection: "row",
    marginTop: 16
  },
  
  repliesAndPlaysNumberStyle: {
    fontSize: 12,
    marginRight: 16,
    color: "#73798C",
    fontFamily: normal
  }
});

export default DiscussionScreenCard;