import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { userLogin, userLogout } from '../store/actions/LoginAction';

//Navigations
import AccountNavigation from './AccountNavigation';
import MainAppNavigation from './MainAppNavigation';

const Stack = createStackNavigator();

const NavigationIndex = () => {
  const [isToken, setIsToken] = useState('');

  const isLoggedIn = useSelector(state => state.LoginReducer.isLoggedIn);
  const dispatch = useDispatch();

  const checkToken = async () => {
    let getToken = await AsyncStorage.getItem('access_token');
    if (getToken) {
      setIsToken(true)
    } else {
      setIsToken(false)
    };
  };

  const changeLoginStatus = () => {
    if (isToken) {
      dispatch(userLogin());
    } else {
      dispatch(userLogout());
    }
  }

  useEffect(() => {
    AsyncStorage.clear();
    checkToken();
    changeLoginStatus();
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        isLoggedIn ? (
          <Stack.Screen name="MainAppNavigation" component={MainAppNavigation} />
        ) : (
          <Stack.Screen name="AccountNavigation" component={AccountNavigation} />
        )
      }
    </Stack.Navigator>
  );
};

export default NavigationIndex;