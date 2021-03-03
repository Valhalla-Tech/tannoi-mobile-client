import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserCommunity,
  clearUserComunity,
} from '../../../store/actions/CommuitiesAction';
import { createdCommunityMessage } from '../../../store/actions/CreateCommunityAction';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import Card from '../../../components/publicComponents/Card';
import Header from '../../../components/publicComponents/Header';
import BackButton from '../../../components/publicComponents/BackButton';
import CommunityList from '../../../components/communityComponent/CommunityList';
import Modal from '../../../components/publicComponents/Modal';

//Assets
import RightArrowIcon from '../../../assets/communitiesAssets/rightArrow.svg';
import AddCircleIcon from '../../../assets/communitiesAssets/ic-add-circle.svg';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import CommunitiesEmptyStateImage from '../../../assets/communitiesAssets/empty-state-discussions.png';

const CommunitiesScreen = ({ navigation }) => {
  const userCommunity = useSelector(
    (state) => state.CommunitiesReducer.userCommunity,
  );

  const messageStatus = useSelector(
    (state) => state.CreateCommunityReducer.messageStatus,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCommunity());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    return unsubscribe;
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearUserComunity());
    };
  }, []);

  const closeNoticeModal = () => {
    dispatch(createdCommunityMessage(false));
  };

  const NoticeModal = () => (
    <>
      <Text style={styles.noticeModalTextStyle}>
        Your community has been created
      </Text>
    </>
  );

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.headerContentStyle}>
          <View style={styles.backButtonAndTitleContainerStyle}>
            <BackButton
              navigation={navigation}
              styleOption={{
                marginTop: 0,
                marginBottom: 0,
                marginRight: '5%',
              }}
            />
            <Text style={styles.headerTextStyle}>My Communities</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('BrowseCommunityScreen')}>
            <Text style={styles.headerButtonTextStyle}>Browse Communities</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const CreateCommunityButton = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCommunityNavigation')}>
          <View style={styles.createCommunityContainerStyle}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginRight: '3%' }}>
                <AddCircleIcon />
              </View>
              <Text style={styles.createCommunityButtonTextStyle}>
                Create a new community
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const RenderUserCommunityList = () => {
    if (userCommunity === '') {
      return <LoadingSpinner loadingSpinnerForComponent={true} />;
    } else if (userCommunity.length === 0) {
      return (
        <View style={styles.emptyStateContainerStyle}>
          <Image source={CommunitiesEmptyStateImage} />
          <Text style={styles.emptyStateTextStyle}>
            You are not a member of any communities yet
          </Text>
          <Text style={styles.emptyStateTextStyle}>
            Join or create a community first!
          </Text>
        </View>
      );
    } else if (userCommunity.length > 0) {
      return (
        <CommunityList communities={userCommunity} navigation={navigation} />
      );
    }
  };

  return (
    <ScreenContainer>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.communitiesScreenContainerStyle}>
        <FlatList
          ListHeaderComponentStyle={{ marginBottom: '5%' }}
          ListHeaderComponent={
            <>
              <Card
                child={CreateCommunityButton}
                customStyle={styles.createCommunityCardStyle}
              />
              {RenderUserCommunityList()}
            </>
          }
        />
        <Modal
          child={NoticeModal}
          openModal={messageStatus}
          closeModal={closeNoticeModal}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    padding: '3%',
  },

  headerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  communitiesScreenContainerStyle: {
    paddingHorizontal: GlobalPadding,
    flex: 1,
  },

  emptyStateContainerStyle: {
    alignItems: 'center',
    paddingTop: '20%',
  },

  emptyStateTextStyle: {
    color: '#73798C',
  },

  headerTextStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2),
    color: '#464D60',
  },

  createCommunityContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerButtonTextStyle: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: CalculateHeight(1.8),
  },

  createCommunityCardStyle: {
    marginTop: '2%',
    borderRadius: 8,
    padding: '3.5%',
  },

  createCommunityButtonTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(1.8),
    paddingLeft: '2%',
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
  },
});

export default CommunitiesScreen;
