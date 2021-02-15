import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import CommunitiesScreen from '../screens/communitiesScreens/CommunitiesScreen';
import BrowseCommunityScreen from '../screens/communitiesScreens/BrowseCommunityScreen';
import CommunityProfileScreen from '../screens/communitiesScreens/CommunityProfileScreen';
import NewCommunityDiscussionScreen from '../screens/communitiesScreens/NewCommunityDiscussionScreen';
import CreateCommunityNavigation from './CreateCommunityNavigation';
import MemberRequestScreen from '../screens/communitiesScreens/MemberRequestScreen'

const Stack = createStackNavigator();

const CommunitiesNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CommunitiesScreen"
        component={CommunitiesScreen}
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
      <Stack.Screen
        name="MemberRequestScreen"
        component={MemberRequestScreen}
      />
    </Stack.Navigator>
  );
};

export default CommunitiesNavigation;
