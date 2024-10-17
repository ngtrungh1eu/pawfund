import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PetCard } from './PetCard';
import { useNavigation } from '@react-navigation/native';

export function ListPetComponent() {
  const [selectedType, setSelectedType] = useState<'All' | 'Dog' | 'Cat' | 'Bird' | 'Others'>('All');
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
 
  const pets = [
    { 
      id: 1, 
      name: 'Jodo', 
      type: 'Dog', 
      breed: 'Golden Retriever', 
      description: 'A friendly and playful dog, loves to fetch balls.', 
      age: 3, 
      weight: '20kg', 
      gender: 'Male', 
      address: 'abc 123 street',
      owner: 'John Doe', 
      avatar: 'https://example.com/avatar1.jpg', 
      image: 'https://i.pinimg.com/564x/33/ec/02/33ec0258525aac21e84b6d1c76342346.jpg' 
    },
    { 
      id: 2, 
      name: 'Whiskers', 
      type: 'Cat', 
      breed: 'Abyssinian', 
      description: 'An active and curious cat that loves to explore.', 
      age: 2, 
      weight: '5kg', 
      gender: 'Female', 
      address: 'abc 123 street',
      owner: 'Jane Doe', 
      avatar: 'https://example.com/avatar2.jpg', 
      image: 'https://i.pinimg.com/564x/98/fa/73/98fa73fba3520fecdd89930f40d23bc9.jpg' 
    },
    { 
      id: 3, 
      name: 'Bella', 
      type: 'Dog', 
      breed: 'Bulldog', 
      description: 'A loyal and protective dog, loves to lounge around.', 
      age: 4, 
      weight: '23kg', 
      gender: 'Female', 
      address: 'abc 123 street',
      owner: 'Michael Johnson', 
      avatar: 'https://example.com/avatar3.jpg', 
      image: 'https://i.pinimg.com/564x/0b/15/d2/0b15d20cc893d7be0c5c864564567960.jpg' 
    },
    { 
      id: 4, 
      name: 'Shadow', 
      type: 'Cat', 
      breed: 'Siamese', 
      description: 'A calm and affectionate cat, loves to stay near you.', 
      age: 3, 
      weight: '4.5kg', 
      gender: 'Male', 
      address: 'abc 123 street',
      owner: 'Emily Stone', 
      avatar: 'https://example.com/avatar4.jpg', 
      image: 'https://i.pinimg.com/564x/72/7e/9a/727e9aa9c5988270e7e6ed28baff08a5.jpg' 
    },
    { 
      id: 5, 
      name: 'Rocky', 
      type: 'Dog', 
      breed: 'Pug', 
      description: 'A small but energetic dog, always happy to see people.', 
      age: 2, 
      weight: '8kg', 
      gender: 'Male', 
      address: 'abc 123 street',
      owner: 'Sarah Lee', 
      avatar: 'https://example.com/avatar5.jpg', 
      image: 'https://i.pinimg.com/564x/d9/41/26/d941263cf3299e47d5807d453d8e4491.jpg' 
    },
    { 
      id: 6, 
      name: 'Simba', 
      type: 'Cat', 
      breed: 'Maine Coon', 
      description: 'A large and fluffy cat, loves to be the center of attention.', 
      age: 5, 
      weight: '6.5kg', 
      gender: 'Male', 
      owner: 'David Green', 
      address: 'abc 123 street',
      avatar: 'https://example.com/avatar6.jpg', 
      image: 'https://i.pinimg.com/564x/d4/3a/b6/d43ab6bf0bd18e37abf03cace8c7857a.jpg' 
    },
    { 
      id: 7, 
      name: 'Coco', 
      type: 'Dog', 
      breed: 'Labrador', 
      description: 'A friendly dog with a love for water and playing fetch.', 
      age: 3, 
      weight: '22kg', 
      gender: 'Female', 
      address: 'abc 123 street',
      owner: 'Alice Brown', 
      avatar: 'https://example.com/avatar7.jpg', 
      image: 'https://i.pinimg.com/564x/47/da/d2/47dad2bc350f4fbebce3eeb3ea2761ef.jpg' 
    }
  ];
  
  const petTypes = [
    { type: 'All', icon: 'paw', label: 'All' },
    { type: 'Dog', icon: 'dog', label: 'Dogs' },
    { type: 'Cat', icon: 'cat', label: 'Cats' },
    { type: 'Bird', icon: 'twitter', label: 'Birds' },
    { type: 'Others', icon: 'question', label: 'Others' },
  ];

  const filteredPets = selectedType === 'All' ? pets : pets.filter(pet => pet.type === selectedType);
  const petsToShow = showMore ? filteredPets : filteredPets.slice(0, 6);

  const renderPetTypeIcons = () => (
    <View style={styles.typeIconContainer}>
      {petTypes.map((petType) => (
        <TouchableOpacity
          key={petType.type}
          style={[
            styles.iconContainer,
            selectedType === petType.type && styles.selectedIconContainer,
          ]}
          onPress={() => setSelectedType(petType.type)}
        >
          <FontAwesome name={petType.icon} size={24} color={selectedType === petType.type ? '#fff' : '#16A99F'} />
          <Text style={selectedType === petType.type ? styles.selectedIconText : styles.iconText}>
            {petType.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPetsList = () => (
    <FlatList
    data={petsToShow}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('PetDetailScreen')}>
        <PetCard name={item.name} breed={item.breed} image={item.image} />
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id.toString()}
    numColumns={3}
    columnWrapperStyle={styles.columnWrapper}
  />
);

  return (
    <View style={styles.container}>
      {/* Render pet type icons */}
      {renderPetTypeIcons()}

      {/* Render filtered pet list */}
      {renderPetsList()}

      <TouchableOpacity
        style={styles.showMoreButton}
        onPress={() => setShowMore(!showMore)}
      >
        <Text style={styles.showMoreText}>{showMore ? 'Show Less' : 'Show More'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  typeIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedIconContainer: {
    backgroundColor: '#16A99F',
  },
  iconText: {
    marginTop: 5,
    color: '#16A99F',
  },
  selectedIconText: {
    color: '#fff',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  showMoreButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  showMoreText: {
    color: '#16A99F',
    fontWeight: 'bold',
  },
});
