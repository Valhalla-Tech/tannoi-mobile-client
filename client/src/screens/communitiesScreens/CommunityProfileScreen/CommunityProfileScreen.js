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
  deleteCommunityDiscussion,
} from '../../../store/actions/DiscussionAction';
import { deleteCommunityResponse } from '../../../store/actions/ResponseAction';
import {
  getOneCommunity,
  getCommunityMember,
  clearCommunityProfile,
  updateMemberPrivilege,
  deleteCommunityMember,
} from '../../../store/actions/CommuitiesAction';
import { getOneProfile } from '../../../store/actions/ProfileAction';
import { LinearTextGradient } from 'react-native-text-gradient';

//Icons
import NewDiscussionButton from '../../../assets/communitiesAssets/ic-button.svg';
import RightArrowIcon from '../../../assets/communitiesAssets/rightArrow.svg';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
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
  // const [communityMember, setCommunityMember] = useState('');
  const [noticeModal, setNoticeModal] = useState(false);
  const [noticeModalMessage, setNoticeModalMessage] = useState('');
  const [gotPermission, setGotPermission] = useState(0)
  const [isAMember, setIsAMember] = useState(false)

  const discussions = useSelector(
    (state) => state.DiscussionReducer.discussions,
  );

  const communityProfile = useSelector(
    (state) => state.CommunitiesReducer.communityProfile,
  );

  const userProfile = useSelector(
    (state) => state.ProfileReducer.loggedinUserProfile,
  );

  const communityMembers = useSelector(
    state => state.CommunitiesReducer.communityMembers,
  );

  const dispatch = useDispatch();

  // const memberFadeAnim = useRef(new Animated.Value(0)).current;
  const [memberModalMode, setMemberModalMode] = useState(false);
  const [memberItemModal, setMemberItemModal] = useState(null);
  const [selectedRoleValue, setSelectedRoleValue] = useState(null);

  const [removeMemberIdTarget, setRemoveMemberIdTarget] = useState(null);
  const [promptRemoveMemberMode, setPromptRemoveMemberMode] = useState(false);
  const [removingMemberMode, setRemovingMemberMode] = useState(false);

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
    dispatch(getCommunityMember(communityId));

    return () => {
      dispatch(clearDiscussion(false, true));
      dispatch(clearCommunityProfile());
    };
  }, []);

  useEffect(() => {
    dispatch(getAllDiscussion('community_id=', communityId));
  }, []);

  useEffect(() => {
    if (communityProfile.community_members){
      if (communityProfile.community_members.length){
        setGotPermission((
          communityProfile.community_members[0].type === 'Admin'
          || communityProfile.community_members[0].type === 'Moderator'
          ? 1 : 0
        ));
        setIsAMember(true);
      }
    }
  }, [communityProfile]);

  const changeSelectedDisplay = (value) => {
    setSelectedDisplay(value);
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
          <Text style={styles.memberRequestTextStyle}>Member requests</Text>
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
              role={gotPermission}
              openCommunityDiscussionNoticeModal={openNoticeModal}
              inputCommunityDiscussionNoticeModalMessage={
                inputNoticeModalMessage
              }
              cardOnDelete = {(id, type) => deleteCommunityDiscussionOrResponse(id, type)}
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

  const deleteCommunityDiscussionOrResponse = async (id, type) => {
    if (type === 'discussion') {
      await dispatch(deleteCommunityDiscussion(communityId, id));
    }
    else if (type === 'response'){
      await dispatch(deleteCommunityResponse(communityId, id));
    }
    await dispatch(getAllDiscussion('community_id=', communityId));
    navigation.navigate('CommunityProfileScreen', {
      communityId: communityId,
    });
  }

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
            if (isAMember) {
              setMemberModalMode(true);
              setMemberItemModal(itemData);
              setSelectedRoleValue(itemData.item.members[0].community_member.type);
            }
          }}
          communityId={communityId}
          navigation={navigation}
          memberList={communityMembers}
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
    if (type === 'userPermissions' && communityProfile.community_members !== undefined) {
        return communityProfile.community_members[0].type === 'Admin'
        && userProfile.id !== memberItemModal.item.members[0].community_member.user_id;
    }
  };

  const changeRoleStatus = async (user_id, role) => {
    await dispatch(updateMemberPrivilege(user_id, communityId, role));
    await dispatch(getCommunityMember(communityId));
    setSelectedRoleValue(role);
    setMemberModalMode(false);
  };

  const promptRemoveMemberFromCommunity = (id) => {
    setMemberModalMode(false);
    setPromptRemoveMemberMode(true);
    setRemoveMemberIdTarget(id);
  };

  const removeMemberFromCommunity = async (user_id) => {
    await dispatch(deleteCommunityMember(user_id, communityId));
    await dispatch(getCommunityMember(communityId));
    setMemberModalMode(false);
    setRemoveMemberIdTarget(null);
    setPromptRemoveMemberMode(false);
    setRemovingMemberMode(false);
  };

  const closePromptModal = () => {
    setMemberItemModal(null);
    setPromptRemoveMemberMode(false);
    setRemoveMemberIdTarget(null);
  };

  const cancelRemoveMemberOptionModal = () => {
    setPromptRemoveMemberMode(false);
    setMemberModalMode(true);
    setRemoveMemberIdTarget(null);
  };

  const removeMemberOptionModal = () => {
    setRemovingMemberMode(true);
    removeMemberFromCommunity(removeMemberIdTarget);
  };

  const memberDetailModal = () => {
    /* The one I commented here is for future reference, cause I want to see if I can make my own modal animation for this app */

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
    const {item} = memberItemModal;
    return (
      <Modal
        customContainerStyle={styles.communityProfileMemberModalContainerStyle}
        customStyle={
          checkEligibility('userPermissions')
          ? styles.communityProfileMemberModalEligibleStyle
          : styles.communityProfileMemberModalNotEligibleStyle
        }
        animation="slide"
        closeModal={() => {
          setMemberModalMode(false);
        }}>
        <View style={styles.communityProfileMemberModalProfilePictureContainerStyle}>
          <View style={styles.communityProfileMemberModalProfilePictureFrameStyle}/>
          <TouchableOpacity onPress={() => {
            setMemberModalMode(false);
            navigation.navigate('UserProfileScreen', { userId: item.id });
          }}>
            <Image
              source={{uri:item.profile_photo_path}} 
              style={styles.communityProfileMemberModalProfilePictureStyle} />
          </TouchableOpacity>
          <LinearTextGradient
            style={{paddingTop: '2%'}}
            locations={[0, 1]}
            colors={['#5051DB', '#7E37B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Text style = {styles.communityProfileMemberModalUsernameStyle}>
              {item.name}
            </Text>
          </LinearTextGradient>
        </View>
        <Text style={styles.communityProfileMemberModalRoleStyle}>{item.members[0].community_member.type}</Text>
        {checkEligibility('userPermissions') ?
          <View style={{width: '100%', paddingTop: '5%'}}>
            <View>
              <Text style={styles.communityProfileMemberModalMemberRoleTitleMenuStyle}>
                Change membership
              </Text>
              <TouchableOpacity onPress={() => changeRoleStatus(item.members[0].community_member.user_id, 'Admin')} style={styles.communityProfileMemberModalRoleOptionStyle}>
                <Text style={selectedRoleValue === 'Admin'
                ? styles.communityProfileMemberModalRoleSelectedTextStyle
                : null}>
                  Admin
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeRoleStatus(item.members[0].community_member.user_id, 'Moderator')} style={styles.communityProfileMemberModalRoleOptionStyle}>
                <Text style={selectedRoleValue === 'Moderator'
                ? styles.communityProfileMemberModalRoleSelectedTextStyle
                : null}>
                  Moderator
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeRoleStatus(item.members[0].community_member.user_id, 'Member')} style={styles.communityProfileMemberModalRoleOptionStyle}>
                <Text style={selectedRoleValue === 'Member'
                ? styles.communityProfileMemberModalRoleSelectedTextStyle
                : null}>
                  Member
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
            onPress={() => promptRemoveMemberFromCommunity(item.members[0].community_member.user_id)}
            style={styles.communityProfileMemberModalRemoveMemberTitleStyle}>
              <Text style={styles.communityProfileMemberModalRemoveMemberTextStyle}>
                Remove member from community
              </Text>
            </TouchableOpacity>
          </View>
        : null}
      </Modal>
    );
  };

  const promptRemoveMemberModal = () => {
    return (
      <Modal
        closeModal={() => closePromptModal()}
        customStyle={styles.communityProfileRemoveMemberPromptModalContainerStyle}
      >
        <Text style={styles.communityProfileRemoveMemberPromptModalPromptTitleTextStyle}>
          Are you sure you want to remove this member from this community?
        </Text>
        <View style={styles.communityProfileRemoveMemberPromptModalButtonsContainerStyle}>
          {removingMemberMode ?
            <View style={styles.communityProfileRemoveMemberPromptModalSpinnerContainerStyle}>
              <LoadingSpinner loadingSpinnerForComponent={true} />
            </View>
            :
            <>
              <TouchableOpacity onPress={() => cancelRemoveMemberOptionModal()}
              style={styles.communityProfileRemoveMemberPromptModalCancelButtonStyle}>
                <Text style={styles.communityProfileRemoveMemberPromptModalCancelButtonTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.communityProfileRemoveMemberPromptModalRemoveButtonStyle}
                onPress={() => removeMemberOptionModal()}>
                <Text style={styles.communityProfileRemoveMemberPromptModalRemoveButtonTextStyle}>Remove</Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </Modal>
    );
  };

  return (
    <ScreenContainer>
      {memberModalMode ? memberDetailModal() : null}
      {promptRemoveMemberMode ? promptRemoveMemberModal() : null}
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
        memberIsStillLoading={!communityMembers.length ? true : false}
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
    </ScreenContainer>
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

  communityProfileMemberModalContainerStyle:{
    justifyContent: 'flex-end',
  },

  communityProfileMemberModalEligibleStyle: {
    borderRadius: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: CalculateHeight(70),
  },

  communityProfileMemberModalNotEligibleStyle: {
    borderRadius: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '35%',
  },

  communityProfileMemberModalProfilePictureContainerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
  },

  communityProfileMemberModalProfilePictureFrameStyle: {
    width: CalculateWidth(10),
    height: CalculateWidth(10),
    borderRadius: 50,
    backgroundColor: '#5152D0',
    position: 'absolute',
  },

  communityProfileMemberModalProfilePictureStyle: {
    width: CalculateWidth(20),
    height: CalculateWidth(20),
    borderRadius: 50,
  },

  communityProfileMemberModalUsernameStyle: {
    fontFamily: bold,
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#5152D0',
  },

  communityProfileMemberModalMemberRoleTitleMenuStyle: {
    fontFamily: bold,
    fontSize: 16,
    borderBottomColor: '#5152D0',
    color: '#5152D0',
    padding: 5,
  },

  communityProfileMemberModalRoleStyle: {
    fontFamily: normal,
    width: '100%',
    fontSize: 16,
    color: '#464D60',
    textAlign: 'center',
  },

  communityProfileMemberModalRoleOptionStyle: {
    padding: 10,
    paddingLeft: 20,
  },

  communityProfileMemberModalRoleSelectedTextStyle: {
    color: '#5152D0',
    fontFamily: bold,
  },

  communityProfileMemberModalRemoveMemberTitleStyle: {
    height: 30,
    marginTop: '10%',
    width: '100%',
  },

  communityProfileMemberModalRemoveMemberTextStyle: {
    fontFamily: bold,
    fontSize: 16,
    color: 'red',
  },

  communityProfileRemoveMemberPromptModalContainerStyle: {
    padding: 30,
    height: 120,
  },

  communityProfileRemoveMemberPromptModalPromptTitleTextStyle: {
    color: '#6505E1',
    fontWeight: 'bold',
  },

  communityProfileRemoveMemberPromptModalButtonsContainerStyle: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  communityProfileRemoveMemberPromptModalCancelButtonStyle: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6505E1',
    width: 80,
    height: 40,
    borderRadius: 15,
  },

  communityProfileRemoveMemberPromptModalCancelButtonTextStyle: {
    color: 'white',
    fontSize: CalculateHeight(2),
  },

  communityProfileRemoveMemberPromptModalRemoveButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#6505E1',
    width: 80,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
  },

  communityProfileRemoveMemberPromptModalRemoveButtonTextStyle: {
    color: '#6505E1',
    fontSize: CalculateHeight(2),
  },

  communityProfileRemoveMemberPromptModalSpinnerContainerStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  memberRequestContainerStyle: {
    marginTop: '2%',
    padding: '3.5%',
    borderRadius: 8,
  },

  memberRequestTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(1.8),
  },

  noticeModalTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
  },
});

export default CommunityProfileScreen;
