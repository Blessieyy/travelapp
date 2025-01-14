import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './Pages/LandingPage';
import Places from './Pages/Places';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="places">
       <Stack.Screen name="landingPage" component={LandingPage} />
       <Stack.Screen name="places" component={Places} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;