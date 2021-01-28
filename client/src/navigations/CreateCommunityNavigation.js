import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import CommunityNameScreen from '../screens/communitiesScreens/CommunityNameScreen';
import CommunityDescriptionScreen from '../screens/communitiesScreens/CommunityDescriptionScreen';
import CommunityGuidelineScreen from '../screens/communitiesScreens/CommunityGuidelineScreen';
import CreateCommunityTopicScreen from '../screens/communitiesScreens/CreateCommunityTopicScreen';

const Stack = createStackNavigator();

const CreateCommunityNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CommunityNameScreen"
        component={CommunityNameScreen}
      />
      <Stack.Screen
        name="CommunityDescriptionScreen"
        component={CommunityDescriptionScreen}
      />
      <Stack.Screen
        name="CommunityGuidelineScreen"
        component={CommunityGuidelineScreen}
      />
      <Stack.Screen
        name="CreateCommunityTopicScreen"
        component={CreateCommunityTopicScreen}
      />
    </Stack.Navigator>
  );
};

export default CreateCommunityNavigation;
