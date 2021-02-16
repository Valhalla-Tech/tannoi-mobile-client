import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { normal } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';

//Icons
import SearchIcon from '../../assets/homeAssets/searchIcon.svg';
import BackButtonIcon from '../../assets/publicAssets/back-button.svg';

//Component
import SearchBarCard from './SearchBarCard';

const SearchBar = (props) => {
  const {
    category,
    searchBarIsOpen,
    navigation,
    searchBoxInput,
    showCard,
    customStyle,
    setSearchCategory,
    topHashtag,
  } = props;

  const [searchBoxIsFilled, setSearchBoxIsFilled] = useState(false);

  const searchBarStyle = { ...styles.searchBarStyle, ...customStyle };

  const CategoryButton = (buttonName) => {
    return (
      <TouchableOpacity
        style={
          category === buttonName
            ? {
                ...styles.searchCategoryStyle,
                borderBottomColor: '#5152D0',
                borderRightWidth: 1,
                borderRightColor: '#F5F7F9',
              }
            : {
                ...styles.searchCategoryStyle,
                borderBottomColor: '#F5F7F9',
                borderRightWidth: 1,
                borderRightColor: '#F5F7F9',
              }
        }
        onPress={() => {
          setSearchCategory(buttonName);
        }}
        disabled={category === buttonName ? true : false}>
        <Text
          style={
            category === buttonName
              ? {
                  ...styles.searchCategoryTitleStyle,
                  color: '#5152D0',
                }
              : {
                  ...styles.searchCategoryTitleStyle,
                  color: '#464D60',
                }
          }>
          {buttonName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={!searchBoxIsFilled ? styles.searchBarContainerStyle : { ...styles.searchBarCardContainerStyle, paddingBottom: 0 }}>
      <View style={searchBarStyle}>
        {searchBarIsOpen && (
          <TouchableOpacity
            style={styles.backButtonStyle}
            onPress={() => navigation.goBack()}>
            <BackButtonIcon />
          </TouchableOpacity>
        )}
        {!searchBarIsOpen ? (
          <TouchableOpacity
            style={{ ...styles.searchBoxStyle, marginTop: -5 }}
            onPress={() => navigation.navigate('SearchScreen')}>
            <SearchIcon />
            <Text style={styles.searchBoxTextStyle}>Search</Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            autoFocus={true}
            style={styles.searchBoxStyle}
            placeholder="Search"
            onChangeText={(value) => {
              searchBoxInput(value);

              if (value) {
                setSearchBoxIsFilled(true);
              } else {
                setSearchBoxIsFilled(false);
              }
            }}
          />
        )}
      </View>
      {!searchBarIsOpen && showCard && (
        <FlatList
          data={topHashtag}
          horizontal={true}
          contentContainerStyle={styles.searchBarCardContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={(itemData) => (
            <SearchBarCard
              cardTitle={itemData.item.name}
              navigation={navigation}
              hashtagId={itemData.item.id}
            />
          )}
        />
      )}
      {searchBoxIsFilled && (
        <View style={styles.searchResultCategoryContainerStyle}>
          {CategoryButton('User')}
          {CategoryButton('Discussions')}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    marginRight: '5%',
  },

  searchBarContainerStyle: {
    paddingVertical: '3%',
  },

  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchBoxStyle: {
    backgroundColor: '#F7F7F7',
    padding: '2%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  searchBoxTextStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(2),
    marginLeft: '3%',
    fontFamily: normal,
  },

  searchBarCardContainerStyle: {
    paddingVertical: '2%',
  },

  searchResultCategoryContainerStyle: {
    flexDirection: 'row',
  },

  searchCategoryStyle: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  searchCategoryTitleStyle: {
    fontSize: CalculateHeight(2),
    fontWeight: 'bold',
  },
});

export default SearchBar;
