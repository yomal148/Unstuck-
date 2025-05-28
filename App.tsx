import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThoughtScreen from './src/screens/ThoughtScreen/ThoughtScreen.tsx' 
import ThoughtHistory from './src/screens/ThoughtScreen/ThoughtHistory.tsx';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Thought">
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
