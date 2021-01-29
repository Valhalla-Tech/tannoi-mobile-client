import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {GlobalPadding} from '../../constants/Size';
import {bold, normal} from '../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Components
import Card from '../../components/publicComponents/Card';
import CommunityProfile from '../../components/communityComponent/CommuityProfile';

const CommunityProfileScreen = ({navigation, route}) => {
  const {
    communityId,
  } = route.params;

  const [communityProfile, setCommunityProfile] = useState('');

  useEffect(() => {
    getOneCommunity();
  }, []);

  const getOneCommunity = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getOneCommunityRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/single/${communityId}`,
        headers: {
          'token': access_token
        }
      });

      if (getOneCommunityRequest.data) {
        setCommunityProfile(getOneCommunityRequest.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <CommunityProfile navigation={navigation} profile={communityProfile} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default CommunityProfileScreen;
