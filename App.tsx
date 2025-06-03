import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThoughtScreen from './src/screens/ThoughtScreen/ThoughtScreen.tsx' 
import ThoughtHistory from './src/screens/ThoughtScreen/ThoughtHistory.tsx';
// Update the import path and filename to match your actual file structure and casing
import SignUpScreen from './src/screens/SignUpScreen/SignUp.tsx';
import LandingPage from './src/screens/LandingPageScreen/LandingPage.tsx';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage} 
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Thought"
          component={ThoughtScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={ThoughtHistory}
          options={{ headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
