import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { Event } from '../types';

type EventDetailScreenProps = {
    route: {
        params: {
            event: Event;
        };
    };
};

const EventDetailScreen = ({ route }: EventDetailScreenProps) => {
    const { event } = route.params;

    // State để quản lý modal và số tiền quyên góp
    const [isModalVisible, setModalVisible] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');

    const handleDonate = () => {
        console.log('Donate to event:', event.title);
        console.log('Donation Amount:', donationAmount);
        // Đóng modal sau khi quyên góp
        setModalVisible(false);
        setDonationAmount(''); // Reset lại số tiền quyên góp
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image
                    source={{ uri: event.images[0] }}
                    style={styles.eventImage}
                />
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>

                <View style={styles.detailContainer}>
                    <Text style={styles.subHeader}>Event Details</Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Type:</Text>{' '}
                        {event.eventType}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Start:</Text>{' '}
                        {new Date(event.startDate).toLocaleString()}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>End:</Text>{' '}
                        {new Date(event.endDate).toLocaleString()}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Location:</Text>{' '}
                        {event.location.name}, {event.location.address.street},{' '}
                        {event.location.address.city},{' '}
                        {event.location.address.state},{' '}
                        {event.location.address.zipCode},{' '}
                        {event.location.address.country}
                    </Text>
                </View>

                <View style={styles.organizerContainer}>
                    <Text style={styles.subHeader}>Organizer</Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Name:</Text>{' '}
                        {event.organizer.name}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Email:</Text>{' '}
                        {event.organizer.email}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Phone:</Text>{' '}
                        {event.organizer.phoneNumber}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Description:</Text>{' '}
                        {event.organizer.description}
                    </Text>
                </View>

                <View style={styles.fundingContainer}>
                    <Text style={styles.subHeader}>Funding Status</Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Target Amount:</Text> $
                        {event.targetFundAmount}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Current Amount:</Text>{' '}
                        ${event.currentFundAmount}
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.donateButton}
                onPress={() => setModalVisible(true)} // Mở modal khi nhấn nút Donate
            >
                <Text style={styles.donateButtonText}>Donate</Text>
            </TouchableOpacity>

            {/* Modal Quyên Góp */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        Donate to {event.title}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        value={donationAmount}
                        onChangeText={setDonationAmount}
                    />
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleDonate}
                    >
                        <Text style={styles.confirmButtonText}>
                            Confirm Donation
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 80,
    },
    eventImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    eventTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    eventDescription: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    detailContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
    },
    detailText: {
        fontSize: 16,
        marginVertical: 5,
        color: '#333',
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    organizerContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    fundingContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 8,
    },
    donateButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#4caf50',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    donateButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền trong suốt
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        width: '80%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
    },
    confirmButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EventDetailScreen;
