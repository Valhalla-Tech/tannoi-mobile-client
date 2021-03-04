import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { bold, normal } from '../../../assets/FontSize';
import { GlobalPadding } from '../../../constants/Size';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import { getCommunityMember } from '../../../store/actions/CommuitiesAction';
import { useDispatch } from 'react-redux';

//Component
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import BackButton from '../../../components/publicComponents/BackButton';
import Button from '../../../components/publicComponents/Button';
import ListCardPlayer from '../../../components/publicComponents/ListCardPlayer';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

//Assets
import MemberRequestEmptyStateImage from '../../../assets/communitiesAssets/empty-state-discussions.png';

const MemberRequestScreen = ({ navigation, route }) => {
  const [requestList, setRequestList] = useState('');

  const dispatch = useDispatch();

  const { communityId } = route.params;

  useEffect(() => {
    memberRequestList();
  }, []);

  const memberRequestList = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let MemberRequestListRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/all-request/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (MemberRequestListRequest.data) {
        setRequestList(MemberRequestListRequest.data.data);
        dispatch(getCommunityMember(communityId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionButton = async (userId, isDecline) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let approveMemberRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/communities/edit-request`,
        headers: {
          token: access_token,
        },
        data: {
          user_id: userId,
          community_id: communityId,
          type: isDecline ? 'Decline' : 'Approve',
        },
      });

      if (approveMemberRequest.data) {
        memberRequestList();
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const HeaderContent = () => (
    <>
      <BackButton
        styleOption={{
          marginTop: 0,
          marginBottom: 0,
        }}
        navigation={navigation}
      />
      <Text style={styles.headerTextStyle}>Join Requests</Text>
    </>
  );

  const CardContent = (itemData) => (
    <>
      <View style={styles.profileAndPostTimeContainerStyle}>
        <View style={styles.profileContainerStyle}>
          <Image
            source={{ uri: itemData.item.profile_photo_path }}
            style={styles.profileImageStyle}
          />
          <Text
            style={styles.profileNameStyle}
            onPress={() =>
              navigation.navigate('UserProfileScreen', {
                userId: itemData.item.id,
              })
            }>
            {itemData.item.name}
          </Text>
        </View>
        <Text style={styles.postTimeStyle}>{itemData.item.timeSince}</Text>
      </View>
      <ListCardPlayer
        fromBio={true}
        recordingFile={itemData.item.community_join_requests[0].voice_note_path}
        isSlider={true}
      />
      <View style={styles.cardButtonContainerStyle}>
        <Button
          buttonStyle={{
            color: '#FFFFFF',
            backgroundColor: '#5152D0',
            borderWidth: 0,
            height: '60%',
            marginBottom: 0,
            paddingVertical: '5%',
            paddingHorizontal: '5%',
            marginRight: '3%',
          }}
          buttonTitle="Confirm"
          buttonFunction={() => actionButton(itemData.item.id, false)}
        />
        <Button
          buttonStyle={{
            color: '#5152D0',
            borderColor: '#5152D0',
            height: '60%',
            marginBottom: 0,
            paddingVertical: '5%',
            paddingHorizontal: '5%',
          }}
          buttonTitle="Decline"
          buttonFunction={() => actionButton(itemData.item.id, true)}
        />
      </View>
    </>
  );

  const RenderCard = (itemData) => (
    <Card child={() => CardContent(itemData)} customStyle={styles.cardStyle} />
  );

  const RenderEmptyState = () => {
    return (
      <View style={{ alignItems: 'center', paddingTop: '10%' }}>
        <Image source={MemberRequestEmptyStateImage} />
        <Text>There are no member requests yet</Text>
      </View>
    );
  };

  const RenderContent = () => {
    if (requestList === '') {
      return <LoadingSpinner loadingSpinnerForComponent={true} />;
    } else if (requestList.length === 0) {
      return RenderEmptyState();
    } else if (requestList.length > 0) {
      return (
        <FlatList
          data={requestList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderCard}
        />
      );
    }
  };

  return (
    // <View style={{ flex: 1 }}>
    <ScreenContainer>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.memberRequestContainerStyle}>{RenderContent()}</View>
    </ScreenContainer>
    // </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTextStyle: {
    marginLeft: '3%',
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  memberRequestContainerStyle: {
    paddingVertical: '2%',
    paddingHorizontal: GlobalPadding,
  },

  cardStyle: {
    padding: '5%',
    borderRadius: 8,
  },

  profileAndPostTimeContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },

  profileContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    height: CalculateWidth(8),
    width: CalculateWidth(8),
    borderRadius: 50,
  },

  profileNameStyle: {
    marginLeft: '3%',
    fontFamily: bold,
    fontSize: CalculateHeight(1.8),
    color: '#464D60',
  },

  postTimeStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(1.5),
  },

  cardButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default MemberRequestScreen;
