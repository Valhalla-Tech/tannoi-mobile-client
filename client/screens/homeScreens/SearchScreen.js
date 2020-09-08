import React from 'react';
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
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.searchScreenContainerStyle}>
        <SearchBar 
          navigation={navigation}
          searchBarIsOpen={true}
        />
        <RecentSearches />
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