import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { normal } from '../../assets/FontSize';

const SearchBarCard = props => {
  const { 
    cardTitle,
    hashtagId,
    navigation,
    isAllDiscussion
  } = props;

  return (
    <TouchableOpacity 
      style={isAllDiscussion ? {...styles.searchBarCardStyle, backgroundColor: "#B219FF", borderWidth: 0} : {...styles.searchBarCardStyle}}
      onPress={() => {
        navigation.navigate('HashtagDetailScreen', {
          query: 'hashtag_id=',
          queryId: hashtagId,
          hashtagDetailTitle: cardTitle
        });
      }}
      disabled={isAllDiscussion ? true : false}
    >
      <Text style={isAllDiscussion ? {...styles.searchBarCardTextStyle, color: "#FFFFFF"} : styles.searchBarCardTextStyle}>{cardTitle}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  searchBarCardStyle: {
    marginRight: 9,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: "#E3E6EB",
    justifyContent: "center",
    alignItems: "center"
  },

  searchBarCardTextStyle: {
    color: "#73798C",
    fontSize: 14,
    letterSpacing: -0.4,
    fontFamily: normal
  }
});

export default SearchBarCard;