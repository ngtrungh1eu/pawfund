import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { PetCard } from '../components/PetCard';

const pets = [
  { 
    id: 1, 
    name: 'Dhanu', 
    breed: 'Eastern Cottontail', 
    image: 'https://i.pinimg.com/736x/c6/54/5d/c6545dc6c66433ff932af4ace7b98735.jpg' 
  },
  { 
    id: 2, 
    name: 'Jodo', 
    breed: 'Golden Retriever', 
    image: 'https://i.pinimg.com/564x/58/1b/a4/581ba442f15a313f6a38aa7db80cc113.jpg' 
  },
  { 
    id: 3, 
    name: 'Bella', 
    breed: 'Bulldog', 
    image: 'https://i.pinimg.com/564x/0b/15/d2/0b15d20cc893d7be0c5c864564567960.jpg' 
  },
  { 
    id: 4, 
    name: 'Whiskers', 
    breed: 'Abyssinian Cat', 
    image: 'https://i.pinimg.com/564x/98/fa/73/98fa73fba3520fecdd89930f40d23bc9.jpg' 
  }
];

export function FavoritesScreen() {
  return (
    <View style={styles.container}>
     {/* <Text style={styles.heading}>Favorites</Text> */}
      <FlatList
        data={pets}
        renderItem={({ item }) => (
          <PetCard name={item.name} breed={item.breed} image={item.image} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}  // Display 3 cards in each row
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between', // Ensures equal spacing between cards
    marginBottom: 20,
  },
});
