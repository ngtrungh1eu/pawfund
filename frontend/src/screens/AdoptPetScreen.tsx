import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ListPetComponent } from '../components/ListPetComponent';



export function AdoptPetScreen() {
  const navigation = useNavigation();

 
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available for Adoption</Text>
      <ListPetComponent />
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
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
