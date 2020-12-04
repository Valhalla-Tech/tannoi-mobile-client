import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Provider
} from 'react-redux';
import store from './store';
import {
  KeyboardAvoidingView
} from 'react-native';

//Navigation
import NavigationIndex from './navigations';

const Stack = createStackNavigator();

const App = () => {
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
