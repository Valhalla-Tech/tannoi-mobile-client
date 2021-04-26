import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { userLogin, userLogout } from '../store/actions/LoginAction';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import axios from '../constants/ApiServices';
import BaseUrl from '../constants/BaseUrl';
import { Platform } from 'react-native';
import branch from 'react-native-branch';

//Navigations
import AccountNavigation from './AccountNavigation';
import VerificationNavigation from './VerificationNavigation';
import CommunitiesNavigation from './CommunitiesNavigation';
import MainAppNavigation from './NavigationBar';

//Screens
import NewDiscussionScreen from '../screens/topicScreens/NewDiscussionScreen';
import DiscussionScreen from '../screens/topicScreens/DiscussionScreen';
import ResponseScreen from '../screens/topicScreens/ResponseScreen';
import UserProfileScreen from '../screens/meScreens/UserProfileScreen';
import SearchScreen from '../screens/homeScreens/SearchScreen';
import TopicDetailScreen from '../screens/topicScreens/TopicDetailScreen';
import SettingsScreen from '../screens/meScreens/SettingsScreen';
import EditProfileScreen from '../screens/meScreens/EditProfileScreen';
import HomeSectionDetailScreen from '../screens/homeScreens/HomeSectionDetailScreen';
import HashtagDetailScreen from '../screens/homeScreens/HashtagDetailScreen';
import NotificationSettingsScreen from '../screens/meScreens/NotificationSettingsScreen';
import BlockedUsersScreen from '../screens/meScreens/BlockedUsersScreen';

const Stack = createStackNavigator();
let subscribeInit = false;

const NavigationIndex = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  const messagingPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNotificationOpenedApp = () => {
    // If the push notification received when the app is minimize
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.push(
        remoteMessage.data.screen,
        JSON.parse(remoteMessage.data.payload),
      );
    });
  };

  const getInitialNotification = () => {
    // If the push notification received when the app is close
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.push(
            remoteMessage.data.screen,
            JSON.parse(remoteMessage.data.payload),
          );
        }
      });
  };

  const saveTokenToDatabase = async (fcmToken) => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      const { data } = await axios({
        method: 'POST',
        url: BaseUrl + '/users/add-firebase-token',
        data: {
          token: fcmToken,
          device: Platform.OS,
        },
        headers: {
          token: access_token,
        },
      });
      await AsyncStorage.setItem('fcm_token', fcmToken);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDeviceToken = () => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
        return saveTokenToDatabase(token);
      });
    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      console.log(token);
      saveTokenToDatabase(token);
    });
  };

  const branchSubscribe = async () => {
    try {
      let getToken = await AsyncStorage.getItem('access_token');
      branch.subscribe(({ error, params, uri }) => {
        if (error) {
          console.error('Error from Branch: ' + error);
        }

        // params will never be null if error is null

        if (params['+non_branch_link']) {
          // Route non-Branch URL if appropriate.
        }

        if (!params['+clicked_branch_link']) {
          // Indicates initialization success and some other conditions.
          // No link was opened.
        }

        if (params.screen !== undefined && getToken) {
          let payload = JSON.parse(params.payload);
          if (params.screen === 'UserProfileScreen') {
            payload = { ...payload, fromDeepLink: true };
          }
          navigation.push(params.screen, payload);
        } else if (
          params.screen !== undefined &&
          params.screen === 'CreateNewPasswordScreen'
        ) {
          navigation.navigate(params.screen, JSON.parse(params.payload));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkToken = async () => {
    let getToken = await AsyncStorage.getItem('access_token');
    if (getToken) {
      dispatch(userLogin());
      // onNotificationOpenedApp();
      // getInitialNotification();
      getDeviceToken();
      if (!subscribeInit) {
        subscribeInit = true;
        branchSubscribe();
        onNotificationOpenedApp();
        getInitialNotification();
      }
    } else if (!getToken) {
      branchSubscribe();
      dispatch(userLogout());
      SplashScreen.hide();
    }
    messagingPermission();
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="MainAppNavigation"
            component={MainAppNavigation}
          />
          <Stack.Screen
            name="NewDiscussionScreen"
            component={NewDiscussionScreen}
          />
          <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
          <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
          />
          <Stack.Screen
            name="VerificationNavigation"
            component={VerificationNavigation}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="TopicDetailScreen"
            component={TopicDetailScreen}
          />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen
            name="HomeSectionDetailScreen"
            component={HomeSectionDetailScreen}
          />
          <Stack.Screen
            name="HashtagDetailScreen"
            component={HashtagDetailScreen}
          />
          <Stack.Screen
            name="NotificationSettingsScreen"
            component={NotificationSettingsScreen}
          />
          <Stack.Screen
            name="CommunitiesNavigation"
            component={CommunitiesNavigation}
          />
          <Stack.Screen
            name="BlockedUsersScreen"
            component={BlockedUsersScreen}
          />
        </>
      ) : (
        <Stack.Screen name="AccountNavigation" component={AccountNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationIndex;
