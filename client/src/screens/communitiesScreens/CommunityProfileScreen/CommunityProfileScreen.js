import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Picker,
  Animated,
} from 'react-native';
import { GlobalPadding } from '../../../constants/Size';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';
import { getOneCommunity, clearCommunityProfile, updateMemberPrivilege, deleteCommunityMember } from '../../../store/actions/CommuitiesAction';
import { getOneProfile } from '../../../store/actions/ProfileAction';

//Icons
import NewDiscussionButton from '../../../assets/communitiesAssets/ic-button.svg';
import RightArrowIcon from '../../../assets/communitiesAssets/rightArrow.svg';

//Components
import Card from '../../../components/publicComponents/Card';
import CommunityProfile from '../../../components/communityComponent/CommuityProfile';
import List from '../../../components/publicComponents/List';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import MemberList from '../../../components/communityComponent/MemberList';
import Modal from '../../../components/publicComponents/Modal';

//Assets
import DiscussionEmptyStateImage from '../../../assets/communitiesAssets/empty-state-discussions.png';

const CommunityProfileScreen = ({ navigation, route }) => {
  const { communityId } = route.params;

  const [selectedDisplay, setSelectedDisplay] = useState('discussions');
  const [communityMember, setCommunityMember] = useState('');
  const [noticeModal, setNoticeModal] = useState(false);
  const [noticeModalMessage, setNoticeModalMessage] = useState('');

  const discussions = useSelector(
    (state) => state.DiscussionReducer.discussions,
  );

  const communityProfile = useSelector(
    (state) => state.CommunitiesReducer.communityProfile,
  );

  const userProfile = useSelector(
    state => state.ProfileReducer.loggedinUserProfile
  );

  const dispatch = useDispatch();

  // const memberFadeAnim = useRef(new Animated.Value(0)).current;
  const [memberModalMode, setMemberModalMode] = useState(false);
  const [memberItemModal, setMemberItemModal] = useState(null);
  const [selectRoleMode, setSelectRoleMode] = useState(false);
  const [initialSelectedRoleValue, setInitialSelectedRoleValue] = useState(null);
  const [selectedRoleValue, setSelectedRoleValue] = useState(null);

  // const memberFadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(memberFadeAnim, {
  //     toValue: .7,
  //     duration: 300,
  //     useNativeDriver: true
  //   }).start();
  // };

  // const memberFadeOut = () => {
  //   // Will change fadeAnim value to 0 in 5 seconds
  //   Animated.timing(memberFadeAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true
  //   }).start();
  // };

  // const memberSlideUp = () => {
  //   Animated.timing(member)
  // }

  useEffect(() => {
    dispatch(getOneCommunity(communityId));
    dispatch(getOneProfile(null, true));
  }, []);

  useEffect(() => {
    getCommunityMember();

    return () => {
      dispatch(clearDiscussion(false, true));
      dispatch(clearCommunityProfile());
    };
  }, []);

  useEffect(() => {
    dispatch(getAllDiscussion('community_id=', communityId));
  }, []);

  const changeSelectedDisplay = (value) => {
    setSelectedDisplay(value);
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
    if (!discussions) {
      return <LoadingSpinner loadingSpinnerForComponent={true} />;
    } else if (discussions.length > 0) {
      return (
        <FlatList
          ListHeaderComponent={
            <List
              navigation={navigation}
              isHeader={false}
              listData={discussions}
              customStyle={{ marginBottom: '90%' }}
              isCommunityDiscussion={true}
              isMember={
                communityProfile.community_members !== undefined &&
                communityProfile.community_members.length !== 0
                  ? communityProfile.community_members[0].type === 'Admin' ||
                    communityProfile.community_members[0].type === 'Member' ||
                    communityProfile.community_members[0].type === 'Moderator'
                    ? true
                    : false
                  : false
              }
              role = {communityProfile.community_members[0].type == 'Admin' || communityProfile.community_members[0].type == 'Moderator' ? 1 : 0}
              openCommunityDiscussionNoticeModal={openNoticeModal}
              inputCommunityDiscussionNoticeModalMessage={
                inputNoticeModalMessage
              }
            />
          }
        />
      );
    } else if (discussions.length === 0) {
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
    if (
      communityProfile.type === 2 &&
      communityProfile.isMember &&
      communityProfile.community_members[0].type === 'Admin'
    ) {
      return (
        <Card
          child={MemberRequest}
          customStyle={styles.memberRequestContainerStyle}
        />
      );
    } else {
      return null;
    }
  };

  const renderMembersDisplay = () => {
    return (
      <View>
        {renderMemberRequestsCard()}
        <MemberList
          onPress={(itemData) => {
            setMemberModalMode(true)
            setMemberItemModal(itemData)
            console.log('test', memberItemModal)
          }} 
          communityId={communityId}
          navigation={navigation}
          memberList={communityMember}
          isAdmin={
            communityProfile !== '' &&
            communityProfile.community_members !== undefined &&
            communityProfile.community_members.length !== 0 &&
            communityProfile.community_members[0].type === 'Admin'
              ? true
              : false
          }
        />
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

  const checkEligibility = (type) => {
    console.log('hoiii', memberItemModal.item.members);
    
    if (type === 'userPermissions') return communityProfile.community_members[0].type === 'Admin' && userProfile.id !== memberItemModal.item.members[0].community_member.user_id;
  }

  const memberDetailModal = () => {
    // return (
    //   <Animated.View style={{
    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: "black",
    //     opacity: memberFadeAnim,
    //     position: "absolute",
    //     zIndex: 10000
    //   }}>
    //     <TouchableOpacity style={{
    //       backgroundColor: "blue",
    //     }} onPress={() => {
    //       memberFadeOut()
    //       setTimeout(() => {
    //         setMemberModalMode(false)
    //       }, 150)
    //     }}><Text>Test</Text></TouchableOpacity>
    //   </Animated.View>
    // )
    

    // console.log(userProfile)
    // console.log(communityMember)
    // console.log('hi')
    const {item} = memberItemModal
    return (
      <Modal
      customContainerStyle={{
        justifyContent: 'flex-end',
      }}
      customStyle={{
        borderRadius: 0,
        width: '100%',
        height: checkEligibility('userPermissions') ? '33%' : '25%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }} 
      animation="slide" 
      closeModal={() => {
        setSelectRoleMode(false)
        setMemberModalMode(false)
        }}>
        <View 
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
          }}>
          <View
          style={{
            width: CalculateWidth(22),
            height: CalculateWidth(22),
            borderRadius: 50,
            backgroundColor: '#5152D0',
            position: 'absolute'
          }}
          >

          </View>
          <Image source={{uri:item.profile_photo_path}} style={{
            width: CalculateWidth(20),
            height: CalculateWidth(20),
            borderRadius: 50,
          }} />
        </View>
        <Text
        style = {{
          width: '100%',
          fontSize: 20,
          fontWeight: "bold",
          textAlign: 'center',
          marginTop: 10,
          color: '#5152D0'
          
        }}
        >
        {item.name}
        </Text>
        {!selectRoleMode ? <Text style={{width: '100%', fontSize: 14, color: '#5152D0', textAlign: 'center'}}>{item.members[0].community_member.type}</Text> : null}

        {selectRoleMode ? 
        <View style={{width: '100%', alignItems: 'center'}}>
          <Picker
            selectedValue={selectedRoleValue}
            style={{
              height: 25,
              width: 150,
              fontSize: 14,
              borderBottomColor: '#5152D0',
              borderWidth: 1,
              fontFamily: normal,
              color: '#5152D0',
            }}
            onValueChange={(itemValue, itemIndex) => setSelectedRoleValue(itemValue)}
          >
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Moderator" value="Moderator" />
            <Picker.Item label="Member" value="Member" />
          </Picker>
          <TouchableOpacity 
          style={{
            width: CalculateWidth(23),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: '#5152D0',
            padding: 5,
            borderRadius: 3.2
          }}
          onPress={async () => {
            if (selectedRoleValue == initialSelectedRoleValue) {
              setSelectRoleMode(false)
              return 
            }
            await dispatch(updateMemberPrivilege(item.members[0].community_member.user_id, item.members[0].community_member.community_id, selectedRoleValue))
            await getCommunityMember()
            setMemberModalMode(false)
            setSelectRoleMode(false)
          }}
          ><Text style={{color: 'white'}}>Save</Text></TouchableOpacity>
        </View>
        : null}
        
        {checkEligibility('userPermissions') && !selectRoleMode ? <View style={{
          width: '100%',
          flexDirection: 'row'
        }}>
          <TouchableOpacity onPress={() => {

            setInitialSelectedRoleValue(item.members[0].community_member.type)
            setSelectedRoleValue(item.members[0].community_member.type)
            setSelectRoleMode(true)

          }} style={{
            width: '50%',
            height: 30,
            justifyContent: 'center',
            marginTop: 25
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 16
            }}>
              Change Role
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress ={async () => {

            await dispatch(deleteCommunityMember(item.members[0].community_member.user_id, communityId))
            setMemberModalMode(false)
            
          }}
          style={{
            width: '50%',
            height: 30,
            justifyContent: 'center',
            marginTop: 25
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 16
            }}>
              Remove
            </Text>
          </TouchableOpacity>
        </View> : null}
      </Modal>
    )
}

  return (
    <View style={{ flex: 1 }}>
      {memberModalMode ? memberDetailModal() : null}
      <CommunityProfile
        navigation={navigation}
        profile={communityProfile}
        selectedDisplay={selectedDisplay}
        changeSelectedDisplay={changeSelectedDisplay}
        communityId={communityId}
        isMember={communityProfile.isMember}
        communityType={communityProfile.type}
        inputNoticeModalMessage={inputNoticeModalMessage}
        openNoticeModal={openNoticeModal}
        closeNoticeModal={closeNoticeModal}
        guidelines={communityProfile.guidelines}
        isAdmin={
          communityProfile !== '' &&
          communityProfile.community_members !== undefined &&
          communityProfile.community_members.length !== 0 &&
          communityProfile.community_members[0].type === 'Admin'
            ? true
            : false
        }
        memberIsStillLoading={communityMember === '' ? true : false}
        isRequested={communityProfile.isRequested}
      />
      {!communityProfile ||
      communityProfile.type == 1 ||
      communityProfile.isMember
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
    fontSize: CalculateHeight(1.8),
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
