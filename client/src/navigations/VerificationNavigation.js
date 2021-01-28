import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import StartVerificationScreen from '../screens/verificationScreens/StartVerificationScreen';
import UserProfileVerificationScreen from '../screens/verificationScreens/UserProfileVerificationScreen';
import UserAddressVerificationScreen from '../screens/verificationScreens/UserAddressVerificationScreen';
import VoiceVerificationScreen from '../screens/verificationScreens/VoiceVerificationScreen';
import FinishVerificationScreen from '../screens/verificationScreens/FinishVerificationScreen';

const Stack = createStackNavigator();

const VerificationNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="StartVerificationScreen"
        component={StartVerificationScreen}
      />
      <Stack.Screen
        name="UserProfileVerificationScreen"
        component={UserProfileVerificationScreen}
      />
      <Stack.Screen
        name="UserAddressVerificationScreen"
        component={UserAddressVerificationScreen}
      />
      <Stack.Screen
        name="VoiceVerificationScreen"
        component={VoiceVerificationScreen}
      />
      <Stack.Screen
        name="FinishVerificationScreen"
        component={FinishVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default VerificationNavigation;
