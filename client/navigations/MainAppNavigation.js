import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from '../screens/homeScreens/HomeScreen';

const Stack = createStackNavigator();

const MainAppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default MainAppNavigation;