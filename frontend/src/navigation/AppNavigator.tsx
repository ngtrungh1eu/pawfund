import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreens from "../screens/OnboardingScreens";
import ProfileSetupComplete from "../screens/ProfileSetupComplete";
import React from "react";
import SplashScreen from "../screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreens}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileSetupComplete"
              component={ProfileSetupComplete}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
