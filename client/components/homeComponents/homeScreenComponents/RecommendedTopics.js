import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

//Components
import RecommendedTopicsCard from './RecommendedTopicsCard';
import LoadingSpinner from '../../publicComponents/LoadingSpinner';
import Card from '../../publicComponents/Card';
import ListHeader from '../../publicComponents/ListHeader';

const RecommendedTopics = props => {
  const { 
    topicData,
    navigation
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

  const RecommendedTopicContent = () => {
    return (
      <View>
        <ListHeader 
          listTitle="Recommended Topics"
          customStyle={{marginBottom: "3.5%"}}
          useSeeAllButton={true}
        />
        {
          topicData !== '' ? (
            <View style={styles.topicCardContainerStyle}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(id, index) => index.toString()}
                data={topicGroup(topicData)}
                renderItem={itemData => (
                  <>
                    {
                      itemData.item.length === 1 && (
                        <RecommendedTopicsCard
                          firstCardIcon={itemData.item[0].image_path ? itemData.item[0].image_path : ''}
                          firstCardName={itemData.item[0].name ? itemData.item[0].name : ''}
                          firstCardDiscussions={itemData.item[0].discussion_count ? itemData.item[0].discussion_count : 0}
                          firstCardId={itemData.item[0].id ? itemData.item[0].id : ''}
                          navigation={navigation}
                        />
                      )
                    }
                    {
                      itemData.item.length === 2 && (
                        <RecommendedTopicsCard
                          firstCardIcon={itemData.item[0].image_path ? itemData.item[0].image_path : ''}
                          firstCardName={itemData.item[0].name ? itemData.item[0].name : ''}
                          firstCardDiscussions={itemData.item[0].discussion_count ? itemData.item[0].discussion_count : 0}
                          firstCardId={itemData.item[0].id ? itemData.item[0].id : ''}
                          secondCardIcon={itemData.item[1].image_path ? itemData.item[1].image_path : ''}
                          secondCardName={itemData.item[1].name ? itemData.item[1].name : ''}
                          secondCardDiscussions={itemData.item[1].discussion_count ? itemData.item[1].discussion_count : 0}
                          secondCardId={itemData.item[1].id ? itemData.item[1].id : ''}
                          navigation={navigation}
                        />
                      )
                    }
                    {
                      itemData.item.length === 3 && (
                        <RecommendedTopicsCard
                          firstCardIcon={itemData.item[0].image_path ? itemData.item[0].image_path : ''}
                          firstCardName={itemData.item[0].name ? itemData.item[0].name : ''}
                          firstCardDiscussions={itemData.item[0].discussion_count ? itemData.item[0].discussion_count : 0}
                          firstCardId={itemData.item[0].id ? itemData.item[0].id : ''}
                          secondCardIcon={itemData.item[1].image_path ? itemData.item[1].image_path : ''}
                          secondCardName={itemData.item[1].name ? itemData.item[1].name : ''}
                          secondCardDiscussions={itemData.item[1].discussion_count ? itemData.item[1].discussion_count : 0}
                          secondCardId={itemData.item[1].id ? itemData.item[1].id : ''}
                          thirdCardIcon={itemData.item[2].image_path ? itemData.item[2].image_path : ''}
                          thirdCardName={itemData.item[2].name ? itemData.item[2].name : ''}
                          thirdCardDiscussions={itemData.item[2].discussion_count ? itemData.item[2].discussion_count : 0}
                          thirdCardId={itemData.item[2].id ? itemData.item[2].id : ''}
                          navigation={navigation}
                        />
                      )
                    }
                  </>
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

  return (
    <Card child={RecommendedTopicContent} customStyle={styles.recommendedTopicsContainerStyle} />
  );
};

const styles = StyleSheet.create({
  recommendedTopicsContainerStyle: {
    marginTop: "2%",
    marginBottom: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  
  recommendedTopicsTitleStyle: {
    fontSize: 18,
    fontFamily: bold,
    color: "#FFFFFF",
    marginVertical: "4%",
    marginLeft: "5%"
  },

  topicCardContainerStyle: {
    marginLeft: "4%"
  }
});

export default RecommendedTopics;