import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

//Components
import SearchBar from '../../../components/publicComponents/SearchBar';
import RecentSearches from '../../../components/homeComponents/searchScreenComponents/RecentSearches';
import SearchResultBox from '../../../components/homeComponents/searchScreenComponents/SearchResultBox';

const SearchScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');

  const searchBoxInput = input => {
    setSearchInput(input);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.searchScreenContainerStyle}>
        <View style={styles.searchBarContainerStyle}>
          <SearchBar 
            navigation={navigation}
            searchBarIsOpen={true}
            searchBoxInput={searchBoxInput}
            customStyle={{
              marginHorizontal: "4.2%"
            }}
          />
        </View>
        {
          !searchInput && (
            <RecentSearches />
          )
        }
        {
          searchInput !== '' && (
            <SearchResultBox
              searchInput={searchInput}
            />
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchScreenContainerStyle: {
    flex: 1
  },

  searchBarContainerStyle: {
    backgroundColor: "#FFFFFF"
  }
});

export default SearchScreen;