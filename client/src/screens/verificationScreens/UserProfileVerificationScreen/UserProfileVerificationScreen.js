import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import {
  inputUserProfile,
  addStepCount,
} from '../../../store/actions/VerificationAction';
import { bold, normal } from '../../../assets/FontSize';
import DisplayBirthDate from '../../../helper/DisplayBirthDate';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';

//Image
import ScreenImage from '../../../assets/verificationAssets/Illustration-Tannoi-Apps-02.png';

//Components
import BigButton from '../../../components/publicComponents/Button';
import FormInput from '../../../components/publicComponents/FormInput';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import StepCount from '../../../components/verificationComponent/StepCount';

const UserProfileVerificationScreen = ({ navigation }) => {
  const firstNameFromStore = useSelector(
    (state) => state.VerificationReducer.firstName,
  );
  const lastNameFromStore = useSelector(
    (state) => state.VerificationReducer.lastName,
  );
  const genderFromStore = useSelector(
    (state) => state.VerificationReducer.gender,
  );
  const birthDateFromStore = useSelector(
    (state) => state.VerificationReducer.birthDate,
  );
  const currentStep = useSelector(
    (state) => state.VerificationReducer.stepCount,
  );

  const [selectedGender, setSelectedGender] = useState(genderFromStore);
  const [birthDateDisplay, setBirthDateDisplay] = useState('');
  const [birthDate, setBirthDate] = useState(birthDateFromStore);
  const [currentDate, setCurrentDate] = useState(
    birthDateFromStore !== '' ? birthDateFromStore : new Date(),
  );
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

    firstNameCheck === null
      ? setFirstNameValidation(true)
      : setFirstNameValidation(false);
    lastNameCheck === null
      ? setLastNameValidation(true)
      : setLastNameValidation(false);
    selectedGender === '' || selectedGender === 'Gender'
      ? setGenderValidation(true)
      : setGenderValidation(false);
    birthDate === ''
      ? setBirthDateValidation(true)
      : setBirthDateValidation(false);
  };

  const submitUserProfile = () => {
    let checker = /[A-Za-z0-9]+/g;
    let firstNameCheck = firstName.match(checker);
    let lastNameCheck = lastName.match(checker);

    if (
      firstNameCheck !== null &&
      lastNameCheck !== null &&
      selectedGender !== '' &&
      birthDate !== ''
    ) {
      const submitData = {
        firstName: firstName,
        lastName: lastName,
        gender: selectedGender,
        birthDate: birthDate,
      };

      currentStep === '' && dispatch(addStepCount(1));
      dispatch(inputUserProfile(submitData));
      validationCheck();
      navigation.navigate('UserAddressVerificationScreen');
    } else {
      validationCheck();
    }
  };

  const firstNameInput = (input) => {
    setFirstName(input);
  };

  const lastNameInput = (input) => {
    setLastName(input);
  };

  const displayBirthDate = (selectedDate, fromDateInput) => {
    if (birthDateFromStore !== '' || fromDateInput) {
      let birthDateDisplay = DisplayBirthDate(new Date(selectedDate));
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
  };

  const InputForm = () => {
    const gender = [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' },
      { name: 'Non-binary', value: 'non-binary' },
    ];

    return (
      <View style={styles.formContainerStyle}>
        <View>
          <FormInput
            dataInput={firstNameInput}
            formInputCustomStyle={styles.formInputCustomStyle}
            customContainerStyle={styles.formInputContainerStyle}
            formInputValue={firstName}
            capitalize={true}
          />
          <Text style={styles.inputTextStyle}>
            First name{' '}
            {firstNameValidation && (
              <ErrorMessage message="Please input your first name" />
            )}
          </Text>
        </View>
        <View>
          <FormInput
            dataInput={lastNameInput}
            formInputCustomStyle={styles.formInputCustomStyle}
            customContainerStyle={styles.formInputContainerStyle}
            formInputValue={lastName}
            capitalize={true}
          />
          <Text style={styles.inputTextStyle}>
            Last Name{' '}
            {lastNameValidation && (
              <ErrorMessage message="Please input your last name" />
            )}
          </Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedGender}
            style={styles.pickerStyle}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }>
            <Picker.Item label="Select Gender" value="" />
            {gender.map((gender, index) => (
              <Picker.Item
                key={index}
                label={gender.name}
                value={gender.value}
              />
            ))}
          </Picker>
          {genderValidation && (
            <ErrorMessage message="Please input your gender" />
          )}
        </View>
        <View>
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
              style={styles.dateInputStyle}
              onPress={showDatepicker}>
              <Text style={{ fontSize: 16 }}>{birthDateDisplay}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.inputTextStyle}>
            Date of Birth{' '}
            {birthDateValidation && (
              <ErrorMessage message="Please input your birth date" />
            )}
          </Text>
        </View>
      </View>
    );
  };

  const BackButton = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonTextStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.userProfileVerificationScreenContainerStyle}>
          <View>
            <BackButton />
            <StepCount />
            <View style={styles.imageContainerStyle}>
              <Image source={ScreenImage} style={styles.imageStyle} />
            </View>
            <View style={{paddingHorizontal: '2%'}}>
              <Text style={styles.boldTextStyle}>
                Can we get to know you a little better?
              </Text>
              <Text style={styles.normalTextStyle}>
                We hate trolls. We want to build a safe place for people to
                express their ideas
              </Text>
            </View>
            {InputForm()}
          </View>
          <BigButton
            buttonTitle="Next"
            buttonStyle={
              firstName === '' ||
              lastName === '' ||
              selectedGender === '' ||
              birthDate === ''
                ? {
                    color: '#FFFFFF',
                    backgroundColor: '#a1a5ab',
                    borderWidth: 0,
                  }
                : {
                    color: '#FFFFFF',
                    backgroundColor: '#6505E1',
                    borderWidth: 0,
                  }
            }
            disableButton={
              firstName === '' ||
              lastName === '' ||
              selectedGender === '' ||
              (birthDate === '' && false)
            }
            buttonFunction={nextButton}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  userProfileVerificationScreenContainerStyle: {
    flex: 1,
    padding: '5%',
    justifyContent: 'space-between',
  },

  backButtonTextStyle: {
    color: '#6505E1',
    fontFamily: bold,
    fontSize: CalculateHeight(2),
  },

  imageContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '35%',
    maxHeight: CalculateHeight(38),
  },

  imageStyle: {
    resizeMode: 'contain',
    width: '65%',
  },

  boldTextStyle: {
    textAlign: 'center',
    fontFamily: bold,
    fontSize: CalculateHeight(3),
    marginBottom: '2%',
  },

  normalTextStyle: {
    textAlign: 'center',
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },

  formContainerStyle: {
    justifyContent: 'space-between',
    height: CalculateHeight(45),
    paddingTop: '10%',
    marginBottom: '12.5%',
  },

  formInputContainerStyle: {
    marginBottom: 0,
  },

  formInputCustomStyle: {
    marginBottom: 0,
    paddingVertical: 0,
  },

  inputTextStyle: {
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
  },

  pickerStyle: {
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(2),
    marginBottom: CalculateHeight(-1),
    fontFamily: normal,
    color: '#73798C',
    marginLeft: CalculateWidth(-2),
  },

  dateInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
  },
});

export default UserProfileVerificationScreen;
