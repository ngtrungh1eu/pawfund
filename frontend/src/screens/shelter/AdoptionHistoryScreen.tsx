import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing icons, assuming you're using Expo

const adoptionHistoryData = [
  { id: '1', name: 'Buddy', adopter: 'John Doe', date: '2023-09-15' },
  { id: '2', name: 'Mittens', adopter: 'Jane Smith', date: '2023-09-10' }
];

export function AdoptionHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adoption History</Text>
      <FlatList
        data={adoptionHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Ionicons name="paw" size={24} color="#16A99F" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.adopterText}>
                Adopted by <Text style={styles.adopter}>{item.adopter}</Text>
              </Text>
              <Text style={styles.date}>on {item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16A99F1A', // Light background color
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16A99F',
    marginBottom: 20,
    textAlign: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  adopterText: {
    fontSize: 16,
    color: '#555',
  },
  adopter: {
    fontWeight: 'bold',
    color: '#16A99F',
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});