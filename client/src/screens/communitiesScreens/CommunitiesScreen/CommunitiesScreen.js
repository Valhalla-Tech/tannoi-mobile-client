import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCommunity } from '../../../store/actions/CommuitiesAction';

//Components
import Card from '../../../components/publicComponents/Card';
import Header from '../../../components/publicComponents/Header';
import BackButton from '../../../components/publicComponents/BackButton';
import CommunityList from '../../../components/communityComponent/CommunityList';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

//Assets
import RightArrowIcon from '../../../assets/communitiesAssets/rightArrow.svg';
import AddCircleIcon from '../../../assets/communitiesAssets/ic-add-circle.svg';

const CommunitiesScreen = ({ navigation }) => {
  const userCommunity = useSelector(
    (state) => state.CommunitiesReducer.userCommunity,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCommunity());
  }, []);

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.headerContentStyle}>
          <View style={styles.backButtonAndTitleContainerStyle}>
            <BackButton
              navigation={navigation}
              styleOption={{
                marginTop: 0,
                marginBottom: 0,
                marginRight: '5%',
              }}
            />
            <Text style={styles.headerTextStyle}>Communities</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('BrowseCommunityScreen')}>
            <Text style={styles.headerButtonTextStyle}>Browse Communities</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const CreateCommunityButton = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCommunityNavigation')}>
          <View style={styles.createCommunityContainerStyle}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginRight: '3%' }}>
                <AddCircleIcon />
              </View>
              <Text style={styles.createCommunityButtonTextStyle}>
                Create a community
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.communitiesScreeContainerStyle}>
        <FlatList
          ListHeaderComponent={
            <>
              <Card
                child={CreateCommunityButton}
                customStyle={styles.createCommunityCardStyle}
              />
              <CommunityList
                communities={userCommunity}
                navigation={navigation}
              />
            </>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    padding: '3%',
  },

  headerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  communitiesScreeContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  headerTextStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  createCommunityContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerButtonTextStyle: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
  },

  createCommunityCardStyle: {
    marginTop: '2%',
    borderRadius: 8,
    padding: '3.5%',
  },

  createCommunityButtonTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(2.2),
    paddingLeft: '2%',
  },
});

export default CommunitiesScreen;
