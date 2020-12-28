import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  FlatList
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import { searchUser, getAuthorizedUsers } from '../../store/actions/PrivateDiscussionAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Icon
import XMark from '../../assets/topicAssets/x-mark.svg';

//Components
import FormInput from '../publicComponents/FormInput';
import BigButton from '../publicComponents/Button';

const PrivateDiscussionModal = props => {
  const {
    openModal,
    closeModal,
    addSelectedFollowers,
    isFilled,
    selectedFollowers,
    selectedAll,
    fromDiscussionScreen,
    discussionId,
    modalTitle
  } = props;

  const followers = useSelector(state => state.PrivateDiscussionReducer.users);
  const authorized = useSelector(state => state.PrivateDiscussionReducer.authorized);
  const authorizedId = useSelector(state => state.PrivateDiscussionReducer.authorizedId);
  const noFollowers = useSelector(state => state.PrivateDiscussionReducer.noUsers);
  const userCount = useSelector(state => state.PrivateDiscussionReducer.userCount);

  const [selectedUser, setSelectedUser] = useState(fromDiscussionScreen ? authorizedId : selectedFollowers);
  const [isSelectAll, setIsSelectAll] = useState(selectedAll);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch();

  // useEffect(() => {
    // if (fromDiscussionScreen) {
    //   dispatch(getAuthorizedUsers(discussionId, false, true));
    // } else {
    //   dispatch(searchUser(false, true));
    // }
  // }, []);

  const searchUserName = (searchInput, clearSearch) => {
    setSearchKeyword(clearSearch ? '' : searchInput);

    if (fromDiscussionScreen) {
      dispatch(getAuthorizedUsers(discussionId, clearSearch ? '' : searchInput));
    } else {
      dispatch(searchUser(clearSearch ? '' : searchInput));
    };
  };

  const selectUser = userId => {
    setSelectedUser([...selectedUser, userId]);
  };

  const isSelected = userId => {
    let checkSelectedUser = selectedUser.indexOf(userId);
    if (checkSelectedUser !== -1) return true;
    else return false;
  };

  const deselectUser = userId => {
    if (selectedUser.length > 1) {
      setSelectedUser(selectedUser.filter(index => index !== userId));
    } else {
      setSelectedUser([]);
    }
  };

  const selectAllUser = () => {
    setIsSelectAll(previousState => !previousState);
    isSelectAll ? setSelectedUser([]) : null;
  };

  const FollowerList = ({ profileImage, profileName, userId, isAuthorized }) => {
    return (
      <TouchableOpacity disabled={isSelectAll ? true : false} onPress={() => isSelected(userId) ? deselectUser(userId) : selectUser(userId)} style={styles.followerDataContainerStyle}>
        <View style={isSelected(userId) || isSelectAll ? {...styles.followerDataStyle, backgroundColor: "#6505E1", borderRadius: 10} : styles.followerDataStyle}>
          <Image source={{uri: profileImage}} style={styles.profileImageStyle} />
          <Text style={isSelected(userId) || isSelectAll ? {...styles.profileName, color: "#FFFFFF"} : styles.profileName}>{profileName}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const renderFollowerList = itemData => {
    return (
      <FollowerList 
        profileImage={itemData.item.profile_photo_path} 
        profileName={itemData.item.name} 
        userId={itemData.item.id}
      />
    );
  };

  const editList = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let editAuthorizedListRequest = await axios({
        method: 'put',
        url: `${BaseUrl}/discussions/edit-private/${discussionId}`,
        headers: {
          'token': access_token
        },
        data: {
          'all_user': isSelectAll,
          'userArr': JSON.stringify(selectedUser)
        }
      });

      if (editAuthorizedListRequest.data) {
        closeModal();
      };
    } catch (error) {
      console.log(error);
    }
  };

  const submitList = async () => {
    if (fromDiscussionScreen) {
      editList();
    } else {
      addSelectedFollowers(selectedUser, isSelectAll);
    }
  };

  const nextPage = () => {
    setCurrentPage(prevState => prevState + 1);

    if (fromDiscussionScreen) {
      dispatch(getAuthorizedUsers(discussionId, clearSearch ? '' : searchInput, false, currentPage + 1));
    } else {
      dispatch(searchUser(clearSearch ? '' : searchInput, false, currentPage + 1));
    };
  };

  const Buttons = () => {
    return (
      <View style={styles.buttonContainerStyle}>
        <BigButton 
          buttonTitle={isSelectAll ? "Deselect All" : "Select All"}
          buttonStyle={{
            color: "#6505E1",
            borderColor: "#6505E1",
            borderWidth: 1,
            marginRight: "2%",
            height: "80%"
          }}
          buttonFunction={selectAllUser}
        />
        <BigButton 
          buttonTitle="Done"
          buttonStyle={{
            color: "#FFFFFF",
            backgroundColor: "#6505E1",
            borderWidth: 0,
            width: "30%",
            height: "80%"
          }}
          buttonFunction={submitList}
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
    >
      <View style={styles.optionModalBackground}>
        <TouchableOpacity style={{flex: 1}} onPress={()=> {
          if (isFilled) {
            closeModal(true);
          } else {
            closeModal();
          };
        }} ></TouchableOpacity>
      </View>
      <View style={styles.modalContainerStyle}>
        <View style={styles.privateDiscussionModalStyle}>
        <Text style={styles.privateDiscussionTextStyle}>{modalTitle}</Text>
          <FormInput 
            formInputTitle="Search"
            formInputCustomStyle={{
              paddingVertical: 0,
              height: 35,
              marginBottom: "5%"
            }}
            formInputValue={searchKeyword}
            dataInput={searchUserName}
            Icon={searchKeyword !== '' && XMark}
            iconStyle={{
              height: 18,
              width: 18,
              margin: {
                marginBottom: "2.5%"
              }
            }}
            iconFunction={() => searchUserName('', true)}
          />
          {
            selectedUser.length !== 0 && !isSelectAll && <Text style={styles.counterTextStyle}>You have selected {selectedUser.length} follower{selectedUser.length > 1 && 's'}</Text>
          }
          {
            isSelectAll && <Text style={styles.counterTextStyle}>You have selected all of your followers</Text>
          }
          {
            noFollowers ? (
              <Text style={styles.noFollowersTextStyle}>You have no followers yet!</Text>
            ) : (
              <FlatList
                data={fromDiscussionScreen ? authorized : followers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  renderFollowerList
                }
                ListFooterComponent={
                  userCount > 20 && (
                    <View style={styles.moreButtonContainerStyle}>
                      <BigButton
                        buttonStyle={{
                          color: "#6505E1",
                          borderColor: "#6505E1",
                          paddingVertical: ".5%",
                          paddingHorizontal: "5%"
                        }}
                        buttonTitle="More"
                        buttonFunction={nextPage}
                      />
                    </View>
                  )
                }
              />
            )
          }
          <Buttons />
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

  modalContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  privateDiscussionModalStyle: {
    width: "95%",
    height: 500,
    maxHeight: 800,
    borderRadius: 20,
    padding: "3.5%",
    backgroundColor: "#FFFFFF"
  },

  privateDiscussionTextStyle: {
    fontFamily: bold,
    color: "#6505E1",
    fontSize:16,
    marginBottom: "3%",
    padding: "2%"
  },

  counterTextStyle: {
    marginBottom: "2%",
    color: "#6505E1",
    fontFamily: normal
  },

  followerDataContainerStyle: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2%"
  },

  noFollowersTextStyle: {
    textAlign: "center",
    fontFamily: bold
  },

  followerDataStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "1.5%"
  },

  profileImageStyle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: "5%"
  },

  profileName: {
    fontFamily: bold,
    color: "#464D60",
    fontSize: 16
  },

  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "5%"
  },

  modalOptionTextStyle: {
    fontFamily: normal,
    fontSize: 16
  },

  modalOptionButtonContainerStyle: {
    height: 80,
    justifyContent: "space-between"
  },

  moreButtonContainerStyle: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PrivateDiscussionModal;