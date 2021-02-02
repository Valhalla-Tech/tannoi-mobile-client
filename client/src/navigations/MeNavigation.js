import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import MeScreen from '../screens/meScreens/MeScreen';

const Stack = createStackNavigator();

const MeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MeScreen" component={MeScreen} />
    </Stack.Navigator>
  );
};

export default MeNavigation;
