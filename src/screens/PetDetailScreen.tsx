import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function PetDetailScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

 
  const pet = { 
    id: 1, 
    name: 'Jodo', 
    type: 'Dog', 
    breed: 'Golden Retriever', 
    description: 'A friendly and playful dog, loves to fetch balls.', 
    age: 3, 
    weight: '20kg', 
    gender: 'Male', 
    address: '123 Dog St, Barkville', 
    owner: 'John Doe', 
    avatar: 'https://i.pinimg.com/564x/99/33/08/993308c4e2a2f1ab781699d349d65971.jpg', 
    image: 'https://i.pinimg.com/564x/33/ec/02/33ec0258525aac21e84b6d1c76342346.jpg' 
  };

  return (
    <View style={styles.container}>
      {/* Pet Image */}
      <Image source={{ uri: pet.image }} style={styles.petImage} />

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
      <Text style={styles.infoText}>{pet.weight}</Text>
    </View>
  </View>
</View>

      {/* Pet Description */}
      <Text style={styles.descriptionTitle}>About {pet.name}</Text>
      <Text style={styles.descriptionText}>{pet.description}</Text>

      {/* Owner Info */}
<View style={styles.ownerInfoCard}>
  <View style={styles.ownerContainer}>
    <Image source={{ uri: pet.avatar }} style={styles.ownerAvatar} />
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
    </View>
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
    height: '30%', 
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
    marginBottom: 10,  // Add spacing between rows
  },
  infoCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#16A99F1A',
    padding: 15,
    borderRadius: 10,
    width: '48%',  // Adjust width to take 2 cards per row
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
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, //shadow effect
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
