import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

const ClosedCard = props => {
  const {
    profilePicture,
    profileName,
    postTime,
    caption,
    cardIndex,
    selectCard,
    discussionTitle
  } = props;

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

  return (
    <TouchableOpacity 
      style={styles.closedCardContainerStyle}
      onPress={() => {
        selectCard(cardIndex);
      }}
    >
      <View style={styles.profileAndPostTimeContainerStyle}>
        <View style={styles.profileInfoContainerStyle}>
          <Image source={{uri: profilePicture}} style={styles.profileImageStyle} />
          <Text style={styles.profileNameStyle}>{profileName}</Text>
        </View>
        <Text style={styles.postTimeStyle}>{postTime ? convertPostTime(postTime) : ''}</Text>
      </View>
      {
        cardIndex === 'discussion' ? (
          (
            discussionTitle.length > 45 ? (
              <Text style={styles.discussionTitleStyle}>{discussionTitle.substring(0,42)}...</Text>
            ) : (
              <Text style={styles.discussionTitleStyle}>{discussionTitle}</Text>
            )
          )
        ) : (
          <Text style={styles.captionTextStyle}>{caption}</Text>
        )
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closedCardContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16
  },

  profileAndPostTimeContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  profileInfoContainerStyle: {
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
    fontSize: 14,
    color: "#464D60",
    fontFamily: bold
  },

  postTimeStyle: {
    color: "#73798C",
    fontSize: 12,
    fontFamily: normal
  },

  discussionTitleStyle: {
    marginVertical: "2%",
    fontSize: 16,
    fontFamily: bold
  },

  captionTextStyle: {
    fontSize: 16,
    color: "#464D60",
    fontFamily: normal,
    marginTop: 12
  }
});

export default ClosedCard;