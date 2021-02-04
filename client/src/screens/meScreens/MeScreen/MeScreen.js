import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOneProfile,
  clearUserProfile,
} from '../../../store/actions/ProfileAction';
import {
  clearDiscussion,
  getAllDiscussion,
} from '../../../store/actions/DiscussionAction';
import { GlobalPadding } from '../../../constants/Size';
import AboutSection from '../../../components/meComponents/AboutSection';

//Components
import Header from '../../../components/publicComponents/Header';
import ProfileData from '../../../components/meComponents/ProfileData';
import List from '../../../components/publicComponents/List';
import NoticeModal from '../../../components/publicComponents/Modal';

const MeScreen = ({ navigation, route }) => {
  const [selectedMenu, setSelectedMenu] = useState('Discussions');
  const [noticeModal, setNoticeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { fromEditScreen } = route.params !== undefined && route.params;

  const userProfile = useSelector(
    (state) => state.ProfileReducer.loggedinUserProfile,
  );
  const userId = useSelector((state) => state.HomeReducer.user.id);
  const discussions = useSelector(
    (state) => state.DiscussionReducer.userDiscussion,
  );
  const discussionCount = useSelector(
    (state) => state.DiscussionReducer.userDiscussionCount,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const meScreenRequest = () => {
      dispatch(clearUserProfile());
      dispatch(clearDiscussion(true));
      dispatch(getOneProfile(null, true));
      dispatch(getAllDiscussion('user_id=', userId, null, null, true));
    };

    meScreenRequest();

    const unsubscribe = navigation.addListener('focus', () => {
      meScreenRequest();
    });

    return fromEditScreen && unsubscribe;
  }, []);

  const selectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const openModal = () => {
    setNoticeModal(true);
  };

  const closeModal = () => {
    setNoticeModal(false);
  };

  const changeCurrentPage = (input) => {
    setCurrentPage(input);
  };

  const HeaderContent = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.settingButtonStyle}>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const noticeModalChild = () => {
    return (
      <Text style={styles.noticeModalTextStyle}>
        You don't have access to this discussion
      </Text>
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
                bio={userProfile.bio}
                gender={userProfile.gender}
                birthDate={userProfile ? userProfile.birth_date : null}
                bioVoiceFile={userProfile.bio_voice_path}
                isLoading={userProfile ? false : true}
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
  meScreenContainerStyle: {
    flex: 1,
  },

  headerStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
  },

  settingButtonStyle: {
    color: '#0E4EF4',
    fontFamily: bold,
    fontSize: 16,
  },

  cardContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  cardStyle: {
    marginTop: '2%',
    borderRadius: 8,
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
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
    marginLeft: '5%',
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

export default MeScreen;
