import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {bold, normal} from '../../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import {ScreenHeight} from '../../../constants/Size';

//Image
import ScreenImage from '../../../assets/verificationAssets/Illustration-Tannoi-Apps-04.png';

//Components
import BigButton from '../../../components/publicComponents/Button';
import Recorder from '../../../components/publicComponents/Recorder';
import ErrorMessage from '../../../components/publicComponents/ErrorMessage';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import StepCount from '../../../components/verificationComponent/StepCount';

const calculateHeight = (input) => {
  return (input / 100) * ScreenHeight;
};

const VoiceVerificationScreen = ({navigation}) => {
  const [recordingFile, setRecordingFile] = useState('');
  const [recordingFileValidation, setRecordingFileValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState('');

  const randomWords = ['Candy', 'Apple', 'Spoon', 'Table', 'Soup'];

  const firstName = useSelector((state) => state.VerificationReducer.firstName);
  const lastName = useSelector((state) => state.VerificationReducer.lastName);
  const gender = useSelector((state) => state.VerificationReducer.gender);
  const birthDate = useSelector((state) => state.VerificationReducer.birthDate);
  const street = useSelector((state) => state.VerificationReducer.street);
  const city = useSelector((state) => state.VerificationReducer.city);
  const country = useSelector((state) => state.VerificationReducer.country);
  const postalCode = useSelector(
    (state) => state.VerificationReducer.postalCode,
  );

  const addRecordingFile = (recordingFileInput) => {
    setRecordingFile(recordingFileInput);
  };

  const randomizeWord = () => {
    setWord(randomWords[Math.floor(Math.random() * 5)]);
  };

  useEffect(() => {
    randomizeWord();
  }, []);

  const nextScreen = async () => {
    try {
      if (recordingFile !== '') {
        setIsLoading(true);
        let access_token = await AsyncStorage.getItem('access_token');

        let formData = new FormData();

        const uri = `file://${recordingFile}`;

        let audioParts = uri.split('.');
        let fileType = audioParts[audioParts.length - 1];

        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('gender', gender);
        formData.append('birth_date', `${birthDate}`);
        formData.append('street', street);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('postal_code', postalCode);
        formData.append('verification', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/${fileType}`,
        });

        let submitRequest = await axios({
          method: 'post',
          url: `${BaseUrl}/users/request-verification`,
          headers: {
            'Content-Type': 'multipart/form-data',
            token: access_token,
          },
          data: formData,
        });

        if (submitRequest.data) {
          navigation.navigate('FinishVerificationScreen');
        }
      } else {
        setIsLoading(false);
        recordingFile === ''
          ? setRecordingFileValidation(true)
          : setRecordingFileValidation(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response.data.msg === 'You have to login first') {
        dispatch(userLogout());
      }
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <View style={styles.voiceVerificationScreenContainerStyle}>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonTextStyle}>Back</Text>
            </TouchableOpacity>
          </View>
          <StepCount />
          <View style={styles.imageContainerStyle}>
            <Image source={ScreenImage} style={styles.imageStyle} />
          </View>
          <View style={styles.textContainerStyle}>
            <Text style={styles.boldTextStyle}>
              Lastly, we need to make sure you are not a bot
            </Text>
            <Text style={styles.normalTextStyle}>
              Please say the word below 3 times
            </Text>
          </View>
          <Text style={styles.randomWordStyle}>{word}</Text>
          <View style={{alignItems: 'center', marginTop: '1%'}}>
            {recordingFileValidation && (
              <ErrorMessage message="Please record your voice" />
            )}
          </View>
          <Recorder addRecordingFile={addRecordingFile} isVerification={true} />
        </View>
        <BigButton
          buttonTitle="Submit"
          buttonStyle={
            recordingFile === ''
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
          disableButton={recordingFile === '' && true}
          buttonFunction={nextScreen}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  voiceVerificationScreenContainerStyle: {
    padding: '5%',
    justifyContent: 'space-between',
    flex: 1,
  },

  backButtonTextStyle: {
    color: '#6505E1',
    fontFamily: bold,
    fontSize: 16,
  },

  imageContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%',
    maxHeight: calculateHeight(35),
  },

  imageStyle: {
    resizeMode: 'contain',
    width: '65%',
    height: '85%',
  },

  boldTextStyle: {
    textAlign: 'center',
    fontFamily: bold,
    fontSize: 24,
    paddingBottom: -1.5,
  },

  normalTextStyle: {
    textAlign: 'center',
    fontFamily: normal,
    fontSize: 16
  },

  randomWordStyle: {
    textAlign: 'center',
    fontFamily: bold,
    fontSize: 36,
    marginBottom: -40,
  },
});

export default VoiceVerificationScreen;
