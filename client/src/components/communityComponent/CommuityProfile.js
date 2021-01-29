import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GlobalPadding} from '../../constants/Size';
import {bold, normal} from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Components
import Header from '../publicComponents/Header';
import Card from '../../components/publicComponents/Card';
import BackButton from '../publicComponents/BackButton';
import {CalculateHeight, CalculateWidth} from '../../helper/CalculateSize';

const CommunityProfile = (props) => {
  const {navigation, profile} = props;

  const [selectedDisplay, setSelectedDisplay] = useState('discussions');

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
      </>
    );
  };

  const ProfileDisplayButton = () => {
    return (
      <View style={styles.profileDisplayButtonContainerStyle}>
        <TouchableOpacity
          style={
            selectedDisplay === 'discussions'
              ? {...styles.displayButtonStyle, borderBottomWidth: 1, borderBottomColor: '#5152D0'}
              : styles.displayButtonStyle
          }
          onPress={() => setSelectedDisplay('discussions')}
          disabled={selectedDisplay === 'discussions' ? true : false}
          >
          <Text style={selectedDisplay === 'discussions' ? {...styles.displayButtonTextStyle, color: '#5152D0'} : styles.displayButtonTextStyle}>Discussions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedDisplay === 'members'
              ? {...styles.displayButtonStyle, borderBottomWidth: 1, borderBottomColor: '#5152D0'}
              : styles.displayButtonStyle
          }
          onPress={() => setSelectedDisplay('members')}
          disabled={selectedDisplay === 'members' ? true : false}
          >
          <Text style={selectedDisplay === 'members' ? {...styles.displayButtonTextStyle, color: '#5152D0'} : styles.displayButtonTextStyle}>Members</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const CommunityProfileContent = () => {
    return (
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
                  Created March 2020
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
                <Text style={styles.countNumberStyle}>{profile.discussion_count}</Text>
              </View>
              <View style={styles.countDataStyle}>
                <Text style={styles.countDataTitleStyle}>Responses</Text>
                <Text style={styles.countNumberStyle}>{profile.response_count}</Text>
              </View>
              <View style={styles.countDataStyle}>
                <Text style={styles.countDataTitleStyle}>Members</Text>
                <Text style={styles.countNumberStyle}>{profile.member_count}</Text>
              </View>
            </View>
          </View>
          <View style={styles.imageAndFollowContainer}>
            <Image source={{uri: profile.image_path}} style={styles.imageStyle} />
          </View>
        </View>
        {ProfileDisplayButton()}
      </>
    );
  };

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <Card child={CommunityProfileContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '5%',
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
    lineHeight: 25,
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
    alignItems: 'flex-end'
  },

  imageStyle: {
    width: CalculateWidth(20),
    height: CalculateWidth(20),
    borderRadius: 50
  },

  profileDisplayButtonContainerStyle: {
    flexDirection: 'row',
  },

  displayButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },

  displayButtonTextStyle: {
    fontFamily: bold,
    color: '#464D60',
    fontSize: CalculateHeight(2)
  },
});

export default CommunityProfile;
