import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  getResponse,
  getSingleResponse,
  clearResponse,
} from '../../../store/actions/ResponseAction';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import BackButton from '../../../components/publicComponents/BackButton';
import DiscussionAndResponseList from '../../../components/topicComponents/discussionScreenComponents/DiscussionAndResponseList';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

let _isMounted = false;

const ReplyScreen = ({ route, navigation }) => {
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [selectedCard, setSelectedCard] = useState('response');

  const profileName = useSelector((state) => state.ResponseReducer.profileName);
  const reply = useSelector((state) => state.ResponseReducer.reply);
  const isLike = useSelector((state) => state.ResponseReducer.isLike);
  const isDislike = useSelector((state) => state.ResponseReducer.isDislike);
  const parentResponseId = useSelector(
    (state) => state.ResponseReducer.responseId,
  );
  const parentDiscussionId = useSelector(
    (state) => state.ResponseReducer.discussionId,
  );

  const dispatch = useDispatch();
  const flatListRef = useRef();

  const { responseId, discussionId, fromInbox } = route.params;

  useEffect(() => {
    _isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedCard('response');
      dispatch(clearResponse());
      dispatch(getSingleResponse(responseId));
    });

    const _blur = navigation.addListener('blur', () => {
      setSelectedCard('response');
    });

    return unsubscribe, _blur;
  }, [navigation]);

  useEffect(() => {
    return () => {
      _isMounted = false;
    };
  }, []);

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

  const scrollDown = () => {
    setTimeout(() => {
      if (_isMounted) {
        flatListRef.current.scrollToEnd({ animated: true });
        setSelectedCard(reply.length);
      }
    }, 2250);
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
    // <View style={styles.replyScreenContainerStyle}>
    <ScreenContainer>
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
      <View style={{ flex: 1 }}>
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
            flatListRef={flatListRef}
            scrollDownForResponseScreen={scrollDown}
            responseScreenId={responseId}
          />
        )}
      </View>
      {parentDiscussionId !== '' && (
        <TouchableOpacity
          onPress={() =>
            parentResponseId !== null
              ? navigation.push('ResponseScreen', {
                  responseId: parentResponseId,
                  discussionId: parentDiscussionId,
                })
              : navigation.navigate('DiscussionScreen', {
                  discussionId: parentDiscussionId,
                })
          }
          style={styles.goUpAThreadButtonStyle}>
          <Text style={styles.goUpAThreadButtonTextStyle}>Go up a thread</Text>
        </TouchableOpacity>
      )}
    </ScreenContainer>
    // </View>
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

  goUpAThreadButtonStyle: {
    position: 'absolute',
    bottom: '3%',
    padding: '2%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E3E6EB',
    borderWidth: 1,
  },

  goUpAThreadButtonTextStyle: {
    color: '#464D60',
    fontFamily: normal,
    fontSize: CalculateHeight(1.5),
  },
});

export default ReplyScreen;
