import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';

//Image
import VerificationScreenImage from '../../assets/verificationAssets/verificationScreenImage.svg';

//Component
import BigButton from '../../components/publicComponents/BigButton';

const StartVerificationScreen = ({ navigation }) => {
  const startButton = () => {
    navigation.navigate('UserProfileVerificationScreen')
  };

  return (
    <View style={styles.startVerificationScreenContainerStyle}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainerStyle}>
        <VerificationScreenImage />
      </View>
      <View style={styles.textContainerStyle}>
        <Text style={styles.boldTextStyle}>Become a verified TannOi user</Text>
        <Text style={styles.normalTextStyle}>
          Participate in verified discussions and {"\n"} stand behind what you say
        </Text>
      </View>
      <BigButton
        buttonTitle="Start"
        buttonStyle={{
          backgroundColor: "#6505E1",
          color: "#FFFFFF",
          borderWidth: 0,
          marginTop: "50%"
        }}
        buttonFunction={startButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  startVerificationScreenContainerStyle: {
    padding: "5%"
  },

  cancelButtonTextStyle: {
    color: "#6505E1",
    fontFamily: bold,
    fontSize: 16
  },

  imageContainerStyle: {
    alignItems: "center",
    paddingTop: "5%"
  },

  textContainerStyle: {
    paddingTop: "10%"
  },

  boldTextStyle: {
    textAlign: "center",
    fontFamily: bold,
    fontSize: 20
  },

  normalTextStyle: {
    textAlign: "center",
    fontFamily: normal
  }
});

export default StartVerificationScreen;