import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import WelcomeScreen from './screens/WelecomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import EnterYourProfileScreen from './screens/EnterYourProfileScreen';
import FollowSomeTopicsScreen from './screens/FollowSomeTopicsScreen';
import LoginScreen from './screens/LoginScreen';
import LoginWithEmailScreen from './screens/LoginWithEmailScreen';
import ResetPasswordWithEmailScreen from './screens/ResetPasswordWithEmailScreen';
import ResetPasswordWithEmailVerificationScreen from './screens/ResetPasswordWithEmailVerificationScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';

const Stack = createStackNavigator();

const App = () => {
  const linking = {
    prefixes: ['https://tannoi.com', 'tannoi://'],
    config: {
      screens: {
        CreateNewPasswordScreen: 'createnewpassword'
      }
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="EnterYourProfileScreen" component={EnterYourProfileScreen} />
        <Stack.Screen name="FollowSomeTopicsScreen" component={FollowSomeTopicsScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginWithEmailScreen" component={LoginWithEmailScreen} />
        <Stack.Screen name="ResetPasswordWithEmailScreen" component={ResetPasswordWithEmailScreen} />
        <Stack.Screen name="ResetPasswordWithEmailVerificationScreen" component={ResetPasswordWithEmailVerificationScreen} />
        <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
