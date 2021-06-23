import React from 'react';
import { TouchableOpacity, Text, NativeModules, Platform } from 'react-native';
import RNSignInWithAppleButton from './SignInWithAppleButtonNativeComponent';
import AppleIcon from '../../assets/publicAssets/appleIcon.svg';
import { medium } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';

const { AppleAuthentication } = NativeModules;



export const SignInWithAppleButton = ({ buttonText = '', callBack, buttonStyle = { borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }, textStyle = { fontWeight: 'normal', fontSize: 18, color: "white", textAlign: 'center', marginTop: 10, marginBottom: 10, marginHorizontal: 20 } }) => {
  if (Platform.OS === 'ios') {
    if (buttonText !== '') {
      return <TouchableOpacity style={buttonStyle} onPress={async () => {
        await appleAuth(callBack);
      }}
      >
        <AppleIcon width='24' height='24' style={{
            position: 'absolute',
            left: '5%',
        }} />
        <Text style={textStyle}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    } else {
      return <RNSignInWithAppleButton style={buttonStyle} onPress={async () => {
        await appleAuth(callBack);
      }}
      />
    }

  } else {
    return null
  }

}
const appleAuth = async (callBack) => {
  await AppleAuthentication.requestAsync({
    requestedScopes: [AppleAuthentication.Scope.FULL_NAME, AppleAuthentication.Scope.EMAIL],
  }).then((response) => {
    callBack(response) //Display response
  }, (error) => {
    callBack(error) //Display error
  });
}

export default AppleAuthentication;