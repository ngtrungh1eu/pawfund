import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function LostFoundScreen({ navigation }) {
  const data = [
    {
      id: 1,
      image: 'https://i.pinimg.com/564x/d9/41/26/d941263cf3299e47d5807d453d8e4491.jpg',
      type: 'Dog',
      description: 'Lost Golden Retriever near the park.',
      dateTime: '2024-10-10',
      contact: 'Contact: 123-456-7890',
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/564x/72/7e/9a/727e9aa9c5988270e7e6ed28baff08a5.jpg',
      type: 'Cat',
      description: 'Found Siamese cat near downtown.',
      dateTime: '2024-10-09',
      contact: 'Contact: 987-654-3210',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardType}>{item.type}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.cardDateTime}>{item.dateTime}</Text>
        <Text style={styles.cardContact}>{item.contact}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput style={styles.searchInput} placeholder="Search Lost & Found" />
        <FontAwesome name="filter" size={20} color="gray" />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => navigation.navigate('FoundandLostForm')} 
      >
        <Text style={styles.reportButtonText}>Report Lost or Found</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardType: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardDateTime: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  cardContact: {
    fontSize: 12,
    color: '#16A99F',
  },
  reportButton: {
    backgroundColor: '#16A99F',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 16,
    right: 16,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
