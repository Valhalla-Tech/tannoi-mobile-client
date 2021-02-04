import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GlobalPadding } from '../../constants/Size';
import { bold, normal } from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Icon
import OptionButton from '../../assets/publicAssets/optionButton.svg';

//Components
import Header from '../publicComponents/Header';
import Card from '../../components/publicComponents/Card';
import BackButton from '../publicComponents/BackButton';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';
import Button from '../publicComponents/Button';
import LoadingSpinner from '../publicComponents/LoadingSpinner';
import Modal from '../publicComponents/Modal';

const CommunityProfile = (props) => {
  const {
    navigation,
    profile,
    selectedDisplay,
    changeSelectedDisplay,
    communityId,
    getOneCommunity,
  } = props;

  const [actionModal, setActionModal] = useState(false);

  const closeActionModal = () => {
    setActionModal(false);
  };

  const joinCommunity = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let joinCommunityRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/join-community/${communityId}`,
        headers: {
          token: access_token,
        },
      });

      if (joinCommunityRequest.data) {
        getOneCommunity();
      }
    } catch (error) {
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

  const ActionModal = () => {
    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.actionModalButtonTextStyle}>Leave community</Text>
        </TouchableOpacity>
      </View>
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
                  <Text style={styles.communityNameStyle}>{profile.name}</Text>
                </View>
                <Text style={styles.communityDescriptionStyle}>
                  {profile.description}
                </Text>
                <View style={styles.createdAndUniqueCodeContainerStyle}>
                  <View>
                    <Text style={styles.createdAndUniqueCodeStyle}>
                      Created {profile.created}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.createdAndUniqueCodeStyle}>
                      Community unique code: 1356
                    </Text>
                  </View>
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
                      paddingHorizontal: '16%',
                      paddingVertical: '2.5%',
                      marginTop: '15%',
                    }}
                    buttonTitle="Join"
                    buttonFunction={joinCommunity}
                  />
                )}
              </View>
            </View>
            {ProfileDisplayButton()}
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
          alignItems: 'flex-start'
        }}
        openModal={actionModal}
        closeModal={closeActionModal}
        child={ActionModal}
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
    paddingHorizontal: '3%',
    flexDirection: 'row',
  },

  communityDataContainerStyle: {
    width: '60%',
  },

  communityNameContainerStyle: {
    marginBottom: '1%',
  },

  communityNameStyle: {
    fontSize: CalculateHeight(2.5),
    fontFamily: bold,
    color: '#464D60',
  },

  communityDescriptionStyle: {
    fontFamily: normal,
    color: '#464D60',
    lineHeight: 20,
    marginBottom: '5%',
  },

  createdAndUniqueCodeContainerStyle: {
    marginBottom: '5%',
  },

  createdAndUniqueCodeStyle: {
    fontFamily: normal,
    color: '#73798C',
    fontSize: CalculateHeight(1.5),
  },

  countDataContainerStyle: {
    flexDirection: 'row',
  },

  countDataStyle: {
    marginRight: '5%',
  },

  countDataTitleStyle: {
    fontFamily: normal,
    color: '#73798C',
  },

  countNumberStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2),
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

  actionModalButtonTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },
});

export default CommunityProfile;
