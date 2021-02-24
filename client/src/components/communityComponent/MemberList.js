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

//Icon
import RightArrowIcon from '../../assets/communitiesAssets/rightArrow.svg';

//Component
import Card from '../publicComponents/Card';

const MemberList = (props) => {
  const { memberList, navigation, onPress, communityId, isAdmin } = props;

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

  const MemberListContent = () => {
    return (
      <FlatList
        data={memberList}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
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
    fontSize: CalculateHeight(2),
    color: '#464D60',
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
    fontSize: CalculateHeight(2.1),
  },

  adminStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.8),
  },
});

export default MemberList;
