import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

//Component
import BackButton from '../../components/PublicComponent/BackButton';

const ResetPasswordWithEmailVerificationScreen = ({ route, navigation }) => {

  const {url} = route.params;

  const resendEmail = async () => {
    let resetPasswordRequest =  await axios.post('https://dev.entervalhalla.tech/api/tannoi/v1/users/password/send-reset-token', {
      link: url
    });
    if (resetPasswordRequest.data.msg === 'Success') {
      console.log(`resend email: ${resetPasswordRequest.data.msg}`);
    };
  };

  return (
    <View style={styles.resetPasswordWithEmailVerificationScreenContainerStyle}>
      <BackButton navigation={navigation} />
      <Text style={styles.resetPasswordWithEmailVerificationTitleStyle}>Email has been sent</Text>
      <Text style={styles.resetPasswordWithEmailVerificationScreenInstructionStyle}>
        Please check your inbox and click in the received link to reset your password.
      </Text>
      <View style={styles.sendAgainEmailContainerStyle}>
        <Text style={styles.sendAgainEmailButtonTitleStyle}>Didn’t receive the link? </Text>
        <TouchableOpacity
          onPress={resendEmail}
        >
          <Text style={styles.sendAgainEmailButtonStyle}>Send again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resetPasswordWithEmailVerificationScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: 24
  },

  resetPasswordWithEmailVerificationTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold"
  },

  resetPasswordWithEmailVerificationScreenInstructionStyle: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#73798C"
  },

  sendAgainEmailContainerStyle: {
    flexDirection: "row",
    marginTop: 32
  },

  sendAgainEmailButtonTitleStyle: {
    color:"#73798C"
  },

  sendAgainEmailButtonStyle: {
    color: "#2f3dfa"
  }
});

export default ResetPasswordWithEmailVerificationScreen;