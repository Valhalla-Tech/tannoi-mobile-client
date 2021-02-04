import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOneProfile,
  clearUserProfile,
} from '../../../store/actions/ProfileAction';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { GlobalPadding } from '../../../constants/Size';
import { GenerateDeepLink } from '../../../helper/GenerateDeepLink';
import AboutSection from '../../../components/meComponents/AboutSection';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import ProfileData from '../../../components/meComponents/ProfileData';
import List from '../../../components/publicComponents/List';
import NoticeModal from '../../../components/publicComponents/Modal';

const UserProfileScreen = ({ route, navigation }) => {
  const { userId, fromDeepLink } = route.params;

  const [selectedMenu, setSelectedMenu] = useState('Discussions');
  const [noticeModal, setNoticeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const discussions = useSelector(
    (state) => state.DiscussionReducer.userDiscussion,
  );
  const discussionCount = useSelector(
    (state) => state.DiscussionReducer.userDiscussionCount,
  );

  const dispatch = useDispatch();

  const followingUserId = useSelector((state) => state.HomeReducer.user.id);

  const profile = useSelector((state) => state.ProfileReducer.userProfile);

  useEffect(() => {
    dispatch(clearUserProfile());
    dispatch(clearDiscussion(true));

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearUserProfile());
      dispatch(clearDiscussion(true));
      dispatch(getOneProfile(userId));
      dispatch(getAllDiscussion('user_id=', userId, null, null, true));
    });

    const clearScreen = () => {
      dispatch(clearUserProfile());
      dispatch(clearDiscussion(true));
    };

    if (fromDeepLink) {
      dispatch(clearHome());
      dispatch(getHome());
    }

    return unsubscribe, clearScreen;
  }, [navigation]);

  const followAccount = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      GenerateDeepLink(
        'Follow an Account',
        'This is a link to User Profile',
        'UserProfileScreen',
        {
          userId: followingUserId,
        },
        'follow user',
        async (url) => {
          try {
            let followAccountRequest = await axios({
              method: 'get',
              url: `${BaseUrl}/users/${
                profile.isFollowing ? 'unfollow' : 'follow'
              }/${userId}?deep_link=${url}`,
              headers: {
                token: access_token,
              },
            });

            if (followAccountRequest) {
              dispatch(getOneProfile(userId));
            }
          } catch (error) {
            if (error.response.data.msg === 'You have to login first') {
              dispatch(userLogout());
            }
          }
        },
      );
    } catch (error) {
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      }
    }
  };

  const openModal = () => {
    setNoticeModal(true);
  };

  const closeModal = () => {
    setNoticeModal(false);
  };

  const selectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const changeCurrentPage = (input) => {
    setCurrentPage(input);
  };

  const noticeModalChild = () => {
    return (
      <Text style={styles.noticeModalTextStyle}>
        You don't have access to this discussion
      </Text>
    );
  };

  return (
    <View style={styles.userProfileScreenContainerStyle}>
      <View style={styles.headerStyle}>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
        {profile.isFollowing !== undefined && (
          <TouchableOpacity onPress={() => followAccount()}>
            <Text style={styles.followButtonTextStyle}>
              {profile.isFollowing ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ProfileData
        profile={profile}
        selectMenu={selectMenu}
        selectedMenu={selectedMenu}
      />
      <FlatList
        ListHeaderComponent={
          <View style={styles.cardContainerStyle}>
            {selectedMenu === 'Discussions' ? (
              <List
                sectionType="discussion"
                sectionQuery="user_id="
                queryId={userId}
                isHeader={false}
                navigation={navigation}
                isUsingMoreButton={false}
                listData={discussions}
                useMoreButton={
                  discussionCount > 20 &&
                  discussions.length < discussionCount &&
                  true
                }
                openModal={openModal}
                customStyle={{
                  marginBottom: '5%',
                }}
                currentPage={currentPage}
                changeCurrentPage={changeCurrentPage}
                isUserDiscussion={true}
              />
            ) : selectedMenu === 'About' ? (
              <AboutSection
                customStyle={styles.cardStyle}
                bio={profile.bio}
                gender={profile.gender}
                birthDate={profile ? profile.birth_date : null}
                bioVoiceFile={profile.bio_voice_path}
                isLoading={profile ? false : true}
                navigation={navigation}
              />
            ) : null}
          </View>
        }
      />
      <NoticeModal
        openModal={noticeModal}
        closeModal={closeModal}
        child={noticeModalChild}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userProfileScreenContainerStyle: {
    flex: 1,
  },

  userProfileStyle: {
    backgroundColor: '#FFFFFF',
    height: '25%',
    paddingLeft: '3.5%',
    paddingRight: '5%',
  },

  headerStyle: {
    backgroundColor: '#FFFFFF',
    paddingLeft: '3.5%',
    paddingRight: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '3%',
  },

  followButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: 16,
    fontFamily: bold,
  },

  cardContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  profileInfoContainerStyle: {
    flexDirection: 'row',
  },

  profileNameStyle: {
    fontSize: 20,
    fontFamily: bold,
  },

  locationStyle: {
    fontFamily: normal,
    fontSize: 16,
  },

  profileInfoStyle: {
    flexDirection: 'row',
    marginTop: '15%',
  },

  profileDataContainerStyle: {
    marginRight: '5%',
  },

  profileDataStyle: {
    color: '#73798C',
    fontSize: 12,
    fontFamily: normal,
    marginBottom: -10,
  },

  profileDataNumberStyle: {
    color: '#464D60',
    fontFamily: bold,
    fontSize: 16,
  },

  profileImageContainerStyle: {
    alignItems: 'flex-end',
    flex: 1,
    paddingTop: '2%',
  },

  profileImageStyle: {
    borderRadius: 50,
    height: 80,
    width: 80,
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
    fontSize: 16,
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
  },

  cardStyle: {
    marginTop: '2%',
    borderRadius: 8,
  },

  aboutDataStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
  },

  aboutDataIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#F5F7F9',
  },

  dataContentStyle: {
    marginLeft: '3%',
  },

  dataTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: 16,
  },

  dataTitleStyle: {
    fontFamily: normal,
    fontSize: 12,
    color: '#73798C',
  },
});

export default UserProfileScreen;
