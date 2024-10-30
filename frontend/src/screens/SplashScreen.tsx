import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated, role } = useAuth();
  console.log('role', role);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the main app after a delay
      if (isAuthenticated) {
        if (role == 'shelter_staff') {
          navigation.navigate('ResetPassword' as never);
        } else if (role == 'customer') {
          navigation.navigate('Main' as never);
        }
        return;
      } else {
        navigation.navigate('Login' as never);
      }
    }, 2000); // Adjust the delay as needed (2 seconds in this example)

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated, role]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash-screen.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
