import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import axios from 'axios';

//Components
import BackButton from '../components/PublicComponent/BackButton';
import FormInput from '../components/PublicComponent/FormInput';
import LoginButton from '../components/PublicComponent/BigButton';

const CreateNewPasswordScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');

  const { token } = route.params;

  const inputNewPassword = newPasswordData => {
    setNewPassword(newPasswordData);
  };

  const inputConfirmPassword = confirmPasswordData => {
    setConfrimPassword(confirmPasswordData);
  };

  const submitNewPassword = async () => {
    try {
      if (newPassword === confirmPassword) {
        let submitNewPasswordRequest = await axios.post(`https://dev.entervalhalla.tech/api/tannoi/v1/users/password/reset?token=${token}`, {
          new_password: newPassword
        });

        console.log(submitNewPasswordRequest.data.msg);

        Alert.alert(
          'Reset Password Success',
          'Reset Password success, welcome to Tannoi',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            { text: 'OK', onPress: () => navigation.navigate('WelcomeScreen') }
          ],
          { cancelable: false }
        );
      };
    }  catch (error) {
      console.log(error)
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.createNewPasswordScreenContainerStyle}>
        <BackButton navigation={navigation} />
        <Text style={styles.createNewPasswordTitleStyle}>
          Create new password
        </Text>
        <View>
          <FormInput 
            formInputTitle="New password"
            dataInput={inputNewPassword}
          />
          <FormInput 
            formInputTitle="Confirm new password"
            dataInput={inputConfirmPassword}
          />
        </View>
        <View style={{height: 50}}>
          <LoginButton
            buttonTitle="Change Password & Login"
            buttonStyle={
              {
                backgroundColor: "#5152D0",
                borderColor: "#5152D0",
                color: "#FFFFFF",
                width: "100%",
                height: "100%"
              }
            }
            buttonType="functionButton"
            buttonFunction={submitNewPassword}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createNewPasswordScreenContainerStyle: {
    flex: 1,
    paddingHorizontal: 24
  },

  createNewPasswordTitleStyle: {
    color: "#464D60",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16
  },
});

export default CreateNewPasswordScreen;