import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import WelcomeScreen from './screens/WelecomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import EnterYourProfileScreen from './screens/EnterYourProfileScreen';
import FollowSomeTopicsScreen from './screens/FollowSomeTopicsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="EnterYourProfileScreen" component={EnterYourProfileScreen} />
        <Stack.Screen name="FollowSomeTopicsScreen" component={FollowSomeTopicsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
