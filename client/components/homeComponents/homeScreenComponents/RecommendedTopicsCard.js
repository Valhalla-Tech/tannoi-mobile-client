import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { normal } from '../../../assets/FontSize';

const RecommendedTopicsCard = props => {
  const {
    firstCardIcon,
    firstCardName,
    firstCardDiscussions,
    firstCardId,
    secondCardIcon,
    secondCardName,
    secondCardDiscussions,
    secondCardId,
    thirdCardIcon,
    thirdCardName,
    thirdCardDiscussions,
    thirdCardId,
    navigation
  } = props;

  return (
    <View>
      {
        firstCardName && (
          <TouchableOpacity onPress={() => navigation.navigate('TopicDetailScreen', {
            topicName: firstCardName,
            topicId: firstCardId
          })} style={styles.topicCardStyle}>
            <Image source={firstCardIcon !== '' ? {uri: firstCardIcon} : ''} style={styles.topicIconStyle} />
            <View style={styles.topicCardInfoContainerStyle}>
              {
                firstCardName.length > 13 ? (
                  <Text style={styles.topicNameStyle}>{`${firstCardName.substr(0, 12)}...`}</Text>
                ) : (
                  <Text style={styles.topicNameStyle}>{firstCardName}</Text>
                )
              }
              <Text style={styles.topicDiscussionStyle}>{firstCardDiscussions} discussions</Text>
            </View>
          </TouchableOpacity>
        )
      }
      {
        secondCardName && (
          <TouchableOpacity onPress={() => navigation.navigate('TopicDetailScreen', {
            topicName: secondCardName,
            topicId: secondCardId
          })} style={styles.topicCardStyle}>
            <Image source={secondCardIcon !== '' ? {uri: secondCardIcon} : ''} style={styles.topicIconStyle} resizeMode="stretch" />
            <View style={styles.topicCardInfoContainerStyle}>
            {
                secondCardName.length >= 13 ? (
                  <Text style={styles.topicNameStyle}>{`${secondCardName.substr(0, 12)}...`}</Text>
                ) : (
                  <Text style={styles.topicNameStyle}>{secondCardName}</Text>
                )
              }
              <Text style={styles.topicDiscussionStyle}>{secondCardDiscussions} discussions</Text>
            </View>
          </TouchableOpacity>
        )
      }
      {
        thirdCardName && (
          <TouchableOpacity onPress={() => navigation.navigate('TopicDetailScreen', {
            topicName: thirdCardName,
            topicId: thirdCardId
          })} style={styles.topicCardStyle}>
            <Image source={thirdCardIcon ? {uri: thirdCardIcon} : ''} style={styles.topicIconStyle} resizeMode="stretch" />
            <View style={styles.topicCardInfoContainerStyle}>
            {
                thirdCardName.length >= 13 ? (
                  <Text style={styles.topicNameStyle}>{`${thirdCardName.substr(0, 12)}...`}</Text>
                ) : (
                  <Text style={styles.topicNameStyle}>{thirdCardName}</Text>
                )
              }
              <Text style={styles.topicDiscussionStyle}>{thirdCardDiscussions} discussions</Text>
            </View>
          </TouchableOpacity>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  topicCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginRight: 31
  },

  topicCardInfoContainerStyle: {
    marginLeft: 12
  },

  topicIconStyle: {
    height: 40,
    width: 40,
    borderRadius: 50
  },
  
  topicNameStyle: {
    color: "#464D60",
    fontSize: 16,
    fontFamily: normal,
    marginBottom: -5
  },

  topicDiscussionStyle: {
    color: "#73798C",
    fontSize: 12,
    fontFamily: normal
  }
});

export default RecommendedTopicsCard;