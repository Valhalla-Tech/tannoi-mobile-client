import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

const RECENT_SEARCHES_DATA = [
  {
    id: "1",
    name: "Bob Brownfoot"
  },
  {
    id: "2",
    name: "Apple"
  },
  {
    id: "3",
    name: "Newcastle United"
  },
]

const RecentSearches = () => {

  return (
    <View style={styles.recentSearchesContainerStyle}>
      <View style={styles.recentSearchesTitleAndClearAllButtonContainerStyle}>
        <Text style={styles.recentSearchesTitleStyle}>Recent searches</Text>
        <TouchableOpacity>
          <Text style={styles.clearAllButtonTextStyle}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={RECENT_SEARCHES_DATA}
        renderItem={itemData => (
          <TouchableOpacity style={styles.recentSearchesCardStyle}>
            <Text style={styles.cardTitleStyle}>{itemData.item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
  },

  recentSearchesCardStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9"
  },

  cardTitleStyle: {
    color: "#464D60",
    fontSize: 16
  }
});

export default RecentSearches;