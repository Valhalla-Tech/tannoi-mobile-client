import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {bold, normal} from '../../../assets/FontSize';
import {CalculateHeight} from '../../../helper/CalculateSize';
import {GlobalPadding} from '../../../constants/Size';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

//Components
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import SearchBar from '../../../components/publicComponents/SearchBar';

const InboxScreen = ({navigation}) => {
  const [inbox, setInbox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getInbox = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getInboxRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/users/notifications`,
        headers: {
          token: access_token,
        },
      });

      if (getInboxRequest.data) {
        setIsLoading(false);
        setInbox(getInboxRequest.data);
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const onRefresh = () => {
    setIsLoading(true);
    setInbox('');
    getInbox();
  };

  useEffect(() => {
    setIsLoading(true);
    getInbox();
  }, []);

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.headerTitleAndButtonContainerStyle}>
          <Text style={styles.headerTitleStyle}>Inbox</Text>
          <TouchableOpacity>
            <Text style={styles.headerButtonStyle}>Edit</Text>
          </TouchableOpacity>
        </View>
        <SearchBar searchBarIsOpen={false} navigation={navigation} />
      </>
    );
  };

  const inboxCard = (itemData) => {
    if (itemData.item !== null) {
      return (
        <TouchableOpacity
          style={styles.inboxCardStyle}
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
            } else {
              navigation.navigate('DiscussionScreen', {
                discussionId: itemData.item.discussion_id,
              });
            }
          }}>
          <View style={styles.imageContainerStyle}>
            <Image
              source={{uri: itemData.item.user.profile_photo_path}}
              style={styles.profilePhotoStyle}
            />
          </View>
          <View style={styles.inboxMessageContainerStyle}>
            <Text style={styles.inboxMessageStyle}>
              {itemData.item.message}
            </Text>
            <Text style={styles.postTimeStyle}>{itemData.item.timeSince}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
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
          />
        ) : (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )}
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
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

  postTimeStyle: {
    color: '#73798C',
    fontFamily: normal,
    fontSize: CalculateHeight(1.5),
  },
});

export default InboxScreen;
