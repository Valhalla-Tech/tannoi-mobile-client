import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

//Component
import HomeListCardPlayer from './HomeListCardPlayer';

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
    isBorder
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
    <TouchableOpacity style={isBorder ? styles.homeListCardContainerStyle : {...styles.homeListCardContainerStyle, borderBottomWidth: 0, paddingBottom: "2%"}}
      onPress={() => {
        navigation.navigate('DiscussionScreen', {
          discussionId: discussionId
        })
      }}
    >
      <HomeListCardData />
      <View style={styles.playButtonAndDurationContainerStyle}>
        <Text style={styles.postTimeStyle}>{convertPostTime(postTime)}</Text>
        <HomeListCardPlayer recordingFile={recordingFile} discussionId={discussionId} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeListCardContainerStyle:{
    flexDirection: "row",
    padding: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9",
    justifyContent: "space-around"
  },

  profileContainerStyle: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: "3.8%"
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

  topicStyle: {
    color: "#5152D0",
    fontFamily: bold
  },

  titleTextStyle: {
    fontSize: 16, 
    color: "#464D60", 
    fontFamily: bold, 
    width: 267, 
    marginBottom: "3.8%"
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
  }
});

export default HomeListCard;