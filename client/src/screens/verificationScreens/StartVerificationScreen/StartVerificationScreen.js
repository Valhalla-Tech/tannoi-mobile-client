import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteVerificationData } from '../../../store/actions/VerificationAction';
import { bold, normal } from '../../../assets/FontSize';

//Image
import ScreenImage from '../../../assets/verificationAssets/Illustration-Tannoi-Apps-01.png';

//Component
import BigButton from '../../../components/publicComponents/Button';

const StartVerificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const startButton = () => {
    navigation.navigate('UserProfileVerificationScreen');
  };

  return (
    <View style={styles.startVerificationScreenContainerStyle}>
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              dispatch(deleteVerificationData());
            }}>
            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainerStyle}>
          <Image source={ScreenImage} style={styles.imageStyle} />
        </View>
        <View style={{paddingHorizontal: '2%'}}>
          <Text style={styles.boldTextStyle}>
            Become a verified tannOi user
          </Text>
          <Text style={styles.normalTextStyle}>
            Participate in verified discussions and {'\n'} stand behind your voice
          </Text>
        </View>
      </View>
      <BigButton
        buttonTitle="Start"
        buttonStyle={{
          backgroundColor: '#6505E1',
          color: '#FFFFFF',
          borderWidth: 0,
        }}
        buttonFunction={startButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  startVerificationScreenContainerStyle: {
    padding: '5%',
    height: '100%',
    justifyContent: 'space-between',
  },

  cancelButtonTextStyle: {
    color: '#6505E1',
    fontFamily: bold,
    fontSize: 16,
  },

  imageContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%',
    maxHeight: '55%',
  },

  imageStyle: {
    resizeMode: 'contain',
    width: '65%'
  },

  boldTextStyle: {
    textAlign: 'center',
    fontFamily: bold,
    fontSize: 26,
  },

  normalTextStyle: {
    textAlign: 'center',
    fontFamily: normal,
    fontSize: 16,
  },
});

export default StartVerificationScreen;
