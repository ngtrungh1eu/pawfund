import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const adoptionRequests = [
  {
    id: '1',
    petName: 'Buddy',
    adopterName: 'John Doe',
    adopterEmail: 'johndoe@example.com',
    shelterName: 'Happy Paws Shelter',
    adoptionFee: 150,
    notes: 'Looking forward to taking care of Buddy!',
    status: 'pending',
  },
  {
    id: '2',
    petName: 'Mittens',
    adopterName: 'Jane Smith',
    adopterEmail: 'janesmith@example.com',
    shelterName: 'Furry Friends Shelter',
    adoptionFee: 200,
    notes: 'I have a great home for Mittens!',
    status: 'pending',
  },
];

interface AdoptionRequest {
  id: string;
  petName: string;
  adopterName: string;
  adopterEmail: string;
  shelterName: string;
  adoptionFee: number;
  notes: string;
  status: string;
}

export default function ConfirmAdoptionScreen() {
  const [requests, setRequests] = useState<AdoptionRequest[]>(adoptionRequests);

  const handleAccept = (id: string) => {
    // Xử lý chấp nhận yêu cầu
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'accepted' } : request
      )
    );
  };

  const handleReject = (id: string) => {
    // Xử lý từ chối yêu cầu
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
  };

  const renderRequestItem = ({ item }: { item: AdoptionRequest }) => (
    <View style={styles.card}>
      <Text style={styles.petName}>Pet Name: {item.petName}</Text>
      <Text>Adopter Name: {item.adopterName}</Text>
      <Text>Adopter Email: {item.adopterEmail}</Text>
      <Text>Shelter: {item.shelterName}</Text>
      <Text>Adoption Fee: ${item.adoptionFee}</Text>
      <Text>Notes: {item.notes}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.statusText}>
        Status: {item.status === 'pending' ? 'Pending' : item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Adoption Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A99F',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 10,
    color: '#555',
    fontStyle: 'italic',
  },
});