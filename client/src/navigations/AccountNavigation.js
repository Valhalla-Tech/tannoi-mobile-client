import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import WelcomeScreen from '../screens/accountScreens/WelcomeScreen';
import RegisterScreen from '../screens/accountScreens/RegisterScreen';
import EnterYourProfileScreen from '../screens/accountScreens/EnterYourProfileScreen';
import FollowSomeTopicsScreen from '../screens/accountScreens/FollowSomeTopicsScreen';
import LoginScreen from '../screens/accountScreens/LoginScreen';
import LoginWithEmailScreen from '../screens/accountScreens/LoginWithEmailScreen';
import ResetPasswordWithEmailScreen from '../screens/accountScreens/ResetPasswordWithEmailScreen';
import ResetPasswordWithEmailVerificationScreen from '../screens/accountScreens/ResetPasswordWithEmailVerificationScreen';
import CreateNewPasswordScreen from '../screens/accountScreens/CreateNewPasswordScreen';

const Stack = createStackNavigator();

const AccountNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="EnterYourProfileScreen"
        component={EnterYourProfileScreen}
      />
      <Stack.Screen
        name="FollowSomeTopicsScreen"
        component={FollowSomeTopicsScreen}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="LoginWithEmailScreen"
        component={LoginWithEmailScreen}
      />
      <Stack.Screen
        name="ResetPasswordWithEmailScreen"
        component={ResetPasswordWithEmailScreen}
      />
      <Stack.Screen
        name="ResetPasswordWithEmailVerificationScreen"
        component={ResetPasswordWithEmailVerificationScreen}
      />
      <Stack.Screen
        name="CreateNewPasswordScreen"
        component={CreateNewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
