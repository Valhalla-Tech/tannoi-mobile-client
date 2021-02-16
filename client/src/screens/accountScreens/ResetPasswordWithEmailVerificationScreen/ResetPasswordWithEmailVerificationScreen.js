import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

//Component
import BackButton from '../../../components/publicComponents/BackButton';

const ResetPasswordWithEmailVerificationScreen = ({ route, navigation }) => {
  const [countNumber, setCountNumber] = useState(60);

  const { url } = route.params;

  const sendEmailCounter = () => {
    let counter = 60;

    let startCounter = setInterval(() => {
      counter = counter - 1;
      setCountNumber(counter);

      if (counter === 0) {
        clearInterval(startCounter);
        counter = 60;
      }
    }, 1000);
  };

  const resendEmail = async () => {
    try {
      sendEmailCounter();
      let resetPasswordRequest = await axios.post(
        `${BaseUrl}/users/password/send-reset-token`,
        {
          link: url,
        },
      );
      if (resetPasswordRequest.data.msg === 'Success') {
        console.log(`resend email: ${resetPasswordRequest.data.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.resetPasswordWithEmailVerificationScreenContainerStyle}>
      <BackButton navigation={navigation} />
      <Text style={styles.resetPasswordWithEmailVerificationTitleStyle}>
        Email has been sent
      </Text>
      <Text
        style={styles.resetPasswordWithEmailVerificationScreenInstructionStyle}>
        Please check your inbox and click in the received link to reset your
        password.
      </Text>
      <View style={styles.sendAgainEmailContainerStyle}>
        <Text style={styles.sendAgainEmailButtonTitleStyle}>
          Didn’t receive the link?{' '}
        </Text>
        <TouchableOpacity
          onPress={resendEmail}
          disabled={countNumber !== 60 && countNumber !== 0 ? true : false}>
          <Text
            style={
              countNumber !== 60 && countNumber !== 0
                ? { ...styles.sendAgainEmailButtonStyle, color: '#a1a5ab' }
                : styles.sendAgainEmailButtonStyle
            }>
            Send again
          </Text>
        </TouchableOpacity>
        <Text style={styles.counterTextStyle}>
          {countNumber !== 60 && countNumber !== 0 && ` (${countNumber})`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resetPasswordWithEmailVerificationScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: '5.5%',
  },

  resetPasswordWithEmailVerificationTitleStyle: {
    color: '#464D60',
    fontSize: CalculateHeight(3.5),
    fontFamily: bold,
  },

  resetPasswordWithEmailVerificationScreenInstructionStyle: {
    marginTop: '5%',
    fontSize: CalculateHeight(2),
    fontFamily: normal,
    lineHeight: 24,
    color: '#73798C',
  },

  sendAgainEmailContainerStyle: {
    flexDirection: 'row',
    marginTop: '8%',
  },

  sendAgainEmailButtonTitleStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(2),
    fontFamily: normal,
  },

  sendAgainEmailButtonStyle: {
    color: '#2f3dfa',
    fontSize: CalculateHeight(2),
    fontFamily: normal,
  },

  counterTextStyle: {
    color: '#2f3dfa',
    fontSize: CalculateHeight(2),
    fontFamily: bold,
  },
});

export default ResetPasswordWithEmailVerificationScreen;
