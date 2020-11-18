import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { inputUserProfile } from '../../store/actions/VerificationAction';
import { bold, normal } from '../../assets/FontSize';

//Image
import VerificationScreenImage from '../../assets/verificationAssets/verificationScreenImage.svg';

//Components
import BigButton from '../../components/publicComponents/BigButton';
import FormInput from '../../components/publicComponents/FormInput';
import ErrorMessage from '../../components/publicComponents/ErrorMessage';

const UserProfileVerificationScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [birthDateDisplay, setBirthDateDisplay] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [lastNameValidation, setLastNameValidation] = useState(false);
  const [genderValidation, setGenderValidation] = useState(false);
  const [birthDateValidation, setBirthDateValidation] = useState(false);

  const dispatch = useDispatch();

  const validationCheck = () => {
    let checker = /[A-Za-z0-9]+/g;
    let firstNameCheck = firstName.match(checker);
    let lastNameCheck = lastName.match(checker);

    firstNameCheck === null ? setFirstNameValidation(true) : setFirstNameValidation(false);
    lastNameCheck === null ? setLastNameValidation(true) : setLastNameValidation(false);
    selectedGender === '' || selectedGender === 'Gender' ? setGenderValidation(true) : setGenderValidation(false);
    birthDate === '' ? setBirthDateValidation(true) : setBirthDateValidation(false); 
  };

  const submitUserProfile = () => {
    let checker = /[A-Za-z0-9]+/g;
    let firstNameCheck = firstName.match(checker);
    let lastNameCheck = lastName.match(checker);

    if (firstNameCheck !== null && lastNameCheck !== null && selectedGender !== ''&& birthDate !== '') {
      const submitData = {
        firstName: firstName,
        lastName: lastName,
        gender: selectedGender,
        birthDate: birthDate
      };

      dispatch(inputUserProfile(submitData));
      validationCheck();
      navigation.navigate('UserAddressVerificationScreen');
    } else {
      validationCheck();
    };
  };

  const firstNameInput = input => {
    setFirstName(input);
  };

  const lastNameInput = input => {
    setLastName(input);
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

  const showDatepicker = () => {
    showMode('date');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const nextButton = () => {
    submitUserProfile();
  }

  const InputForm = () => {
    const gender = [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' }
    ]

    return (
      <View style={styles.formInputContainerStyle}>
        <View>
          <FormInput dataInput={firstNameInput} formInputCustomStyle={styles.formInputCustomStyle} />
          <Text style={styles.inputNameStyle}>First name {firstNameValidation && <ErrorMessage message="Please input your first name" />}</Text>
        </View>
        <View>
          <FormInput dataInput={lastNameInput} formInputCustomStyle={styles.formInputCustomStyle} />
          <Text style={styles.inputNameStyle}>Last Name {lastNameValidation && <ErrorMessage message="Please input your last name" />}</Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedGender}
            style={styles.pickerStyle}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
          >
            <Picker.Item label="Gender" value="" />
            { 
              gender.map((gender, index) => (
                <Picker.Item key={index} label={gender.name} value={gender.value} />
              ))
            }
          </Picker>
          {genderValidation && <ErrorMessage message="Please input your gender" />}
        </View>
        <View>
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
                style={styles.dateInputStyle}
                onPress={showDatepicker}
              >
                <Text style={{fontSize: 16}}>{birthDateDisplay}</Text>
              </TouchableOpacity>
            )
          }
          <Text style={styles.inputNameStyle}>Date of Birth {birthDateValidation && <ErrorMessage message="Please input your birth date" />}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.userProfileVerificationScreenContainerStyle}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonTextStyle}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainerStyle}>
          <VerificationScreenImage />
        </View>
        <Text style={styles.boldTextStyle}>We want to get to know you a little better</Text>
        {InputForm()}
        <BigButton
          buttonTitle="Next"
          buttonStyle={{
            color: "#FFFFFF",
            backgroundColor: "#6505E1",
            borderWidth: 0,
            marginTop: "5%"
          }}
          buttonFunction={nextButton}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  userProfileVerificationScreenContainerStyle: {
    padding: "5%"
  },

  backButtonTextStyle: {
    color: "#6505E1",
    fontFamily: bold,
    fontSize: 16
  },

  imageContainerStyle: {
    alignItems: "center",
    paddingTop: "5%"
  },

  boldTextStyle: {
    textAlign: "center",
    fontFamily: bold,
    fontSize: 20,
    padding: "5%",
    paddingBottom: -1.5
  },

  formInputCustomStyle: {
    marginBottom: ".5%",
    height: 35,
    fontSize: 16,
    paddingVertical: 0,
  },

  
  inputNameStyle: {
    fontSize: 14,
    fontFamily: normal
  },
  
  pickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginTop: "1%",
    marginBottom: ".5%",
    fontFamily: normal,
    color: "#73798C"
  },

  dateInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB"
  }
});

export default UserProfileVerificationScreen;