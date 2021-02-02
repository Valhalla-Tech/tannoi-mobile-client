import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';
import {
  getResponse,
  clearResponse,
} from '../../../store/actions/ResponseAction';
import { CalculateHeight } from '../../../helper/CalculateSize';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import DiscussionAndResponseList from '../../../components/topicComponents/discussionScreenComponents/DiscussionAndResponseList';
import AddResponse from '../../../components/publicComponents/RecorderModal';

const DiscussionScreen = ({ route, navigation }) => {
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('discussion');
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [openAddResponse, setOpenAddRespone] = useState(false);
  const [openModalFromHeader, setOpenModalFromHeader] = useState(false);

  const profileId = useSelector((state) => state.DiscussionReducer.profileId);
  const response = useSelector((state) => state.ResponseReducer.response);
  const userId = useSelector((state) => state.HomeReducer.user.id);
  const userType = useSelector((state) => state.HomeReducer.user.type);

  const { discussionId, fromNewDiscussion } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setOpenAddRespone(false);
    dispatch(clearDiscussion());
    dispatch(clearResponse(null, true));
    dispatch(getDiscussion(discussionId, true));
    dispatch(getResponse(discussionId));
  }, [navigation]);

  const closeAddResponseModal = (openModalFromHeader) => {
    setOpenAddResponseModal(false);
    setOpenAddRespone(false);
    setOpenModalFromHeader(false);
    openModalFromHeader && setSelectedCard('discussion');
  };

  const selectCard = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  const changePlayer = (cardIndex, action) => {
    let numberedCardIndex = Number(cardIndex);

    if (cardIndex === 'discussion' && action === 'next') {
      setSelectedCard(0);
    } else if (cardIndex === 0 && action === 'previous') {
      setSelectedCard('discussion');
    } else if (action === 'next') {
      setSelectedCard(numberedCardIndex + 1);
    } else if (action === 'previous') {
      setSelectedCard(numberedCardIndex - 1);
    }
  };

  const updateFromNextPreviousButton = (fromNextPreviousButtonStatus) => {
    setFromNextPreviousButton(fromNextPreviousButtonStatus);
  };

  const getIsLikeAndIsDislike = (input, responseIdInput) => {
    let isLikeAndIsDislike;

    response.forEach((response) => {
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

  return (
    <View>
      <View style={styles.discussionUpperBarStyle}>
        <BackButton
          navigation={navigation}
          screen={fromNewDiscussion && 'MainAppNavigation'}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
        <TouchableOpacity
          style={styles.addResponseButtonStyle}
          onPress={() => {
            userType !== 0 || userId === profileId
              ? (setOpenAddResponseModal(true),
                setOpenAddRespone(true),
                setOpenModalFromHeader(true))
              : (navigation.navigate('VerificationNavigation'),
                setOpenAddRespone(true));
          }}>
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity>
      </View>
      <DiscussionAndResponseList
        changePlayer={changePlayer}
        discussionId={discussionId}
        fromNextPreviousButton={fromNextPreviousButton}
        updateFromNextPreviousButton={updateFromNextPreviousButton}
        navigation={navigation}
        openAddResponse={openAddResponse}
        selectCard={selectCard}
        openAddResponseModal={openAddResponseModal}
        closeAddResponseModal={closeAddResponseModal}
        selectedCard={selectedCard}
        getIsLikeAndIsDislike={getIsLikeAndIsDislike}
      />
      <AddResponse
        openModal={openAddResponseModal}
        closeModal={closeAddResponseModal}
        discussionId={discussionId}
        addResponseForResponse={false}
        openModalFromHeader={openModalFromHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  discussionScreenContainerStyle: {
    flex: 1,
  },

  discussionUpperBarStyle: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '3.5%',
    paddingVertical: '3%',
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addResponseButtonStyle: {
    marginTop: '.6%',
  },

  addResponseButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: 16,
    fontFamily: bold,
  },

  moreButtonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: '25%',
  },

  moreResponseTextStyle: {
    fontFamily: normal,
    color: '#5152D0',
    fontSize: CalculateHeight(2),
  },
});

export default DiscussionScreen;
