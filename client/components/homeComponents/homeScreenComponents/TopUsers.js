import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

//Profile picture example
import profilePictureExample from '../../../assets/homeAssets/bigProfilePicture.png';

const TOP_USERS_DATA = [
  {
    id: '1',
    imageUrl: profilePictureExample,
    name: 'Richard Hendricks'
  },
  {
    id: '2',
    imageUrl: profilePictureExample,
    name: 'Monical Hall'
  },
  {
    id: '3',
    imageUrl: profilePictureExample,
    name: 'Gavin Belson'
  },
  {
    id: '4',
    imageUrl: profilePictureExample,
    name: 'Laurie Bream'
  },
];

const TopUsers = () => {
  return (
    <View style={styles.topUsersContainerStyle}>
      <Text style={styles.topUsersTitleStyle}>Top users</Text>
      <FlatList
        data={TOP_USERS_DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={itemData => (
          <TouchableOpacity style={styles.topUsersCardConntainerStyle}>
            <Image source={itemData.item.imageUrl} style={styles.profilePictureStyle} resizeMode="stretch" />
            {
              itemData.item.name.length > 14 ? (
                <Text style={styles.topUsersNameStyle}>{`${itemData.item.name.substr(0, 11)}...`}</Text>
              ) : (
                <Text style={styles.topUsersNameStyle}>{itemData.item.name}</Text>
              )
            }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topUsersContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    paddingLeft: 16,
    paddingTop: 10
  },

  topUsersTitleStyle: {
    color: "#464D60",
    fontSize: 20,
    fontFamily: bold,
    paddingBottom: 30
  },

  topUsersCardConntainerStyle: {
    alignItems: "center",
    marginRight: 16
  },

  profilePictureStyle: {
    height: 90,
    width: 90,
    borderRadius: 50,
    marginBottom: 8
  },

  topUsersNameStyle: {
    color: "#464D60",
    fontSize: 12,
    marginBottom: 32,
    fontFamily: normal
  }
});

export default TopUsers;