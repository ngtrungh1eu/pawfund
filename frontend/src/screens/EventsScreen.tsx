import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Event } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export function EventsScreen() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    'http://10.0.2.2:8000/api/events/'
                );
                const data: Event[] = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const renderEventItem = ({ item }: { item: Event }) => {
        const organizer = item.organizer;

        return (
            <TouchableOpacity
                style={styles.eventCard}
                onPress={() =>
                    navigation.navigate('EventDetail', { event: item })
                } // Navigate to EventDetail screen
            >
                <View style={styles.header}>
                    <View>
                        {organizer ? (
                            <>
                                <Text style={styles.userName}>
                                    {organizer.name}
                                </Text>
                                <Text style={styles.eventType}>
                                    {item.eventType}
                                </Text>
                            </>
                        ) : (
                            <Text style={styles.userName}>
                                No organizer available
                            </Text>
                        )}
                    </View>
                </View>

                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.eventImage}
                />

                <View style={styles.cardContent}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text style={styles.eventDescription}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#16A99F" />
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderEventItem}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    eventCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventType: {
        color: 'gray',
    },
    eventImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    cardContent: {
        marginBottom: 10,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#16A99F',
        marginBottom: 5,
    },
    eventDescription: {
        color: '#000',
    },
});

export default EventsScreen;
