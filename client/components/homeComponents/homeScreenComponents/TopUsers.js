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

//Icon
import NoProfilePicture from '../../../assets/publicAssets/noProfilePicture.png';

//Component
import LoadingSpinner from '../../publicComponents/LoadingSpinner';

const TopUsers = props => {
  const {
    topUserData,
    navigation
  } = props;

  return (
    <View style={styles.topUsersContainerStyle}>
      <View style={styles.topUsersHeaderStyle}>
        <Text style={styles.topUsersTitleStyle}>Top Users</Text>
      </View>
      {
        !topUserData && (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )
      }
      <View style={styles.listStyle}>
        <FlatList
          data={topUserData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemData => (
            <TouchableOpacity style={styles.topUsersCardConntainerStyle} onPress={() => {
              navigation.navigate('UserProfile', {
                userId: itemData.item.id
              });
            }}>
              <Image source={itemData.item.profile_photo_path ? {uri: itemData.item.profile_photo_path} : NoProfilePicture} style={styles.profilePictureStyle} />
              {
                itemData.item.name === null ? <Text style={styles.topUsersNameStyle}> </Text> : (
                  itemData.item.name.length > 14 ? (
                    <Text style={styles.topUsersNameStyle}>{`${itemData.item.name.substr(0, 11)}...`}</Text>
                  ) : (
                    <Text style={styles.topUsersNameStyle}>{itemData.item.name}</Text>
                  )
                )
              }
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topUsersContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginTop: "2%",
    marginHorizontal: 8,
    borderRadius: 8
  },

  topUsersHeaderStyle: {
    backgroundColor: "#7817FF",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 50,
    paddingLeft: "5%"
  },

  topUsersTitleStyle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: bold,
    paddingBottom: "3%",
    paddingTop: "2%"
  },

  listStyle: {
    paddingLeft: "5%",
    marginVertical: "5.5%"
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
    fontFamily: normal
  }
});

export default TopUsers;