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
  AsyncStorage,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

//Icon
import NoProfileIcon from '../assets/EnterYourProfileScreen/noProfileIcon.svg';

//Component
import SaveAndContinueButton from '../components/PublicComponent/BigButton';

const EnterYourProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDateDisplay, setBirthDateDisplay] = useState('');
  const [birthDate, setBirthDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState('');

  const uploadProfileImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setProfileImage(image.path)
      setImageFile(image)
    })
    .catch(error => {
      console.log(error)
    })
  };

  const enterYourProfileRequest = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let filename = profileImage.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      

      formData.append('profile_photo_path', {uri: profileImage, name: filename, type});
      formData.append('birth_date', `${birthDate}`);
      formData.append('name', fullName)

      console.log(formData._parts[0], profileImage)

      let enterProfileRequest = await axios({
        method: 'put',
        url: 'https://dev.entervalhalla.tech/api/tannoi/v1/users/profile/edit',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTU5NzI5NTQ1OH0.cwJwCxoyRTyNtrdY-Zqrsohpjxq7RMfhYeQFSvPW8gU'
        },
        data: formData
      });

      if (enterProfileRequest.data.msg === 'Update Success') {
        navigation.navigate('FollowSomeTopicsScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dateInput = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShow(Platform.OS === 'ios');
    setBirthDate(currentDate);
    if (selectedDate !== undefined) {
      let selectedBirthDate = selectedDate.toDateString().split(' ').slice(1, 4);
      if (selectedBirthDate[1][0] === '0') {
        selectedBirthDate[1] = selectedBirthDate[1][1];
      };
      let birthDateDisplay = `${selectedBirthDate[1]} ${selectedBirthDate[0]} ${selectedBirthDate[2]}`;
      setBirthDateDisplay(birthDateDisplay);
      console.log(birthDateDisplay)
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView style={styles.enterYourProfileScreenContainerStyle} behavior="padding">
        <View>
          <Text style={styles.enterYourProfileScreenTitleStyle}>Enter your profile</Text>
          <View style={styles.uploadProfilePhotoContainerStyle}>
            {
              profileImage ? (
                <Image source={{uri:profileImage}} style={{ width: 100, height: 100, borderRadius: 50 }} />
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
          <View style={styles.enterYourProfilePageFormContainerStyle}>
            <View>
              <Text style={styles.formInputTitleStyle}>Full name</Text>
              <TextInput 
                style={styles.formInputStyle}
                onChangeText={value => setFullName(value)}
              />
            </View>
          </View>
          <View style={styles.enterYourProfilePageFormContainerStyle}>
            <View>
              <Text style={styles.formInputTitleStyle}>Date of birth</Text>
              {
                show ? (
                  <DateTimePicker 
                    testID="dateTimePicker"
                    value={birthDate}
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
            </View>
          </View>
          <SaveAndContinueButton 
            buttonTitle="Save and Continue"
            buttonStyle={
              {
                backgroundColor: "#5152D0",
                borderColor: "#5152D0",
                color: "#FFFFFF",
                width: "100%",
                height: "10%",
                marginTop: 24
              }
            }
            buttonType="functionButton"
            buttonFunction={enterYourProfileRequest}
          />
        </View>
      </KeyboardAvoidingView>
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
    marginLeft: 25,
    fontSize: 20,
    fontWeight: "600",
    color: "#464D60"
  },

  uploadProfilePhotoContainerStyle: {
    alignItems:"center",
    marginTop: 42
  },

  uploadProfilePhotoStyle: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 23,
    borderColor: "#5152D0"
  },

  uploadProfilePhotoButtonTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5152D0"
  },

  uploadProfilePhotoInformationTextStyle: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    color: "#73798C"
  },

  enterYourProfilePageFormContainerStyle: {
    marginTop: 32
  },

  formInputTitleStyle: {
    color: "#73798C",
  },

  formInputStyle: {
    height: 45,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    justifyContent: "center"
  }
})

export default EnterYourProfileScreen;