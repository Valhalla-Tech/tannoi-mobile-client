import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

//Components
import SearchBar from '../../components/homeComponents/SearchBar';
import RecentSearches from '../../components/homeComponents/searchScreenComponents/RecentSearches';


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
        <SearchBar 
          navigation={navigation}
          searchBarIsOpen={true}
          searchBoxInput={searchBoxInput}
        />
        {
          !searchInput && (
            <RecentSearches />
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchScreenContainerStyle: {
    flex: 1
  }
});

export default SearchScreen;