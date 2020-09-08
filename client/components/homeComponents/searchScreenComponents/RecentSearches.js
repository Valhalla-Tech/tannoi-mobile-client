import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const RecentSearches = () => {
  return (
    <View style={styles.recentSearchesContainerStyle}>
      <View style={styles.recentSearchesTitleAndClearAllButtonContainerStyle}>
        <Text style={styles.recentSearchesTitleStyle}>Recent searches</Text>
        <TouchableOpacity>
          <Text style={styles.clearAllButtonTextStyle}>Clear all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recentSearchesContainerStyle: {
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8
  },

  recentSearchesTitleAndClearAllButtonContainerStyle: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center"
  },

  recentSearchesTitleStyle: {
    fontSize: 16,
    color: "#464D60",
    fontWeight: "bold"
  },

  clearAllButtonTextStyle: {
    fontSize: 14,
    color: "#0E4EF4"
  }
});

export default RecentSearches;