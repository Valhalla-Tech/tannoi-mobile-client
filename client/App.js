import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Provider
} from 'react-redux';
import store from './store';
import {
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

//Navigation
import NavigationIndex from './navigations';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // If the push notification received when the app is open
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={-200}
        behavior="padding"
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="NavigationIndex" component={NavigationIndex} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
};

export default App;
