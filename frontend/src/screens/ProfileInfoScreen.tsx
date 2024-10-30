import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type UserProfile = {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
    };
};

const ProfileInfoScreen = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                const response = await axios.get(
                    'http://10.0.2.2:8000/api/auth/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
                if (response.data) {
                    setUsername(response.data.username);
                    setEmail(response.data.email);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setPhoneNumber(response.data.phoneNumber);
                    setAddress(response.data.address);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                Alert.alert('Error', 'Failed to fetch profile data');
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            await axios.put(
                'http://10.0.2.2:8000/api/auth/profile',
                {
                    username,
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert.alert('Success', 'Profile information saved successfully');
        } catch (error) {
            console.error('Error saving profile information:', error);
            Alert.alert('Error', 'Failed to save profile information');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Street"
                            value={address.street}
                            onChangeText={(text) =>
                                setAddress({ ...address, street: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            value={address.city}
                            onChangeText={(text) =>
                                setAddress({ ...address, city: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="State"
                            value={address.state}
                            onChangeText={(text) =>
                                setAddress({ ...address, state: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Country"
                            value={address.country}
                            onChangeText={(text) =>
                                setAddress({ ...address, country: text })
                            }
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        paddingHorizontal: 15,
    },
    backButton: {
        padding: 0,
    },
    navbarTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 10,
        color: '#16A99F',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#16A99F',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default ProfileInfoScreen;
