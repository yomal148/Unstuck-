import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThoughtScreen from './src/screens/ThoughtScreen' // adjust path if needed

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Thought">
        <Stack.Screen
          name="Thought"
          component={ThoughtScreen}
          options={{ title: 'Share Your Thought' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
