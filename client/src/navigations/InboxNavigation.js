import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import InboxScreen from '../screens/inboxScreen/InboxScreen';

const Stack = createStackNavigator();

const InboxNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
    </Stack.Navigator>
  );
};

export default InboxNavigation;
