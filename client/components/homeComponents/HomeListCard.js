import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

//Icons
import ActivePlayButton from '../../assets/homeAssets/activePlayButton.svg';
import PlayButton from '../../assets/homeAssets/playButton.svg';

const HomeListCard = props => {
  const {
    imageUrl,
    name,
    title,
    votes,
    replies,
    plays,
    time
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

  return (
    <TouchableOpacity style={styles.homeListCardContainerStyle}>
      <View>
        <View style={styles.profileContainerStyle}>
          <Image source={imageUrl} style={styles.profilePictureStyle} resizeMode="stretch" />
          <Text style={styles.nameTextStyle}>{name}</Text>
        </View>
        <Text style={styles.titleTextStyle}>{title}</Text>
        <View style={styles.cardInfoContainerStyle}>
          <Text style={styles.cardInfoStyle}>{numberConverter(votes)} Votes</Text>
          <Text style={styles.cardInfoStyle}>{numberConverter(replies)} Replies</Text>
          <Text style={{...styles.cardInfoStyle}}>{numberConverter(plays)} Plays</Text>
        </View>
      </View>
      <View style={styles.playButtonAndDurationContainerStyle}>
        <Text style={styles.durationStyle}>{time}m</Text>
        <TouchableOpacity>
          <ActivePlayButton />
        </TouchableOpacity>
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
    height: 136
  },

  profileContainerStyle: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: "3.8%"
  },

  profilePictureStyle: {
    height: 24, 
    width: 24, 
    borderRadius: 50
  },

  nameTextStyle: {
    fontSize: 14, 
    color: "#464D60", 
    marginLeft: 8
  },

  titleTextStyle: {
    fontSize: 16, 
    color: "#464D60", 
    fontWeight: "bold", 
    width: 267, 
    marginBottom: "3.8%"
  },

  cardInfoContainerStyle: {
    flexDirection: "row"
  },

  cardInfoStyle: {
    marginRight: 16, 
    fontSize: 12, 
    color: "#73798C"
  },

  playButtonAndDurationContainerStyle: {
    alignItems: "flex-end", 
    marginLeft: "10%"
  },

  durationStyle: {
    marginBottom: 10, 
    fontSize: 12, 
    color: "#73798C"
  }
});

export default HomeListCard;