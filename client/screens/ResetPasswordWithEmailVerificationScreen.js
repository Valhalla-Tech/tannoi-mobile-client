import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import BackButton from '../components/PublicComponent/BackButton';

const ResetPasswordWithEmailVerificationScreen = ({navigation }) => {
  return (
    <View style={styles.resetPasswordWithEmailVerificationScreenContainerStyle}>
      <BackButton navigation={navigation} />
      <Text style={styles.resetPasswordWithEmailVerificationTitleStyle}>Email has been sent</Text>
      <Text style={styles.resetPasswordWithEmailVerificationScreenInstructionStyle}>
        Please check your inbox and click in the received link to reset your password.
      </Text>
      <View style={styles.sendAgainEmailContainerStyle}>
        <Text style={styles.sendAgainEmailButtonTitleStyle}>Didn’t receive the link? </Text>
        <TouchableOpacity>
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