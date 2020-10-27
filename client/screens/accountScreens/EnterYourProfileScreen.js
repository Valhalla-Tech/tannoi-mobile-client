import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import { bold, normal } from '../../assets/FontSize';
import axios from 'axios';

//Icon
import NoProfileIcon from '../../assets/accountAssets/EnterYourProfileScreen/noProfileIcon.svg';

//Components
import SaveAndContinueButton from '../../components/publicComponents/BigButton';
import LoadingSpinner from '../../components/publicComponents/LoadingSpinner';

const EnterYourProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDateDisplay, setBirthDateDisplay] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const enterYourProfileRequest = async () => {
    try {
      setIsLoading(true);

      let access_token = await AsyncStorage.getItem('access_token');
      let filename = profileImage.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      
      let formData = new FormData();
      
      if (profileImage) {
        formData.append('profile_photo_path', {uri: profileImage, name: filename, type});
      }

      if (birthDate !== '') {
        formData.append('birth_date', `${birthDate}`);
      }

      if (fullName !== '') {
        formData.append('name', fullName);
      } else {
        formData.append('name', '');
      }
      
      let enterProfileRequest = await axios({
        method: 'put',
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/users/profile/edit',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': access_token
        },
        data: formData
      });

      if (enterProfileRequest.data.msg === 'Update Success') {
        setIsLoading(false);
        navigation.navigate('FollowSomeTopicsScreen');
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
      let selectedBirthDate = selectedDate.toDateString().split(' ').slice(1, 4);
      if (selectedBirthDate[1][0] === '0') {
        selectedBirthDate[1] = selectedBirthDate[1][1];
      };
      let birthDateDisplay = `${selectedBirthDate[1]} ${selectedBirthDate[0]} ${selectedBirthDate[2]}`;
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

  const UploadPhoto = () => {
    return (
      <View style={styles.uploadProfilePhotoContainerStyle}>
        {
          profileImage ? (
            <Image source={{uri:profileImage}} style={styles.profileImageStyle} />
          ) : (
            <NoProfileIcon />
          )
        }
        <TouchableOpacity 
          style={styles.uploadProfilePhotoStyle}
          onPress={uploadProfileImage}
        >
          <Text style={styles.uploadProfilePhotoButtonTextStyle}>Upload a photo</Text>
        </TouchableOpacity>
        <Text style={styles.uploadProfilePhotoInformationTextStyle}>
          Square JPG or PNG images work best. Your photo will be visible to anyone.
        </Text>
      </View>
    );
  };

  const EnterYourProfileScreenButton = () => {
    return (
      <View style={styles.enterYourProfileScreenButtonContainerStyle}>
        <SaveAndContinueButton 
          buttonTitle="Save and Continue"
          buttonStyle={
            {
              backgroundColor: "#5152D0",
              borderColor: "#5152D0",
              color: "#FFFFFF",
              width: "100%",
              height: "100%",
              marginTop: 24
            }
          }
          buttonType="functionButton"
          buttonFunction={enterYourProfileRequest}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{flex: 1}}>
        <View style={styles.enterYourProfileScreenContainerStyle}>
          <Text style={styles.enterYourProfileScreenTitleStyle}>Enter your profile</Text>
          <UploadPhoto />
          <Text style={{...styles.formInputTitleStyle}}>Full name</Text>
          <TextInput 
            style={styles.formInputStyle}
            onChangeText={value => setFullName(value)}
          />
          <Text style={{...styles.formInputTitleStyle}}>Date of birth</Text>
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
                <Text style={{fontSize: 16}}>{birthDateDisplay}</Text>
              </TouchableOpacity>
            )
          }
          <EnterYourProfileScreenButton />
        </View>
        {
          isLoading && (
            <LoadingSpinner />
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  enterYourProfileScreenContainerStyle: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 25
  },

  enterYourProfileScreenTitleStyle: {
    marginLeft: "7.5%",
    fontSize: 20,
    fontFamily: bold,
    color: "#464D60"
  },

  profileImageStyle: {
    width: 100, 
    height: 100, 
    borderRadius: 50
  },

  uploadProfilePhotoContainerStyle: {
    alignItems:"center",
    marginTop: "10%"
  },

  uploadProfilePhotoStyle: {
    marginTop: "5%",
    borderWidth: 1,
    borderRadius: 20,
    padding: "2%",
    paddingHorizontal: "5%",
    borderColor: "#5152D0"
  },

  uploadProfilePhotoButtonTextStyle: {
    fontSize: 16,
    fontFamily: normal,
    color: "#5152D0"
  },

  uploadProfilePhotoInformationTextStyle: {
    marginTop: "8%",
    textAlign: "center",
    fontSize: 14,
    fontFamily: normal,
    lineHeight: 20,
    color: "#73798C"
  },

  formInputTitleStyle: {
    color: "#73798C",
    marginTop: "8%"
  },

  formInputStyle: {
    height: 45,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    fontFamily: normal,
    justifyContent: "center"
  },

  enterYourProfileScreenButtonContainerStyle: {
    height: 55
  }
})

export default EnterYourProfileScreen;