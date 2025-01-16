import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import LandingPage from "./Pages/LandingPage";
import Places from "./Pages/Places";
import DetailsPage from "./Pages/DetailsPage";
import ProfilePage from "./Pages/ProfilePage";
import LocationSearch from "./Components/LocationSearch";
import DetailsScreen from "./Screens/DetailsScreen";
import LoginScreen from "./Pages/LoginScreen";
import SignupScreen from "./Pages/SignupScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Places") iconName = "map-marker";
        else if (route.name === "Search") iconName = "search";
        else if (route.name === "Profile") iconName = "user";
        else if (route.name === "Landing") iconName = "home";

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "brown",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Landing" component={LandingPage} />
    <Tab.Screen name="Places" component={Places} />
    <Tab.Screen name="Search" component={LocationSearch} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

// Root Navigator to include Login, Signup, and Tabs
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Login and Signup screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        {/* Main app with tabs */}
        <Stack.Screen
          name="Landing"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* DetailsPage screen */}
        <Stack.Screen
          name="DetailsPage"
          component={DetailsPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}