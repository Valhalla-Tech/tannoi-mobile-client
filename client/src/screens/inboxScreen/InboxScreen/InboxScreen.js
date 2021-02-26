import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

//Components
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import SearchBar from '../../../components/publicComponents/SearchBar';
import Button from '../../../components/publicComponents/Button';

const InboxScreen = ({ navigation }) => {
  const [inbox, setInbox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [moreLoader, setMoreLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getInbox();
  }, []);

  const getInbox = async (page) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getInboxRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/users/notifications-all?page=${page ? page : 1}`,
        headers: {
          token: access_token,
        },
      });

      if (getInboxRequest.data) {
        if (page) {
          setMoreLoader(false);
          let addNewData = inbox.concat(getInboxRequest.data.data);

          setInbox(addNewData);
        } else {
          setIsLoading(false);
          setInbox(getInboxRequest.data.data);
          setTotalPage(getInboxRequest.data.pages);
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const onRefresh = () => {
    setIsLoading(true);
    setInbox([]);
    setCurrentPage(1);
    getInbox();
  };

  const nextPage = () => {
    setMoreLoader(true);
    getInbox(currentPage + 1);
    setCurrentPage((prevState) => prevState + 1);
  };

  const userInviteAction = async (communityId) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let userInviteActionRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/communities/edit-invite`,
        headers: {
          token: access_token,
        },
        data: {
          community_id: communityId,
          type: 'Decline',
        },
      });

      if (userInviteActionRequest.data) {
        setMoreLoader(true);
        getInbox();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.headerTitleAndButtonContainerStyle}>
          <Text style={styles.headerTitleStyle}>Inbox</Text>
        </View>
        <SearchBar searchBarIsOpen={false} navigation={navigation} />
      </>
    );
  };

  const inboxCard = (itemData) => {
    console.log(itemData);
    if (itemData.item !== null) {
      return (
        <TouchableOpacity
          style={
            itemData.index + 1 !== inbox.length
              ? styles.inboxCardStyle
              : { ...styles.inboxCardStyle, borderBottomWidth: 0 }
          }
          onPress={() => {
            if (itemData.item.type === 'Followers') {
              navigation.navigate('UserProfileScreen', {
                userId: itemData.item.user.id,
              });
            } else if (itemData.item.type === 'Response Response') {
              navigation.navigate('ResponseScreen', {
                responseId: itemData.item.response_response_id,
                discussionId: itemData.item.response.discussion_id,
                fromInbox: true,
              });
            } else if (
              itemData.item.type === 'Discussion Response' &&
              itemData.item.response_id !== null
            ) {
              navigation.navigate('ResponseScreen', {
                responseId: itemData.item.response_id,
                discussionId: itemData.item.discussion_id,
                fromInbox: true,
              });
            } else if (itemData.item.type === 'Response Like') {
              navigation.navigate('ResponseScreen', {
                responseId: itemData.item.response.id,
                discussionId: itemData.item.response.discussion_id,
              });
            } else if (itemData.item.community !== null) {
              if (itemData.item.type === 'Community Discussion Create') {
                navigation.push('DiscussionScreen', {
                  discussionId: itemData.item.discussion_id,
                  isCommunityDiscussion: true,
                });
              } else if (itemData.item.type === 'Community Invite') {
                navigation.navigate('CommunitiesNavigation', {
                  screen: 'CommunityProfileScreen',
                  params: {
                    communityId: itemData.item.community.id,
                  },
                });
              } else if (itemData.item.type === 'Community Join Approve') {
                navigation.navigate('CommunitiesNavigation', {
                  screen: 'CommunityProfileScreen',
                  params: {
                    communityId: itemData.item.community_id,
                  },
                });
              } else if (itemData.item.type === 'Community New Request') {
                navigation.navigate('CommunitiesNavigation', {
                  screen: 'MemberRequestScreen',
                  params: {
                    communityId: itemData.item.community_id,
                  },
                });
              } else {
                navigation.navigate('CommunitiesNavigation');
              }
            } else {
              navigation.navigate('DiscussionScreen', {
                discussionId: itemData.item.discussion_id,
              });
            }
          }}>
          <View style={styles.imageContainerStyle}>
            <Image
              source={{
                uri:
                  itemData.item.community !== null
                    ? itemData.item.community.image_path
                    : itemData.item.user.profile_photo_path,
              }}
              style={styles.profilePhotoStyle}
            />
          </View>
          <View style={styles.inboxMessageContainerStyle}>
            <Text style={styles.inboxMessageStyle}>
              {itemData.item.message}
            </Text>
            {itemData.item.type === 'Community Invite' && (
              <View style={styles.inviteButtonContainerStyle}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#6505E1',
                    color: '#FFFFFF',
                    fontSize: CalculateHeight(1.8),
                    marginBottom: 0,
                    padding: 0,
                    paddingHorizontal: '2%',
                    borderWidth: 0,
                    marginRight: '2%',
                  }}
                  buttonTitle="View"
                  buttonFunction={() =>
                    navigation.navigate('CommunitiesNavigation', {
                      screen: 'CommunityProfileScreen',
                      params: {
                        communityId: itemData.item.community.id,
                      },
                    })
                  }
                />
                <Button
                  buttonStyle={{
                    color: '#6505E1',
                    fontSize: CalculateHeight(1.8),
                    marginBottom: 0,
                    padding: 0,
                    paddingHorizontal: '2%',
                    borderColor: '#6505E1',
                  }}
                  buttonTitle="Decline"
                  buttonFunction={() => userInviteAction(itemData.item.community.id)}
                />
              </View>
            )}
            <Text style={styles.postTimeStyle}>{itemData.item.timeSince}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const inboxContent = () => {
    return (
      <>
        {!isLoading ? (
          <FlatList
            data={inbox}
            keyExtractor={(item, index) => index.toString()}
            renderItem={inboxCard}
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
        ) : (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.inboxScreenContainerStyle}>
            <Card child={inboxContent} customStyle={styles.cardStyle} />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '5%',
    paddingTop: '3%',
  },

  headerTitleAndButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5%',
  },

  headerTitleStyle: {
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  headerButtonStyle: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
  },

  inboxScreenContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  cardStyle: {
    marginTop: '2%',
    borderRadius: 8,
    marginBottom: '8%',
  },

  inboxCardStyle: {
    padding: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageContainerStyle: {
    alignItems: 'flex-start',
    height: '100%',
  },

  profilePhotoStyle: {
    width: CalculateHeight(5),
    height: CalculateHeight(5),
    borderRadius: 50,
  },

  inboxMessageContainerStyle: {
    paddingLeft: '3%',
  },

  inboxMessageStyle: {
    maxWidth: '90%',
    fontFamily: normal,
    fontSize: CalculateHeight(1.8),
  },

  inviteButtonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  postTimeStyle: {
    color: '#73798C',
    fontFamily: normal,
    fontSize: CalculateHeight(1.5),
  },

  loadMoreButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
});

export default InboxScreen;
