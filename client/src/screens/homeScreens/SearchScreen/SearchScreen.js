import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {search} from '../../../store/actions/SearchAction';

//Components
import SearchBar from '../../../components/publicComponents/SearchBar';
import RecentSearches from '../../../components/homeComponents/searchScreenComponents/RecentSearches';
import SearchResultBox from '../../../components/homeComponents/searchScreenComponents/SearchResultBox';

const SearchScreen = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('User');

  const discussions = useSelector((state) => state.SearchReducer.discussions);
  const users = useSelector((state) => state.SearchReducer.users);

  const dispatch = useDispatch();

  const searchBoxInput = (input) => {
    setSearchInput(input);
    dispatch(search(input, 1));
  };

  const setSearchCategory = (input) => {
    setCategory(input);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.searchScreenContainerStyle}>
        <View style={styles.searchBarContainerStyle}>
          <SearchBar
            category={category}
            navigation={navigation}
            searchBarIsOpen={true}
            searchBoxInput={searchBoxInput}
            customStyle={{
              marginHorizontal: '4.2%',
            }}
            setSearchCategory={setSearchCategory}
          />
        </View>
        {!searchInput && <RecentSearches />}
        {searchInput !== '' && (
          <SearchResultBox
            searchInput={searchInput}
            category={category}
            discussionResults={discussions}
            userResults={users}
            navigation={navigation}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchScreenContainerStyle: {
    flex: 1,
  },

  searchBarContainerStyle: {
    backgroundColor: '#FFFFFF',
  },
});

export default SearchScreen;
