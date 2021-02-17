import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { normal } from '../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';

const SearchBarCard = (props) => {
  const { cardTitle, hashtagId, navigation } = props;

  return (
    <TouchableOpacity
      style={styles.searchBarCardStyle}
      onPress={() => {
        navigation.navigate('HashtagDetailScreen', {
          query: 'hashtag_id=',
          queryId: hashtagId,
          hashtagDetailTitle: cardTitle,
        });
      }}>
      <Text style={styles.searchBarCardTextStyle}>{cardTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarCardStyle: {
    marginRight: CalculateWidth(2),
    borderWidth: 1,
    paddingVertical: CalculateWidth(1),
    paddingHorizontal: CalculateWidth(2),
    borderRadius: 5,
    borderColor: '#E3E6EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBarCardTextStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
  },
});

export default SearchBarCard;
