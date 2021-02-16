import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';

//Icons
import LockIcon from '../../assets/homeAssets/lockIcon.png';
import tickIcon from '../../assets/publicAssets/tickIcon.png';

//Component
import HomeListCardPlayer from './ListCardPlayer';

const HomeListCard = (props) => {
  const {
    imageUrl,
    name,
    title,
    votes,
    replies,
    plays,
    postTime,
    discussionId,
    navigation,
    recordingFile,
    topic,
    isBorder,
    discussionType,
    openModal,
    isAuthorized,
    profileType,
    isTopResponsePreview,
    responseId,
    caption,
    isCommunityDiscussion,
  } = props;

  const HomeListCardData = () => {
    return (
      <View style={isTopResponsePreview ? { maxWidth: '70%' } : ''}>
        <View style={styles.profileContainerStyle}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.profilePictureStyle}
          />
          <Text style={styles.nameTextStyle}>{name}</Text>
          {profileType === 1 && (
            <Image source={tickIcon} style={styles.tickIconStyle} />
          )}
        </View>
        {topic !== '' && !isTopResponsePreview && (
          <Text style={styles.topicStyle}>{topic}</Text>
        )}
        <Text
          style={
            isTopResponsePreview
              ? { ...styles.titleTextStyle, fontFamily: normal }
              : styles.titleTextStyle
          }>
          {isTopResponsePreview ? caption : title}
        </Text>
        {!isTopResponsePreview && (
          <View style={styles.cardInfoContainerStyle}>
            <Text style={styles.cardInfoStyle}>
              {votes} Votes
            </Text>
            <Text style={styles.cardInfoStyle}>
              {replies} Replies
            </Text>
            <Text style={{ ...styles.cardInfoStyle }}>
              {plays} Plays
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={
        isTopResponsePreview
          ? {
              ...styles.homeListCardContainerStyle,
              paddingLeft: '5%',
              paddingHorizontal: 0,
              borderLeftWidth: 3,
              borderLeftColor: '#F5F7F9',
              borderBottomWidth: 0,
              paddingVertical: '3%',
            }
          : isBorder
          ? styles.homeListCardContainerStyle
          : {
              ...styles.homeListCardContainerStyle,
              borderBottomWidth: 0,
              paddingBottom: '2%',
            }
      }
      onPress={() => {
        if (discussionType === 2 && !isAuthorized && !isTopResponsePreview) {
          openModal();
        } else if (
          discussionType === 2 &&
          isAuthorized &&
          !isTopResponsePreview
        ) {
          navigation.push('DiscussionScreen', {
            discussionId: discussionId,
          });
        } else if (isTopResponsePreview) {
          navigation.push('ResponseScreen', {
            responseId: responseId,
            discussionId: discussionId,
          });
        } else {
          navigation.push('DiscussionScreen', {
            discussionId: discussionId,
            isCommunityDiscussion: isCommunityDiscussion
          });
        }
      }}>
      <HomeListCardData />
      <View style={styles.playButtonAndDurationContainerStyle}>
        <Text style={styles.postTimeStyle}>{postTime}</Text>
        {isTopResponsePreview ? null : discussionType === 2 ? (
          <Image source={LockIcon} style={styles.lockIconStyle} />
        ) : (
          <HomeListCardPlayer
            recordingFile={recordingFile}
            discussionId={discussionId}
            navigation={navigation}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeListCardContainerStyle: {
    flexDirection: 'row',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
    justifyContent: 'space-between',
  },

  profileContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1.5%',
  },

  profilePictureStyle: {
    height: '75%',
    width: '8%',
    borderRadius: 50,
  },

  nameTextStyle: {
    fontSize: CalculateHeight(1.8),
    color: '#464D60',
    marginLeft: '3%',
    fontFamily: normal,
  },

  tickIconStyle: {
    height: CalculateWidth(3.5),
    width: CalculateWidth(3.5),
    marginLeft: '2%',
  },

  topicStyle: {
    color: '#5152D0',
    fontFamily: bold,
  },

  titleTextStyle: {
    fontSize: CalculateHeight(2),
    color: '#464D60',
    fontFamily: bold,
    width: 267,
    marginBottom: '1.5%',
  },

  cardInfoContainerStyle: {
    flexDirection: 'row',
  },

  cardInfoStyle: {
    marginRight: '6%',
    fontSize: CalculateHeight(1.5),
    color: '#73798C',
    fontFamily: normal,
  },

  playButtonAndDurationContainerStyle: {
    alignItems: 'flex-end',
  },

  postTimeStyle: {
    marginBottom: '6%',
    fontSize: CalculateHeight(1.5),
    color: '#73798C',
    fontFamily: normal,
  },

  lockIconStyle: {
    width: CalculateWidth(6.5),
    height: CalculateWidth(8.15),
    borderWidth: 1,
    marginRight: '10%',
  },
});

export default HomeListCard;
