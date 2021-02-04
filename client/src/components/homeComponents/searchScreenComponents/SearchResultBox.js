import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';
import { normal } from '../../../assets/FontSize';

//Icon
import TickIcon from '../../../assets/publicAssets/tickIcon.png';

const SearchResultBox = (props) => {
  const { searchInput, category, userResults, navigation } = props;

  const renderUserList = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserProfileScreen', {
            userId: itemData.item.id,
          });
        }}
        style={styles.userContainerStyle}>
        <Image
          source={{ uri: itemData.item.profile_photo_path }}
          style={styles.profileImageStyle}
        />
        <Text style={styles.userNameStyle}>{itemData.item.name}</Text>
        {itemData.item.type !== 0 && (
          <Image source={TickIcon} style={styles.iconStyle} />
        )}
      </TouchableOpacity>
    );
  };

  const ShowList = (data) => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUserList}
      />
    );
  };

  const pluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.searchResultBoxContainerStyle}>
          {/* <Text style={styles.searchInputTextStyle}>{pluralize(userResults.length, category === 'Discussions' ? 'discussion': 'user')} for <Text style={{fontWeight: "bold"}}>"{searchInput}"</Text>
          </Text> */}
          {category === 'Discussions' ? null : ShowList(userResults)}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  searchResultBoxContainerStyle: {
    backgroundColor: '#FFFFFF',
    margin: '1.8%',
    marginBottom: '5%',
    borderRadius: 8,
  },

  searchInputTextStyle: {
    color: '#464D60',
    fontSize: 16,
    marginHorizontal: '3%',
    marginTop: '5%',
    marginBottom: '5%',
  },

  userContainerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
    padding: '3.8%',
    alignItems: 'center',
  },

  profileImageStyle: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: '3%',
  },

  userNameStyle: {
    color: '#464D60',
    fontFamily: normal,
    fontSize: 16,
    marginRight: '1.5%',
  },

  iconStyle: {
    width: 15,
    height: 15,
  },
});

export default SearchResultBox;
