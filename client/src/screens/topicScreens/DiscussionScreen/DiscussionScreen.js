import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDiscussion,
  clearDiscussion,
  clearUsersInvolvedInDiscussion,
  getUsersInvovedInDiscussion,
} from '../../../store/actions/DiscussionAction';
import {
  getResponse,
  clearResponse,
} from '../../../store/actions/ResponseAction';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';

//Components
import DiscussionAndResponseList from '../../../components/topicComponents/discussionScreenComponents/DiscussionAndResponseList';
import { TabView, RecorderModal as AddResponse, BackButton, LoadingSpinner, ScreenContainer } from '../../../components/publicComponents';

let _isMounted = false;

const DiscussionScreen = ({ route, navigation }) => {
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('discussion');
  const [fromNextPreviousButton, setFromNextPreviousButton] = useState(false);
  const [openAddResponse, setOpenAddRespone] = useState(false);
  const [openModalFromHeader, setOpenModalFromHeader] = useState(false);
  const [activeTab, setActiveTab] = useState('GET_DISCUSSIONS');
  const [getUsersInvolvedLoading, setGetUsersInvolvedLoading] = useState(false);
  const tabViewMenus = [
    {
      id: 'GET_DISCUSSIONS',
      name: 'Discussions',
    },
    {
      id: 'GET_USERS_INVOLVED',
      name: 'People',
    },
  ];

  const profileId = useSelector((state) => state.DiscussionReducer.profileId);
  const response = useSelector((state) => state.ResponseReducer.response);
  const userId = useSelector((state) => state.HomeReducer.user.id);
  const userType = useSelector((state) => state.HomeReducer.user.type);
  const usersInvolved = useSelector(state => state.DiscussionReducer.userInvolvedInDiscussion);

  const {
    discussionId,
    fromNewDiscussion,
    isCommunityDiscussion,
    fromNewCommunityDiscussion,
    communityId,
    role,
    cardOnDelete,
  } = route.params;

  const dispatch = useDispatch();
  const flatListRef = useRef();

  useEffect(() => {
    _isMounted = true;
    setOpenAddRespone(false);
    dispatch(clearDiscussion());
    dispatch(clearResponse(null, true));
    dispatch(getDiscussion(discussionId, true, isCommunityDiscussion));
    dispatch(getResponse(discussionId));
  }, [navigation]);

  useEffect(() => {
    return () => {
      _isMounted = false;
    };
  }, []);

  const closeAddResponseModal = (openModalFromHeader) => {
    setOpenAddResponseModal(false);
    setOpenAddRespone(false);
    setOpenModalFromHeader(false);
    openModalFromHeader && setSelectedCard('discussion');
  };

  const scrollDown = () => {
    setTimeout(() => {
      if (_isMounted) {
        flatListRef.current.scrollToEnd({ animated: true });
        setSelectedCard(response.length);
      }
    }, 2250);
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

  const handleTabViewEvent = async (data) => {
    setActiveTab(data.id);
    if (data.id === 'GET_DISCUSSIONS') {
      await dispatch(clearUsersInvolvedInDiscussion());
      await dispatch(getDiscussion(discussionId, true, isCommunityDiscussion));
      await dispatch(getResponse(discussionId));
    } else if (data.id === 'GET_USERS_INVOLVED') {
      setGetUsersInvolvedLoading(true);
      await dispatch(clearDiscussion());
      await dispatch(clearResponse(null, true));
      await dispatch(getUsersInvovedInDiscussion(discussionId));
      setGetUsersInvolvedLoading(false);
    }
  };

  const renderUsersInvolved = data => {
    let maxBioChara = 50;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfileScreen', { userId: data.item.id })}
        style={styles.memberListDataStyle}>
        <View style={styles.imageProfileAndNameStyle}>
          <Image
            source={{ uri: data.item.profile_photo_path }}
            style={styles.profileImageStyle}
          />
          <View style={styles.profileBodyStyle}>
            <Text 
              style={styles.userInvolvedNameStyle}
              numberOfLines={1}
            >
              {data.item.name} {data.item.bio ? '- ' + data.item.bio : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.discussionUpperBarStyle}>
        <BackButton
          navigation={navigation}
          screen={
            fromNewDiscussion
              ? 'MainAppNavigation'
              : fromNewCommunityDiscussion
              ? 'CommunityProfileScreen'
              : null
          }
          screenOption={{ communityId: communityId }}
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
      <TabView
        tabViewContainerStyle = {{ marginBottom: '2%', }}
        customButtonStyle = {{ paddingTop: '2%' }}
        tabMenus={tabViewMenus}
        onPress={data => handleTabViewEvent(data)}
      />
      {
        activeTab === 'GET_DISCUSSIONS' ?
        <>
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
            flatListRef={flatListRef}
            scrollDown={scrollDown}
            isCommunityDiscussion={isCommunityDiscussion}
            role={role}
            cardOnDelete={cardOnDelete}
          />
          <AddResponse
            openModal={openAddResponseModal}
            closeModal={closeAddResponseModal}
            discussionId={discussionId}
            addResponseForResponse={false}
            openModalFromHeader={openModalFromHeader}
            scrollDown={scrollDown}
            isCommunityDiscussion={isCommunityDiscussion}
          />
        </> :
        getUsersInvolvedLoading ?
        <View style={{padding: 50}}>
          <LoadingSpinner loadingSpinnerForComponent/>
        </View> :
        <FlatList
          style={{ height: CalculateHeight(90), backgroundColor: 'white', marginHorizontal: '2%', borderRadius: 10 }}
          keyExtractor={(item, index) => index.toString()}
          data={usersInvolved}
          renderItem={renderUsersInvolved}
        />
      }
    </ScreenContainer>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addResponseButtonStyle: {
    marginTop: '.6%',
  },

  addResponseButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
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

  imageProfileAndNameStyle: {
    flexDirection: 'row',
    flex: 1,
  },

  profileImageStyle: {
    width: CalculateWidth(9),
    height: CalculateWidth(9),
    borderRadius: 50,
    marginRight: CalculateWidth(3),
  },

  profileBodyStyle: { 
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },

  memberListDataStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3.5%',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
  },

  userInvolvedNameStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(1.8),
  },
});

export default DiscussionScreen;
