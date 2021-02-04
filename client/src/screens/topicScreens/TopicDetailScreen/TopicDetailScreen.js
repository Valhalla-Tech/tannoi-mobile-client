import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';
import { bold, normal } from '../../../assets/FontSize';
import { GlobalPadding } from '../../../constants/Size';

//Components
import Header from '../../../components/publicComponents/Header';
import List from '../../../components/publicComponents/List';
import SearchBar from '../../../components/publicComponents/SearchBar';
import BackButton from '../../../components/publicComponents/BackButton';
import NoticeModal from '../../../components/publicComponents/Modal';
import { getSingleTopic } from '../../../store/actions/TopicAction';

const TopicDetail = (props) => {
  const [noticeModal, setNoticeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { route, navigation } = props;

  const { topicName, topicId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiscussion('topic_id=', topicId));
    dispatch(getSingleTopic(topicId));
  }, [navigation]);

  const clearList = () => {
    dispatch(clearDiscussion(null, true));
  };

  const discussions = useSelector(
    (state) => state.DiscussionReducer.discussions,
  );
  const discussionCount = useSelector(
    (state) => state.DiscussionReducer.discussionCount,
  );

  const { description } = useSelector((state) => state.TopicReducer.topic);

  const openModal = () => {
    setNoticeModal(true);
  };

  const closeModal = () => {
    setNoticeModal(false);
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

  const HeaderContent = () => {
    return (
      <View>
        <View style={styles.headerTitleAndButtonContainerStyle}>
          <View style={styles.headerTitleContainerStyle}>
            <BackButton
              styleOption={{
                marginTop: 0,
                marginBottom: 0,
                marginRight: '10%',
              }}
              navigation={navigation}
              buttonOption={clearList}
            />
            <Text style={styles.headerTextStyle}>{topicName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewDiscussionScreen')}>
            <Text style={styles.newDiscussionButtonStyle}>New Discussion</Text>
          </TouchableOpacity>
        </View>
        <SearchBar searchBarIsOpen={false} navigation={navigation} />
        <View style={styles.topicDescriptionContainerStyle}>
          <Text style={styles.descriptionTextStyle}>{description}.. more</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <>
            <Header child={HeaderContent} customStyle={styles.headerStyle} />
            <View style={styles.listContainerStyle}>
              <List
                listTitle="Discussions"
                listData={discussions}
                navigation={navigation}
                openModal={openModal}
                isFilter={true}
                sectionQuery="topic_id="
                queryId={topicId}
                currentPage={currentPage}
                changeCurrentPage={changeCurrentPage}
                useMoreButton={
                  discussionCount > 20 &&
                  discussions.length < discussionCount &&
                  true
                }
              />
            </View>
            <NoticeModal
              openModal={noticeModal}
              closeModal={closeModal}
              child={noticeModalChild}
            />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '5%',
    paddingTop: '3.5%',
    paddingBottom: '1%',
  },

  headerTextStyle: {
    fontFamily: bold,
    fontSize: 20,
    color: '#464D60',
  },

  listContainerStyle: {
    paddingHorizontal: GlobalPadding,
    marginBottom: '10%',
  },

  newDiscussionButtonStyle: {
    fontSize: 16,
    fontFamily: bold,
    color: '#0E4EF4',
  },

  topicDescriptionContainerStyle: {
    marginTop: '2%',
  },

  descriptionTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    lineHeight: 26.5,
    paddingBottom: '2.5%',
  },

  moreButtonStyle: {},

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
  },

  headerTitleAndButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2%',
  },

  headerTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TopicDetail;
