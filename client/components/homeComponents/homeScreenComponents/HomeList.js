import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

//Icon
import DownArrow from '../../../assets/homeAssets/downArrow.svg';

//Component
import HomeListCard from './HomeListCard';

const HomeList = props => {
  const { 
    listTitle, 
    listData 
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
      <FlatList
        data={listData}
        listKey={(item, index) => index.toString()}
        renderItem={itemData => (
          <HomeListCard
            imageUrl={itemData.item.imageUrl}
            name={itemData.item.name}
            title={itemData.item.title}
            votes={itemData.item.votes}
            replies={itemData.item.replies}
            plays={itemData.item.plays}
            time={itemData.item.time}
          />
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
    justifyContent: "space-between"
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
    fontWeight: "bold",
    color: "#464D60",
    marginVertical: "4%",
    marginLeft: "5%"
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