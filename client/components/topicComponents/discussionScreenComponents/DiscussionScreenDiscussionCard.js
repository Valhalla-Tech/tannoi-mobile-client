import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { bold, normal, medium } from '../../../assets/FontSize';

//Profile picture example
import ProfilePictureExample from '../../../assets/publicAssets/bigProfilePicture.png';

//Icons
import DiscussionCardMenu from '../../../assets/topicAssets/discussionCardMenu.svg';
import Upvote from '../../../assets/topicAssets/upvote.svg';
import Downvote from '../../../assets/topicAssets/downvote.svg';

//Components
import DiscussionScreenPlayerCard from './DiscussionScreenPlayerCard';

const DiscussionScreenCard = props => {
  const {
    profilePicture,
    profileName,
    postTime,
    like,
    discussionTitle,
    hashtags,
    replies,
    plays,
    recordingFile
  } = props;

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

  return (
    <View style={styles.discussionScreenCardContainerStyle}>
      <View style={styles.discussionInfoSectionStyle}>
        <View style={styles.profileAndMenuContainerStyle}>
          <View style={styles.profileInfoContainerStyle}>
            <View style={styles.profileContainerStyle}>
              <Image source={profilePicture ? {uri: profilePicture} : ProfilePictureExample} style={styles.profileImageStyle} />
              <Text style={styles.profileNameStyle}>{profileName}</Text>
            </View>
            <Text style={styles.postTimeStyle}>1 Jun 2020, 12:45</Text>
          </View>
          <TouchableOpacity style={styles.discussionCardMenuStyle}>
            <DiscussionCardMenu />
          </TouchableOpacity>
        </View>
        <View style={styles.discussionVoteAndInfoContainerStyle}>
          <View style={styles.voteContainerStyle}>
            <TouchableOpacity>
              <Upvote />
            </TouchableOpacity>
              <Text style={styles.voteNumberStyle}>{numberConverter(like)}</Text>
            <TouchableOpacity>
              <Downvote />
            </TouchableOpacity>
          </View>
          <View style={styles.discussionInfoContainerStyle}>
            <Text style={styles.discussionTitleStyle}>{discussionTitle}</Text>
            <Text style={styles.discussionHashtag}>#football</Text>
            <View style={styles.repliesAndPlaysNumberContainerStyle}>
              <Text style={styles.repliesAndPlaysNumberStyle}>{numberConverter(replies)} Replies</Text>
              <Text style={styles.repliesAndPlaysNumberStyle}>{numberConverter(plays)} Plays</Text>
            </View>
          </View>
        </View>
      </View>
      {
        recordingFile !== '' && (
          <DiscussionScreenPlayerCard
            cardType="discussion"
            profilePicture={profilePicture}
            recordingFile={recordingFile}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  discussionScreenCardContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
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

  postTimeStyle: {
    marginLeft: 36,
    fontFamily: normal,
    color: "#73798C",
    fontSize: 12
  },

  discussionCardMenuStyle: {
    marginTop: 12
  },

  discussionVoteAndInfoContainerStyle: {
    flexDirection: "row",
    marginTop: 24
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