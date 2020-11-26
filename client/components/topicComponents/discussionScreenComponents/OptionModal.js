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
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import BaseUrl from '../../../constants/BaseUrl';

const OptionModal = props => {
  const {
    openOptionModal,
    closeOptionModal,
    discussionId,
    navigation,
    profileId,
    openPrivateModal
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
          buttonTitle === 'Delete discussion' && setDeleteOption(true);
          buttonTitle === 'Edit participant list' && openPrivateModal();
        }}
      >
        <Text style={styles.optionModalButtonTextStyle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  const DeleteOption = () => {
    return (
      <>
        <Text style={styles.deleteOptionTextStyle}>
          Once the discussion is deleted you cannot recover it. All response on this discussion will be deleted too.
        </Text>
        <View style={styles.deleteConfirmationButtonContainerStyle}>
          <BigButton
            buttonTitle="Cancel"
            buttonStyle={{
              color: "#5152D0",
              borderColor: "#5152D0",
              marginRight: "2%",
              width: "35%"
            }}
            buttonFunction={() => setDeleteOption(false)}
          />
          <BigButton
            buttonTitle="Delete"
            buttonStyle={{
              color: "#FFFFFF",
              borderColor: "#5152D0",
              backgroundColor: "#5152D0",
              width: "35%"
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
        url: `${BaseUrl}/discussions/delete/${discussionId}`,
        headers: {
          'token': access_token
        }
      })

      if (deleteDiscussionOrResponseRequest.data) {
        dispatch(clearHome());
        dispatch(getHome());
        navigation.navigate('MainAppNavigation');
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
        <View style={deleteOption ? {...styles.modalOptionStyle, width: "75%", height: "25%"} : styles.modalOptionStyle}>
          {
            !deleteOption ? (
              <>
                {OptionModalButton('Share this discussion')}
                {profileId === userId && OptionModalButton('Edit discussion')}
                {profileId === userId && type === 2 && OptionModalButton('Edit participant list')}
                {profileId === userId && OptionModalButton('Delete discussion')}
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
    // height: "20%",
    borderRadius: 20,
    padding: "5%",
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

  deleteOptionTextStyle: {
    fontFamily: normal,
    color: "#464D60"
  }
});

export default OptionModal;