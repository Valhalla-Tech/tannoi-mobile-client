import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { inputUserProfile, addStepCount } from '../../../store/actions/VerificationAction';
import { bold, normal } from '../../../assets/FontSize';

//Image
import VerificationScreenImage from '../../../assets/verificationAssets/verificationScreenImage.svg';

//Components
import BigButton from '../../../components/publicComponents/BigButton';
import FormInput from '../../../components/publicComponents/FormInput';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import StepCount from '../../../components/verificationComponent/StepCount';

const UserProfileVerificationScreen = ({ navigation }) => {
  const firstNameFromStore = useSelector(state => state.VerificationReducer.firstName);
  const lastNameFromStore = useSelector(state => state.VerificationReducer.lastName);
  const genderFromStore = useSelector(state => state.VerificationReducer.gender);
  const birthDateFromStore = useSelector(state => state.VerificationReducer.birthDate);
  const currentStep = useSelector(state => state.VerificationReducer.stepCount);

  const [selectedGender, setSelectedGender] = useState(genderFromStore);
  const [birthDateDisplay, setBirthDateDisplay] = useState('');
  const [birthDate, setBirthDate] = useState(birthDateFromStore);
  const [currentDate, setCurrentDate] = useState(birthDateFromStore !== '' ? birthDateFromStore : new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState(firstNameFromStore);
  const [lastName, setLastName] = useState(lastNameFromStore);
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [lastNameValidation, setLastNameValidation] = useState(false);
  const [genderValidation, setGenderValidation] = useState(false);
  const [birthDateValidation, setBirthDateValidation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    displayBirthDate(birthDateFromStore);
  }, []);

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

      currentStep === '' && dispatch(addStepCount(1));
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

  const displayBirthDate = (selectedDate, fromDateInput) => {
    if (birthDateFromStore !== '' || fromDateInput) {
      let selectedBirthDate = selectedDate.toDateString().split(' ').slice(1, 4);
      if (selectedBirthDate[1][0] === '0') {
        selectedBirthDate[1] = selectedBirthDate[1][1];
      };
      let birthDateDisplay = `${selectedBirthDate[1]} ${selectedBirthDate[0]} ${selectedBirthDate[2]}`;
      setBirthDateDisplay(birthDateDisplay);
    }
  };

  const dateInput = (event, selectedDate) => {
    const inputDate = selectedDate || currentDate;
    setShow(Platform.OS === 'ios');
    setBirthDate(inputDate);
    setCurrentDate(inputDate);
    if (selectedDate !== undefined) {
      displayBirthDate(selectedDate, true);
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
      { name: 'Female', value: 'female' },
      { name: 'Non-binary', value: 'non-binary' }
    ]

    return (
      <View style={styles.formContainerStyle}>
        <View>
          <FormInput dataInput={firstNameInput} formInputCustomStyle={styles.formInputCustomStyle} formInputValue={firstName} capitalize={true} />
          <Text style={styles.inputNameStyle}>First name {firstNameValidation && <ErrorMessage message="Please input your first name" />}</Text>
        </View>
        <View>
          <FormInput dataInput={lastNameInput} formInputCustomStyle={styles.formInputCustomStyle} formInputValue={lastName} capitalize={true} />
          <Text style={styles.inputNameStyle}>Last Name {lastNameValidation && <ErrorMessage message="Please input your last name" />}</Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedGender}
            style={styles.pickerStyle}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
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
      <ScrollView>
        <View style={styles.userProfileVerificationScreenContainerStyle}>
          <View>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonTextStyle}>Back</Text>
              </TouchableOpacity>
            </View>
            <StepCount />
            <View style={styles.imageContainerStyle}>
              <VerificationScreenImage />
            </View>
            <View>
              <Text style={styles.boldTextStyle}>Can we get to know you a little better?</Text>
              <Text style={styles.normalTextStyle}>
                We hate trolls. We want to build a safe place for people to express their ideas
              </Text>
            </View>
            {InputForm()}
          </View>
          <BigButton
            buttonTitle="Next"
            buttonStyle={firstName === '' || lastName === '' || selectedGender === '' || birthDate === '' ? {
              color: "#FFFFFF",
              backgroundColor: "#a1a5ab",
              borderWidth: 0
            } : {
              color: "#FFFFFF",
              backgroundColor: "#6505E1",
              borderWidth: 0
            }}
            disableButton={firstName === '' || lastName === '' || selectedGender === '' || birthDate === '' && false}
            buttonFunction={nextButton}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  userProfileVerificationScreenContainerStyle: {
    padding: "5%",
    flex: 1,
    justifyContent: "space-between",
    marginBottom: "15%"
  },

  backButtonTextStyle: {
    color: "#6505E1",
    fontFamily: bold,
    fontSize: 16
  },

  imageContainerStyle: {
    alignItems: "center"
  },

  boldTextStyle: {
    textAlign: "center",
    fontFamily: bold,
    fontSize: 20
  },

  normalTextStyle: {
    textAlign: "center",
    fontFamily: normal,
    marginTop: -10
  },

  formContainerStyle: {
    justifyContent: "space-between",
    height: "42.5%",
    paddingTop: "10%",
    marginBottom: "3%"
  },

  formInputCustomStyle: {
    marginBottom: ".5%",
    height: 30,
    fontSize: 16,
    paddingVertical: 0
  },

  inputNameStyle: {
    fontSize: 14,
    fontFamily: normal
  },
  
  pickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: -10,
    fontFamily: normal,
    color: "#73798C",
    marginLeft: -8
  },

  dateInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EB"
  }
});

export default UserProfileVerificationScreen;