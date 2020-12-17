import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import { getOneProfile } from '../../../store/actions/ProfileAction';
import { getUserDiscussion } from '../../../store/actions/DiscussionAction';
import DisplayBirthDate from '../../../helper/DisplayBirthDate';

//Components
import Header from '../../../components/publicComponents/Header';
import ProfileData from '../../../components/meComponents/ProfileData';
import List from '../../../components/publicComponents/List';
import NoticeModal from '../../../components/publicComponents/Modal';
import Card from '../../../components/publicComponents/Card';

const MeScreen = ({ navigation }) => {
  const [selectedMenu, setSelectedMenu] = useState('Discussions');
  const [noticeModal, setNoticeModal] = useState(false);

  const userProfile = useSelector(state => state.ProfileReducer.userProfile);
  const userId = useSelector(state => state.HomeReducer.user.id);
  const userDiscussion = useSelector(state => state.DiscussionReducer.userDiscussion);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getOneProfile());
      dispatch(getUserDiscussion(userId));
    });

    return unsubscribe;
  }, [navigation]);

  const selectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const openModal = () => {
    setNoticeModal(true);
  };

  const closeModal = () => {
    setNoticeModal(false);
  };

  const HeaderContent = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.settingButtonStyle}>Settings</Text>
        </TouchableOpacity>
      </View>
    )
  };

  const noticeModalChild = () => {
    return <Text style={styles.noticeModalTextStyle}>You don't have access to this discussion</Text>
  };

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
      <View>
        {AboutData('Bio',userProfile.bio ? userProfile.bio : '-')}
        {AboutData('Gender', userProfile.gender ? userProfile.gender : '-')}
        {AboutData('Birthday', DisplayBirthDate(new Date(userProfile.birth_date)))}
      </View>
    );
  };

  return (
    <View style={styles.meScreenContainerStyle}>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <ProfileData
        profile={userProfile}
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
  meScreenContainerStyle: {
    flex: 1
  },

  headerStyle: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: "3%",
    paddingHorizontal: "5%"
  },

  settingButtonStyle: {
    color: "#0E4EF4",
    fontFamily: bold,
    fontSize: 16
  },

  cardStyle: {
    marginHorizontal: "1.8%",
    marginTop: "2%",
    borderRadius: 8
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: "#6505E1"
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

export default MeScreen;