import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {bold} from '../../../assets/FontSize';
import {useDispatch, useSelector} from 'react-redux';
import {
  getResponse,
  getSingleResponse,
  clearResponse,
} from '../../../store/actions/ResponseAction';
import {CalculateHeight} from '../../../helper/CalculateSize';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import DiscussionAndResponseList from '../../../components/topicComponents/discussionScreenComponents/DiscussionAndResponseList';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const ReplyScreen = ({route, navigation}) => {
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [selectedCard, setSelectedCard] = useState('response');

  const profileName = useSelector((state) => state.ResponseReducer.profileName);
  const reply = useSelector((state) => state.ResponseReducer.reply);
  const isLike = useSelector((state) => state.ResponseReducer.isLike);
  const isDislike = useSelector((state) => state.ResponseReducer.isDislike);

  const dispatch = useDispatch();

  const {responseId, discussionId, fromInbox} = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedCard('response');
      dispatch(clearResponse());
      dispatch(getSingleResponse(responseId));
    });

    return unsubscribe;
  }, [navigation]);

  const getIsLikeAndIsDislike = (input, responseIdInput) => {
    let isLikeAndIsDislike;

    if (responseIdInput === responseId && input === 'isLike') {
      return isLike;
    } else if (responseIdInput === responseId && input === 'isDislike') {
      return isDislike;
    }

    reply.forEach((response) => {
      if (response.id === responseIdInput) {
        if (input === 'isLike') {
          isLikeAndIsDislike = response.isLike;
        } else if (input === 'isDislike') {
          isLikeAndIsDislike = response.isDislike;
        }
      }
    });

    return isLikeAndIsDislike;
  };

  const updateFromNextPreviousButton = (fromNextPreviousButtonStatus) => {
    setFromNextPreviousButton(fromNextPreviousButtonStatus);
  };

  const changePlayer = (cardIndex, action) => {
    let numberedCardIndex = Number(cardIndex);

    if (cardIndex === 'response' && action === 'next') {
      setSelectedCard(0);
    } else if (cardIndex === 0 && action === 'previous') {
      setSelectedCard('response');
    } else if (action === 'next') {
      setSelectedCard(numberedCardIndex + 1);
    } else if (action === 'previous') {
      setSelectedCard(numberedCardIndex - 1);
    }
  };

  const selectCard = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  return (
    <View style={styles.replyScreenContainerStyle}>
      <View style={styles.upperBarStyle}>
        <View style={styles.backButtonAndTitleContainerStyle}>
          <BackButton
            navigation={navigation}
            styleOption={{
              marginTop: 0,
              marginBottom: 0,
            }}
          />
          {profileName !== '' && (
            <Text style={styles.titleStyle}>{profileName}'s Reply</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DiscussionScreen', {
              discussionId: discussionId,
            })
          }>
          <Text style={styles.discussionButton}>Discussion</Text>
        </TouchableOpacity>
      </View>
      {!profileName ? (
        <LoadingSpinner loadingSpinnerForComponent={true} />
      ) : (
        <DiscussionAndResponseList
          isResponseScreen={true}
          changePlayer={changePlayer}
          discussionId={discussionId}
          fromNextPreviousButton={fromNextPreviousButton}
          updateFromNextPreviousButton={updateFromNextPreviousButton}
          navigation={navigation}
          selectCard={selectCard}
          selectedCard={selectedCard}
          getIsLikeAndIsDislike={getIsLikeAndIsDislike}
          responseId={responseId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  replyScreenContainerStyle: {
    flex: 1,
  },

  upperBarStyle: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingLeft: 22,
    paddingRight: 16,
    paddingVertical: '3%',
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButtonAndTitleContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleStyle: {
    fontSize: 16,
    fontFamily: bold,
    color: '#464D60',
    marginLeft: '5%',
  },

  discussionButton: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
  },
});

export default ReplyScreen;
