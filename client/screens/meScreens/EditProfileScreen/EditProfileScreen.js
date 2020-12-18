import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getOneProfile } from '../../../store/actions/ProfileAction';
import { bold, normal } from '../../../assets/FontSize';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import DisplayBirthDate from '../../../helper/DisplayBirthDate';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import BackButton from '../../../components/publicComponents/BackButton';
import FormInput from '../../../components/publicComponents/FormInput';
import ListCardPlayer from '../../../components/publicComponents/ListCardPlayer';
import RecorderModal from '../../../components/publicComponents/RecorderModal';
import BigButton from '../../../components/publicComponents/BigButton';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const EditProfileScreen = ({ navigation }) => {
  const userProfile = useSelector(state => state.ProfileReducer.userProfile);

  const [birthDateDisplay, setBirthDateDisplay] = useState(userProfile.birth_date ? DisplayBirthDate(new Date(userProfile.birth_date)) : '');
  const [birthDate, setBirthDate] = useState(userProfile.birth_date ? userProfile.birth_date : '');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedGender, setSelectedGender] = useState(userProfile.gender ? userProfile.gender : '');
  const [fullName, setFullName] = useState(userProfile.name ? userProfile.name : '');
  const [location, setLocation] = useState(userProfile.location ? userProfile.location : '');
  const [shortBio, setShortBio] = useState(userProfile.bio ? userProfile.bio : '');
  const [profileImage, setProfileImage] = useState(userProfile.profile_photo_path ? userProfile.profile_photo_path : '');
  const [bioVoiceFile, setBioVoiceFile] = useState(userProfile.bio_voice_path ? userProfile.bio_voice_path : '');
  const [recordingModal, setRecordingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProfile());
  }, [userProfile]);

  const gender = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'non-binary' }
  ]

  const HeaderContent = () => {
    return (
      <>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0
          }}
        />
        <Text style={styles.titleTextStyle}>Edit profile</Text>
      </>
    );
  };

  const dateInput = (event, selectedDate) => {
    const inputDate = selectedDate || currentDate;
    setShow(Platform.OS === 'ios');
    setBirthDate(inputDate);
    setCurrentDate(inputDate);
    if (selectedDate !== undefined) {
      let birthDateDisplay = DisplayBirthDate(new Date(selectedDate));
      setBirthDateDisplay(birthDateDisplay);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const inputFullName = input => {
    setFullName(input);
  };

  const inputLocation = input => {
    setLocation(input);
  };

  const inputShortBio = input => {
    setShortBio(input);
  };

  const uploadProfileImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setProfileImage(image.path)
    })
    .catch(error => {
      console.log(error)
    })
  };

  const closeRecordingModal = () => {
    setRecordingModal(false);
  };

  const setBioFile = (input) => {
    setBioVoiceFile(input);
    setRecordingModal(false);
  };

  const saveEdit = async () => {
    try {
      setIsLoading(true);
      let access_token = await AsyncStorage.getItem('access_token');

      //Image File
      let filename = profileImage.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();

      // formData.append('profile_photo_path', {uri: profileImage, name: filename, type});
      formData.append('birth_date', `${birthDate}`);
      formData.append('name', fullName);
      formData.append('gender', selectedGender);
      formData.append('bio', shortBio);
      formData.append('location', location);

      let saveEditRequest = await axios({
        url: `${BaseUrl}/users/profile/edit`,
        method: 'put',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': access_token
        },
        data: formData
      });

      if (saveEditRequest.data) {
        let voiceBioFormData = new FormData();

        //Recording File
        const uri = `file://${bioVoiceFile}`;
        let audioParts = uri.split('.');
        let fileType = audioParts[audioParts.length - 1];

        voiceBioFormData.append('bio_voice_path', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/${fileType}`
        });

        let editVoiceBioRequest = await axios({
          url: `${BaseUrl}/users/profile/edit-bio-voice`,
          method: 'put',
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': access_token
          },
          data: voiceBioFormData
        });

        if (editVoiceBioRequest.data) {
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const EditProfilePicture = () => {
    return (
      <TouchableOpacity onPress={uploadProfileImage} style={styles.editProfileButtonStyle}>
        <Image source={{uri: profileImage}} style={styles.profileImageStyle} />
        <Text style={styles.changeProfileTextStyle}>Change profile pic</Text>
      </TouchableOpacity>
    );
  };

  const AudioBio = () => {
    return (
      <View>
        <View style={styles.recordBioContainerStyle}>
          <Text style={styles.inputTitleStyle}>Audio bio</Text>
          <TouchableOpacity onPress={() => setRecordingModal(true)}>
            <Text style={styles.inputTitleStyle}>Record new audio bio</Text>
          </TouchableOpacity>
        </View>
        {
          bioVoiceFile ? (
            <ListCardPlayer
              recordingFile={bioVoiceFile}
              fromBio={true}
              isSlider={true}
            />
          ) : null
        }
        <RecorderModal
          openModal={recordingModal}
          closeModal={closeRecordingModal}
          forBio={true}
          setBioFile={setBioFile}
        />
      </View>
    );
  };

  const EditProfileInput = (inputTitle, isBirthDate, isPicker) => {
    return (
      <View>
        <Text style={styles.inputTitleStyle}>{inputTitle}</Text>
        {
          !isBirthDate && !isPicker && <FormInput
            dataInput={
              inputTitle === 'Full name' && inputFullName ||
              inputTitle === 'Location' && inputLocation ||
              inputTitle === 'Short bio' && inputShortBio
            }
            formInputValue={
              inputTitle === 'Full name' && fullName ||
              inputTitle === 'Location' && location ||
              inputTitle === 'Short bio' && shortBio
            }
            capitalize={true}
          />
        }
        {isBirthDate && (
          <>
            {
              show ? (
                <DateTimePicker 
                  testID="dateTimePicker"
                  value={currentDate}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={dateInput}
                />
              ) : (
                <TouchableOpacity
                  style={styles.formInputStyle}
                  onPress={showDatepicker}
                >
                  <Text style={styles.inputTextStyle}>{birthDateDisplay}</Text>
                </TouchableOpacity>
              )
            }
          </>
        )}
        {isPicker && (
          <View>
            <Picker
              selectedValue={selectedGender}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
            >
              <Picker.Item label={userProfile.gender ? '' : '-'} value="" />
              {
                gender.map((gender, index) => (
                  <Picker.Item key={index} label={gender.name} value={gender.value} />
                ))
              }
            </Picker>
          </View>
        )}
    </View>
    );
  };

  const EditProfileForm = () => {
    return (
      <View>
        {EditProfileInput('Full name')}
        {EditProfileInput('Date of birth', true)}
        {EditProfileInput('Gender', null, true)}
        {EditProfileInput('Location')}
        {EditProfileInput('Short bio')}
        {AudioBio()}
        <BigButton
          buttonTitle="Save Changes"
          buttonStyle={{
            color: "#FFFFFF",
            backgroundColor: "#5152D0",
            borderWidth: 0,
            marginTop: "5%"
          }}
          buttonFunction={saveEdit}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View  style={styles.rootStyle}>
        <Header
          child={HeaderContent}
          customStyle={styles.headerStyle}
        />
        <ScrollView>
          <View style={styles.editProfileContainerStyle}>
            <Card
              child={EditProfilePicture}
              customStyle={{...styles.cardStyle, marginBottom: "2%"}}
            />
            <Card
              child={EditProfileForm}
              customStyle={styles.cardStyle}
            />
          </View>
          {isLoading && <LoadingSpinner />}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1
  },
  
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "2.5%",
    paddingVertical: "3%"
  },

  editProfileContainerStyle: {
    flex: 1,
    paddingHorizontal: "1.8%",
    paddingTop: "2%",
    paddingBottom: "2%"
  },

  titleTextStyle: {
    marginLeft: "3%",
    fontFamily: bold,
    color: "#464D60",
    fontSize: 20
  },

  cardStyle: {
    borderRadius: 8,
    paddingHorizontal: "5%",
    paddingVertical: "3%"
  },

  editProfileButtonStyle: {
    flexDirection: "row"
  },

  profileImageStyle: {
    width: "9%",
    height: "100%",
    borderRadius: 50,
    marginRight: "3%"
  },

  changeProfileTextStyle: {
    fontFamily: normal,
    color: "#464D60",
    fontSize: 16
  },

  inputTitleStyle: {
    color: "#73798C",
    fontSize: 14,
    fontFamily: normal
  },

  formInputStyle: {
    height: 45,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    fontFamily: normal,
    justifyContent: "center",
    marginBottom: "5%"
  },

  inputTextStyle: {
    fontSize: 16,
    fontFamily: normal
  },

  pickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: "5%",
    fontFamily: normal,
    color: "#73798C",
    marginLeft: -6.5
  },

  recordBioContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%"
  }
});

export default EditProfileScreen;