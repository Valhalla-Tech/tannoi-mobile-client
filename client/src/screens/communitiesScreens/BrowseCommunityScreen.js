import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GlobalPadding} from '../../constants/Size';
import {CalculateHeight, CalculateWidth} from '../../helper/CalculateSize';
import {normal, bold} from '../../assets/FontSize';
import axios from '../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../constants/BaseUrl';

//Components
import Header from '../../components/publicComponents/Header';
import BackButton from '../../components/publicComponents/BackButton';
import Card from '../../components/publicComponents/Card';

const BrowseCommunityScreen = ({navigation}) => {
  const [communities, setCommunities] = useState('');

  useEffect(() => {
    getCommunities();
  }, []);

  const getCommunities = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getCommunitiesRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/all`,
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
        <Text style={styles.headerTextStyle}>Browse Community</Text>
      </>
    );
  };

  const RenderCommunity = (itemData) => {
    return (
      <TouchableOpacity style={styles.communityContainerStyle}>
        <Image source={{uri: itemData.item.image_path}} style={styles.communityProfileImageStyle} />
        <View style={styles.communityDataContainerStyle}>
          <Text style={styles.communityNameStyle}>{itemData.item.name}</Text>
          <Text style={styles.communityDescriptionStyle}>{itemData.item.description}</Text>
          <Text style={styles.communityMemberStyle}>{itemData.item.member_count} member{itemData.item.member_count > 1 ? 's' : null}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CommunityList = () => {
    return (
      <FlatList
        data={communities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderCommunity}
      />
    );
  };

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.browseCommunityContainerStyle}>
        <Card child={CommunityList} customStyle={styles.communityListCustomStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },

  headerTextStyle: {
    marginLeft: '5%',
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  browseCommunityContainerStyle: {
    paddingHorizontal: GlobalPadding
  },

  communityListCustomStyle: {
    marginTop: '2%',
    borderRadius: 8
  },

  communityContainerStyle: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB'
  },

  communityProfileImageStyle: {
    width: CalculateWidth(15),
    height: CalculateWidth(15),
    borderRadius: 50
  },

  communityDataContainerStyle: {
    marginLeft: '5%',
    height: '90%',
  },

  communityNameStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2)
  },

  communityDescriptionStyle: {
    fontFamily: normal,
    color: '#73798C',
    fontSize: CalculateHeight(1.8)
  },

  communityMemberStyle: {
    fontFamily: normal,
    color: '#73798C'
  }
});

export default BrowseCommunityScreen;
