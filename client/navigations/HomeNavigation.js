import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from '../screens/homeScreens/HomeScreen';
import SearchScreen from '../screens/homeScreens/SearchScreen';

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen 
        name="SearchScreen" 
        component={SearchScreen} options={{
          animationEnabled: false
        }} 
      />
    </Stack.Navigator>
  )
};

export default HomeNavigation;