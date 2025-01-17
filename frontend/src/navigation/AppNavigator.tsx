import AddUPISetting from "../screens/AddUPISettingScreen";
import AppTheme from "../screens/AppThemeScreen";
import DonatedHistory from "../screens/DonatedHistoryScreen";
import DonatedTransactionDetails from "../screens/DonatedTransactionDetailsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import { HomeScreen } from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import NoChat from "../screens/NoChatScreen";
import NoNotifications from "../screens/NoNotificationsScreen";
import Notifications from "../screens/NotificationsScreen";
import NumberVerification from "../screens/NumberVerificationScreen";
import NumberVerificationWithNumber from "../screens/NumberVerificationWithNumberScreen";
import NumberVerificationWithOTP from "../screens/NumberVerificationWithOTPScreen";
import OnboardingScreens from "../screens/OnboardingScreens";
import ProfileSetupComplete from "../screens/ProfileSetupComplete";
import React from "react";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import SplashScreen from "../screens/SplashScreen";
import SystemSettingsScreen from "../screens/SystemSettingsScreen";
import UPISetting from "../screens/UPISettingScreen";
import VerifyUPISetting from "../screens/VerifyUPISettingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import LostFoundScreen from "../screens/LostFoundScreen";
import { AdoptPetScreen } from "../screens/AdoptPetScreen";
import LostFoundForm from "../screens/LostFoundForm";
import { PetDetailScreen } from "../screens/PetDetailScreen";
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import { DashboardScreen } from "./../screens/shelter/DashboardScreen";
import { RegisterAnimalScreen } from "./../screens/shelter/RegisterAnimalScreen";
import ConfirmAdoptionScreen from "./../screens/shelter/ConfirmAdoptionScreen";
import { AdoptionHistoryScreen } from "../screens/shelter/AdoptionHistoryScreen";
import { EventsScreen } from "../screens/EventsScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import PetHistoryScreen from "../screens/PetHistoryScreen";
import { useAuth } from "../context/AuthProvider";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Lost and Found"
              component={LostFoundScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Adopt a pet"
              component={AdoptPetScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="FoundandLostForm"
              component={LostFoundForm}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="PetDetailScreen"
              component={PetDetailScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="DonatedHistory"
              component={DonatedHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DonatedTransactionDetails"
              component={DonatedTransactionDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileInfoScreen"
              component={ProfileInfoScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Events"
              component={EventsScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="EventDetail"
              component={EventDetailScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="AppTheme"
              component={AppTheme}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UPISetting"
              component={UPISetting}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddUPISetting"
              component={AddUPISetting}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyUPISetting"
              component={VerifyUPISetting}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NumberVerification"
              component={NumberVerification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NumberVerificationWithNumber"
              component={NumberVerificationWithNumber}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NumberVerificationWithOTP"
              component={NumberVerificationWithOTP}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SystemSettings"
              component={SystemSettingsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NoNotifications"
              component={NoNotifications}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PetHistoryScreen"
              component={PetHistoryScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="NoChat"
              component={NoChat}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register Animal"
              component={RegisterAnimalScreen}
            />
            <Stack.Screen
              name="Confirm Adoption"
              component={ConfirmAdoptionScreen}
            />
            <Stack.Screen
              name="Adoption History"
              component={AdoptionHistoryScreen}
            />
          </>
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
    </>
  );
};

export default AppNavigator;
