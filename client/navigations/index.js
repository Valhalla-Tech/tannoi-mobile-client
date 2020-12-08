import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { userLogin, userLogout } from '../store/actions/LoginAction';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import axios from "../constants/ApiServices"
import BaseUrl from "../constants/BaseUrl";
import { Platform } from "react-native";

//Navigations
import AccountNavigation from './AccountNavigation';
import MainAppNavigation from './MainAppNavigation';
import VerificationNavigation from '../navigations/VerificationNavigation';

//Screens
import NewDiscussionScreen from '../screens/topicScreens/NewDiscussionScreen';
import DiscussionScreen from '../screens/topicScreens/DiscussionScreen';
import ResponseScreen from '../screens/topicScreens/ResponseScreen';
import UserProfile from '../screens/meScreens/UserProfile';

const Stack = createStackNavigator();

const NavigationIndex = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.LoginReducer.isLoggedIn);
  const dispatch = useDispatch();

  const onNotificationOpenedApp = () => {
    // If the push notification received when the app is minimize
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.push(remoteMessage.data.screen, JSON.parse(remoteMessage.data.payload));
    });
  }
  const getInitialNotification = () => {
    // If the push notification received when the app is close
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.push(remoteMessage.data.screen, JSON.parse(remoteMessage.data.payload));
        }
      });
  }

  const saveTokenToDatabase = async (fcmToken) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      const { data } = await axios({
        method: "POST",
        url: BaseUrl + "/users/add-firebase-token",
        data: {
          token: fcmToken,
          device: Platform.OS
        },
        headers: {
          token: access_token
        }
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const getDeviceToken = () => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log(token)
        return saveTokenToDatabase(token);
      });
      // Listen to whether the token changes
      return messaging().onTokenRefresh(token => {
      console.log(token)
      saveTokenToDatabase(token);
    });
  }
  const checkToken = async () => {
    let getToken = await AsyncStorage.getItem('access_token');
    if (getToken) {
      dispatch(userLogin());
      onNotificationOpenedApp();
      getInitialNotification();
      getDeviceToken();
    } else if (!getToken) {
      dispatch(userLogout());
      SplashScreen.hide();
    }; 
  };

  useEffect(() => {
    checkToken();
  }, [isLoggedIn])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        isLoggedIn ? (
          <>
            <Stack.Screen name="MainAppNavigation" component={MainAppNavigation} />
            <Stack.Screen name="NewDiscussionScreen" component={NewDiscussionScreen} />
            <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
            <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="VerificationNavigation" component={VerificationNavigation} />
          </>
        ) : (
          <Stack.Screen name="AccountNavigation" component={AccountNavigation} />
        )
      }
    </Stack.Navigator>
  );
};

export default NavigationIndex;