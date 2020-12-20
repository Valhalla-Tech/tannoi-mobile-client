import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import { normal, bold } from '../../../assets/FontSize';
import BigButton from '../../publicComponents/BigButton';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProfile } from '../../../store/actions/ProfileAction';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { getResponse } from '../../../store/actions/ResponseAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import Share from "react-native-share";
import branch from 'react-native-branch';

const OptionModal = props => {
  const {
    openOptionModal,
    closeOptionModal,
    discussionId,
    navigation,
    profileId,
    openPrivateModal,
    modalType,
    responseId
  } = props;

  const userId = useSelector(state => state.ProfileReducer.userProfile.id);
  const type = useSelector(state => state.DiscussionReducer.type);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProfile());
  }, [])

  const [deleteOption, setDeleteOption] = useState(false);

  const OptionModalButton = (buttonTitle) => {
    return (
      <TouchableOpacity
        onPress={() => {
          buttonTitle === 'Delete' && setDeleteOption(true);
          buttonTitle === 'Edit participant list' && openPrivateModal();
          buttonTitle === 'Share' && shareOption();
        }}
      >
        <Text style={styles.optionModalButtonTextStyle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  const shareOption = async () => {
    try {
      let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
        locallyIndex: true,
        title: 'Share a Discussion',
        contentDescription: 'This is a link to Discussion',
        contentMetadata: {
          ratingAverage: 4.2,
          customMetadata: {
            screen: 'DiscussionScreen',
            payload: JSON.stringify({
              discussionId: discussionId.toString()
            })
          }
        }
      });
      
      let linkProperties = {
        feature: 'share a discussion',
        channel: 'tannoi'
      };
      
      let controlParams = {
        $desktop_url: 'https://www.entervalhalla.tech/'
      };
      
      let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);

      const options = {
        title: "Share your discussion",
        message: url
      };

      await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteOption = () => {
    return (
      <>
        <Text style={styles.headerTextStyle}>
          Delete
        </Text>
        <Text style={styles.deleteOptionTextStyle}>
          Once a {modalType === 'discussion' ? 'discussion' : 'response'} is deleted, you can't recover it. {modalType === 'discussion' ? 'All responses associated with this discussion will be deleted too.' : null}
        </Text>
        <View style={styles.deleteConfirmationButtonContainerStyle}>
          <BigButton
            buttonTitle="Cancel"
            buttonStyle={{
              color: "#5152D0",
              borderColor: "#5152D0",
              marginRight: "2%",
              width: "35%",
              height: modalType === 'response' ? "70%" : "60%"
            }}
            buttonFunction={() => setDeleteOption(false)}
          />
          <BigButton
            buttonTitle="Delete"
            buttonStyle={{
              color: "#FFFFFF",
              borderColor: "#5152D0",
              backgroundColor: "#5152D0",
              width: "35%",
              height: modalType === 'response' ? "70%" : "60%"
            }}
            buttonFunction={() => DeleteDiscussionOrResponse()}
          />
        </View>
      </>
    );
  };

  const DeleteDiscussionOrResponse = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let deleteDiscussionOrResponseRequest = await axios({
        method: 'delete',
        url: modalType === 'discussion' ? `${BaseUrl}/discussions/delete/${discussionId}` : `${BaseUrl}/responses/${responseId}`,
        headers: {
          'token': access_token
        }
      })

      if (deleteDiscussionOrResponseRequest.data) {
        dispatch(clearHome());
        dispatch(getHome());
        modalType === 'discussion' ?  navigation.navigate('MainAppNavigation') : dispatch(getResponse(discussionId));
        modalType === 'response' && closeOptionModal()
      };
    } catch (error) {
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      };
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openOptionModal}
    >
      <View style={styles.optionModalBackground}>
        <TouchableOpacity style={{flex: 1}} onPress={()=> {
          closeOptionModal();
          setDeleteOption(false);
        }} ></TouchableOpacity>
      </View>
      <View style={styles.optionModalContainerStyle}>
        <View style={deleteOption ? {...styles.modalOptionStyle, width: "75%", height: modalType === 'response' ? "25%" : "28.5%"} : styles.modalOptionStyle}>
          {
            !deleteOption ? (
              <>
                <Text style={styles.headerTextStyle}>{modalType === 'discussion' ? 'Discussion' : 'Response'}</Text>
                {OptionModalButton('Share')}
                {profileId === userId && OptionModalButton('Edit')}
                {profileId === userId && type === 2 && modalType === 'discussion' && OptionModalButton('Edit participant list')}
                {profileId === userId && OptionModalButton('Delete')}
              </>
            ) : (
              <DeleteOption />
            )
          }
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionModalBackground: {
    position: "absolute", 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    height: "100%", 
    width: "100%"
  },

  optionModalContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  modalOptionStyle: {
    width: "60%",
    minHeight: "10%",
    borderRadius: 20,
    padding: "5%",
    paddingBottom: "7%",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between"
  },

  optionModalButtonTextStyle: {
    fontFamily: normal,
    fontSize: 16,
    color: "#464D60"
  },

  deleteConfirmationButtonContainerStyle: {
    flexDirection: "row",
    height: "50%",
    paddingTop: "5%",
    justifyContent: "flex-end"
  },

  headerTextStyle: {
    textAlign: "center",
    fontFamily: bold,
    color: "#6505E1",
    fontSize: 16,
    paddingTop: "2%"
  },

  deleteOptionTextStyle: {
    fontFamily: normal,
    color: "#464D60"
  }
});

export default OptionModal;