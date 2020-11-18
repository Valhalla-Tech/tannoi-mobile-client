import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { bold, normal } from '../../assets/FontSize';
import { useDispatch } from 'react-redux';
import { inputUserAddress } from '../../store/actions/VerificationAction';
import ErrorMessage from '../../components/publicComponents/ErrorMessage';
import axios from 'axios';

//Image
import VerificationScreenImage from '../../assets/verificationAssets/verificationScreenImage.svg';

//Components
import BigButton from '../../components/publicComponents/BigButton';
import FormInput from '../../components/publicComponents/FormInput';

const UserAddressVerificationScreen = ({ navigation }) => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [streetValidation, setStreetValidation] = useState(false);
  const [cityValidation, setCityValidation] = useState(false);
  const [countryValidation, setCountryValidation] = useState(false);
  const [postalCodeValidation, setPostalCodeValidation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getCountry();
  }, []);

  const validationCheck = () => {
    street === '' ? setStreetValidation(true) : setStreetValidation(false);
    city === '' ? setCityValidation(true) : setCityValidation(false);
    selectedCountry === '' || selectedCountry === 'Country' ? setCountryValidation(true) : setCountryValidation(false);
    postCode === '' ? setPostalCodeValidation(true) : setPostalCodeValidation(false);
  };

  const submitUserAddress = () => {
    if (selectedCountry !== '' && street !== '' && city !== '' && postCode !== '') {
      const submitData = {
        street: street,
        city: city,
        country: selectedCountry,
        postalCode: postCode
      };

      dispatch(inputUserAddress(submitData));
      validationCheck();
      navigation.navigate('VoiceVerificationScreen');
    } else {
      validationCheck();
    };
  };

  const streetInput = input => {
    setStreet(input);
  };

  const cityInput = input => {
    setCity(input);
  };

  const postCodeInput = input => {
    setPostCode(input);
  };
 
  const nextScreen = () => {
    submitUserAddress()
  };

  const getCountry = async () => {
    try {
      let getCountryRequest = await axios({
        method: 'get',
        url: 'https://restcountries.eu/rest/v2/all'
      });

      setCountryList(getCountryRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  const InputForm = () => {
    return (
      <View>
        <View>
          <FormInput dataInput={streetInput} formInputCustomStyle={styles.formInputCustomStyle} />
          <Text style={styles.inputNameStyle}>Street {streetValidation && <ErrorMessage message="Please input your street address" />}</Text>
        </View>
        <View>
          <FormInput dataInput={cityInput} formInputCustomStyle={styles.formInputCustomStyle} />
          <Text style={styles.inputNameStyle}>City {cityValidation && <ErrorMessage message="Please input your city" />}</Text>
        </View>
        <Picker
            selectedValue={selectedCountry}
            style={styles.pickerStyle}
            selectedValue={selectedCountry}
            onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}
          >
            <Picker.Item label="Country" value="" />
            { 
              countryList.map((countryList, index) => (
                <Picker.Item key={index} label={countryList.name} value={countryList.name} />
              ))
            }
          </Picker>
          {countryValidation && <ErrorMessage message="Please input your country" />}
        <View>
          <FormInput dataInput={postCodeInput} formInputCustomStyle={styles.formInputCustomStyle} />
          <Text style={styles.inputNameStyle}>Postal code {postalCodeValidation && <ErrorMessage message="Please input your postal code" />}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.userAddressVerificationScreenContainerStyle}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonTextStyle}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainerStyle}>
          <VerificationScreenImage />
        </View>
        <Text style={styles.boldTextStyle}>We ask for your residential address to know that you are serious</Text>
        {InputForm()}
        <BigButton
          buttonTitle="Next"
          buttonStyle={{
            color: "#FFFFFF",
            backgroundColor: "#6505E1",
            borderWidth: 0,
            marginTop: "5%"
          }}
          buttonFunction={nextScreen}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  userAddressVerificationScreenContainerStyle: {
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
    padding: "3%",
    height: "11%",
  },

  formInputCustomStyle: {
    marginBottom: ".5%",
    height: 35,
    fontSize: 16,
    paddingVertical: 0
  },

  pickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginTop: "2%",
    marginBottom: -5,
    fontFamily: normal,
    color: "#73798C"
  },

  inputNameStyle: {
    fontSize: 14,
    fontFamily: normal
  }
});

export default UserAddressVerificationScreen;