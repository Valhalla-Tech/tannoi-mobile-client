import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import HomeIcon from '../../assets/homeAssets/homeIcon.svg';

//Navigations
import HomeNavigation from '../../navigations/HomeNavigation';

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
    </Tab.Navigator>
  );
};

export default NavigationBar;