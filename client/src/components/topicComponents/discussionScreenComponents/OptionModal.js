import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { normal, bold } from '../../../assets/FontSize';
import BigButton from '../../publicComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneProfile,
  clearUserProfile,
} from '../../../store/actions/ProfileAction';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import {
  getResponse,
  getSingleResponse,
  clearResponse,
} from '../../../store/actions/ResponseAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import Share from 'react-native-share';
import { GenerateDeepLink } from '../../../helper/GenerateDeepLink';
import { CalculateHeight } from '../../../helper/CalculateSize';

//Component
import Modal from '../../publicComponents/Modal';

const ROLE_ALLOWED = 1
const ROLE_UNALLOWED = 0

const OptionModal = (props) => {
  const {
    openOptionModal,
    closeOptionModal,
    discussionId,
    navigation,
    profileId,
    openPrivateModal,
    modalType,
    responseId,
    discussionTitle,
    responseTitle,
    changePlayer,
    cardIndex,
    deleteResponseFromResponseScreen,
    responseScreenId,
    role,
    cardOnDelete,
  } = props;

  const userId = useSelector((state) => state.ProfileReducer.userProfile.id);
  const type = useSelector((state) => state.DiscussionReducer.type);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearUserProfile();
    };
  }, []);

  const [deleteOption, setDeleteOption] = useState(false);

  const closeModal = () => {
    closeOptionModal();
    setDeleteOption(false);
  };

  const shareOption = async () => {
    try {
      GenerateDeepLink(
        modalType === 'discussion' ? discussionTitle : responseTitle,
        modalType === 'discussion'
          ? 'Check out this discussion on the tannOi app!'
          : 'Check out this response on the tannOi app!',
        modalType === 'discussion' ? 'DiscussionScreen' : 'ResponseScreen',
        modalType === 'discussion'
          ? {
              discussionId: discussionId.toString(),
            }
          : {
              responseId: responseId.toString(),
              discussionId: discussionId.toString(),
              fromInbox: true,
            },
        'share a discussion',
        async (url) => {
          try {
            const options = {
              title:
                modalType === 'discussion' ? discussionTitle : responseTitle,
              message: url,
            };

            await Share.open(options);
          } catch (error) {
            console.log(error);
          }
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteDiscussionOrResponse = async () => {
    if (cardOnDelete) {
      console.log('here', {discussionId, responseId})
      if(modalType == 'discussion')
        return cardOnDelete(discussionId, 'discussion');
      else if (modalType == 'response')
        return cardOnDelete(responseId, 'response')
    }
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let deleteDiscussionOrResponseRequest = await axios({
        method: 'delete',
        url:
          modalType === 'discussion'
            ? `${BaseUrl}/discussions/delete/${discussionId}`
            : `${BaseUrl}/responses/${responseId}`,
        headers: {
          token: access_token,
        },
      });

      if (deleteDiscussionOrResponseRequest.data) {
        if (modalType === 'discussion') {
          dispatch(clearHome());
          dispatch(getHome());
          navigation.navigate('MainAppNavigation');
        } else if (deleteResponseFromResponseScreen) {
          dispatch(clearResponse());
          dispatch(getSingleResponse(responseScreenId));
        } else {
          dispatch(getResponse(discussionId));
          changePlayer(cardIndex, 'previous');
        }
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      }
    }
  };

  const OptionModalButton = (buttonTitle) => {
    return (
      <TouchableOpacity
        onPress={() => {
          buttonTitle === 'Delete' && setDeleteOption(true);
          buttonTitle === 'Edit participant list' && openPrivateModal();
          buttonTitle === 'Share' && shareOption();          
        }}>
        <Text style={styles.optionModalButtonTextStyle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  const DeleteOption = () => {
    return (
      <>
        <Text style={styles.headerTextStyle}>Delete</Text>
        <Text style={styles.deleteOptionTextStyle}>
          Once a {modalType === 'discussion' ? 'discussion' : 'response'} is
          deleted, you can't recover it.{' '}
          {modalType === 'discussion'
            ? 'All responses associated with this discussion will be deleted too.'
            : null}
        </Text>
        <View style={styles.deleteConfirmationButtonContainerStyle}>
          <BigButton
            buttonTitle="Cancel"
            buttonStyle={{
              color: '#5152D0',
              borderColor: '#5152D0',
              marginRight: '2%',
              width: '35%',
              height: modalType === 'response' ? '70%' : '60%',
            }}
            buttonFunction={() => setDeleteOption(false)}
          />
          <BigButton
            buttonTitle="Delete"
            buttonStyle={{
              color: '#FFFFFF',
              borderColor: '#5152D0',
              backgroundColor: '#5152D0',
              width: '35%',
              height: modalType === 'response' ? '70%' : '60%',
            }}
            buttonFunction={() => DeleteDiscussionOrResponse()}
          />
        </View>
      </>
    );
  };

  const ModalContent = () => (
    <>
      {!deleteOption ? (
        <>
          <Text style={styles.headerTextStyle}>
            {modalType === 'discussion' ? 'Discussion' : 'Response'}
          </Text>
          {OptionModalButton('Share')}
          {/* profileId === userId && OptionModalButton('Edit') */}
          {profileId === userId &&
            type === 2 &&
            modalType === 'discussion' &&
            OptionModalButton('Edit participant list')}
          {(profileId === userId || role === ROLE_ALLOWED) && OptionModalButton('Delete')}
        </>
      ) : (
        <DeleteOption />
      )}
    </>
  );

  return (
    <Modal
      child={ModalContent}
      openModal={openOptionModal}
      closeModal={closeModal}
      customStyle={
        deleteOption
          ? {
              ...styles.modalOptionStyle,
              width: '75%',
              height: modalType === 'response' ? '25%' : '28.5%',
            }
          : styles.modalOptionStyle
      }
    />
  );
};

const styles = StyleSheet.create({
  optionModalBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '100%',
    width: '100%',
  },

  optionModalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalOptionStyle: {
    width: '60%',
    minHeight: '10%',
    height: undefined,
    borderRadius: 20,
    padding: '5%',
    paddingBottom: '7%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },

  optionModalButtonTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
    color: '#464D60',
  },

  deleteConfirmationButtonContainerStyle: {
    flexDirection: 'row',
    height: '50%',
    paddingTop: '5%',
    justifyContent: 'flex-end',
  },

  headerTextStyle: {
    textAlign: 'center',
    fontFamily: bold,
    color: '#6505E1',
    fontSize: CalculateHeight(2),
    paddingTop: '2%',
  },

  deleteOptionTextStyle: {
    fontFamily: normal,
    color: '#464D60',
  },
});

export default OptionModal;
