import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import useAuth from '../hooks/useAuth';
import { ActivityIndicator } from 'react-native-paper';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();

    const validateUsername = (text: string) => {
        if (!text) {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }
        setUsername(text);
    };

    const validatePassword = (text: string) => {
        if (!text) {
            setPasswordError('Password is required');
        } else if (text.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
        setPassword(text);
    };

    const handleLogin = async () => {
        let hasError = false;

        // Kiểm tra username
        if (!username) {
            setUsernameError('Username is required');
            hasError = true;
        } else {
            setUsernameError('');
        }

        // Kiểm tra password
        if (!password) {
            setPasswordError('Password is required');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) {
            Alert.alert(
                'Error',
                'Please correct the errors before logging in.'
            );
            return;
        }
        setIsLoading(true);
        try {
            await login(username, password);
        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('Main' as never);
        }
    }, [isAuthenticated, navigation]);
    const handleSignUp = () => {
        navigation.navigate('Onboarding' as never);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/imgLogin.jpg')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <View
                        style={[
                            styles.inputWrapper,
                            usernameError ? styles.inputError : null,
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.input,
                                usernameError ? styles.inputError : null,
                            ]}
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={validateUsername}
                            keyboardType="default"
                        />
                        <Ionicons
                            name="at"
                            size={24}
                            color={usernameError ? '#BE1447' : '#16A99F'}
                            style={styles.inputIcon}
                        />
                    </View>
                    {usernameError ? (
                        <Text style={styles.errorText}>{usernameError}</Text>
                    ) : null}

                    <Text style={[styles.label, { marginTop: 15 }]}>
                        Password
                    </Text>
                    <View
                        style={[
                            styles.inputWrapper,
                            passwordError ? styles.inputError : null,
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.input,
                                passwordError ? styles.inputError : null,
                            ]}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={validatePassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color={passwordError ? '#BE1447' : '#ccc'}
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text>You don't have any account? </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signupText}>Sign Up Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: -174,
        marginBottom: 23,
        alignSelf: 'center',
        width: 545,
        height: 545,
        borderRadius: 999999999,
        backgroundColor: '#16A99F',
    },
    image: {
        width: 477,
        height: 528,
        resizeMode: 'cover',
        borderRadius: 999999999,
    },
    inputContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 42,
        borderColor: '#848484',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 8,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#333',
    },
    inputIcon: {
        marginHorizontal: 5,
    },
    inputError: {
        borderColor: '#BE1447',
        color: '#BE1447',
    },
    errorText: {
        color: '#BE1447',
        marginBottom: 10,
        fontSize: 12,
        fontWeight: '400',
    },
    forgotPassword: {
        color: '#000000',
        textAlign: 'right',
        marginTop: 15,
        marginBottom: 20,
        fontSize: 14,
        fontWeight: '400',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 39,
    },
    button: {
        backgroundColor: '#16A99F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: '#16A99F',
    },
});
