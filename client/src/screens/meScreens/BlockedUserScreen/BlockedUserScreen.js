import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Card,
  ScreenContainer,
  Header,
  BackButton,
  LoadingSpinner,
  Button,
} from '../../../components/publicComponents';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

const BlockedUserScreen = ({ navigation }) => {
  const [blockedUserList, setBlockedUserList] = useState('');
  const [moreIsLoading, setMoreIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getBlockedUserList();
  }, []);

  const getBlockedUserList = async (name, page) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getBlockedUserListRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/users/all-blocked-user${
          name ? `?name=${name}` : ''
        }${`${name ? '&&' : '?'}page=${page ? page : 1}`}`,
        headers: {
          token: access_token,
        },
      });

      if (getBlockedUserListRequest.data) {
        if (page) {
          setMoreIsLoading(false);
          let newData = blockedUserList.concat(
            getBlockedUserListRequest.data.data,
          );
          setBlockedUserList(newData);
        } else {
          setBlockedUserList(getBlockedUserListRequest.data.data);
          setTotalPage(getBlockedUserListRequest.data.pages);
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const unblockUser = async (userId) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let unblockUserRequest = await axios({
        method: 'delete',
        url: `${BaseUrl}/users/unblock-user/${userId}`,
        headers: {
          token: access_token,
        },
      });

      if (unblockUserRequest.data) {
        getBlockedUserList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async () => {
    setMoreIsLoading(true);
  };

  const RenderItem = (itemData) => (
    <View style={styles.blockedListStyle}>
      <View style={styles.profileContainerStyle}>
        <Image
          source={{ uri: itemData.item.profile_photo_path }}
          style={styles.profileImageStyle}
        />
        <Text style={styles.profileNameStyle}>{itemData.item.name}</Text>
      </View>
      <Button
        buttonStyle={{
          color: '#FFFFFF',
          backgroundColor: '#5152D0',
          borderWidth: 0,
          fontSize: CalculateHeight(1.5),
          padding: 0,
          paddingHorizontal: '3%',
          paddingVertical: '2%',
        }}
        buttonTitle="Unblock"
        buttonFunction={() => unblockUser(itemData.item.id)}
      />
    </View>
  );

  return (
    <ScreenContainer>
      <Header customStyle={styles.headerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.headerTextStyle}>Blocked user</Text>
      </Header>
      <View style={styles.blockedUserScreenContainerStyle}>
        <Card customStyle={styles.cardStyle}>
          {blockedUserList !== '' ? (
            <FlatList
              style={{ maxHeight: CalculateHeight(70) }}
              data={blockedUserList}
              renderItem={RenderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
                totalPage > 1 ? (
                  moreIsLoading ? (
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
          ) : (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          )}
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2.5%',
    paddingVertical: '3%',
  },

  headerTextStyle: {
    marginLeft: '3%',
    fontFamily: bold,
    color: '#464D60',
    fontSize: CalculateHeight(2.5),
  },

  blockedUserScreenContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  cardStyle: {
    marginTop: '2%',
    borderRadius: 8,
  },

  blockedListStyle: {
    padding: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    width: CalculateWidth(8),
    height: CalculateWidth(8),
    borderRadius: 50,
    marginRight: '5%',
  },

  profileNameStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(1.8),
  },

  loadMoreButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%',
  },
});

export default BlockedUserScreen;
