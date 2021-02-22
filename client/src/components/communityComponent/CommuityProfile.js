import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GlobalPadding } from '../../constants/Size';
import { bold, normal } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';
import { LinearTextGradient } from 'react-native-text-gradient';
import { useDispatch } from 'react-redux';
import {
  getUserCommunity,
  getOneCommunity,
} from '../../store/actions/CommuitiesAction';

//Icons
import OptionButton from '../../assets/publicAssets/optionButton.svg';
import CalendarIcon from '../../assets/communitiesAssets/ic-calendar.svg';
import EarthIcon from '../../assets/communitiesAssets/ic-earth.svg';
import PrivateIcon from '../../assets/communitiesAssets/ic-lock.svg';

//Components
import Header from '../publicComponents/Header';
import Card from '../../components/publicComponents/Card';
import BackButton from '../publicComponents/BackButton';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';
import Button from '../publicComponents/Button';
import LoadingSpinner from '../publicComponents/LoadingSpinner';
import Modal from '../publicComponents/Modal';
import RecorderModal from '../publicComponents/RecorderModal';
import FormInput from '../../components/publicComponents/FormInput';

const CommunityProfile = (props) => {
  const {
    navigation,
    profile,
    selectedDisplay,
    changeSelectedDisplay,
    communityId,
    isMember,
    communityType,
    inputNoticeModalMessage,
    openNoticeModal,
    closeNoticeModal,
    guidelines,
    isAdmin,
  } = props;

  const [actionModal, setActionModal] = useState(false);
  const [recorder, setRecorder] = useState(false);
  const [isDeletingCommunity, setIsDeletingCommunity] = useState(false);
  const [isLoadingToDelete, setIsLoadingToDelete] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const closeActionModal = () => {
    setIsDeletingCommunity(false);
    setDeleteConfirmationText('');
    setActionModal(false);
  };

  const closeRecorder = () => {
    setRecorder(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      closeNoticeModal();
    };
  }, []);

  const joinCommunity = async (recordingFile) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      const formData = new FormData();

      const uri = `file://${recordingFile}`;
      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];

      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`,
      });

      let joinCommunityRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/communities/join-community/${communityId}`,
        headers: {
          token: access_token,
          'Content-Type': 'multipart/form-data',
        },
        data: communityType === 2 ? formData : undefined,
      });

      if (joinCommunityRequest.data) {
        setRecorder(false);
        dispatch(getOneCommunity(communityId));
        dispatch(getUserCommunity());

        if (recordingFile === undefined) {
          inputNoticeModalMessage('You are now a member of this community');
          openNoticeModal();
        } else if (recordingFile) {
          inputNoticeModalMessage('Request sent to the community admin');
          openNoticeModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const leaveCommunity = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let leaveCommunityRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/leave-community/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (leaveCommunityRequest.data) {
        setActionModal(false);
        dispatch(getUserCommunity());
        inputNoticeModalMessage('You have left this community');
        openNoticeModal();
        navigation.navigate('CommunitiesScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommunity = async () => {
    try {
      setIsLoadingToDelete(true);

      let access_token = await AsyncStorage.getItem('access_token');

      let deleteCommunityRequest = await axios({
        method: 'delete',
        url: `${BaseUrl}/communities/delete/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (deleteCommunityRequest.data) {
        setIsLoadingToDelete(false);
        dispatch(getUserCommunity());
        navigation.navigate('CommunitiesScreen');
      }
    } catch (error) {
      setIsLoadingToDelete(false);
      console.log(error);
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
        <TouchableOpacity
          onPress={() => setActionModal(true)}
          style={styles.optionButtonStyle}>
          <OptionButton />
        </TouchableOpacity>
      </>
    );
  };

  const DeleteCommunityConfirmation = () => (
    <>
      <Text style={styles.deleteCommunityTextStyle}>
        Write the text below to delete this community
      </Text>
      <FormInput
        dataInput={(input) => setDeleteConfirmationText(input)}
        formInputTitle="DELETE COMMUNITY"
        capitalizeAll={true}
      />
      <View style={styles.deleteButtonContainerStyle}>
        <Button
          buttonStyle={{
            color: '#FFFFFF',
            backgroundColor: '#6505E1',
            padding: '2%',
            borderWidth: 0,
            marginRight: '3%',
          }}
          buttonTitle="Cancel"
          buttonFunction={() => setIsDeletingCommunity(false)}
        />
        {isLoadingToDelete ? (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        ) : (
          <Button
            buttonStyle={
              deleteConfirmationText !== 'DELETE COMMUNITY'
                ? {
                    ...styles.deleteButtonStyle,
                    color: '#cccccc',
                    borderColor: '#cccccc',
                  }
                : styles.deleteButtonStyle
            }
            buttonTitle="Delete"
            buttonFunction={deleteCommunity}
            disableButton={
              deleteConfirmationText !== 'DELETE COMMUNITY' ? true : false
            }
          />
        )}
      </View>
    </>
  );

  const ActionModalButton = (title, action, customStyle) => (
    <TouchableOpacity
      onPress={() => action()}
      style={{ ...styles.actionModalButtonStyle, ...customStyle }}>
      <Text style={styles.actionModalButtonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );

  const ActionModal = () => {
    return (
      <>
        {isDeletingCommunity ? (
          DeleteCommunityConfirmation()
        ) : (
          <>
            {isMember && (
              <>{ActionModalButton('Leave community', leaveCommunity)}</>
            )}
            {isMember &&
              ActionModalButton(
                'Community guidelines',
                () => (
                  navigation.navigate('GuidelinesScreen', {
                    guidelines: guidelines,
                    isAdmin: isAdmin,
                    communityId: communityId,
                  }),
                  setActionModal(false)
                ),
              )}
            {isAdmin &&
              ActionModalButton(
                'Delete community',
                () => setIsDeletingCommunity(true),
                { marginBottom: 0 },
              )}
          </>
        )}
      </>
    );
  };

  const ProfileDisplayButton = () => {
    return (
      <View style={styles.profileDisplayButtonContainerStyle}>
        <TouchableOpacity
          style={
            selectedDisplay === 'discussions'
              ? {
                  ...styles.displayButtonStyle,
                  borderBottomWidth: 1,
                  borderBottomColor: '#5152D0',
                }
              : styles.displayButtonStyle
          }
          onPress={() => changeSelectedDisplay('discussions')}
          disabled={selectedDisplay === 'discussions' ? true : false}>
          <Text
            style={
              selectedDisplay === 'discussions'
                ? { ...styles.displayButtonTextStyle, color: '#5152D0' }
                : styles.displayButtonTextStyle
            }>
            Discussions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedDisplay === 'members'
              ? {
                  ...styles.displayButtonStyle,
                  borderBottomWidth: 1,
                  borderBottomColor: '#5152D0',
                }
              : styles.displayButtonStyle
          }
          onPress={() => changeSelectedDisplay('members')}
          disabled={selectedDisplay === 'members' ? true : false}>
          <Text
            style={
              selectedDisplay === 'members'
                ? { ...styles.displayButtonTextStyle, color: '#5152D0' }
                : styles.displayButtonTextStyle
            }>
            Members
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const CommunityProfileContent = () => {
    return (
      <>
        {profile === '' ? (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        ) : (
          <>
            <View style={styles.communityProfileContainerStyle}>
              <View style={styles.communityDataContainerStyle}>
                <View style={styles.communityNameContainerStyle}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={['#5051DB', '#7E37B6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.communityNameStyle}>
                      {profile.name}
                    </Text>
                  </LinearTextGradient>
                  <View style={styles.privatePublicIconContainerStyle}>
                    {profile.type == 2 ? <PrivateIcon /> : <EarthIcon />}
                  </View>
                </View>
                <Text
                  style={styles.communityDescriptionStyle}
                  numberOfLines={2}>
                  {profile.description}
                </Text>
                <View style={styles.createdAndUniqueCodeContainerStyle}>
                  <View style={styles.createdContainerStyle}>
                    <View style={styles.calendarIconContainerStyle}>
                      <CalendarIcon />
                    </View>
                    <Text style={styles.createdAndUniqueCodeStyle}>
                      Created {profile.created}
                    </Text>
                  </View>
                  {/*
                  <View style={{flexDirection: 'row'}}>
                    <CalendarIcon/>
                    <Text style={styles.createdAndUniqueCodeStyle}>
                      Community unique code: 1356
                    </Text>
                  </View>
                  */}
                </View>
                <View style={styles.countDataContainerStyle}>
                  <View style={styles.countDataStyle}>
                    <Text style={styles.countDataTitleStyle}>Discussions</Text>
                    <Text style={styles.countNumberStyle}>
                      {profile.discussion_count}
                    </Text>
                  </View>
                  <View style={styles.countDataStyle}>
                    <Text style={styles.countDataTitleStyle}>Responses</Text>
                    <Text style={styles.countNumberStyle}>
                      {profile.response_count}
                    </Text>
                  </View>
                  <View style={styles.countDataStyle}>
                    <Text style={styles.countDataTitleStyle}>Members</Text>
                    <Text style={styles.countNumberStyle}>
                      {profile.member_count}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.imageAndFollowContainer}>
                <Image
                  source={{ uri: profile.image_path }}
                  style={styles.imageStyle}
                />
                {!profile.isMember && (
                  <Button
                    buttonStyle={{
                      color: '#FFFFFF',
                      backgroundColor: '#5152D0',
                      borderWidth: 0,
                      padding: 0,
                      paddingHorizontal: '20%',
                      paddingVertical: '2.5%',
                      marginTop: '15%',
                    }}
                    buttonTitle="Join"
                    buttonFunction={() =>
                      communityType === 1 ? joinCommunity() : setRecorder(true)
                    }
                  />
                )}
              </View>
            </View>
            {profile.type == 2 && !isMember ? (
              <View style={{ paddingBottom: '3%' }}></View>
            ) : (
              ProfileDisplayButton()
            )}
          </>
        )}
      </>
    );
  };

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <Card child={CommunityProfileContent} />
      <Modal
        customStyle={{
          alignItems: 'flex-start',
          height: null,
          justifyContent: 'flex-start',
        }}
        openModal={actionModal}
        closeModal={closeActionModal}
        child={ActionModal}
      />
      <RecorderModal
        forCommunity={true}
        openModal={recorder}
        closeModal={closeRecorder}
        joinCommunity={joinCommunity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionButtonStyle: {
    padding: '3%',
  },

  communityProfileContainerStyle: {
    paddingHorizontal: '3.5%',
    flexDirection: 'row',
  },

  communityDataContainerStyle: {
    width: '70%',
  },

  communityNameContainerStyle: {
    marginBottom: '1%',
    flexDirection: 'row',
  },

  communityNameStyle: {
    fontSize: CalculateHeight(2.7),
    fontFamily: bold,
    color: '#464D60',
  },

  privatePublicIconContainerStyle: {
    justifyContent: 'center',
    marginLeft: '2%',
  },

  communityDescriptionStyle: {
    fontFamily: normal,
    color: '#464D60',
    lineHeight: 20,
    marginBottom: '2%',
    fontSize: CalculateHeight(2),
  },

  createdAndUniqueCodeContainerStyle: {
    marginBottom: '2%',
  },

  createdAndUniqueCodeStyle: {
    fontFamily: normal,
    color: '#73798C',
    fontSize: CalculateHeight(2),
    marginLeft: '2.5%',
  },

  createdContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  calendarIconContainerStyle: {
    paddingTop: '1.3%',
  },

  countDataContainerStyle: {
    flexDirection: 'row',
    marginTop: '15%',
  },

  countDataStyle: {
    marginRight: '5%',
  },

  countDataTitleStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
    color: '#73798C',
  },

  countNumberStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2.3),
    color: '#464D60',
  },

  imageAndFollowContainer: {
    flex: 1,
    paddingTop: '2%',
    alignItems: 'flex-end',
  },

  imageStyle: {
    width: CalculateWidth(20),
    height: CalculateWidth(20),
    borderRadius: 50,
  },

  profileDisplayButtonContainerStyle: {
    flexDirection: 'row',
  },

  displayButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5%',
  },

  displayButtonTextStyle: {
    fontFamily: bold,
    color: '#464D60',
    fontSize: CalculateHeight(2.5),
  },

  actionModalButtonStyle: {
    marginBottom: '3%',
  },

  actionModalButtonTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },

  deleteCommunityTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
    fontSize: CalculateHeight(1.8),
    marginBottom: '3%',
  },

  deleteButtonContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  deleteButtonStyle: {
    color: '#6505E1',
    borderColor: '#6505E1',
    padding: '2%',
  },
});

export default CommunityProfile;
