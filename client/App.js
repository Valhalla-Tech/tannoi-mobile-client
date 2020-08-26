import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Navigations
import AccountNavigation from './navigations/AccountNavigation';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="AccountNavigation" component={AccountNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
