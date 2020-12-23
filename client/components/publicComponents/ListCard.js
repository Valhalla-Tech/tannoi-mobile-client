import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';

//Icon
import LockIcon from '../../assets/homeAssets/lockIcon.png';
import tickIcon from '../../assets/publicAssets/tickIcon.png';

//Component
import HomeListCardPlayer from './ListCardPlayer';

const HomeListCard = props => {
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
    profileType
  } = props;

  const numberConverter = number => {
    if (number.length > 3 && number.length <= 6) {
      return `${number.substring(0, number.length - 3)}k`;
    } else if (number.length > 6 && number.length <= 9) {
      return `${number.substring(0, number.length - 6)}m`;
    } else if (number.length > 9) {
      return `${number.substring(0, number.length - 9)}b`;
    } else {
      return number
    };
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

  const HomeListCardData = () => {
    return (
      <View >
        <View style={styles.profileContainerStyle}>
          <Image source={{uri: imageUrl}} style={styles.profilePictureStyle} />
          <Text style={styles.nameTextStyle}>{name}</Text>
          {
            profileType === 1 && <Image source={tickIcon} style={styles.tickIconStyle} />
          }
        </View>
        {
          topic !== '' && (
            <Text style={styles.topicStyle}>{topic}</Text>
          )
        }
        <Text style={styles.titleTextStyle}>{title}</Text>
        <View style={styles.cardInfoContainerStyle}>
          <Text style={styles.cardInfoStyle}>{numberConverter(votes)} Votes</Text>
          <Text style={styles.cardInfoStyle}>{numberConverter(replies)} Replies</Text>
          <Text style={{...styles.cardInfoStyle}}>{numberConverter(plays)} Plays</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity 
      style={
        isBorder ? styles.homeListCardContainerStyle : 
        {...styles.homeListCardContainerStyle, borderBottomWidth: 0, paddingBottom: "2%"}
      }

      onPress={() => {
        if (discussionType === 2 && !isAuthorized) {
          openModal();
        } else if (discussionType === 2 && isAuthorized) {
          navigation.navigate('DiscussionScreen', {
            discussionId: discussionId
          })
        } else {
          navigation.navigate('DiscussionScreen', {
            discussionId: discussionId
          })
        };
      }}
    >
      <HomeListCardData />
      <View style={styles.playButtonAndDurationContainerStyle}>
        <Text style={styles.postTimeStyle}>{convertPostTime(postTime)}</Text>
        {
          discussionType === 2 ? (
              <Image source={LockIcon} style={styles.lockIconStyle} />
            ) : (
              <HomeListCardPlayer
                recordingFile={recordingFile}
                discussionId={discussionId}
              />
          )
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeListCardContainerStyle:{
    flexDirection: "row",
    paddingVertical: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9",
    justifyContent: "space-around"
  },

  profileContainerStyle: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: "1.5%",
    // marginLeft: -1.5
  },

  profilePictureStyle: {
    height: "75%", 
    width: "8%", 
    borderRadius: 50
  },

  nameTextStyle: {
    fontSize: 14, 
    color: "#464D60", 
    marginLeft: "3%",
    fontFamily: normal
  },

  tickIconStyle: {
    height: 15, 
    width: 15, 
    marginLeft: "2%"
  },

  topicStyle: {
    color: "#5152D0",
    fontFamily: bold
  },

  titleTextStyle: {
    fontSize: 16, 
    color: "#464D60", 
    fontFamily: bold, 
    width: 267, 
    marginBottom: "1.5%"
  },

  cardInfoContainerStyle: {
    flexDirection: "row"
  },

  cardInfoStyle: {
    marginRight: "6%",
    fontSize: 12, 
    color: "#73798C",
    fontFamily: normal
  },

  playButtonAndDurationContainerStyle: {
    alignItems: "flex-end"
  },

  postTimeStyle: {
    marginBottom: "6%", 
    fontSize: 12, 
    color: "#73798C",
    fontFamily: normal
  },

  lockIconStyle: {
    width: 28,
    height: 34.8,
    borderWidth: 1,
    marginRight: "10%"
  }
});

export default HomeListCard;