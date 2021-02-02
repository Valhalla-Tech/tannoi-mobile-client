import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { bold, normal } from '../../../assets/FontSize';

//Icon
import TickIcon from '../../../assets/verificationAssets/tickIcon.svg';

//Component
import BigButton from '../../../components/publicComponents/Button';

const FinishVerificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const nextButton = () => {
    dispatch(clearHome());
    dispatch(getHome());
    navigation.navigate('MainAppNavigation');
  };

  return (
    <View style={styles.finishVerificationScreenContainerStyle}>
      <View>
        <View style={styles.iconContainerStyle}>
          <TickIcon />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.boldTextStyle}>Verified!</Text>
          <Text style={styles.normalTextStyle}>
            You are now a verified tannOi user. We can’t wait to hear what you
            have to say
          </Text>
        </View>
      </View>
      <BigButton
        buttonTitle="Done"
        buttonStyle={{
          color: '#FFFFFF',
          backgroundColor: '#6505E1',
          borderWidth: 0,
          marginTop: '60%',
        }}
        buttonFunction={nextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  finishVerificationScreenContainerStyle: {
    padding: '5%',
    justifyContent: 'space-between',
    height: '100%',
  },

  iconContainerStyle: {
    alignItems: 'center',
    paddingTop: '30%',
  },

  textContainerStyle: {
    paddingTop: '10%',
  },

  boldTextStyle: {
    textAlign: 'center',
    fontFamily: bold,
    fontSize: 24,
  },

  normalTextStyle: {
    textAlign: 'center',
    fontFamily: normal,
  },
});

export default FinishVerificationScreen;
