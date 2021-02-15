import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import CommunityScreen from '../screens/communitiesScreens/CommunityScreen';
import BrowseCommunityScreen from '../screens/communitiesScreens/BrowseCommunityScreen';
import CommunityProfileScreen from '../screens/communitiesScreens/CommunityProfileScreen';
import NewCommunityDiscussionScreen from '../screens/communitiesScreens/NewCommunityDiscussionScreen';
import CreateCommunityNavigation from './CreateCommunityNavigation';

const Stack = createStackNavigator();

const CommunitiesNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
      />
      <Stack.Screen
        name="CreateCommunityNavigation"
        component={CreateCommunityNavigation}
      />
      <Stack.Screen
        name="BrowseCommunityScreen"
        component={BrowseCommunityScreen}
      />
      <Stack.Screen
        name="CommunityProfileScreen"
        component={CommunityProfileScreen}
      />
      <Stack.Screen
        name="NewCommunityDiscussionScreen"
        component={NewCommunityDiscussionScreen}
      />
    </Stack.Navigator>
  );
};

export default CommunitiesNavigation;
