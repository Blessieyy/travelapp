import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import LandingPage from './Pages/LandingPage';
import Places from './Pages/Places';
import DetailsPage from './Pages/DetailsPage';
import ProfilePage from './Pages/ProfilePage';
import LocationSearch from './Components/LocationSearch';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a Stack for the "Places" navigation
const PlacesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Places" component={Places} />
    <Stack.Screen name="Details" component={DetailsPage} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Places') iconName = 'map-marker';
            else if (route.name === 'Search') iconName = 'search';
            else if (route.name === 'Profile') iconName = 'user';
            else if (route.name === 'Landing') iconName = 'home';

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Landing" component={LandingPage} />
        <Tab.Screen name="Places" component={PlacesStack} />
        <Tab.Screen name="Search" component={LocationSearch} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
