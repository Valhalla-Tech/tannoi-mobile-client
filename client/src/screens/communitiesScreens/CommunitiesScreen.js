import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {bold, normal} from '../../assets/FontSize';
import {CalculateHeight} from '../../helper/CalculateSize';
import { GlobalPadding } from '../../constants/Size';

//Components
import Card from '../../components/publicComponents/Card';
import Header from '../../components/publicComponents/Header';

const CommunitiesScreen = ({navigation}) => {
  const HeaderContent = () => {
    return (
      <>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Communities</Text>
          <TouchableOpacity>
            <Text style={styles.headerButtonTextStyle}>Browse Community</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const CreateCommunityButton = () => {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate('CreateCommunityNavigation')}>
          <Text style={styles.createCommunityButtonTextStyle}>Create a community</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.communitiesScreeConatainerStyle}>
        <Card child={CreateCommunityButton} customStyle={styles.createCommunityCardStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingVertical: '3%',
    paddingHorizontal: '5%'
  },

  headerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  communitiesScreeConatainerStyle: {
    paddingHorizontal: GlobalPadding
  },

  headerTextStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60'
  },

  headerButtonTextStyle: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: CalculateHeight(1.8)
  },

  createCommunityCardStyle: {
    marginTop: '2%',
    borderRadius: 8,
    padding: '3.5%'
  },

  createCommunityButtonTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(2)
  }
});

export default CommunitiesScreen;
