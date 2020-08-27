import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/homeScreens/HomeScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    // <View style={navigationBarContainerStyle}>

    // </View>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//   navigationBarContainerStyle: {
//     height: 83,
//     backgroundColor: "#464D60"
//   }
// });

export default NavigationBar;