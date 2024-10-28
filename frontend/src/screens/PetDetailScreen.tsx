import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function PetDetailScreen({ route }) {
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get petId from route parameters
  const { petId } = route.params;

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8000/api/pets/${petId}`);
        const data = await response.json();
        setPet(data.data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetail();
  }, [petId]);

  // Return loading indicator if pet data is not yet loaded
  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Pet Image */}
      <Image source={{ uri: pet.images[0] }} style={styles.petImage} />

      {/* Pet Name and Heart Icon */}
      <View style={styles.header}>
        <View style={styles.nameAddressContainer}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petAddress}>{pet.address}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={30}
            color={isFavorite ? 'red' : '#16A99F'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCardsContainer}>
        <View style={styles.row}>
          <View style={styles.infoCard}>
            <FontAwesome name="birthday-cake" size={24} color="#16A99F" />
            <Text style={styles.infoText}>{pet.age} years</Text>
          </View>
          <View style={styles.infoCard}>
            <FontAwesome name="paw" size={24} color="#16A99F" />
            <Text style={styles.infoText}>{pet.breed}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.infoCard}>
            <FontAwesome name="venus-mars" size={24} color="#16A99F" />
            <Text style={styles.infoText}>{pet.gender}</Text>
          </View>
          <View style={styles.infoCard}>
            <FontAwesome name="balance-scale" size={24} color="#16A99F" />
            <Text style={styles.infoText}>{pet.size}</Text>
            {/* Updated from weight to size */}
          </View>
        </View>
      </View>

      {/* Pet Description */}
      <Text style={styles.descriptionTitle}>About {pet.name}</Text>
      <Text style={styles.descriptionText}>{pet.description}</Text>

      {/* Owner Info */}
      <View style={styles.ownerInfoCard}>
        <View style={styles.ownerContainer}>
          <Image source={{ uri: pet.ownerAvatar }} style={styles.ownerAvatar} />
          {/* Updated from avatar to ownerAvatar */}
          <Text style={styles.ownerText}>Owner: {pet.owner}</Text>
        </View>

        {/* Icons for Phone and Message */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesome name="phone" size={24} color="#16A99F" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesome name="envelope" size={24} color="#16A99F" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  petImage: {
    width: '100%',
    height: 300, // Fixed height for better display
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameAddressContainer: {
    flexDirection: 'column',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A99F',
  },
  petAddress: {
    fontSize: 16,
    color: '#666',
  },
  infoCardsContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Add spacing between rows
  },
  infoCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#16A99F1A',
    padding: 15,
    borderRadius: 10,
    width: '48%', // Adjust width to take 2 cards per row
  },
  infoText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16A99F',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  ownerInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Shadow effect
    marginBottom: 50,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  ownerText: {
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
