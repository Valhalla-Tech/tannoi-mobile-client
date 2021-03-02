import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalculateHeight, CalculateWidth } from '../helper/CalculateSize';

//Icons
import HomeIcon from '../assets/homeAssets/homeIcon.svg';
import HomeIconNotActive from '../assets/homeAssets/homeIconNotActive.svg';
import TopicICon from '../assets/topicAssets/topicIcon.svg';
import TopicIconNotActive from '../assets/topicAssets/topicIconNotActive.svg';
import InboxIcon from '../assets/inboxAssets/inboxIcon.svg';
import InboxIconNotActive from '../assets/inboxAssets/inboxIconNotActive.svg';
import MeIcon from '../assets/meAssets/meIcon.svg';
import MeIconNotActive from '../assets/meAssets/meIconNotActive.svg';

//Screen
import HomeScreen from '../screens/homeScreens/HomeScreen';
import TopicIndexScreen from '../screens/topicScreens/TopicIndexScreen';
import InboxScreen from '../screens/inboxScreen/InboxScreen';
import MeScreen from '../screens/meScreens/MeScreen';
import NewDiscussionScreen from '../screens/topicScreens/NewDiscussionScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = (props) => {
  const { navigation } = props;

  const newDiscussionScreenButton = () => {
    return navigation.navigate('NewDiscussionScreen');
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#2B085C',
          paddingVertical: '3%',
        },
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <HomeIcon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Home</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <HomeIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Home</Text>
                </View>
              )}
            </View>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="Topics"
        component={TopicIndexScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TopicICon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Topics</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TopicIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Topics</Text>
                </View>
              )}
            </View>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="new discussion"
        component={NewDiscussionScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <TouchableOpacity
              style={{
                marginBottom: '35%',
                borderWidth: 10,
                height: CalculateWidth(16),
                width: CalculateWidth(12),
                borderRadius: 30,
                backgroundColor: '#2B085C',
                borderColor: '#7817FF',
              }}
              onPress={newDiscussionScreenButton}></TouchableOpacity>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <InboxIcon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Inbox</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <InboxIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Inbox</Text>
                </View>
              )}
            </View>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MeIcon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Me</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MeIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Me</Text>
                </View>
              )}
            </View>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;
