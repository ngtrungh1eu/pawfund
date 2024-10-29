import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { usePetContext } from '../utils/PetContext';
import { SwipeListView } from 'react-native-swipe-list-view';

export function FavoritesScreen({ navigation }) {
    const { favorites, toggleFavorite, removeAllFavorites } = usePetContext();
    const [petsData, setPetsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoritePets = async () => {
            try {
                const response = await fetch('http://10.0.2.2:8000/api/pets');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonResponse = await response.json();
                const pets = jsonResponse.data;
                const favoritePets = pets.filter((pet) =>
                    favorites.includes(pet._id)
                );

                setPetsData(favoritePets);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritePets();
    }, [favorites]);

    const confirmRemoveAll = () => {
        Alert.alert('Remove All', 'Do you want to remove all favorite pets?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Confirm', onPress: () => removeAllFavorites() },
        ]);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate('PetDetailScreen', { petId: item._id })
            }
        >
            <Image source={{ uri: item.images[0] }} style={styles.petImage} />
            <View style={styles.cardContent}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petBreed}>{item.breed}</Text>
                <View style={styles.infoRow}>
                    <FontAwesome name="paw" size={16} color="#16A99F" />
                    <Text style={styles.infoText}>{item.age} years</Text>
                    <FontAwesome name="venus-mars" size={16} color="#16A99F" />
                    <Text style={styles.infoText}>{item.gender}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderHiddenItem = ({ item }) => (
        <View style={styles.hiddenContainer}>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => toggleFavorite(item._id)}
            >
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#16A99F" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {petsData.length > 1 && (
                <TouchableOpacity
                    style={styles.removeAllButton}
                    onPress={confirmRemoveAll}
                >
                    <Text style={styles.removeAllButtonText}>Remove All</Text>
                </TouchableOpacity>
            )}
            {petsData.length === 0 ? (
                <Text style={styles.emptyMessage}>
                    No favorite pets found. Add some by clicking on the heart
                    icon on the pet details screen.
                </Text>
            ) : (
                <SwipeListView
                    data={petsData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={0}
                    rightOpenValue={-95}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    removeAllButton: {
        backgroundColor: '#FF3D00',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    removeAllButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    petImage: {
        width: 100,
        height: 100,
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    petName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    petBreed: {
        fontSize: 14,
        color: '#555',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    infoText: {
        marginLeft: 5,
    },
    hiddenContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FF3D00',
        padding: 30,
        borderRadius: 8,
    },
    removeButton: {
        backgroundColor: '#FF3D00',
        borderRadius: 8,
        paddingVertical: 10,
        // paddingHorizontal: 15,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 18,
        color: 'red',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#777',
    },
});
