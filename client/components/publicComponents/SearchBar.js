import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native';
import { normal } from '../../assets/FontSize';

//Icons
import SearchIcon from '../../assets/homeAssets/searchIcon.svg';
import BackButtonIcon from '../../assets/publicAssets/back-button.svg';

//Component
import SearchBarCard from './SearchBarCard';

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
  const {
    category,
    searchBarIsOpen,
    navigation,
    searchBoxInput,
    showCard,
    customStyle,
    setSearchCategory
  } = props;
  
  const [currentSelectedDiscussion, setCurrentSelectedDiscussion] = useState('All discussions');
  const [searchBoxIsFilled, setSearchBoxIsFilled] = useState(false);

  const searchBarStyle = {...styles.searchBarStyle, ...customStyle};

  const changeSelectedDiscussion = discussion => {
    setCurrentSelectedDiscussion(discussion);
  };

  const CategoryButton = (buttonName) => {
    return (
      <TouchableOpacity 
        style={
          category === buttonName ? {
            ...styles.searchCategoryStyle,
            borderBottomColor: "#5152D0",
            borderRightWidth: 1,
            borderRightColor: "#F5F7F9"
          } : {
            ...styles.searchCategoryStyle, 
            borderBottomColor: "#F5F7F9",
            borderRightWidth: 1, 
            borderRightColor: "#F5F7F9"
          }
        }
        onPress={() => {
          setSearchCategory(buttonName);
        }}
        disabled={category === buttonName ? true : false}
      >
        <Text style={category === buttonName ? {
            ...styles.searchCategoryTitleStyle, 
            color: "#5152D0"
          } : {
            ...styles.searchCategoryTitleStyle,
            color: "#464D60"
          }
        }>
          {buttonName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.searchBarContainerStyle}>
      <View style={searchBarStyle}>
        {
          searchBarIsOpen && (
            <TouchableOpacity 
              style={styles.backButtonStyle}
              onPress={() => navigation.goBack()}
            >
              <BackButtonIcon />
            </TouchableOpacity>
          )
        }
        {
          !searchBarIsOpen ? (
            <TouchableOpacity
              style={{...styles.searchBoxStyle, marginTop: -5}}
              onPress={() => navigation.navigate('SearchScreen')}
            >
              <SearchIcon />
              <Text style={styles.searchBoxTextStyle}>Search</Text>
            </TouchableOpacity>
          ) : (
            <TextInput
              autoFocus={true}
              style={styles.searchBoxStyle}
              placeholder="Search"
              onChangeText={value => {
                searchBoxInput(value);

                if (value) {
                  setSearchBoxIsFilled(true);
                } else {
                  setSearchBoxIsFilled(false);
                }
              }}
            />
          )
        }
      </View>
      {
        !searchBarIsOpen && showCard && (
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
        )
      }
      {
        searchBoxIsFilled && (
          <View style={styles.searchResultCategoryContainerStyle}>
            {CategoryButton('User')}
            {CategoryButton('Discussions')}
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    marginRight: 22
  },

  searchBarStyle: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center"
  },

  searchBoxStyle: {
    backgroundColor: "#F7F7F7",
    padding: 6,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  searchBoxTextStyle: {
    color: "#73798C",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: normal
  },

  searchBarCardContainerStyle: {
    marginLeft: 16,
    paddingVertical: 8,
    paddingRight: 20,
    marginTop: -8
  },

  searchResultCategoryContainerStyle: {
    flexDirection: "row"
  },

  searchCategoryStyle: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1
  },

  searchCategoryTitleStyle: {
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default SearchBar;