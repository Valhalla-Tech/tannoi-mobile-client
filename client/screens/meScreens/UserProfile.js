import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import { getOneProfile } from '../../store/actions/ProfileAction';
import { getUserDiscussion } from '../../store/actions/DiscussionAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';
import branch from 'react-native-branch';
import { getHome, clearHome } from '../../store/actions/HomeAction';

//Components
import BackButton from '../../components/publicComponents/BackButton';
import ProfileData from '../../components/meComponents/ProfileData';
import List from '../../components/publicComponents/List';
import NoticeModal from '../../components/publicComponents/Modal';
import Card from '../../components/publicComponents/Card';

const UserProfile = ({route, navigation}) => {
  const { userId } = route.params;

  const [selectedMenu, setSelectedMenu] = useState('Discussions');
  const [noticeModal, setNoticeModal] = useState(false);

  const userDiscussion = useSelector(state => state.DiscussionReducer.userDiscussion);

  const dispatch = useDispatch();

  const followingUserId = useSelector(state => state.HomeReducer.user.id);

  const profile = useSelector(state => state.ProfileReducer.userProfile);

  const followAccount = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
        locallyIndex: true,
        title: 'Follow an Account',
        contentDescription: 'This is a link to User Profile',
        contentMetadata: {
          ratingAverage: 4.2,
          customMetadata: {
            screen: 'UserProfile',
            payload: JSON.stringify({
              userId: followingUserId
            })
          }
        }
      });
      
      let linkProperties = {
        feature: 'follow user',
        channel: 'tannoi'
      };
      
      let controlParams = {
        $desktop_url: 'https://www.entervalhalla.tech/'
      };
      
      let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);

      let followAccountRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/users/${profile.isFollowing ? 'unfollow' : 'follow'}/${userId}?deep_link=${url}`,
        headers: {
          'token': access_token
        }
      });

      if (followAccountRequest) {
        console.log(followAccountRequest.data);
        dispatch(getOneProfile(userId));
      }
    } catch (error) {
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      };
    }
  };

  const openModal = () => {
    setNoticeModal(true);
  };

  const closeModal = () => {
    setNoticeModal(false);
  };

  useEffect(() => {
    dispatch(getOneProfile(userId));
    dispatch(clearHome());
    dispatch(getHome());
    dispatch(getUserDiscussion(userId));
  }, []);

  const selectMenu = menu => {
    setSelectedMenu(menu);
  };

  const noticeModalChild = () => {
    return <Text style={styles.noticeModalTextStyle}>You don't have access to this discussion</Text>
  };
  
  console.log(profile)
  const AboutData = (title, data) => {
    return (
      <View style={styles.aboutDataStyle}>
        <View style={styles.aboutDataIconStyle}>

        </View>
        <View>
          <Text style={styles.dataTextStyle}>{data}</Text>
          <Text style={styles.dataTitleStyle}>{title}</Text>
        </View>
      </View>
    );
  };

  const AboutSection = () => {
    return (
      <View style={styles.aboutSectionStyle}>
        {AboutData('Bio',profile.bio ? profile.bio : '-')}
        {AboutData('Gender', profile.gender ? profile.gender : '-')}
        {AboutData('Birthday', displayBirthDate(new Date(profile.birth_date)))}
      </View>
    );
  };

  const displayBirthDate = (date) => {
    let birthDate = date.toDateString().split(' ').slice(1, 4);
    if (birthDate[1][0] === '0') {
      birthDate[1] = birthDate[1][1];
    };
    let birthDateDisplay = `${birthDate[1]} ${birthDate[0]} ${birthDate[2]}`;
    return birthDateDisplay;
  };

  return (
    <View style={styles.userProfileScreenContainerStyle}>
      <View style={styles.userProfileHeaderStyle}>
        <View style={styles.headerStyle}>
          <BackButton
            navigation={navigation}
            styleOption={{
              marginTop: 0,
              marginBottom: 0
            }}
            navigation={navigation}
          />
          {
            profile.isFollowing !== undefined && (
              <TouchableOpacity onPress={() => followAccount()}>
                <Text style={styles.followButtonTextStyle}>{profile.isFollowing ? 'Unfollow' : 'Follow'}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      <ProfileData
        profile={profile}
        selectMenu={selectMenu}
        selectedMenu={selectedMenu}
      />
      <FlatList
        ListHeaderComponent={
          selectedMenu === 'Discussions' ?
          <List
            isHeader={false}
            navigation={navigation}
            isUsingMoreButton={false}
            listData={userDiscussion}
            openModal={openModal}
          /> : <Card
            child={selectedMenu === 'About' ? AboutSection : null}
            customStyle={styles.cardStyle}
          />
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
    flex: 1
  },

  userProfileHeaderStyle: {
    backgroundColor: "#FFFFFF",
    paddingLeft: "3.5%",
    paddingRight: "5%"
  },

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
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: "#6505E1"
  },

  cardStyle: {
    marginHorizontal: "1.8%",
    marginTop: "2%",
    borderRadius: 8
  },

  aboutDataStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingVertical: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9"
  },

  aboutDataIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: "3%",
    backgroundColor: "#F5F7F9"
  },

  dataTextStyle: {
    fontFamily: normal,
    color: "#464D60",
    fontSize: 16
  },

  dataTitleStyle: {
    fontFamily: normal,
    fontSize: 12,
    color: "#73798C"
  }
});

export default UserProfile;