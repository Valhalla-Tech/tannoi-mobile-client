import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { bold } from '../../../assets/FontSize';

//Icon
import NoProfilePicture from '../../../assets/publicAssets/noProfilePicture.png';
import tickIcon from '../../../assets/homeAssets/tickIcon.png';

const ProfileBar = props => {
  const {
    user,
    navigation
  } = props;

  return (
    <View style={styles.profileBarContainerStyle}>
      <View style={styles.profileInfoContainerStyle}>
        <Image source={user.profile_photo_path ? {uri: user.profile_photo_path} : NoProfilePicture} style={styles.profilePictureStyle} />
        <Text style={styles.profileBarTextStyle}>{user.name}</Text>
        {
          user.type === 1 && <Image source={tickIcon} style={styles.tickIconStyle} />
        }
      </View >
      {
        user !== '' && user.type !== 1 && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('VerificationNavigation')}
            style={styles.verifyButtonStyle}
          >
            <Text style={styles.verifyButtonTextStyle}>VERIFY</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
};

const styles = StyleSheet.create({
  profileBarContainerStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "5%",
    paddingVertical: "1%"
  },

  verifyButtonStyle: {
    borderWidth: 1,
    paddingHorizontal: "1%",
    borderRadius: 10,
    borderColor: "#56c930"
  },

  verifyButtonTextStyle: {
    fontFamily: bold,
    color: "#56c930"
  },
  
  profileInfoContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3.9%",
    paddingVertical: "1%"
  },

  profilePictureStyle: {
    borderRadius: 50,
    width: 25,
    height: 25
  },

  profileBarTextStyle: {
    fontSize: 16,
    color: "#464D60",
    marginLeft: "3%",
    fontFamily: bold
  },

  tickIconStyle: {
    height: 15, 
    width: 15, 
    marginLeft: "2%"
  }
});

export default ProfileBar;