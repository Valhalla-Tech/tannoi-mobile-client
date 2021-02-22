import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { bold, normal } from '../../../assets/FontSize';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';
import { GlobalPadding } from '../../../constants/Size';

//Components
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import BackButton from '../../../components/publicComponents/BackButton';
import Button from '../../../components/publicComponents/Button';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const InviteScreen = ({ navigation, route }) => {
  const [userList, setUserList] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [moreLoader, setMoreLoader] = useState(false);

  const { communityId } = route.params;

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async (keyword, page) => {
    try {
      if (page) {
        setMoreLoader(true);
      }

      let access_token = await AsyncStorage.getItem('access_token');

      let getUserListRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/communities/invite-list/${communityId}${
          keyword ? `?search=${keyword}` : ''
        }${keyword ? '&' : '?'}&page=${page ? page : '1'}`,
        headers: {
          token: access_token,
        },
      });

      if (getUserListRequest.data) {
        if (page) {
          setMoreLoader(false);
          let addNewData = userList.concat(getUserListRequest.data.data);

          setUserList(addNewData);
        } else {
          setUserList(getUserListRequest.data.data);
          setCurrentPage(getUserListRequest.data.currentPage);
          setTotalPage(getUserListRequest.data.pages);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inviteUser = async (userId) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let inviteUserRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/communities/invite`,
        headers: {
          token: access_token,
        },
        data: {
          community_id: communityId,
          user_id: userId,
        },
      });

      if (inviteUserRequest.data) {
        getUserList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchInput = (input) => {
    getUserList(input);
  };

  const nextPage = () => {
    setMoreLoader(true);
    getUserList(null, currentPage + 1);
    setCurrentPage((prevState) => prevState + 1);
  };

  const HeaderContent = () => (
    <>
      <BackButton navigation={navigation} />
      <Text style={styles.headerTextStyle}>Invite users to community</Text>
    </>
  );

  const SearchInputCard = () => (
    <>
      <TextInput
        onChangeText={(value) => searchInput(value)}
        placeholder="Search"
        style={styles.searchInputStyle}
      />
    </>
  );

  const MemberListCard = (itemData) => (
    <View style={styles.memberListCardStyle}>
      <View style={styles.profileDataContainerStyle}>
        <Image
          source={{ uri: itemData.item.profile_photo_path }}
          style={styles.profileImageStyle}
        />
        <Text style={styles.nameStyle}>{itemData.item.name}</Text>
      </View>
      <Button
        buttonStyle={{
          padding: 0,
          paddingHorizontal: '2%',
          color: '#6505E1',
          borderColor: '#6505E1',
          fontSize: CalculateHeight(1.8),
          marginBottom: 0,
        }}
        buttonTitle="Invite"
        buttonFunction={() => inviteUser(itemData.item.id)}
      />
    </View>
  );

  const MemberList = () => (
    <>
      {userList === '' ? (
        <LoadingSpinner loadingSpinnerForComponent={true} />
      ) : (
        <FlatList
          data={userList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={MemberListCard}
          ListFooterComponent={
            currentPage < totalPage ? (
              moreLoader ? (
                <LoadingSpinner loadingSpinnerForComponent={true} />
              ) : (
                <View style={styles.loadMoreButtonContainerStyle}>
                  <Button
                    buttonStyle={{
                      color: '#6505E1',
                      borderColor: '#6505E1',
                      paddingVertical: '.5%',
                      paddingHorizontal: '5%',
                    }}
                    buttonTitle="More"
                    buttonFunction={nextPage}
                  />
                </View>
              )
            ) : null
          }
        />
      )}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <Header child={HeaderContent} customStyle={styles.headerStyle} />
          <Card
            child={SearchInputCard}
            customStyle={styles.searchInputContainerStyle}
          />
          <View style={styles.inviteScreenContainerStyle}>
            <FlatList
              ListHeaderComponentStyle={{
                marginBottom: '35%',
              }}
              ListHeaderComponent={
                <Card
                  child={MemberList}
                  customStyle={styles.memberListContainerStyle}
                />
              }
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTextStyle: {
    fontFamily: bold,
    marginLeft: '3%',
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  searchInputContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: '3%',
    height: CalculateHeight(6.5),
  },

  searchInputStyle: {
    backgroundColor: '#F7F7F7',
    padding: '2%',
    borderRadius: 10,
    flex: 1,
  },

  inviteScreenContainerStyle: {
    paddingHorizontal: GlobalPadding,
    paddingVertical: GlobalPadding,
  },

  memberListContainerStyle: {
    borderRadius: 8,
  },

  memberListCardStyle: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileDataContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    height: CalculateWidth(8),
    width: CalculateWidth(8),
    borderRadius: 50,
    marginRight: '5%',
  },

  nameStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },

  loadMoreButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
});

export default InviteScreen;
