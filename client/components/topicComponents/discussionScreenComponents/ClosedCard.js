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
    name,
    postTime,
    caption,
    cardId,
    selectCard
  } = props;

  return (
    <TouchableOpacity 
      style={styles.closedCardContainerStyle}
      onPress={() => {
        selectCard(cardId);
      }}
    >
      <View style={styles.profileAndPostTimeContainerStyle}>
        <View style={styles.profileInfoContainerStyle}>
          <Image source={profilePicture} style={styles.profileImageStyle} />
          <Text style={styles.profileNameStyle}>Richard Hendricks</Text>
        </View>
        <Text style={styles.postTimeStyle}>1 Jun 2020, 12:45</Text>
      </View>
      {
        cardId !== 'discussion' && <Text>Test caption</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closedCardContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
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
});

export default ClosedCard;