import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { bold } from '../../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { useDispatch } from 'react-redux';
import { setCommunityButtonProperties } from '../../../store/actions/CoachMarkAction';

//Icons
import NoProfilePicture from '../../../assets/publicAssets/noProfilePicture.png';
import tickIcon from '../../../assets/publicAssets/tickIcon.png';

//Component
import Button from '../../publicComponents/Button';

const ProfileBar = (props) => {
  const { user, navigation } = props;
  const communityBtnRef = useRef();
  const dispatch = useDispatch()

  return (
    <View style={styles.profileBarContainerStyle}>
      <View style={styles.profileInfoContainerStyle}>
        <Image
          source={
            user.profile_photo_path
              ? { uri: user.profile_photo_path }
              : NoProfilePicture
          }
          style={styles.profilePictureStyle}
        />
        <Text numberOfLines={2} style={styles.profileBarTextStyle}>{user.name}</Text>
        {user.type === 1 && (
          <Image source={tickIcon} style={styles.tickIconStyle} />
        )}
      </View>
      <View style={styles.profileBarButtonContainerStyle}>
        {user !== '' && user.type !== 1 && (
          <Button
            buttonTitle="Verify"
            buttonStyle={styles.verifyButtonStyle}
            buttonFunction={() => navigation.navigate('VerificationNavigation')}
          />
        )}
        <View
          ref={communityBtnRef}
          onLayout={el => {
            communityBtnRef.current.measure( (fx, fy, width, height, px, py) => {
              dispatch(setCommunityButtonProperties({
                x: CalculateWidth(70),
                y: CalculateHeight(5),
                width: 50,
                height: 50,
                borderRadius: 50,
              }))
            });
          }}>
        <Button
          buttonTitle="Communities"
          buttonStyle={{
            color: '#6505E1',
            borderColor: '#6505E1',
            padding: 0,
            marginBottom: 0,
            fontSize: CalculateHeight(1.5),
            paddingHorizontal: '2%',
          }}
          buttonFunction={() => navigation.navigate('CommunitiesNavigation')}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBarContainerStyle: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4.5%',
    paddingVertical: '1.5%',
  },

  verifyButtonStyle: {
    color: '#56c930',
    borderColor: '#56c930',
    padding: 0,
    marginBottom: 0,
    fontSize: CalculateHeight(1.5),
    paddingHorizontal: '2%',
    marginRight: '5%'
  },

  profileInfoContainerStyle: {
    maxWidth: CalculateWidth(40),
    flexDirection: 'row',
    alignItems: 'center',
  },

  profilePictureStyle: {
    borderRadius: 50,
    width: CalculateWidth(6.5),
    height: CalculateWidth(6.5),
  },

  profileBarTextStyle: {
    fontSize: CalculateHeight(2),
    color: '#464D60',
    marginLeft: '5%',
    fontFamily: bold,
  },

  tickIconStyle: {
    height: CalculateWidth(3.5),
    width: CalculateWidth(3.5),
    marginLeft: '2%',
  },

  profileBarButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ProfileBar;
