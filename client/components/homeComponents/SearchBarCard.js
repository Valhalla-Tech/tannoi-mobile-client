import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const SearchBarCard = props => {
  const { 
    cardTitle,
    selectedDiscussion,
    changeDiscussion
  } = props;

  return (
    <>
      {
        cardTitle === selectedDiscussion ? (
            <View style={{...styles.searchBarCardStyle, backgroundColor: "#5152D0", borderWidth: 0}}>
              <Text style={{...styles.searchBarCardTextStyle, color: "#FFFFFF"}}>{cardTitle}</Text>
            </View>
        ) : (
          <TouchableOpacity 
            style={{...styles.searchBarCardStyle}}
            onPress={() => {
              changeDiscussion(cardTitle);
            }}
          >
            <Text style={styles.searchBarCardTextStyle}>{cardTitle}</Text>
          </TouchableOpacity>
        )
      }
    </>
  )
};

const styles = StyleSheet.create({
  searchBarCardStyle: {
    marginRight: 9,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: "#E3E6EB"
  },

  searchBarCardTextStyle: {
    color: "#73798C",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.4
  }
});

export default SearchBarCard;