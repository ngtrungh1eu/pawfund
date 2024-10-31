import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';

const SplashScreen = () => {
    const navigation = useNavigation();
    const { isAuthenticated, userRole } = useAuth();
    console.log('user role', userRole);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                if (userRole === 'shelter_staff') {
                    navigation.navigate('Dashboard' as never);
                } else if (userRole === 'customer') {
                    navigation.navigate('Main' as never);
                }
            } else {
                navigation.navigate('Login' as never);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation, isAuthenticated, userRole]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/splash-screen.jpg')}
                style={styles.logo}
                resizeMode="contain"
            />
            <ActivityIndicator size="large" color="#0000ff" />
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
        marginBottom: 20,
    },
});

export default SplashScreen;
