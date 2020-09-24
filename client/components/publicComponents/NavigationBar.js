import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import HomeIcon from '../../assets/homeAssets/homeIcon.svg';
import HomeIconNotActive from '../../assets/homeAssets/homeIconNotActive.svg';
import TopicICon from '../../assets/topicAssets/topicIcon.svg';
import TopicIconNotActive from '../../assets/topicAssets/topicIconNotActive.svg';
import NewDiscussionButton from '../../assets/topicAssets/newDiscussionButton.svg';
import InboxIcon from '../../assets/inboxAssets/inboxIcon.svg';
import InboxIconNotActive from '../../assets/inboxAssets/inboxIconNotActive.svg';
import MeIcon from '../../assets/meAssets/meIcon.svg';
import MeIconNotActive from '../../assets/meAssets/meIconNotActive.svg';

//Navigations
import HomeNavigation from '../../navigations/HomeNavigation';
import TopicNavigation from '../../navigations/TopicNavigation';
import InboxNavigation from '../../navigations/InboxNavigation';
import MeNavigation from '../../navigations/MeNavigation';

const Tab = createBottomTabNavigator();

const NavigationBar = props => {
  const { navigation } = props;

  const newDiscussionScreenButton = () => {
    navigation.navigate('DiscussionScreen');
  };

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
          tabBarIcon: ({focused}) => (
            <>
              {
                focused ? (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <HomeIcon />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Home</Text>
                  </View>
                ) : (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <HomeIconNotActive />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Home</Text>
                  </View>
                )
              }
            </>
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
          tabBarIcon: ({focused}) => (
            <>
              {
                focused ? (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <TopicICon />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Topic</Text>
                  </View>
                ) : (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <TopicIconNotActive />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Topic</Text>
                  </View>
                )
              }
            </>
          ),
          style: {
            color: "#FFFFFF"
          }
        }}
      />
      <Tab.Screen 
        name="new discussion" 
        component={newDiscussionScreenButton}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <TouchableOpacity 
              style={{justifyContent: "center", alignItems: "center", position: "absolute", bottom: 10}} 
              onPress={newDiscussionScreenButton}
            >
              <NewDiscussionButton />
            </TouchableOpacity>
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
          tabBarIcon: ({focused}) => (
            <>
              {
                focused ? (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <InboxIcon />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Inbox</Text>
                  </View>
                ) : (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <InboxIconNotActive />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Inbox</Text>
                  </View>
                )
              }
            </>
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
          tabBarIcon: ({focused}) => (
            <>
              {
                focused ? (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <MeIcon />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Me</Text>
                  </View>
                ) : (
                  <View style={{justifyContent: "center", alignItems: "center"}}>
                    <MeIconNotActive />
                    <Text style={{color: "#FFFFFF", fontSize: 10}}>Me</Text>
                  </View>
                )
              }
            </>
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