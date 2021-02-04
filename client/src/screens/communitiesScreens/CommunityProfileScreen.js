import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GlobalPadding } from '../../constants/Size';
import { bold, normal } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Icon
import NewDiscussionButton from '../../assets/communitiesAssets/ic-button.svg';

//Components
import Card from '../../components/publicComponents/Card';
import CommunityProfile from '../../components/communityComponent/CommuityProfile';
import List from '../../components/publicComponents/List';
import MemberList from '../../components/communityComponent/MemberList';
import { CalculateHeight } from '../../helper/CalculateSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../store/actions/DiscussionAction';

const CommunityProfileScreen = ({ navigation, route }) => {
  const { communityId } = route.params;

  const [communityProfile, setCommunityProfile] = useState('');
  const [selectedDisplay, setSelectedDisplay] = useState('discussions');
  const [communityMember, setCommunityMember] = useState([]);

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

  const MemberRequest = () => {
    return (
      <TouchableOpacity>
        <Text style={styles.memberRequestStyle}>Member Request</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CommunityProfile
        navigation={navigation}
        profile={communityProfile}
        selectedDisplay={selectedDisplay}
        changeSelectedDisplay={changeSelectedDisplay}
        getOneCommunity={getOneCommunity}
        communityId={communityId}
      />
      <View style={styles.communityProfileContainerStyle}>
        {selectedDisplay === 'discussions' ? (
          <FlatList
            ListHeaderComponent={
              <List
                navigation={navigation}
                isHeader={false}
                listData={discussions}
                customStyle={{ marginBottom: '100%' }}
              />
            }
          />
        ) : (
          <>
            <Card
              child={MemberRequest}
              customStyle={styles.memberRequestContainerStyle}
            />
            <MemberList memberList={communityMember} />
          </>
        )}
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  communityProfileContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  memberRequestContainerStyle: {
    marginTop: '2%',
    padding: '3.5%',
    borderRadius: 8,
  },

  memberRequestStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(2),
  },
});

export default CommunityProfileScreen;
