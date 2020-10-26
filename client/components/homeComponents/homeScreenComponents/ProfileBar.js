import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { bold } from '../../../assets/FontSize';

//Icon
import NoProfilePicture from '../../../assets/publicAssets/noProfilePicture.png';

const ProfileBar = props => {
  const {
    user
  } = props;

  return (
    <View style={styles.profileBarContainerStyle}>
      <View style={styles.profileInfoContainerStyle}>
        <Image source={user.profile_photo_path ? {uri: user.profile_photo_path} : NoProfilePicture} style={styles.profilePictureStyle} />
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
    paddingVertical: "3%"
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