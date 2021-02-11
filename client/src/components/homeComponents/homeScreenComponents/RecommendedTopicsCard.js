import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { normal } from '../../../assets/FontSize';
import { CalculateWidth } from '../../../helper/CalculateSize';

const RecommendedTopicsCard = (props) => {
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
    navigation,
  } = props;

  const CardContent = (cardName, cardId, cardIcon, discussionCount) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TopicDetailScreen', {
            topicName: cardName,
            topicId: cardId,
          })
        }
        style={styles.topicCardStyle}>
        <Image
          source={cardIcon !== '' ? { uri: cardIcon } : ''}
          style={styles.topicIconStyle}
        />
        <View style={styles.topicCardInfoContainerStyle}>
          {cardName.length > 13 ? (
            <Text style={styles.topicNameStyle}>{`${cardName.substr(
              0,
              12,
            )}...`}</Text>
          ) : (
            <Text style={styles.topicNameStyle}>{cardName}</Text>
          )}
          <Text style={styles.topicDiscussionStyle}>
            {discussionCount} discussions
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {firstCardName && (
        <>
          {CardContent(
            firstCardName,
            firstCardId,
            firstCardIcon,
            firstCardDiscussions,
          )}
        </>
      )}
      {secondCardName && (
        <>
          {CardContent(
            secondCardName,
            secondCardId,
            secondCardIcon,
            secondCardDiscussions,
          )}
        </>
      )}
      {thirdCardName && (
        <>
          {CardContent(
            thirdCardName,
            thirdCardId,
            thirdCardIcon,
            thirdCardDiscussions,
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topicCardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: CalculateWidth(16),
  },

  topicCardInfoContainerStyle: {
    marginLeft: '6%',
    width: '72%',
  },

  topicIconStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },

  topicNameStyle: {
    color: '#464D60',
    fontSize: 16,
    fontFamily: normal,
    marginBottom: -5,
  },

  topicDiscussionStyle: {
    color: '#73798C',
    fontSize: 12,
    fontFamily: normal,
  },
});

export default RecommendedTopicsCard;
