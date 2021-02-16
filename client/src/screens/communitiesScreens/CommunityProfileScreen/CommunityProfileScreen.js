import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { GlobalPadding } from '../../../constants/Size';
import { bold, normal } from '../../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

//Icon
import NewDiscussionButton from '../../../assets/communitiesAssets/ic-button.svg';
import RightArrowIcon from '../../../assets/communitiesAssets/rightArrow.svg';

//Components
import Card from '../../../components/publicComponents/Card';
import CommunityProfile from '../../../components/communityComponent/CommuityProfile';
import List from '../../../components/publicComponents/List';
import MemberList from '../../../components/communityComponent/MemberList';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';
import Modal from '../../../components/publicComponents/Modal';

//Assets
import DiscussionEmptyStateImage from '../../../assets/communitiesAssets/empty-state-discussions.png';

const CommunityProfileScreen = ({ navigation, route }) => {
  const { communityId } = route.params;

  const [communityProfile, setCommunityProfile] = useState('');
  const [selectedDisplay, setSelectedDisplay] = useState('discussions');
  const [communityMember, setCommunityMember] = useState([]);
  const [noticeModal, setNoticeModal] = useState(false);
  const [noticeModalMessage, setNoticeModalMessage] = useState('');

  const discussions = useSelector(
    (state) => state.DiscussionReducer.discussions,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getOneCommunity();
  }, []);

  useEffect(() => {
    getCommunityMember();

    return () => {
      dispatch(clearDiscussion(false, true));
    };
  }, []);

  useEffect(() => {
    dispatch(getAllDiscussion('community_id=', communityId));
  }, []);

  const changeSelectedDisplay = (value) => {
    setSelectedDisplay(value);
  };

  const getOneCommunity = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getOneCommunityRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/single/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (getOneCommunityRequest.data) {
        setCommunityProfile(getOneCommunityRequest.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCommunityMember = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getCommunityMemberRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/list-members/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (getCommunityMemberRequest.data) {
        setCommunityMember(getCommunityMemberRequest.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openNoticeModal = () => {
    setNoticeModal(true);
  };

  const closeNoticeModal = () => {
    setNoticeModal(false);
  };

  const inputNoticeModalMessage = (input) => {
    setNoticeModalMessage(input);
  };

  const MemberRequest = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MemberRequestScreen', {
            communityId: communityId,
          });
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.memberRequestTextStyle}>Member Requests</Text>
          <View style={{ justifyContent: 'center', paddingRight: '2%' }}>
            <RightArrowIcon />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderPrivateCommunityState = () => {
    return (
      <View style={styles.privateCommunityStateContainerStyle}>
        <View style={styles.privateCommunityStateTextContainerStyle}>
          <Text style={styles.privateCommunityHeaderTextStyle}>
            This is a private community.
          </Text>
          <Text style={styles.privateCommunityTextStyle}>
            Only confirmed members have access to discussions. Click the join
            button to send a join request.
          </Text>
        </View>
      </View>
    );
  };

  const renderDiscussionsDisplay = () => {
    if (discussions.length != 0) {
      return (
        <FlatList
          ListHeaderComponent={
            <List
              navigation={navigation}
              isHeader={false}
              listData={discussions}
              customStyle={{ marginBottom: '100%' }}
              isCommunityDiscussion={true}
            />
          }
        />
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ paddingTop: '10%', alignItems: 'center' }}>
            <Image source={DiscussionEmptyStateImage} />
            <Text style={{ color: '#73798C', fontSize: CalculateHeight(2.3) }}>
              Sorry!
            </Text>
            <Text style={{ color: '#73798C', fontSize: CalculateHeight(2) }}>
              This community has no discussions yet!
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderMemberRequestsCard = () => {
    if (communityProfile.isMember && communityProfile.community_members[0].type === "Admin") {
      return (
        <Card child={MemberRequest} customStyle={styles.memberRequestContainerStyle} />
      )
    } else {
      return null
    }
  }

  const renderMembersDisplay = () => {
    return (
      <View>
        {renderMemberRequestsCard()}
        <MemberList memberList={communityMember} />
      </View>
    );
  };

  const renderDisplay = () => {
    return (
      <View style={styles.communityProfileContainerStyle}>
        {selectedDisplay === 'discussions'
          ? renderDiscussionsDisplay()
          : renderMembersDisplay()}
      </View>
    );
  };

  const NoticeModal = () => (
    <View>
      <Text style={styles.noticeModalTextStyle}>{noticeModalMessage}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <CommunityProfile
        navigation={navigation}
        profile={communityProfile}
        selectedDisplay={selectedDisplay}
        changeSelectedDisplay={changeSelectedDisplay}
        getOneCommunity={getOneCommunity}
        communityId={communityId}
        isMember={communityProfile.isMember}
        communityType={communityProfile.type}
        inputNoticeModalMessage={inputNoticeModalMessage}
        openNoticeModal={openNoticeModal}
        guidelines={communityProfile.guidelines}
        isAdmin={
          communityProfile !== '' &&
          communityProfile.community_members.length !== 0 &&
          communityProfile.community_members[0].type === 'Admin'
            ? true
            : false
        }
      />
      {communityProfile.type == 1 || communityProfile.isMember
        ? renderDisplay()
        : RenderPrivateCommunityState()}
      {communityProfile.isMember && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NewCommunityDiscussionScreen', {
              communityId: communityProfile.id,
              communityTopics: communityProfile.community_topics,
            })
          }
          style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
          <NewDiscussionButton />
        </TouchableOpacity>
      )}
      <Modal
        child={NoticeModal}
        openModal={noticeModal}
        closeModal={closeNoticeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  privateCommunityStateContainerStyle: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },

  privateCommunityStateTextContainerStyle: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },

  privateCommunityHeaderTextStyle: {
    color: '#464D60',
    fontSize: 16,
  },

  privateCommunityTextStyle: {
    paddingTop: '1%',
    fontSize: 12,
    color: '#73798C',
  },

  communityProfileContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  memberRequestContainerStyle: {
    marginTop: '2%',
    padding: '3.5%',
    borderRadius: 8,
  },

  memberRequestTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(2.3),
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
  },
});

export default CommunityProfileScreen;
