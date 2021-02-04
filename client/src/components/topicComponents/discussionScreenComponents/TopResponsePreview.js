import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';

//Component
import ListCard from '../../publicComponents/ListCard';

const TopResponsePreview = (props) => {
  const {
    navigation,
    topResponseData,
    discussionId,
    customStyle,
    responseCount,
    responseId,
  } = props;

  const TopResponseCard = (itemData) => {

    return (
      <ListCard
        navigation={navigation}
        imageUrl={itemData.item.creator.profile_photo_path}
        name={itemData.item.creator.name}
        caption={itemData.item.caption}
        postTime={itemData.item.timeSince}
        responseId={itemData.item.id}
        discussionId={discussionId}
        isTopResponsePreview={true}
        profileType={itemData.item.creator.type}
      />
    );
  };

  return (
    <View
      style={{ ...styles.topResponsePreviewContainerStyle, ...customStyle }}>
      <FlatList
        data={topResponseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={TopResponseCard}
      />
      {responseCount > 3 && (
        <TouchableOpacity
          onPress={() => {
            navigation.push('ResponseScreen', {
              responseId: responseId,
              discussionId: discussionId,
            });
          }}
          style={styles.replyButton}>
          <Text style={styles.replyTextStyle}>
            View {responseCount - topResponseData.length} more response
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topResponsePreviewContainerStyle: {
    paddingLeft: '5%',
  },

  TopResponseCard: {
    borderLeftWidth: 1,
  },

  replyButton: {
    paddingLeft: '6.5%',
    marginTop: '5%',
  },

  replyTextStyle: {
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
    color: '#73798C',
  },
});

export default TopResponsePreview;
