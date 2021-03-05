import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { normal } from '../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';
import Share from 'react-native-share';
import { GenerateDeepLink } from '../../helper/GenerateDeepLink';

//Icon
import RightArrowIcon from '../../assets/communitiesAssets/rightArrow.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Component
import Card from '../publicComponents/Card';

const MemberList = (props) => {
  const { memberList, navigation, onPress, communityId, isAdmin, communityName } = props;

  const MemberListData = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() =>{
            if (onPress) {
              return onPress(itemData);
            }
            // navigation.navigate('UserProfileScreen', { userId: itemData.item.id })
          }
        }
        style={
          itemData.index + 1 !== memberList.length
            ? styles.memberListDataStyle
            : { ...styles.memberListDataStyle, borderBottomWidth: 0 }
        }>
        <View style={styles.imageProfileAndNameStyle}>
          <Image
            source={{ uri: itemData.item.profile_photo_path }}
            style={styles.profileImageStyle}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.memberNameStyle}>{itemData.item.name}</Text>
          </View>
        </View>
        <View style={{ paddingRight: '2%' }}>
          <Text style={styles.adminStyle}>
            {itemData.item.members[0].community_member.type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const shareOption = async () => {
    try {
      GenerateDeepLink(
        communityName,
        'Check out this community on the tannOi app!',
        'CommunitiesNavigation',
        {
          screen: 'CommunityProfileScreen',
          params: {
            communityId,
          },
        },
        'share a community',
        async (url) => {
          try {
            const options = {
              title: communityName,
              message: url,
            };
            await Share.open(options);
          } catch (error) {
            console.log(error);
          }
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const MemberListContent = () => {
    return (
      <FlatList
        style={{minHeight: CalculateHeight(27), maxHeight: CalculateHeight(42)}}
        data={memberList}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <TouchableOpacity onPress={() => shareOption()} style={styles.inviteCommunityLinkContainerStyle}>
              <Icon name="link" style={{...styles.inviteToCommunityButtonTextStyle, marginRight: '1.5%'}}/>
              <Text style={styles.inviteToCommunityButtonTextStyle}>Invite to community via link</Text>
            </TouchableOpacity>
            {isAdmin && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('InviteScreen', {
                    communityId: communityId,
                  })
                }
                style={styles.memberListDataStyle}>
                <Text style={styles.inviteToCommunityButtonTextStyle}>
                  Invite users to community
                </Text>
                <View style={{ justifyContent: 'center', paddingRight: '2%' }}>
                  <RightArrowIcon />
                </View>
              </TouchableOpacity>
            )}
          </>
        }
        renderItem={MemberListData}
      />
    );
  };

  return (
    <Card
      child={MemberListContent}
      customStyle={styles.communityMemberContainerStyle}/>
  );
};

const styles = StyleSheet.create({
  communityMemberContainerStyle: {
    borderRadius: 8,
    marginTop: '2%',
  },

  memberListDataStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3.5%',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
  },

  inviteToCommunityButtonTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(1.8),
    color: '#464D60',
  },

  inviteCommunityLinkContainerStyle: {
    paddingLeft: '3.5%',
    padding: '3%',
    alignItems:'center',
    flexDirection: 'row',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },

  imageProfileAndNameStyle: {
    flexDirection: 'row',
  },

  profileImageStyle: {
    width: CalculateWidth(8),
    height: CalculateWidth(8),
    borderRadius: 50,
    marginRight: CalculateWidth(3),
  },

  memberNameStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(1.8),
  },

  adminStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.8),
  },
});

export default MemberList;
