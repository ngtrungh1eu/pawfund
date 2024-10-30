import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import { login as apiLogin, logout as apiLogout } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
interface CustomJwtPayload extends JwtPayload {
    userId: string;
    username: string;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const initializeAuth = async () => {
            await AsyncStorage.removeItem('access_token');
            setIsAuthenticated(false);
            setUserRole(null);

            const token = await AsyncStorage.getItem('access_token');
            if (token) {
                try {
                    const decoded = jwtDecode<CustomJwtPayload>(token);
                    setIsAuthenticated(true);
                    setUserRole(decoded.role);
                    navigateToRole(decoded.role);
                } catch (error) {
                    console.log('Error decoding token', error);
                    await AsyncStorage.removeItem('access_token');
                }
            }
        };
        initializeAuth();
    }, []);

    const navigateToRole = (role: string) => {
        if (role === 'shelter_staff') {
            navigation.navigate('Dashboard' as never);
        } else if (role === 'customer') {
            navigation.navigate('Main' as never);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await apiLogin(username, password);
            if (response && response.success) {
                const accessToken = response.accessToken;
                await AsyncStorage.setItem('access_token', accessToken);

                const decoded = jwtDecode<CustomJwtPayload>(accessToken);
                await AsyncStorage.setItem('username', decoded.username);
                setUserRole(decoded.role);
                setIsAuthenticated(true);
                navigateToRole(decoded.role);
            } else {
                setIsAuthenticated(false);
                Alert.alert('Login Error', 'Invalid credentials');
            }
        } catch (error: any) {
            setIsAuthenticated(false);
            if (error.message === 'Network Error') {
                Alert.alert(
                    'Login Error',
                    'Cannot connect to the server. Please check your internet connection.'
                );
            } else {
                Alert.alert('Login Error', error.message);
            }
        }
    };

    const logout = async () => {
        try {
            await apiLogout();
            await AsyncStorage.clear();
            setIsAuthenticated(false);
            setUserRole(null);
            Alert.alert('Logged out', 'You have successfully logged out.');
        } catch (error) {
            console.error('Logout Error:', error);
            Alert.alert('Logout Error', 'An error occurred during logout.');
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, userRole, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
