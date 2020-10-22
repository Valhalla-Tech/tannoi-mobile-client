import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold } from '../../../assets/FontSize';

//Icon
import DownArrow from '../../../assets/homeAssets/downArrow.svg';

//Components
import HomeListCard from './HomeListCard';
import LoadingSpinner from '../../publicComponents/LoadingSpinner';

const HomeList = props => {
  const { 
    listTitle, 
    listData,
    navigation
  } = props

  return (
    <View style={styles.homeListContainerStyle}>
      <View style={styles.homeListTitleAndFilterContainerStyle}>
        <Text style={styles.homeListTitleStyle}>{listTitle}</Text>
        {
          listTitle === 'Trending' && (
            <TouchableOpacity style={styles.filterStyle}>
              <Text style={styles.filterTextStyle}>Most recent</Text>
              <DownArrow />
            </TouchableOpacity>
          )
        }
      </View>
      {
        !listData && (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )
      }
      <FlatList
        data={listData}
        listKey={(item, index) => index.toString()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemData => (
          <>
            <HomeListCard
              imageUrl={itemData.item.creator.profile_photo_path}
              recordingFile={itemData.item.voice_note_path}
              name={itemData.item.creator.name}
              title={itemData.item.title}
              votes={itemData.item.likes}
              replies={itemData.item.responses.length}
              plays={itemData.item.play_count}
              postTime={itemData.item.created_at}
              discussionId={itemData.item.id}
              navigation={navigation}
            />
          </>
        )}
      />
      <View style={styles.moreButtonContainerStyle}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonTextStyle}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeListContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 38,
    borderRadius: 8,
    paddingBottom: "6.5%"
  },

  homeListTitleAndFilterContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "-7.5%"
  },

  filterStyle: {
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center"
  },

  filterTextStyle: {
    fontSize: 14,
    color: "#73798C",
    marginRight: 5.2
  },

  homeListTitleStyle: {
    fontSize: 20,
    fontFamily: bold,
    color: "#464D60",
    marginVertical: "4%",
    marginLeft: "3%"
  },

  moreButtonContainerStyle: {
    flex: 1, 
    alignItems: "center"
  },

  moreButton: {
    position: "absolute", 
    borderWidth: 1.5, 
    borderColor: "#5152D0", 
    paddingHorizontal: 20, 
    paddingVertical: 4, 
    borderRadius: 25, 
    top: 10, 
    backgroundColor: "#FFFFFF"
  },

  moreButtonTextStyle: {
    color: "#5152D0", 
    fontSize: 14
  }
});

export default HomeList;