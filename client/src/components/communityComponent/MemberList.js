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

//Component
import Card from '../publicComponents/Card';

const MemberList = (props) => {
  const { memberList } = props;

  const MemberListData = (itemData) => {
    return (
      <TouchableOpacity
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
          <Text style={styles.memberNameStyle}>{itemData.item.name}</Text>
        </View>
        <Text style={styles.adminStyle}>Admin</Text>
      </TouchableOpacity>
    );
  };

  const MemberListContent = () => {
    return (
      <FlatList
        data={memberList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={MemberListData}
      />
    );
  };

  return (
    <Card
      child={MemberListContent}
      customStyle={styles.communityMemberContainerStyle}
    />
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
    fontSize: CalculateHeight(2),
  },

  adminStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.5),
  },
});

export default MemberList;
