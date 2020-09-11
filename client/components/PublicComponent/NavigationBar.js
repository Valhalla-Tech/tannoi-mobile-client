import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import HomeIcon from '../../assets/homeAssets/homeIcon.svg';
import NewDiscussionButton from '../../assets/topicAsset/newDiscussionButton.svg';

//Navigations
import HomeNavigation from '../../navigations/HomeNavigation';
import TopicNavigation from '../../navigations/TopicNavigation';
import InboxNavigation from '../../navigations/InboxNavigation';
import MeNavigation from '../../navigations/MeNavigation';

//Screen
import NewDiscussionScreen from '../../screens/topicScreens/NewDiscussionScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#464D60",
          height: 65,
          padding: 5
        },
        keyboardHidesTabBar: true
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <HomeIcon />
              <Text style={{color: "#FFFFFF", fontSize: 10}}>Home</Text>
            </View>
          ),
          style: {
            color: "#FFFFFF"
          }
        }}
      />
      <Tab.Screen 
        name="Topics" 
        component={TopicNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <HomeIcon />
              <Text style={{color: "#FFFFFF", fontSize: 10}}>Topics</Text>
            </View>
          ),
          style: {
            color: "#FFFFFF"
          }
        }}
      />
      <Tab.Screen 
        name="new discussion" 
        component={NewDiscussionScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={{justifyContent: "center", alignItems: "center", position: "absolute", bottom: 10}}>
              <NewDiscussionButton />
            </View>
          ),
          style: {
            color: "#FFFFFF"
          }
        }}
      />
      <Tab.Screen 
        name="Inbox" 
        component={InboxNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <HomeIcon />
              <Text style={{color: "#FFFFFF", fontSize: 10}}>Inbox</Text>
            </View>
          ),
          style: {
            color: "#FFFFFF"
          }
        }}
      />
      <Tab.Screen 
        name="Me" 
        component={MeNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <HomeIcon />
              <Text style={{color: "#FFFFFF", fontSize: 10}}>Me</Text>
            </View>
          ),
          style: {
            color: "#FFFFFF"
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;