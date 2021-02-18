import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import DisplayBirthDate from '../../../helper/DisplayBirthDate';
import { UploadImage } from '../../../helper/UploadImage';

//Icon
import NoProfileIcon from '../../../assets/accountAssets/EnterYourProfileScreen/noProfileIcon.svg';

//Components
import SaveAndContinueButton from '../../../components/publicComponents/Button';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import FormInput from '../../../components/publicComponents/FormInput';

const EnterYourProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDateDisplay, setBirthDateDisplay] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullNameValidation, setFullNameValidation] = useState(false);

  const uploadProfileImage = async () => {
    UploadImage((image) => setProfileImage(image));
  };

  const enterYourProfileRequest = async () => {
    try {
      setIsLoading(true);
      let checker = /[A-Za-z0-9]+/g;
      let fullNameCheck = fullName.match(checker);

      if (fullNameCheck === null) {
        setIsLoading(false);
        setFullNameValidation(true);
      } else {
        let access_token = await AsyncStorage.getItem('access_token');
        let filename = profileImage.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();

        if (profileImage) {
          formData.append('profile_photo_path', {
            uri: profileImage,
            name: filename,
            type,
          });
        }

        if (birthDate !== '') {
          formData.append('birth_date', `${birthDate}`);
        }

        if (fullName.trim() !== '') {
          formData.append('name', fullName.trim());
        } else {
          formData.append('name', '');
        }

        let enterProfileRequest = await axios({
          method: 'put',
          url: `${BaseUrl}/users/profile/edit`,
          headers: {
            'Content-Type': 'multipart/form-data',
            token: access_token,
          },
          data: formData,
        });

        if (enterProfileRequest.data.msg === 'Update Success') {
          setIsLoading(false);
          navigation.navigate('FollowSomeTopicsScreen');
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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

  const nameInput = (input) => {
    setFullName(input);
  };

  const UploadPhoto = () => {
    return (
      <View style={styles.uploadProfilePhotoContainerStyle}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImageStyle}
          />
        ) : (
          <NoProfileIcon />
        )}
        <TouchableOpacity
          style={styles.uploadProfilePhotoStyle}
          onPress={uploadProfileImage}>
          <Text style={styles.uploadProfilePhotoButtonTextStyle}>
            Upload a photo
          </Text>
        </TouchableOpacity>
        <Text style={styles.uploadProfilePhotoInformationTextStyle}>
          Square JPG or PNG images work best. Your photo will be visible to
          anyone.
        </Text>
      </View>
    );
  };

  const EnterYourProfileScreenButton = () => {
    return (
      <View style={styles.enterYourProfileScreenButtonContainerStyle}>
        <SaveAndContinueButton
          buttonTitle="Save and Continue"
          buttonStyle={{
            backgroundColor: '#5152D0',
            borderColor: '#5152D0',
            color: '#FFFFFF',
            width: '100%',
            height: '100%',
            marginTop: 24,
          }}
          buttonType="functionButton"
          buttonFunction={enterYourProfileRequest}
        />
      </View>
    );
  };

  const ProfileForm = () => {
    return (
      <>
        {fullNameValidation && (
          <View style={{ marginTop: '2%' }}>
            <ErrorMessage message="Please enter your full name" />
          </View>
        )}
        <Text style={{ ...styles.formInputTitleStyle }}>Full name</Text>
        <FormInput dataInput={nameInput} />
        <Text style={{ ...styles.formInputTitleStyle }}>Date of birth</Text>
        {show ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={currentDate}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={dateInput}
          />
        ) : (
          <TouchableOpacity
            style={styles.formInputStyle}
            onPress={showDatepicker}>
            <Text style={{ fontSize: 16 }}>{birthDateDisplay}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{ flex: 1 }}>
        <View style={styles.enterYourProfileScreenContainerStyle}>
          <Text style={styles.enterYourProfileScreenTitleStyle}>
            Enter your profile
          </Text>
          <UploadPhoto />
          {ProfileForm()}
          <EnterYourProfileScreenButton />
        </View>
        {isLoading && <LoadingSpinner />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  enterYourProfileScreenContainerStyle: {
    flex: 1,
    paddingTop: '15%',
    paddingHorizontal: '5.5%',
  },

  enterYourProfileScreenTitleStyle: {
    marginLeft: '7.5%',
    fontSize: CalculateHeight(2.5),
    fontFamily: bold,
    color: '#464D60',
  },

  profileImageStyle: {
    width: CalculateWidth(25),
    height: CalculateWidth(25),
    borderRadius: 50,
  },

  uploadProfilePhotoContainerStyle: {
    alignItems: 'center',
    marginTop: '10%',
  },

  uploadProfilePhotoStyle: {
    marginTop: '5%',
    borderWidth: 1,
    borderRadius: 20,
    padding: '2%',
    paddingHorizontal: '5%',
    borderColor: '#5152D0',
  },

  uploadProfilePhotoButtonTextStyle: {
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
    color: '#5152D0',
  },

  uploadProfilePhotoInformationTextStyle: {
    marginTop: '8%',
    textAlign: 'center',
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
    lineHeight: 20,
    color: '#73798C',
  },

  formInputTitleStyle: {
    color: '#73798C',
    marginTop: '8%',
  },

  formInputStyle: {
    height: '8%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(2),
    fontFamily: normal,
    justifyContent: 'center',
  },

  enterYourProfileScreenButtonContainerStyle: {
    height: '8%',
  },
});

export default EnterYourProfileScreen;
