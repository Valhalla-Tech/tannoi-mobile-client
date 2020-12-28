import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Switch
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { getTopic } from '../../../store/actions/TopicAction';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { userLogout } from '../../../store/actions/LoginAction';
import { searchUser } from '../../../store/actions/PrivateDiscussionAction';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import branch from 'react-native-branch';
import Slider from '@react-native-community/slider';

//Icon
import EditButton from '../../../assets/topicAssets/edit.svg';

//Components
import BackButton from '../../../components/publicComponents/BackButton';
import FormInput from '../../../components/publicComponents/FormInput';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import Recorder from '../../../components/publicComponents/Recorder';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import PrivateDiscussionModal from '../../../components/topicComponents/PrivateDiscussionModal';
import NoticeModal from '../../../components/publicComponents/Modal';
import BigButton from '../../../components/publicComponents/Button';

const NewDiscussionScreen = ({ navigation }) => {
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Select topic');
  const [hashtags, setHashtags] = useState([]);
  const [recordingFile, setRecordingFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createNewDiscussionValidation, setCreateNewDiscussionValidation] = useState(false);
  const [privateDiscussionSwitchValue, setPrivateDiscussionSwitchValue] = useState(false);
  const [askToResponseSwitchValue, setAskToResponseSwitchValue] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [noticeModal, setNoticeModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);

  const topics = useSelector(state => state.TopicReducer.topics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopic());
  }, [])

  const discussionTitleInput = input => {
    setDiscussionTitle(input);
  };

  const addSelectedFollowers = (followers, isSelectAll) => {
    setOpenModal(false);
    setSelectedFollowers(followers);
    if (followers.length === 0 && !isSelectAll) {
      setPrivateDiscussionSwitchValue(false);
      setAskToResponseSwitchValue(false);
      setSelectAll(false);
    } else if (isSelectAll) {
      setSelectAll(true);
    };
  };

  const removeRecordingFile = () => {
    setRecordingFile('');
  };

  const hashtagsInput = input => {
    let hashtagArray = [];
    let hashtag = '';

    for (let hashtagInputIndex = 0; hashtagInputIndex < input.length; hashtagInputIndex++) {
      if (input[hashtagInputIndex] === ' ') {
        if (hashtag[0] === '#') {
          hashtagArray.push(hashtag);
        } else {
          hashtagArray.push(`#${hashtag}`);
        }
        hashtag = '';
      } else {
        hashtag += input[hashtagInputIndex];
      };
    };
    
    if (hashtag[0] === '#') {
      hashtagArray.push(hashtag);
    } else {
      hashtagArray.push(`#${hashtag}`);
    }
    hashtag = '';

    setHashtags(hashtagArray.filter(item => item.length > 1));
  };

  const createNewDiscussion =  async () => {
    try {
      setIsLoading(true);
      setCreateNewDiscussionValidation(false);

      if (selectedTopic === 'Select topic') {
        setIsLoading(false);
        setCreateNewDiscussionValidation(true);
        return null;
      }

      let access_token = await AsyncStorage.getItem('access_token');
      
      const uri = `file://${recordingFile}`;
    
      let formData = new FormData();

      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];
      
      formData.append('title', discussionTitle);

      formData.append('topic_id', selectedTopic);

      formData.append('status', '1');

      formData.append('type', selectedSwitch === 'Private discussion' ? '2' : '1');

      selectedFollowers.length > 0 && formData.append('userArr', JSON.stringify(selectedFollowers));

      selectAll && formData.append('all_user', true);

      formData.append('hashtag', JSON.stringify(hashtags));

      formData.append('voice_note_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`
      });

      let createNewDiscussionRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/discussions`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': access_token
        },
        data: formData
      });

      if (createNewDiscussionRequest.data) {
        let moodRatingRequest = await axios({
          url: `${BaseUrl}/discussions/add-rating/${createNewDiscussionRequest.data.id}`,
          method: 'post',
          headers: {
            'token': access_token
          },
          data: {
            'mood_rating': sliderValue
          }
        });
        
        if (moodRatingRequest.data) {
          if (selectedSwitch === 'Ask for a response') {
            const data = selectAll ? {
              'userArr': JSON.stringify(selectedFollowers),
              'all_user': selectAll
            } : {'userArr': JSON.stringify(selectedFollowers)};
            
            let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
              locallyIndex: true,
              title: 'Ask For Response',
              contentDescription: 'This is a link to discussion',
              contentMetadata: {
                ratingAverage: 4.2,
                customMetadata: {
                  screen: 'DiscussionScreen',
                  payload: JSON.stringify({
                    discussionId: createNewDiscussionRequest.data.id.toString()
                  })
                }
              }
            });
            
            let linkProperties = {
              feature: 'ask for response',
              channel: 'tannoi'
            };
            
            let controlParams = {
              $desktop_url: 'https://www.tannoi.app/'
            };
            
            let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);
  
            let askToResponseRequest = await axios({
              url: `${BaseUrl}/users/ask/${createNewDiscussionRequest.data.id}?deep_link=${url}`,
              method: 'post',
              headers: {
                'token': access_token
              },
              data: data
            });
  
            if (askToResponseRequest.data) {
              setIsLoading(false);
              dispatch(clearHome());
              dispatch(getHome());
              navigation.navigate('DiscussionScreen', {
                discussionId: createNewDiscussionRequest.data.id,
                fromNewDiscussion: true
              });
            }
          } else {
            setIsLoading(false);
            dispatch(clearHome());
            dispatch(getHome());
            navigation.navigate('DiscussionScreen', {
              discussionId: createNewDiscussionRequest.data.id,
              fromNewDiscussion: true
            });
          }
        }
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setCreateNewDiscussionValidation(true);
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      };
    }
  };

  const addRecordingFile = recordingFileInput => {
    setRecordingFile(recordingFileInput);
  };

  const changeSwitchValue = (switchName) => {
    switchName === 'Private discussion' ? setPrivateDiscussionSwitchValue(previousState => !previousState) : setAskToResponseSwitchValue(previousState => !previousState);
    setSelectedSwitch(switchName);
    if (!privateDiscussionSwitchValue && selectedFollowers.length === 0 && !selectAll || !askToResponseSwitchValue && selectedFollowers.length === 0 && !selectAll) {
      dispatch(searchUser(false, true))
      setOpenModal(true);
    } else {
      setSelectedSwitch('');
      setSelectedFollowers([]);
      setSelectAll(false);
    }
  };

  const closeModal = (isFinish) => {
    setOpenModal(false);
    if (!isFinish) {
      setPrivateDiscussionSwitchValue(false);
      setAskToResponseSwitchValue(false);
      setSelectAll(false);
      setSelectedFollowers([]);
      setSelectedSwitch('');
    } else {
      selectedSwitch === 'Private discussion' ? setPrivateDiscussionSwitchValue(true) : setAskToResponseSwitchValue(true);
    }
  };

  const openNoticeModal = () => {
    setNoticeModal(true);
  };

  const closeNoticeModal = () => {
    setNoticeModal(false);
  };

  const noticeModalButton = () => {
    return (
      <View style={styles.noticeModalButtonContainerStyle}>
        <BigButton
          buttonTitle="Cancel"
          buttonStyle={{
            color: "#5152D0",
            borderColor: "#5152D0",
            marginRight: "2%",
            width: "35%",
            height: "80%",
            marginBottom: 0
          }}
          buttonFunction={closeNoticeModal}
        />
        <BigButton
          buttonTitle="Go back"
          buttonStyle={{
            color: "#FFFFFF",
            borderWidth: 0,
            backgroundColor: "#6505E1",
            width: "35%",
            height: "80%",
            marginBottom: 0
          }}
          buttonFunction={() => {
            closeNoticeModal();
            navigation.goBack();
          }}
        />
      </View>
    );
  };

  const NoticeModalChild = () => {
    return (
      <>
        <Text style={styles.noticeModalHeaderStyle}>Confirm</Text>
        <Text style={styles.noticeModalMessageStyle}>Are you sure you want to go back? Your progress will not be saved</Text>
      </>
    );
  };

  const DiscussionModalContainer = ({ switchName }) => {
    return (
      <PrivateDiscussionModal 
        openModal={switchName === selectedSwitch && openModal}
        closeModal={closeModal}
        addSelectedFollowers={addSelectedFollowers}
        isFilled={selectAll || selectedFollowers.length > 0 ? true : false}
        selectedFollowers={selectedFollowers}
        selectedAll={selectAll}
        modalTitle={switchName === 'Private discussion' ? 'Invite your followers to a private discussion' : 'Ask your followers to response this discussion'}
        switchName={switchName}
      />
    );
  };

  const DiscussionSwitch = ({ switchName }) => {
    return (
      <View style={styles.privateDiscussionSwitchContainerStyle}>
        {
          privateDiscussionSwitchValue && selectedSwitch === switchName ? (
            <TouchableOpacity style={styles.editButtonStyle} onPress={() => setOpenModal(true)}>
              <EditButton height={20} width={20} />
            </TouchableOpacity>
          ) : askToResponseSwitchValue && selectedSwitch === switchName ? (
            <TouchableOpacity style={styles.editButtonStyle} onPress={() => setOpenModal(true)}>
              <EditButton height={20} width={20} />
            </TouchableOpacity>
          ) : null
        }
        <Text style={
          switchName === selectedSwitch && privateDiscussionSwitchValue ? styles.privateDiscussionTextStyle :
          switchName === selectedSwitch && askToResponseSwitchValue ? styles.privateDiscussionTextStyle :
          !privateDiscussionSwitchValue && !askToResponseSwitchValue ? styles.privateDiscussionTextStyle :
          {...styles.privateDiscussionTextStyle, color: "#cccccc"}
        }>{switchName}:  </Text>
        <Switch
          value={switchName === 'Private discussion' ? privateDiscussionSwitchValue : askToResponseSwitchValue}
          onValueChange={() => changeSwitchValue(switchName)}
          trackColor={{true: "#6505E1", false: ""}}
          thumbColor={
            switchName === selectedSwitch && privateDiscussionSwitchValue ? "#6505E1" :
            switchName === selectedSwitch && askToResponseSwitchValue ? "#6505E1" :
            !privateDiscussionSwitchValue && !askToResponseSwitchValue ? "#6505E1" :
            "grey"
          }
          disabled={
            selectedSwitch === 'Private discussion' && privateDiscussionSwitchValue && switchName === selectedSwitch ? false : 
            selectedSwitch === 'Ask for a response' && askToResponseSwitchValue && switchName === selectedSwitch ? false : 
            !privateDiscussionSwitchValue && !askToResponseSwitchValue ? false :
            true
          }
        />
        {

        }
        <DiscussionModalContainer switchName={switchName} />
      </View>
    );
  };

  const NewDiscussionHeader = () => {
    return (
      <View style={styles.newDiscussionUpperBarStyle}>
        <View style={styles.backButtonAndTitleContainerStyle}>
          <BackButton
            styleOption={{
              marginTop: 0,
              marginBottom: 0
            }}
            buttonFunction={openNoticeModal}
          />
          <Text style={styles.newDiscussionTitleStyle}>New discussion</Text>
        </View>
        <TouchableOpacity
          onPress={() => createNewDiscussion()}
          disabled={recordingFile === '' && true}
        >
          <Text style={recordingFile !== '' ? styles.publishButtonTextStyle : {...styles.publishButtonTextStyle, color:"#cccccc"}}>Publish</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const NewDiscussionForm = () => {
    return (
      <>
        <FormInput
          formInputTitle="Discussion title"
          dataInput={discussionTitleInput}
          capitalize={true}
        />
        <Text style={styles.formInputTitleStyle}>Topic</Text>
        <Picker
          selectedValue={selectedTopic}
          style={styles.topicPickerStyle}
          selectedValue={selectedTopic}
          onValueChange={(itemValue, itemIndex) => setSelectedTopic(itemValue)}
        >
          <Picker.Item label="Select topic" value="Select topic" />
          { 
            topics.map((topic, index) => (
              <Picker.Item key={index} label={topic.name} value={topic.id} />
            ))
          }
        </Picker>
        <FormInput
          formInputTitle="Add hashtags"
          dataInput={hashtagsInput}
        />
        <View>
          <Text style={{...styles.formInputTitleStyle, textAlign: "center", marginBottom: "5%"}}>Mood Rating</Text>
          <Slider
            minimumValue={0.5}
            maximumValue={10}
            onValueChange={value => setSliderValue(value)}
            step={0.5}
            value={sliderValue}
            maximumTrackTintColor="red"
            minimumTrackTintColor="green"
            thumbTintColor="#6505E1"
          />
        </View>
        {
          createNewDiscussionValidation && (
            <ErrorMessage
              message="All fields must be filled in, including a voice note!"
            />
          )
        }
      </>
    );
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.newDiscussionContainerStyle}>
          <NewDiscussionHeader />
          <View style={styles.newDiscussionFormContainerStyle}>
            <View style={styles.contentContainerStyle}>
              <DiscussionSwitch switchName="Private discussion" />
              <DiscussionSwitch switchName="Ask for a response" />
              <View style={styles.recorderContainerStyle}>
                <Recorder
                  addRecordingFile={addRecordingFile}
                  removeRecordingFile={removeRecordingFile}
                />
              </View>
              {NewDiscussionForm()}
            </View>
            {
              isLoading && (
                <LoadingSpinner />
              )
            }
          </View>
          <NoticeModal 
            openModal={noticeModal}
            closeModal={closeNoticeModal}
            message="Are you sure you want to go back? Your progress will not be saved"
            modalButton={noticeModalButton}
            customStyle={{
              height: "25%"
            }}
            child={NoticeModalChild}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  newDiscussionContainerStyle: {
    flex: 1
  },

  newDiscussionUpperBarStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 16,
    paddingVertical: "3%",
    justifyContent: "space-between",
    alignItems: "center"
  },

  privateDiscussionSwitchContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "3%"
  },

  privateDiscussionTextStyle: {
    fontFamily: bold,
    color: "#73798C"
  },

  editButtonStyle: {
    marginRight: "2.5%"
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  newDiscussionTitleStyle: {
    fontFamily: bold,
    fontSize: 20,
    color: "#464D60",
    marginLeft: 14
  },

  publishButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  },

  newDiscussionFormContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
    borderRadius: 8
  },

  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: "5%",
    paddingBottom: "5%"
  },

  formInputTitleStyle: {
    color: "#73798C",
    fontFamily: normal,
    fontSize: 14,
    marginBottom: 12
  },

  topicPickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: 24,
    fontFamily: normal,
    color: "#73798C"
  },

  recorderContainerStyle: {
    marginVertical: "5%"
  },

  noticeModalButtonContainerStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "5%",
    width: "100%",
    marginBottom: "2.5%"
  },

  noticeModalHeaderStyle: {
    fontFamily: bold,
    color: "#6505E1",
    fontSize: 18
  },

  noticeModalMessageStyle: {
    color: "#464D60",
    fontFamily: normal,
    lineHeight: 25,
    fontSize: 16
  }
});

export default NewDiscussionScreen;