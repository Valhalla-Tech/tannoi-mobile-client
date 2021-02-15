import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { GlobalPadding } from '../../../constants/Size';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { normal, bold } from '../../../assets/FontSize';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import Header from '../../../components/publicComponents/Header';
import BackButton from '../../../components/publicComponents/BackButton';
import CommunityList from '../../../components/communityComponent/CommunityList';

const BrowseCommunityScreen = ({ navigation }) => {
  const [communities, setCommunities] = useState('');

  useEffect(() => {
    getCommunities();
  }, []);

  const getCommunities = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getCommunitiesRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/all?isNotMember=true`,
        headers: {
          token: access_token,
        },
      });

      if (getCommunitiesRequest.data) {
        setCommunities(getCommunitiesRequest.data.data);
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
        <Text style={styles.headerTextStyle}>Browse Communities</Text>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.browseCommunityContainerStyle}>
        <FlatList
          ListHeaderComponent={
            <CommunityList communities={communities} navigation={navigation} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    padding: '3%',
    alignItems: 'center',
  },

  headerTextStyle: {
    marginLeft: '3%',
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  browseCommunityContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  communityListCustomStyle: {
    marginTop: '2%',
    borderRadius: 8,
  },

  communityContainerStyle: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
  },
});

export default BrowseCommunityScreen;
