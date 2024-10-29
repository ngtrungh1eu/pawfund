import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../services/types';
import useAuth from '../hooks/useAuth';
import AddUPISetting from '../screens/AddUPISettingScreen';
import AppTheme from '../screens/AppThemeScreen';
import DonatedHistory from '../screens/DonatedHistoryScreen';
import DonatedTransactionDetails from '../screens/DonatedTransactionDetailsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { HomeScreen } from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NoChat from '../screens/NoChatScreen';
import NoNotifications from '../screens/NoNotificationsScreen';
import Notifications from '../screens/NotificationsScreen';
import NumberVerification from '../screens/NumberVerificationScreen';
import NumberVerificationWithNumber from '../screens/NumberVerificationWithNumberScreen';
import NumberVerificationWithOTP from '../screens/NumberVerificationWithOTPScreen';
import OnboardingScreens from '../screens/OnboardingScreens';
import ProfileSetupComplete from '../screens/ProfileSetupComplete';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SplashScreen from '../screens/SplashScreen';
import SystemSettingsScreen from '../screens/SystemSettingsScreen';
import UPISetting from '../screens/UPISettingScreen';
import VerifyUPISetting from '../screens/VerifyUPISettingScreen';
import LostFoundScreen from '../screens/LostFoundScreen';
import { AdoptPetScreen } from '../screens/AdoptPetScreen';
import LostFoundForm from '../screens/LostFoundForm';
import { PetDetailScreen } from '../screens/PetDetailScreen';
import { TabNavigator } from './TabNavigator';
import { DashboardScreen } from './../screens/shelter/DashboardScreen';
import { RegisterAnimalScreen } from '../screens/shelter/RegisterAnimalScreen';
import ConfirmAdoptionScreen from '../screens/shelter/ConfirmAdoptionScreen';
import { AdoptionHistoryScreen } from '../screens/shelter/AdoptionHistoryScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Set default header option
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        {isAuthenticated ? (
          <>
            {userRole === 'shelter_staff' ? (
              <>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Register Animal" component={RegisterAnimalScreen} />
                <Stack.Screen name="Confirm Adoption" component={ConfirmAdoptionScreen} />
                <Stack.Screen name="Adoption History" component={AdoptionHistoryScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Lost and Found" component={LostFoundScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Adopt a pet" component={AdoptPetScreen} options={{ headerShown: true }} />
                <Stack.Screen name="FoundandLostForm" component={LostFoundForm} options={{ headerShown: true }} />
                <Stack.Screen
                  name="PetDetailScreen"
                  component={PetDetailScreen}
                  options={{ headerShown: true }}
                  initialParams={{ petId: 0 }} // Optional default param
                />
                <Stack.Screen name="DonatedHistory" component={DonatedHistory} />
                <Stack.Screen name="DonatedTransactionDetails" component={DonatedTransactionDetails} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                <Stack.Screen name="AppTheme" component={AppTheme} />
                <Stack.Screen name="UPISetting" component={UPISetting} />
                <Stack.Screen name="AddUPISetting" component={AddUPISetting} />
                <Stack.Screen name="VerifyUPISetting" component={VerifyUPISetting} />
                <Stack.Screen name="NumberVerification" component={NumberVerification} />
                <Stack.Screen name="NumberVerificationWithNumber" component={NumberVerificationWithNumber} />
                <Stack.Screen name="NumberVerificationWithOTP" component={NumberVerificationWithOTP} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="SystemSettings" component={SystemSettingsScreen} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="NoNotifications" component={NoNotifications} />
                <Stack.Screen name="NoChat" component={NoChat} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Register Animal" component={RegisterAnimalScreen} />
                <Stack.Screen name="Confirm Adoption" component={ConfirmAdoptionScreen} />
                <Stack.Screen name="Adoption History" component={AdoptionHistoryScreen} />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreens} />
            <Stack.Screen name="ProfileSetupComplete" component={ProfileSetupComplete} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
