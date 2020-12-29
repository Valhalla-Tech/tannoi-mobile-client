import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';

//Icon
import NoProfilePicture from '../../assets/publicAssets/noProfilePicture.png'

const ProfileData = props => {
  const {
    profile,
    selectMenu,
    selectedMenu
  } = props;

  const numberConverter = number => {
    if (number.length > 3 && number.length <= 6) {
      return `${number.substring(0, number.length - 3)}k`;
    } else if (number.length > 6 && number.length <= 9) {
      return `${number.substring(0, number.length - 6)}m`;
    } else if (number.length > 9) {
      return `${number.substring(0, number.length - 9)}b`;
    } else {
      return number
    };
  };

  const UserProfileData = () => {
    return (
      <View>
        <Text style={styles.profileNameStyle}>{profile.name}</Text>
        <Text style={styles.locationStyle}>{profile.location}</Text>
        <View style={styles.profileInfoStyle}>
          <View style={styles.profileDataContainerStyle}>
            <Text style={styles.profileDataStyle}>Discussions</Text>
            <Text style={styles.profileDataNumberStyle}>{profile.discussions && numberConverter(profile.discussions.length)}</Text>
          </View>
          <View style={styles.profileDataContainerStyle}>
            <Text style={styles.profileDataStyle}>Responses</Text>
            <Text style={styles.profileDataNumberStyle}>{profile.creator && numberConverter(profile.creator.length)}</Text>
          </View>
          <View style={styles.profileDataContainerStyle}>
            <Text style={styles.profileDataStyle}>Followers</Text>
            <Text style={styles.profileDataNumberStyle}>{profile.followers && numberConverter(profile.followers.length)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const ProfileMenuButton = (buttonTitle) => {
    return (
      <TouchableOpacity
        style={
          selectedMenu === buttonTitle ? 
          {
            ...styles.profileInfoMenuButtonStyle, 
            borderBottomWidth: 1,
            borderBottomColor: "#5152D0"
          } : 
          styles.profileInfoMenuButtonStyle
        }
        onPress={() => selectMenu(buttonTitle)}
      >
        <Text
          style={
            selectedMenu === buttonTitle ?
            {
              ...styles.profileInfoMenutButtonTextStyle,
              color: "#5152D0",
              fontFamily: bold
            } :
            styles.profileInfoMenutButtonTextStyle
          }
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const ProfileInfoMenu = () => {
    return (
      <View style={styles.profileInfoMenuContainerStyle}>
        {ProfileMenuButton('Discussions')}
        {ProfileMenuButton('Badges')}
        {ProfileMenuButton('About')}
      </View>
    );
  };

  return (
    <>
      <View style={profile !== '' ? styles.userProfileStyle : {...styles.userProfileStyle, height: "15%"}}>
        {
          profile !== '' ? (
          <View style={styles.profileInfoContainerStyle}>
            <UserProfileData />
            <View style={styles.profileImageContainerStyle}>
              <Image source={profile.profile_photo_path ? { uri: profile.profile_photo_path } : NoProfilePicture} style={styles.profileImageStyle} />
            </View>
          </View>
          ) : (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          )
        }
      </View>
      <ProfileInfoMenu />
    </>
  );
};

const styles = StyleSheet.create({
  userProfileStyle: {
    backgroundColor: "#FFFFFF",
    height: "25%",
    paddingLeft: "3.5%",
    paddingRight: "5%"
  },

  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "3%"
  },

  followButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  },

  profileInfoContainerStyle: {
    flexDirection: "row"
  },

  profileNameStyle: {
    fontSize: 20,
    fontFamily: bold
  },

  locationStyle: {
    fontFamily: normal,
    fontSize: 16
  },

  profileInfoStyle: {
    flexDirection: "row",
    marginTop: "15%"
  },

  profileDataContainerStyle: {
    marginRight: "5%"
  },

 profileDataStyle: {
    color: "#73798C",
    fontSize: 12,
    fontFamily: normal,
    marginBottom: -10
  },

  profileDataNumberStyle: {
    color: "#464D60",
    fontFamily: bold,
    fontSize: 16
  },

  profileImageContainerStyle: {
    alignItems: "flex-end",
    flex: 1,
    paddingTop: "2%"
  },

  profileImageStyle: {
    borderRadius: 50,
    height: 80,
    width: 80
  },

  profileInfoMenuContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },

  profileInfoMenuButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3%"
  },
  
  profileInfoMenutButtonTextStyle: {
    color: "#464D60",
    fontFamily: normal,
    fontSize: 16
  }
});

export default ProfileData;