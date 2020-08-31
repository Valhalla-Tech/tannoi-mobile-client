import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

//Icon
import SearchIcon from '../../assets/homeAssets/searchIcon.svg';

//Component
import SearchBarCard from '../../components/homeComponents/SearchBarCard';

const DATA = [
  {
    id: '1',
    title: 'All discussions',
  },
  {
    id: '2',
    title: 'Music',
  },
  {
    id: '3',
    title: 'Football',
  },
  {
    id: '4',
    title: 'Games',
  },
  {
    id: '5',
    title: 'Cars',
  },
  {
    id: '6',
    title: 'Entertainment',
  }
];

const SearchBar = props => {
  const [currentSelectedDiscussion, setCurrentSelectedDiscussion] = useState('All discussions');

  const changeSelectedDiscussion = discussion => {
    setCurrentSelectedDiscussion(discussion);
  };

  return (
    <View style={styles.searchBarContainerStyle}>
      <View style={styles.searchBarStyle}>
        <TouchableOpacity
          style={styles.searchBoxStyle}
        >
          <SearchIcon />
          <Text style={styles.searchBoxTextStyle}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        horizontal={true}
        contentContainerStyle={styles.searchBarCardContainerStyle}
        showsHorizontalScrollIndicator={false}
        renderItem={itemData => (
          <SearchBarCard 
            cardTitle={itemData.item.title}
            selectedDiscussion={currentSelectedDiscussion}
            changeDiscussion={changeSelectedDiscussion}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainerStyle: {
    backgroundColor: "#FFFFFF"
  },

  searchBarStyle: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8
  },

  searchBoxStyle: {
    backgroundColor: "#E3E6EB",
    padding: 6,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  searchBoxTextStyle: {
    color: "#73798C",
    fontSize: 16,
    marginLeft: 10
  },

  searchBarCardContainerStyle: {
    marginLeft: 16,
    paddingVertical: 8,
    paddingRight: 20
  }
});

export default SearchBar;