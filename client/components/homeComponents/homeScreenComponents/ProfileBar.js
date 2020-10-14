import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { bold } from '../../../assets/FontSize';

//Profile picture examples
import ProfilePictureExample from '../../../assets/homeAssets/profilePictureExample.svg';
import ProfilePictureExample2 from '../../../assets/homeAssets/bigProfilePicture.png';

const ProfileBar = props => {
  const {
    user
  } = props;

  return (
    <View style={styles.profileBarContainerStyle}>
      <View style={styles.profileInfoContainerStyle}>
        <Image source={{uri: user.profile_photo_path}} style={styles.profilePictureStyle} />
        <Text style={styles.profileBarTextStyle}>{user.name}</Text>
      </View >
    </View>
  )
};

const styles = StyleSheet.create({
  profileBarContainerStyle: {
    backgroundColor: "#FFFFFF",
  },
  
  profileInfoContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 10
  },

  profilePictureStyle: {
    borderRadius: 50,
    width: 24,
    height: 24
  },

  profileBarTextStyle: {
    fontSize: 16,
    color: "#464D60",
    marginLeft: 12,
    fontFamily: bold
  }
});

export default ProfileBar;