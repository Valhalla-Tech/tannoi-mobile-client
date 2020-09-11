import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const SearchResultBox = props => {
  const {
    searchInput
  } = props;

  return (
    <View style={styles.searchResultBoxContainerStyle}>
      <Text style={styles.searchInputTextStyle}>Search results for <Text style={{fontWeight: "bold"}}>"{searchInput}"</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResultBoxContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
    borderRadius: 8,
    padding: 16
  },

  searchInputTextStyle: {
    color: "#464D60",
    fontSize: 16
  }
});

export default SearchResultBox;