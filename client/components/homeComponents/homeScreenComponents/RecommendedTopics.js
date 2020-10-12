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

const RecommendedTopics = props => {
  const { 
    topicData 
  } = props;
  
  const [groupedTopic, setGroupedTopic] = useState([]);

  const topicGroup = () => {
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

    setGroupedTopic(arrayGroup);
  };
  
  useEffect(() => {
    topicGroup();
  }, [])
  
  
  return (
    <View style={styles.recommendedTopicsContainerStyle}>
      <View style={styles.recommendedTopicsTitleAndSeeAllButtonContainerStyle}>
        <Text style={styles.recommendedTopicsTitleStyle}>Recommended topics</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonTextStyle}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topicCardContainerStyle}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(id, index) => index.toString()}
          data={groupedTopic}
          renderItem={itemData => (
            <RecommendedTopicsCard
            firstCardIcon={itemData.item[0].imageUrl}
            firstCardName={itemData.item[0].name}
            firstCardDiscussions={itemData.item[0].discussions}
            secondCardIcon={itemData.item[1].imageUrl}
            secondCardName={itemData.item[1].name}
            secondCardDiscussions={itemData.item[1].discussions}
            thirdCardIcon={itemData.item[2].imageUrl}
            thirdCardName={itemData.item[2].name}
            thirdCardDiscussions={itemData.item[2].discussions}
            />
          )}
        />
      </View>
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