import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Provider
} from 'react-redux';
import store from './store';

// //Navigation
import NavigationIndex from './navigations/NavigationIndex';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="NavigationIndex" component={NavigationIndex} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
