import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useSelector } from 'react-redux';
import { CalculateWidth, CalculateHeight } from '../../../helper/CalculateSize';

//Icons
import TickIcon from '../../../assets/publicAssets/tickIcon.png';
import DownArrow from '../../../assets/topicAssets/ic-down-arrow.svg';

//Components
import LoadingSpinner from '../../publicComponents/LoadingSpinner';
import TopResponsePreview from './TopResponsePreview';

const ClosedCard = (props) => {
  const {
    profilePicture,
    profileName,
    postTime,
    caption,
    cardIndex,
    selectCard,
    discussionTitle,
    responseLike,
    responsePlay,
    responseReply,
    profileType,
    navigation,
    responseId,
    discussionId,
    topResponse,
    responseCount,
  } = props;

  const isLoading = useSelector((state) => state.DiscussionReducer.isLoading);

  useEffect(() => {}, [responseCount]);

  const ResponseData = () => {
    return (
      <View style={styles.responseDataContainerStyle}>
        <Text style={styles.responseDataTextStyle}>
          {responseLike} Votes
        </Text>
        <Text style={styles.responseDataTextStyle}>
          {responseReply} Replies
        </Text>
        <Text style={styles.responseDataTextStyle}>
          {responsePlay} Plays
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.closedCardContainerStyle}
      onPress={() => {
        selectCard(cardIndex);
      }}
      disabled={isLoading ? true : false}>
      {isLoading ? (
        <LoadingSpinner loadingSpinnerForComponent={true} />
      ) : (
        <>
          <View style={styles.profileAndPostTimeContainerStyle}>
            <View style={styles.profileInfoContainerStyle}>
              <Image
                source={{ uri: profilePicture }}
                style={styles.profileImageStyle}
              />
              <Text style={styles.profileNameStyle}>{profileName}</Text>
              {profileType === 1 && (
                <Image source={TickIcon} style={styles.tickIconStyle} />
              )}
            </View>
            <Text style={styles.postTimeStyle}>{postTime ? postTime : ''}</Text>
          </View>
          {cardIndex === 'discussion' ? (
            discussionTitle.length > 45 ? (
              <Text style={styles.discussionTitleStyle}>
                {discussionTitle.substring(0, 42)}...
              </Text>
            ) : (
              <Text style={styles.discussionTitleStyle}>{discussionTitle}</Text>
            )
          ) : (
            <View style={styles.captionAndDownArrowContainerStyle}>
              <Text style={styles.captionTextStyle}>{caption}</Text>
              <DownArrow height={CalculateWidth(5)} width={CalculateWidth(5)} />
            </View>
          )}
          {responseLike !== undefined && <ResponseData />}
          {topResponse && topResponse.length !== 0 && (
            <TopResponsePreview
              navigation={navigation}
              topResponseData={topResponse}
              discussionId={discussionId}
              customStyle={{
                marginTop: '6%',
              }}
              responseCount={responseCount}
              responseId={responseId}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closedCardContainerStyle: {
    backgroundColor: '#FFFFFF',
    marginBottom: '2%',
    borderRadius: 8,
    padding: '3.5%',
  },

  profileAndPostTimeContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    borderRadius: 50,
    height: CalculateWidth(6),
    width: CalculateWidth(6),
    marginRight: '5.1%',
  },

  profileNameStyle: {
    fontSize: CalculateHeight(1.8),
    color: '#464D60',
    fontFamily: bold,
  },

  tickIconStyle: {
    height: CalculateWidth(3.5),
    width: CalculateWidth(3.5),
    marginLeft: '2%',
  },

  postTimeStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.5),
    fontFamily: normal,
  },

  discussionTitleStyle: {
    marginVertical: '2%',
    fontSize: CalculateHeight(2),
    fontFamily: bold,
  },

  captionAndDownArrowContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  captionTextStyle: {
    fontSize: CalculateHeight(2),
    color: '#464D60',
    fontFamily: normal,
    marginTop: '2%',
    width: '80%'
  },

  responseDataContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: '2%',
  },

  responseDataTextStyle: {
    fontSize: CalculateHeight(1.5),
    color: '#73798C',
    fontFamily: normal,
  },
});

export default ClosedCard;
