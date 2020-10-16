import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

//Component
import RecommendedTopicsCard from './RecommendedTopicsCard';
import LoadingSpinner from '../../publicComponents/LoadingSpinner';

const RecommendedTopics = props => {
  const { 
    topicData 
  } = props;

  const topicGroup = topicData => {
    let arrayGroup = []
    let topicGroupArray = []

    for (let topicIndex = 0; topicIndex < topicData.length; topicIndex++) {
      if (topicGroupArray.length === 3) {
        arrayGroup.push(topicGroupArray)
        topicGroupArray = [];
        topicGroupArray.push(topicData[topicIndex]);
      } else {
        topicGroupArray.push(topicData[topicIndex])
      }
    }

    arrayGroup.push(topicGroupArray);
    return arrayGroup;
  };

  return (
    <View style={styles.recommendedTopicsContainerStyle}>
      <View style={styles.recommendedTopicsTitleAndSeeAllButtonContainerStyle}>
        <Text style={styles.recommendedTopicsTitleStyle}>Recommended topics</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonTextStyle}>See all</Text>
        </TouchableOpacity>
      </View>
      {
        topicData !== '' ? (
          <View style={styles.topicCardContainerStyle}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(id, index) => index.toString()}
              data={topicGroup(topicData)}
              renderItem={itemData => (
                <RecommendedTopicsCard
                firstCardIcon={itemData.item[0].image_path}
                firstCardName={itemData.item[0].name}
                firstCardDiscussions={1}
                secondCardIcon={itemData.item[1].image_path}
                secondCardName={itemData.item[1].name}
                secondCardDiscussions={1}
                thirdCardIcon={itemData.item[2].image_path}
                thirdCardName={itemData.item[2].name}
                thirdCardDiscussions={1}
                />
              )}
            />
          </View>
        ) : (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedTopicsContainerStyle: {
    marginHorizontal: 8,
    marginBottom: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },

  recommendedTopicsTitleAndSeeAllButtonContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  recommendedTopicsTitleStyle: {
    fontSize: 20,
    fontFamily: bold,
    color: "#464D60",
    marginVertical: "4%",
    marginLeft: "5%"
  },

  seeAllButton: {
    marginRight: 16
  },

  seeAllButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 14,
    fontFamily: normal
  },

  topicCardContainerStyle: {
    marginLeft: 16
  }
});

export default RecommendedTopics;