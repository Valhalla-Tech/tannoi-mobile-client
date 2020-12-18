import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { bold, normal } from '../../../assets/FontSize';

//Components
import SearchBar from '../../../components/publicComponents/SearchBar';
import ProfileBar from '../../../components/homeComponents/homeScreenComponents/ProfileBar';
import List from '../../../components/publicComponents/List';
import TopUsers from '../../../components/homeComponents/homeScreenComponents/TopUsers';
import RecommendedTopics from '../../../components/homeComponents/homeScreenComponents/RecommendedTopics';
import NoticeModal from '../../../components/publicComponents/Modal';

const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.HomeReducer.user);
  const discussionOfTheWeek = useSelector(state => state.HomeReducer.discussionOfTheWeek);
  const topUser = useSelector(state => state.HomeReducer.topUser);
  const trending = useSelector(state => state.HomeReducer.trending);
  const recommendedTopic = useSelector(state => state.HomeReducer.recommendedTopic);
  const followingDiscussion = useSelector(state => state.HomeReducer.followingDiscussion);
  const requestedDiscussion = useSelector(state => state.HomeReducer.requestedDiscussion);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearHome());
      dispatch(getHome());
      SplashScreen.hide();
    // });

    // return unsubscribe;
  }, [navigation]);

  const noticeModalChild = () => {
    return <Text style={styles.noticeModalTextStyle}>You don't have access to this discussion</Text>
  };
  
  return (
    <View>
      <ProfileBar 
        user={user}
        navigation={navigation}
      />
      <FlatList
        ListHeaderComponent={
          <View style={styles.homeScreenContainerStyle}>
            <View style={styles.searchBarContainer}>
              <SearchBar
                searchBarIsOpen={false}
                navigation={navigation}
              />
            </View>
            {
              requestedDiscussion.length !== 0 && (
                <View style={styles.sectionStyle}>
                  <List
                    listTitle="Discussions especially for you"
                    listData={requestedDiscussion}
                    navigation={navigation}
                    openModal={openModal}
                  />
                </View>
              )
            }
            {
              followingDiscussion.length !== 0 && (
                <View style={styles.sectionStyle}>
                  <List
                    listTitle="Discussions by People You Follow"
                    listData={followingDiscussion}
                    navigation={navigation}
                    openModal={openModal}
                  />
                </View>
              )
            }
            <List
              listTitle="Discussions of the Week"
              listData={discussionOfTheWeek}
              navigation={navigation}
              openModal={openModal}
              isUsingMoreButton={true}
            />
            <TopUsers
              topUserData={topUser}
              navigation={navigation}
            />
            <List 
              listTitle="Trending"
              listData={trending}
              navigation={navigation}
              openModal={openModal}
              isFilter={true}
              isUsingMoreButton={true}
            />
            <RecommendedTopics
              topicData={recommendedTopic}
              navigation={navigation}
            />
          </View>
        }
      />
      <NoticeModal 
        openModal={modalIsOpen}
        closeModal={closeModal}
        child={noticeModalChild}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenContainerStyle: {
    flex: 1
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: "#6505E1"
  },
  
  searchBarContainer: {
    paddingHorizontal: "4.2%",
    backgroundColor: "#FFFFFF"
  },

  sectionStyle: {
    marginBottom: -14
  }
});

export default HomeScreen;