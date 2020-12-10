import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

//Icon
import NoProfilePicture from '../../../assets/publicAssets/noProfilePicture.png';

//Components
import LoadingSpinner from '../../publicComponents/LoadingSpinner';
import Card from '../../publicComponents/Card';
import ListHeader from '../../publicComponents/ListHeader';

const TopUsers = props => {
  const {
    topUserData,
    navigation
  } = props;

  const TopUserContent = () => {
    return (
      <View>
        <ListHeader listTitle="Top Users" />
        {
          !topUserData && (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          )
        }
        <View style={styles.listStyle}>
          <FlatList
            data={topUserData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <TouchableOpacity style={styles.topUsersCardConntainerStyle} onPress={() => {
                navigation.navigate('UserProfile', {
                  userId: itemData.item.id
                });
              }}>
                <Image source={itemData.item.profile_photo_path ? {uri: itemData.item.profile_photo_path} : NoProfilePicture} style={styles.profilePictureStyle} />
                {
                  itemData.item.name === null ? <Text style={styles.topUsersNameStyle}> </Text> : (
                    itemData.item.name.length > 14 ? (
                      <Text style={styles.topUsersNameStyle}>{`${itemData.item.name.substr(0, 11)}...`}</Text>
                    ) : (
                      <Text style={styles.topUsersNameStyle}>{itemData.item.name}</Text>
                    )
                  )
                }
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <Card child={TopUserContent} customStyle={styles.topUsersContainerStyle} />
  );
};

const styles = StyleSheet.create({
  topUsersContainerStyle: {
    marginTop: "2%",
    marginHorizontal: "1.8%",
    borderRadius: 8
  },

  listStyle: {
    paddingLeft: "4%",
    marginVertical: "5.5%"
  },

  topUsersCardConntainerStyle: {
    alignItems: "center",
    marginRight: 16
  },

  profilePictureStyle: {
    height: 75,
    width: 75,
    borderRadius: 50,
    marginBottom: 8
  },

  topUsersNameStyle: {
    color: "#464D60",
    fontSize: 12,
    fontFamily: normal
  }
});

export default TopUsers;