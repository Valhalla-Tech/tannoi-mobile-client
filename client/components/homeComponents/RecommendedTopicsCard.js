import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const RecommendedTopicsCard = props => {
  const {
    firstCardIcon,
    firstCardName,
    firstCardDiscussions,
    secondCardIcon,
    secondCardName,
    secondCardDiscussions,
    thirdCardIcon,
    thirdCardName,
    thirdCardDiscussions
  } = props;

  return (
    <View>
      <TouchableOpacity style={styles.topicCardStyle}>
        <Image source={firstCardIcon} style={styles.topicIconStyle} resizeMode="stretch" />
        <View style={styles.topicCardInfoContainerStyle}>
          {
            firstCardName.length > 13 ? (
              <Text style={styles.topicNameStyle}>{`${firstCardName.substr(0, 13)}..`}</Text>
            ) : (
              <Text style={styles.topicNameStyle}>{firstCardName}</Text>
            )
          }
          <Text style={styles.topicDiscussionStyle}>{firstCardDiscussions} discussions</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.topicCardStyle}>
        <Image source={secondCardIcon} style={styles.topicIconStyle} resizeMode="stretch" />
        <View style={styles.topicCardInfoContainerStyle}>
        {
            secondCardName.length >= 13 ? (
              <Text style={styles.topicNameStyle}>{`${secondCardName.substr(0, 13)}..`}</Text>
            ) : (
              <Text style={styles.topicNameStyle}>{secondCardName}</Text>
            )
          }
          <Text style={styles.topicDiscussionStyle}>{secondCardDiscussions} discussions</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.topicCardStyle}>
        <Image source={thirdCardIcon} style={styles.topicIconStyle} resizeMode="stretch" />
        <View style={styles.topicCardInfoContainerStyle}>
        {
            thirdCardName.length >= 13 ? (
              <Text style={styles.topicNameStyle}>{`${thirdCardName.substr(0, 13)}..`}</Text>
            ) : (
              <Text style={styles.topicNameStyle}>{thirdCardName}</Text>
            )
          }
          <Text style={styles.topicDiscussionStyle}>{thirdCardDiscussions} discussions</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topicCardStyle: {
    flexDirection: "row",
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
    fontSize: 16
  },

  topicDiscussionStyle: {
    color: "#73798C",
    fontSize: 12
  }
});

export default RecommendedTopicsCard;