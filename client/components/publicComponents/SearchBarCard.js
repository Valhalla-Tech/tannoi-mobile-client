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
    selectedDiscussion,
    changeDiscussion
  } = props;

  return (
    <>
      {
        cardTitle === selectedDiscussion ? (
            <View style={{...styles.searchBarCardStyle, backgroundColor: "#B219FF", borderWidth: 0}}>
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