// PetCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const PetCard = ({
    name,
    breed,
    image,
    isFavorite,
    onFavoriteToggle,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={onFavoriteToggle}
                >
                    <FontAwesome
                        name={isFavorite ? 'heart' : 'heart-o'}
                        size={24}
                        color={isFavorite ? 'red' : '#16A99F'}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.breed}>{breed}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        width: 150,
        elevation: 2, // Add shadow effect for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    breed: {
        fontSize: 14,
        color: '#666',
    },
});
