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
import { bold, normal } from '../../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import { searchUser } from '../../../store/actions/PrivateDiscussionAction';

//Components
import FormInput from '../../publicComponents/FormInput';
import BigButton from '../../publicComponents/BigButton';

const PrivateDiscussionModal = props => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedUser, setSelectedUser] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const {
    openModal,
    closeModal,
    addSelectedFollowers,
    openModalOption,
    changeModalOption,
    isFilled
  } = props;

  const dispatch = useDispatch();

  const followers = useSelector(state => state.PrivateDiscussionReducer.followers);

  useEffect(() => {
    dispatch(searchUser());
  }, []);

  const searchUserName = searchInput => {
    setSearchKeyword(searchInput);
    dispatch(searchUser(searchInput));
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
  };

  const FollowerList = ({ profileImage, profileName, userId }) => {
    return (
      <TouchableOpacity disabled={isSelectAll ? true : false} onPress={() => isSelected(userId) ? deselectUser(userId) : selectUser(userId)} style={styles.followerDataContainerStyle}>
        <View style={isSelected(userId) || isSelectAll ? {...styles.followerDataStyle, backgroundColor: "#6505E1", borderRadius: 10} : styles.followerDataStyle}>
          <Image source={{uri: profileImage}} style={styles.profileImageStyle} />
          <Text style={isSelected(userId) || isSelectAll ? {...styles.profileName, color: "#FFFFFF"} : styles.profileName}>{profileName}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const renderFollowerList = itemData => (
    <FollowerList profileImage={itemData.item.profile_photo_path} profileName={itemData.item.name} userId={itemData.item.id} />
  );

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
          buttonFunction={() => addSelectedFollowers(selectedUser, isSelectAll)}
        />
      </View>
    );
  };

  const ModalOption = () => {
    return (
      <View style={styles.modalOptionButtonContainerStyle}>
        <TouchableOpacity onPress={() => {
          changeModalOption(false, true);
        }}>
          <Text style={styles.modalOptionTextStyle}>Edit list</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          changeModalOption(false, false);
          closeModal();
        }}>
          <Text style={styles.modalOptionTextStyle}>Disable private discussion</Text>
        </TouchableOpacity>
      </View>
    );
  };
console.log(isFilled)
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
    >
      <View style={styles.optionModalBackground}>
        <TouchableOpacity style={{flex: 1}} onPress={()=> {
          if (openModalOption || isFilled) {
            closeModal(true);
          } else {
            closeModal();
          };
        }} ></TouchableOpacity>
      </View>
      <View style={styles.modalContainerStyle}>
        <View style={styles.privateDiscussionModalStyle}>
          {
            openModalOption ? (
              <ModalOption />
            ) : (
              <>
                <Text style={styles.privateDiscussionTextStyle}>Invite your followers to a private discussion</Text>
                <View>
                  <FormInput 
                    formInputTitle="Search"
                    formInputCustomStyle={{
                      paddingVertical: 0,
                      height: 35,
                      marginBottom: "5%"
                    }}
                    dataInput={searchUserName}
                  />
                  <FlatList
                    data={followers}
                    renderItem={renderFollowerList}
                  />
                  <Buttons />
                </View>
              </>
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

  modalContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  privateDiscussionModalStyle: {
    width: "95%",
    borderRadius: 20,
    padding: "3.5%",
    backgroundColor: "#FFFFFF"
  },

  privateDiscussionTextStyle: {
    fontFamily: bold,
    color: "#73798C",
    fontSize:16,
    marginBottom: "3%"
  },

  followerDataContainerStyle: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
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
  }
});

export default PrivateDiscussionModal;