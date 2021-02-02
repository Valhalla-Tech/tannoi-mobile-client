import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { bold } from '../../../assets/FontSize';
import { GlobalPadding } from '../../../constants/Size';

//Components
import SearchBar from '../../../components/publicComponents/SearchBar';
import ProfileBar from '../../../components/homeComponents/homeScreenComponents/ProfileBar';
import List from '../../../components/publicComponents/List';
import TopUsers from '../../../components/homeComponents/homeScreenComponents/TopUsers';
import RecommendedTopics from '../../../components/homeComponents/homeScreenComponents/RecommendedTopics';
import NoticeModal from '../../../components/publicComponents/Modal';

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.HomeReducer.user);
  const discussionOfTheWeek = useSelector(
    (state) => state.HomeReducer.discussionOfTheWeek,
  );
  const topUser = useSelector((state) => state.HomeReducer.topUser);
  const trending = useSelector((state) => state.HomeReducer.trending);
  const recommendedTopic = useSelector(
    (state) => state.HomeReducer.recommendedTopic,
  );
  const followingDiscussion = useSelector(
    (state) => state.HomeReducer.followingDiscussion,
  );
  const requestedDiscussion = useSelector(
    (state) => state.HomeReducer.requestedDiscussion,
  );
  const topHashtag = useSelector((state) => state.HomeReducer.topHashtag);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearHome());
    dispatch(getHome());
    SplashScreen.hide();
  }, []);

  const onRefresh = () => {
    dispatch(clearHome());
    dispatch(getHome());
  };

  const noticeModalChild = () => {
    return (
      <Text style={styles.noticeModalTextStyle}>
        You don't have access to this discussion
      </Text>
    );
  };

  return (
    <View>
      <ProfileBar user={user} navigation={navigation} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.homeScreenContainerStyle}>
            <View style={styles.searchBarContainer}>
              <SearchBar
                searchBarIsOpen={false}
                navigation={navigation}
                showCard={true}
                topHashtag={topHashtag}
                navigation={navigation}
              />
            </View>
            <View style={styles.homeScreenCardContainerStyle}>
              {requestedDiscussion.length !== 0 && (
                <List
                  listTitle="You're Asked to Respond"
                  listData={requestedDiscussion}
                  navigation={navigation}
                  openModal={openModal}
                  useSeeAllButton={true}
                  sectionType="discussion"
                  sectionQuery="responseRequest"
                  queryId="=true"
                />
              )}
              {followingDiscussion.length !== 0 && (
                <List
                  listTitle="Discussions by People You Follow"
                  listData={followingDiscussion}
                  navigation={navigation}
                  openModal={openModal}
                  useSeeAllButton={true}
                  sectionType="discussion"
                  sectionQuery="followingDiscussion"
                  queryId="=true"
                />
              )}
              <List
                listTitle="Discussions of the Week"
                listData={discussionOfTheWeek}
                navigation={navigation}
                openModal={openModal}
                useSeeAllButton={true}
                sectionType="discussion"
                sectionQuery="discussionOfTheWeek"
                queryId="=true"
              />
              <TopUsers topUserData={topUser} navigation={navigation} />
              <List
                listTitle="Trending"
                listData={trending}
                navigation={navigation}
                openModal={openModal}
                useSeeAllButton={true}
                sectionType="discussion"
              />
              <RecommendedTopics
                topicData={recommendedTopic}
                navigation={navigation}
              />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    flex: 1,
  },

  homeScreenCardContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
  },

  searchBarContainer: {
    paddingHorizontal: '4.2%',
    backgroundColor: '#FFFFFF',
  },

  sectionStyle: {
    marginBottom: -14,
  },
});

export default HomeScreen;
