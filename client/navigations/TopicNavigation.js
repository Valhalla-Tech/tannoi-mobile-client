import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import TopicIndexScreen from '../screens/topicScreens/TopicIndexScreen';
import NewDiscussionScreen from '../screens/topicScreens/NewDiscussionScreen';

const Stack = createStackNavigator();

const TopicNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="TopicIndexScreen" component={TopicIndexScreen} />
      {/* <Stack.Screen name="NewDiscussionScreen" component={NewDiscussionScreen} /> */}
    </Stack.Navigator>
  )
};

export default TopicNavigation;