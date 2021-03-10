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
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getOneProfile } from '../../../store/actions/ProfileAction';
import { bold, normal } from '../../../assets/FontSize';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DisplayBirthDate from '../../../helper/DisplayBirthDate';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';
import { ScreenHeight } from '../../../constants/Size';
import { UploadImage } from '../../../helper/UploadImage';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import BackButton from '../../../components/publicComponents/BackButton';
import FormInput from '../../../components/publicComponents/FormInput';
import ListCardPlayer from '../../../components/publicComponents/ListCardPlayer';
import RecorderModal from '../../../components/publicComponents/RecorderModal';
import BigButton from '../../../components/publicComponents/Button';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import IosPicker from '../../../components/publicComponents/IosPicker';

const EditProfileScreen = ({ navigation }) => {
  const userProfile = useSelector((state) => state.ProfileReducer.userProfile);

  const [birthDateDisplay, setBirthDateDisplay] = useState(
    userProfile.birth_date
      ? DisplayBirthDate(new Date(userProfile.birth_date))
      : '',
  );
  const [birthDate, setBirthDate] = useState(
    userProfile.birth_date ? userProfile.birth_date : '',
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedGender, setSelectedGender] = useState(
    userProfile.gender ? userProfile.gender : '',
  );
  const [fullName, setFullName] = useState(
    userProfile.name ? userProfile.name : '',
  );
  const [location, setLocation] = useState(
    userProfile.location ? userProfile.location : '',
  );
  const [shortBio, setShortBio] = useState(
    userProfile.bio ? userProfile.bio : '',
  );
  const [profileImage, setProfileImage] = useState('');
  const [bioVoiceFile, setBioVoiceFile] = useState(
    userProfile.bio_voice_path ? userProfile.bio_voice_path : '',
  );
  const [recordingModal, setRecordingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();

  const updateState = () => {
    if (
      (fullName === undefined && firstRender) ||
      (fullName === '' && firstRender)
    ) {
      setFullName(userProfile.name);
    } else if (
      (location === undefined && firstRender) ||
      (location === '' && firstRender)
    ) {
      setLocation(userProfile.location);
    } else if (
      (shortBio === undefined && firstRender) ||
      (shortBio === '' && firstRender)
    ) {
      setShortBio(userProfile.bio);
    }
  };

  useEffect(() => {
    dispatch(getOneProfile());
  }, []);

  useEffect(() => {
    updateState();
  }, [updateState]);

  const gender = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'non-binary' },
  ];

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

  const inputFullName = (input) => {
    input === '' && setFirstRender(false);
    setFullName(input);
  };

  const inputLocation = (input) => {
    input === '' && setFirstRender(false);
    setLocation(input);
  };

  const inputShortBio = (input) => {
    input === '' && setFirstRender(false);
    setShortBio(input);
  };

  const uploadProfileImage = () => {
    UploadImage((image) => setProfileImage(image));
  };

  const closeRecordingModal = () => {
    setRecordingModal(false);
  };

  const setBioFile = (input) => {
    setBioVoiceFile(input);
    setRecordingModal(false);
  };

  const editVoiceBio = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let voiceBioFormData = new FormData();
      //Recording File
      const uri = `file://${bioVoiceFile}`;
      let audioParts = uri.split('.');
      let fileType = audioParts[audioParts.length - 1];

      voiceBioFormData.append('bio_voice_path', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/${fileType}`,
      });

      let editVoiceBioRequest = await axios({
        url: `${BaseUrl}/users/profile/edit-bio-voice`,
        method: 'put',
        headers: {
          'Content-Type': 'multipart/form-data',
          token: access_token,
        },
        data: voiceBioFormData,
      });

      if (editVoiceBioRequest.data) {
        setIsLoading(false);
        navigation.navigate('Me');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const saveEdit = async () => {
    try {
      setIsLoading(true);
      let access_token = await AsyncStorage.getItem('access_token');
      if (
        profileImage !== '' ||
        birthDate !== '' ||
        fullName !== '' ||
        selectedGender !== '' ||
        shortBio !== '' ||
        location !== ''
      ) {
        //Image File
        let filename = profileImage.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();

        profileImage !== '' &&
          formData.append('profile_photo_path', {
            uri: profileImage,
            name: filename,
            type,
          });
        birthDate !== '' && formData.append('birth_date', `${birthDate}`);
        fullName !== '' &&
          fullName.length < 27 &&
          formData.append('name', fullName.trim());
        selectedGender !== '' && formData.append('gender', selectedGender);
        shortBio !== '' && formData.append('bio', shortBio.trim());
        location !== '' && formData.append('location', location.trim());

        let saveEditRequest = await axios({
          url: `${BaseUrl}/users/profile/edit`,
          method: 'put',
          headers: {
            'Content-Type': 'multipart/form-data',
            token: access_token,
          },
          data: formData,
        });

        if (saveEditRequest.data) {
          if (
            bioVoiceFile !== '' &&
            bioVoiceFile !== userProfile.bio_voice_path
          ) {
            editVoiceBio();
          }
          setIsLoading(false);
          navigation.navigate('Me', { fromEditScreen: true });
        }
      } else if (
        bioVoiceFile !== '' &&
        bioVoiceFile !== userProfile.bio_voice_path
      ) {
        editVoiceBio();
      } else {
        navigation.navigate('Me');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
        <Text style={styles.titleTextStyle}>Edit profile</Text>
      </>
    );
  };

  const EditProfilePicture = () => {
    return (
      <>
        {userProfile !== '' ? (
          <TouchableOpacity
            onPress={uploadProfileImage}
            style={styles.editProfileButtonStyle}>
            <Image
              source={
                profileImage === ''
                  ? { uri: userProfile.profile_photo_path }
                  : { uri: profileImage }
              }
              style={styles.profileImageStyle}
            />
            <Text style={styles.changeProfileTextStyle}>
              Change profile pic
            </Text>
          </TouchableOpacity>
        ) : (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )}
      </>
    );
  };

  const AudioBio = () => {
    return (
      <View>
        <View style={styles.recordBioContainerStyle}>
          <Text style={styles.inputTitleStyle}>Audio bio</Text>
          <TouchableOpacity onPress={() => setRecordingModal(true)}>
            <Text style={styles.recordBioTextStyle}>Record new audio bio</Text>
          </TouchableOpacity>
        </View>
        {bioVoiceFile || userProfile.bio_voice_path ? (
          <ListCardPlayer
            recordingFile={
              bioVoiceFile === '' ? userProfile.bio_voice_path : bioVoiceFile
            }
            fromBio={true}
            isSlider={true}
            navigation={navigation}
          />
        ) : null}
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
        {!isBirthDate && !isPicker && (
          <FormInput
            dataInput={
              (inputTitle === 'Full name' && inputFullName) ||
              (inputTitle === 'Location' && inputLocation) ||
              (inputTitle === 'Short bio' && inputShortBio)
            }
            formInputValue={
              inputTitle === 'Full name'
                ? fullName
                : inputTitle === 'Location'
                ? location
                : inputTitle === 'Short bio' && shortBio
            }
            capitalize={true}
          />
        )}
        {isBirthDate && (
          <>
            {show ? (
              <>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={
                    birthDate === '' && userProfile.birth_date !== null
                      ? new Date(userProfile.birth_date)
                      : currentDate
                  }
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={dateInput}
                />
                {Platform.OS === 'ios' && (
                  <Text onPress={() => setShow(false)} style={styles.selectDateButtonStyle}>Select</Text>
                )}
              </>
            ) : (
              <TouchableOpacity
                style={styles.formInputStyle}
                onPress={showDatepicker}>
                <Text style={styles.inputTextStyle}>
                  {birthDate === '' && userProfile.birth_date !== null
                    ? DisplayBirthDate(new Date(userProfile.birth_date))
                    : birthDateDisplay}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
        {isPicker &&
          (Platform.OS === 'android' ? (
            <View>
              <Picker
                selectedValue={
                  selectedGender === '' ? userProfile.gender : selectedGender
                }
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedGender(itemValue)
                }>
                <Picker.Item label={userProfile.gender ? '' : '-'} value="" />
                {gender.map((gender, index) => (
                  <Picker.Item
                    key={index}
                    label={gender.name}
                    value={gender.value}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <IosPicker
              data={gender}
              onChangeValue={(value) => setSelectedGender(value)}
              customStyle={{ marginBottom: '5%' }}
              placeholder=" "
            />
          ))}
      </View>
    );
  };

  const EditProfileForm = () => {
    return (
      <View
        style={
          userProfile !== ''
            ? styles.formContainerStyle
            : {
                ...styles.formContainerStyle,
                justifyContent: 'center',
                alignItems: 'center',
              }
        }>
        {userProfile !== '' ? (
          <>
            {EditProfileInput('Full name')}
            {EditProfileInput('Date of birth', true)}
            {EditProfileInput('Gender', null, true)}
            {EditProfileInput('Location')}
            {EditProfileInput('Short bio')}
            {AudioBio()}
            <BigButton
              buttonTitle="Save Changes"
              buttonStyle={{
                color: '#FFFFFF',
                backgroundColor: '#5152D0',
                borderWidth: 0,
                marginTop: '5%',
              }}
              buttonFunction={saveEdit}
            />
          </>
        ) : (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        )}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <>
          <Header child={HeaderContent} customStyle={styles.headerStyle} />
          <ScrollView>
            <View style={styles.editProfileContainerStyle}>
              <Card
                child={EditProfilePicture}
                customStyle={
                  userProfile === ''
                    ? {
                        ...styles.cardStyle,
                        marginBottom: '2%',
                        maxHeight: CalculateHeight(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : {
                        ...styles.cardStyle,
                        marginBottom: '2%',
                      }
                }
              />
              <Card
                child={EditProfileForm}
                customStyle={{
                  ...styles.cardStyle,
                  minHeight: CalculateHeight(20),
                }}
              />
            </View>
            {isLoading && <LoadingSpinner />}
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2.5%',
    paddingVertical: '3%',
  },

  editProfileContainerStyle: {
    flex: 1,
    paddingHorizontal: '1.8%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },

  titleTextStyle: {
    marginLeft: '3%',
    fontFamily: bold,
    color: '#464D60',
    fontSize: CalculateHeight(2),
  },

  cardStyle: {
    borderRadius: 8,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },

  editProfileButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    width: CalculateWidth(8),
    height: CalculateWidth(8),
    borderRadius: 50,
    marginRight: '3%',
  },

  changeProfileTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: CalculateHeight(1.8),
  },

  inputTitleStyle: {
    color: '#73798C',
    fontSize: 14,
    fontFamily: normal,
  },

  recordBioTextStyle: {
    color: '#0E4EF4',
    fontSize: CalculateHeight(1.5),
    fontFamily: normal,
  },

  formContainerStyle: {
    minHeight: CalculateHeight(20),
  },

  selectDateButtonStyle: {
    fontFamily: normal,
    color: '#6505E1',
    fontSize: CalculateHeight(2),
    alignSelf: 'flex-end',
  },

  formInputStyle: {
    // height: 45,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
    justifyContent: 'center',
    marginBottom: '5%',
  },

  inputTextStyle: {
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
  },

  pickerStyle: {
    height: 47,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(1.8),
    marginBottom: '5%',
    fontFamily: normal,
    color: '#73798C',
    marginLeft: -6.5,
  },

  recordBioContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
  },
});

export default EditProfileScreen;
