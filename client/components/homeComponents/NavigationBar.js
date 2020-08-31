import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import HomeIcon from '../../assets/homeAssets/homeIcon.svg';

//Screens
import HomeScreen from '../../screens/homeScreens/HomeScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#464D60",
          height: 65,
          padding: 5
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
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