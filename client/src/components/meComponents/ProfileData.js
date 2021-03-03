import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { LinearTextGradient } from 'react-native-text-gradient';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';

//Icon
import NoProfilePicture from '../../assets/publicAssets/noProfilePicture.png';

//Component
import LoadingSpinner from '../publicComponents/LoadingSpinner';

const ProfileData = (props) => {
  const { profile, selectMenu, selectedMenu } = props;

  const UserProfileData = () => {
    return (
      <View>
        <LinearTextGradient 
          locations={[0, 1]}
          colors={['#5051DB', '#7E37B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Text style={styles.profileNameStyle}>{profile.name}</Text>
        </LinearTextGradient>
        <Text style={styles.locationStyle}>{profile.location}</Text>
        <View style={styles.profileInfoStyle}>
          <View style={styles.profileDataContainerStyle}>
            <Text style={styles.profileDataStyle}>Discussions</Text>
            <Text style={styles.profileDataNumberStyle}>
              {profile.discussion_count && profile.discussion_count}
            </Text>
          </View>
          <View style={styles.profileDataContainerStyle}>
            <Text style={styles.profileDataStyle}>Responses</Text>
            <Text style={styles.profileDataNumberStyle}>
              {profile.response_count && profile.response_count}
            </Text>
          </View>
          <View style={styles.profileDataContainerStyle}>
            <Text style={styles.profileDataStyle}>Followers</Text>
            <Text style={styles.profileDataNumberStyle}>
              {profile.follower_count && profile.follower_count}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ProfileMenuButton = (buttonTitle) => {
    return (
      <TouchableOpacity
        style={
          selectedMenu === buttonTitle
            ? {
                ...styles.profileInfoMenuButtonStyle,
                borderBottomWidth: 1,
                borderBottomColor: '#5152D0',
              }
            : styles.profileInfoMenuButtonStyle
        }
        onPress={() => selectMenu(buttonTitle)}>
        <Text
          style={
            selectedMenu === buttonTitle
              ? {
                  ...styles.profileInfoMenutButtonTextStyle,
                  color: '#5152D0',
                  fontFamily: bold,
                }
              : styles.profileInfoMenutButtonTextStyle
          }>
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
      <View
        style={
          profile !== ''
            ? styles.userProfileStyle
            : { ...styles.userProfileStyle, height: '15%' }
        }>
        {profile !== '' ? (
          <View style={styles.profileInfoContainerStyle}>
            <UserProfileData />
            <View style={styles.profileImageContainerStyle}>
              <Image
                source={
                  profile.profile_photo_path
                    ? { uri: profile.profile_photo_path }
                    : NoProfilePicture
                }
                style={styles.profileImageStyle}
              />
            </View>
          </View>
        ) : (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )}
      </View>
      <ProfileInfoMenu />
    </>
  );
};

const styles = StyleSheet.create({
  userProfileStyle: {
    backgroundColor: '#FFFFFF',
    paddingLeft: '3.5%',
    paddingRight: '5%',
    paddingBottom: '2%'
  },

  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '3%',
  },

  followButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
    fontFamily: bold,
  },

  profileInfoContainerStyle: {
    flexDirection: 'row',
  },

  profileNameStyle: {
    fontSize: CalculateHeight(2.5),
    fontFamily: bold,
  },

  locationStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },

  profileInfoStyle: {
    flexDirection: 'row',
    marginTop: '5%',
  },

  profileDataContainerStyle: {
    marginRight: '5%',
  },

  profileDataStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.5),
    fontFamily: normal,
  },

  profileDataNumberStyle: {
    color: '#464D60',
    fontFamily: bold,
    fontSize: CalculateHeight(2),
  },

  profileImageContainerStyle: {
    alignItems: 'flex-end',
    flex: 1,
    paddingTop: '2%',
  },

  profileImageStyle: {
    borderRadius: 50,
    height: CalculateWidth(20),
    width: CalculateWidth(20),
  },

  profileInfoMenuContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  profileInfoMenuButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '3%',
  },

  profileInfoMenutButtonTextStyle: {
    color: '#464D60',
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },
});

export default ProfileData;
