import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalculateHeight, CalculateWidth } from '../helper/CalculateSize';
import { setHomeButtonProperties, setMeButtonProperties, setNewDiscussionButtonProperties, setInboxButtonProperties, setTopicButtonProperties } from '../store/actions/CoachMarkAction';

import AddDiscussionButton from '../components/elements/AddDiscussionButton';
import MenuIcon from '../components/elements/MenuIcon';

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
  const addDiscussionButtonRef = useRef();
  const homeMenuRef = useRef();
  const topicMenuRef = useRef();
  const inboxMenuRef = useRef();
  const meMenuRef = useRef();
  const dispatch = useDispatch();
  const newDiscussionScreenButton = () => {
    return navigation.navigate('NewDiscussionScreen');
  };

  return (
    <>
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#2B085C',
          paddingVertical: '3%',
          zIndex: 99,
        },
        keyboardHidesTabBar: true,
        // ref={tabNavRef}
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <MenuIcon ref={homeMenuRef} onLayout={event => {
              homeMenuRef.current.measure( async (fx, fy, width, height, px, py) => {
                await dispatch(setHomeButtonProperties({
                    x: CalculateWidth(1),
                    y: CalculateHeight(90),
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }));
              });
            }}>
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
            </MenuIcon>
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
            <MenuIcon ref={topicMenuRef} onLayout={event => {
              topicMenuRef.current.measure( async (fx, fy, width, height, px, py) => {
                await dispatch(setTopicButtonProperties({
                    x: CalculateWidth(20),
                    y: CalculateHeight(90),
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }));
              });
            }}>
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
            </MenuIcon>
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
            <AddDiscussionButton ref={addDiscussionButtonRef} onLayout={e => {
              addDiscussionButtonRef.current.measureInWindow( async (x, y, width, height) => {
                await dispatch(setNewDiscussionButtonProperties({
                  x: CalculateWidth(39),
                  y: CalculateHeight(85),
                  height: 120,
                  width: 80,
                  borderRadius: 40,
                }));
              });
            }} onPress={newDiscussionScreenButton} />
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
            <MenuIcon ref={inboxMenuRef} onLayout={event => {
              inboxMenuRef.current.measure( async (fx, fy, width, height, px, py) => {
                await dispatch(setInboxButtonProperties({
                    x: CalculateWidth(60),
                    y: CalculateHeight(90),
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }));
              });
            }}>
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
            </MenuIcon>
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
            <MenuIcon ref={meMenuRef} onLayout={event => {
              meMenuRef.current.measure( async (fx, fy, width, height, px, py) => {
                await dispatch(setMeButtonProperties({
                    x: CalculateWidth(80),
                    y: CalculateHeight(90),
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }));
              });
            }}>
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
            </MenuIcon>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
    </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create ({
})

export default NavigationBar;
