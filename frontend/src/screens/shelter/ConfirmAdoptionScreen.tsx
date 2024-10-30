import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';

interface AdoptionRequest {
    id: string;
    petName: string;
    adopterName: string;
    adopterEmail: string;
    shelterName: string;
    status: string;
}

export default function ConfirmAdoptionScreen() {
    const [requests, setRequests] = useState<AdoptionRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false); // State for dialog visibility
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
        null
    ); // State to store the selected request ID
    const [reason, setReason] = useState(''); // State to store rejection reason
    const API_URL = 'http://10.0.2.2:8000/api/adoptions/';

    // Fetch adoption requests
    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('access_token');
                if (!token) {
                    Alert.alert(
                        'Error',
                        'No token found. Please log in again.'
                    );
                    return;
                }

                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const adoptionData = response.data.data.map(
                    (adoption: any) => ({
                        id: adoption._id,
                        petName: adoption.pet.name,
                        adopterName: adoption.customer.username,
                        adopterEmail: adoption.customer.email,
                        shelterName: adoption.shelter.name,
                        status: adoption.status,
                    })
                );

                setRequests(adoptionData);
            } catch (error) {
                console.error('Error fetching adoption requests:', error);
                Alert.alert('Error', 'Could not fetch adoption requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptionRequests();
    }, []);

    // Handle Accepting
    const handleAccept = async (id: string) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Error', 'No token found. Please log in again.');
                return;
            }

            await axios.put(
                `${API_URL}${id}`,
                { status: 'approved' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== id)
            );
            Alert.alert('Success', 'Adoption request approved.');
        } catch (error) {
            console.error('Error accepting adoption request:', error);
            Alert.alert('Error', 'Could not approve adoption request.');
        }
    };

    // Handle Rejecting
    const handleReject = (id: string) => {
        setSelectedRequestId(id); // Set the selected request ID
        setDialogVisible(true); // Show the dialog
    };

    const handleConfirmReject = async () => {
        if (reason) {
            try {
                const token = await AsyncStorage.getItem('access_token');
                if (!token) {
                    Alert.alert(
                        'Error',
                        'No token found. Please log in again.'
                    );
                    return;
                }

                await axios.put(
                    `${API_URL}${selectedRequestId}`,
                    {
                        status: 'rejected',
                        rejectionReason: reason,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setRequests((prevRequests) =>
                    prevRequests.filter(
                        (request) => request.id !== selectedRequestId
                    )
                );
                Alert.alert('Success', 'Adoption request rejected.');
            } catch (error) {
                console.error('Error rejecting adoption request:', error);
                Alert.alert('Error', 'Could not reject adoption request.');
            } finally {
                setDialogVisible(false);
                setReason(''); // Reset reason after submission
                setSelectedRequestId(null); // Clear the selected request ID
            }
        }
    };

    const renderRequestItem = ({ item }: { item: AdoptionRequest }) => (
        <View style={styles.card}>
            <Text style={styles.petName}>Pet Name: {item.petName}</Text>
            <Text>Adopter Name: {item.adopterName}</Text>
            <Text>Adopter Email: {item.adopterEmail}</Text>
            <Text>Shelter: {item.shelterName}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAccept(item.id)}
                >
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(item.id)}
                >
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Show loading
    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Filter requests with status 'pending'
    const pendingRequests = requests.filter(
        (request) => request.status === 'pending'
    );

    // Show "No Data" message if there are no pending requests
    if (pendingRequests.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <MaterialIcons name="hourglass-empty" size={50} color="gray" />
                <Text style={styles.noDataText}>
                    No Pending Adoption Requests Available
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Adoption Requests</Text>
            <FlatList
                data={pendingRequests}
                keyExtractor={(item) => item.id}
                renderItem={renderRequestItem}
            />

            {/* Dialog for rejection reason */}
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Reject Adoption Request</Dialog.Title>
                <Dialog.Description>
                    Please provide a reason for rejection:
                </Dialog.Description>
                <Dialog.Input
                    label="Reason"
                    value={reason}
                    onChangeText={setReason}
                />
                <Dialog.Button
                    label="Cancel"
                    onPress={() => setDialogVisible(false)}
                />
                <Dialog.Button label="Confirm" onPress={handleConfirmReject} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#16A99F',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    petName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        marginTop: 10,
        color: 'gray',
    },
});
