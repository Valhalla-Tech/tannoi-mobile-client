import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentPlayerId } from '../../store/actions/PlayerAction';
import { getAllDiscussion } from '../../store/actions/DiscussionAction';
import { CalculateHeight } from '../../helper/CalculateSize';

//Components
import ListCard from './ListCard';
import LoadingSpinner from './LoadingSpinner';
import Card from './Card';
import ListHeader from './ListHeader';
import BigButton from './Button';

class RenderList extends React.PureComponent {
  render() {
    const {
      itemData,
      navigation,
      listData,
      openModal,
      isCommunityDiscussion,
      isMember,
      openCommunityDiscussionNoticeModal,
      inputCommunityDiscussionNoticeModalMessage,
    } = this.props;
    return (
      <View style={styles.listCardContainerStyle}>
        <ListCard
          imageUrl={itemData.item.creator.profile_photo_path}
          recordingFile={itemData.item.voice_note_path}
          name={itemData.item.creator.name}
          title={itemData.item.title}
          votes={itemData.item.likes}
          replies={itemData.item.response_count}
          plays={itemData.item.play_count}
          postTime={itemData.item.timeSince}
          discussionId={itemData.item.id}
          navigation={navigation}
          topic={itemData.item.topic ? itemData.item.topic.name : ''}
          isBorder={itemData.index === listData.length - 1 ? false : true}
          discussionType={itemData.item.type}
          openModal={openModal}
          isAuthorized={itemData.item.isAuthorized}
          profileType={itemData.item.creator.type}
          isCommunityDiscussion={isCommunityDiscussion}
          isMember={isMember}
          openCommunityDiscussionNoticeModal={
            openCommunityDiscussionNoticeModal
          }
          inputCommunityDiscussionNoticeModalMessage={
            inputCommunityDiscussionNoticeModalMessage
          }
        />
      </View>
    );
  }
}

const List = (props) => {
  const {
    listTitle,
    listData,
    navigation,
    openModal,
    isSort,
    isUsingMoreButton,
    isHeader = true,
    customStyle,
    useSeeAllButton,
    sectionQuery,
    queryId,
    useMoreButton,
    selectedSort,
    currentPage,
    changeCurrentPage,
    isUserDiscussion,
    isCommunityDiscussion,
    isMember,
    openCommunityDiscussionNoticeModal,
    inputCommunityDiscussionNoticeModalMessage,
  } = props;

  const dispatch = useDispatch();

  const moreLoader = useSelector((state) => state.DiscussionReducer.moreLoader);

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      dispatch(clearCurrentPlayerId());
    });

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearCurrentPlayerId());
    });

    return blur, unsubscribe;
  }, [navigation]);

  const nextPage = () => {
    changeCurrentPage(currentPage + 1);

    dispatch(
      getAllDiscussion(
        sectionQuery ? sectionQuery : null,
        queryId ? queryId : null,
        selectedSort,
        currentPage + 1,
        isUserDiscussion,
        true,
      ),
    );
  };

  const MoreButton = () => {
    return (
      <View style={styles.moreButtonContainerStyle}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() =>
            navigation.navigate('HomeSectionDetailScreen', {
              sectionTitle: listTitle,
              sectionQuery: sectionQuery,
              queryId: queryId,
            })
          }>
          <Text style={styles.moreButtonTextStyle}>More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HomeListContent = () => {
    return (
      <View>
        {isHeader && (
          <ListHeader
            listTitle={listTitle}
            isSort={isSort}
            istTitle={listTitle}
            useSeeAllButton={useSeeAllButton}
            navigation={navigation}
            sectionQuery={sectionQuery}
            queryId={queryId}
          />
        )}
        {!listData ? (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        ) : (
          <>
            <FlatList
              data={listData}
              listKey={(item, index) => index.toString()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(itemData) => (
                <RenderList
                  itemData={itemData}
                  navigation={navigation}
                  listData={listData}
                  openModal={openModal}
                  isCommunityDiscussion={isCommunityDiscussion}
                  isMember={isMember}
                  openCommunityDiscussionNoticeModal={
                    openCommunityDiscussionNoticeModal
                  }
                  inputCommunityDiscussionNoticeModalMessage={
                    inputCommunityDiscussionNoticeModalMessage
                  }
                />
              )}
              ListFooterComponent={
                useMoreButton ? (
                  moreLoader ? (
                    <LoadingSpinner loadingSpinnerForComponent={true} />
                  ) : (
                    <View style={styles.loadMoreButtonContainerStyle}>
                      <BigButton
                        buttonStyle={{
                          color: '#6505E1',
                          borderColor: '#6505E1',
                          paddingVertical: '.5%',
                          paddingHorizontal: '5%',
                        }}
                        buttonTitle="More"
                        buttonFunction={nextPage}
                      />
                    </View>
                  )
                ) : null
              }
            />
            {isUsingMoreButton && <MoreButton />}
          </>
        )}
      </View>
    );
  };

  return (
    <Card
      child={HomeListContent}
      customStyle={{ ...styles.homeListContainerStyle, ...customStyle }}
    />
  );
};

const styles = StyleSheet.create({
  homeListContainerStyle: {
    backgroundColor: '#FFFFFF',
    marginTop: '2%',
    marginBottom: '4%',
    borderRadius: 8,
    paddingBottom: '6.5%',
  },

  moreButtonContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },

  moreButton: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#7817FF',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    borderRadius: 25,
    top: CalculateHeight(1),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  moreButtonTextStyle: {
    color: '#7817FF',
    fontSize: CalculateHeight(1.8),
  },

  loadMoreButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
});

export default List;
