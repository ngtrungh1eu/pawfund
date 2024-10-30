import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // For displaying icons

interface AdoptionRequest {
  id: string;
  petName: string;
  adopterName: string;
  adopterEmail: string;
  shelterName: string;
  status: string;
}

export default function ConfirmAdoptionScreen() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'pending' | 'approved' | 'all'>('all');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [reason, setReason] = useState('');
  const API_URL = 'http://10.0.2.2:8000/api/adoptions/';

  // Fetch adoption requests
  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          Alert.alert('Error', 'No token found. Please log in again.');
          return;
        }

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adoptionData = response.data.data.map((adoption: any) => ({
          id: adoption._id,
          petName: adoption.pet.name,
          adopterName: adoption.customer.username,
          adopterEmail: adoption.customer.email,
          shelterName: adoption.shelter.name,
          status: adoption.status,
        }));

        setRequests(adoptionData);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
        Alert.alert('Error', 'Could not fetch adoption requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, []);

  // Handle completing an approved request
  const handleComplete = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }

      await axios.put(`${API_URL}${id}`, { status: 'completed' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
      Alert.alert('Success', 'Adoption marked as completed.');
    } catch (error) {
      console.error('Error completing adoption request:', error);
      Alert.alert('Error', 'Could not mark adoption as completed.');
    }
  };

  // Handle accepting a pending request
  const handleAccept = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }

      await axios.put(`${API_URL}${id}`, { status: 'approved' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
      Alert.alert('Success', 'Adoption request approved.');
    } catch (error) {
      console.error('Error accepting adoption request:', error);
      Alert.alert('Error', 'Could not approve adoption request.');
    }
  };

  // Handle Rejecting
  const handleReject = (id: string) => {
    setSelectedRequestId(id); // Set the selected request ID
    setDialogVisible(true); // Show the dialog
  };

  const handleConfirmReject = async () => {
    if (reason) {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          Alert.alert('Error', 'No token found. Please log in again.');
          return;
        }

        await axios.put(
          `${API_URL}${selectedRequestId}`,
          {
            status: 'rejected',
            rejectionReason: reason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== selectedRequestId));
        Alert.alert('Success', 'Adoption request rejected.');
      } catch (error) {
        console.error('Error rejecting adoption request:', error);
        Alert.alert('Error', 'Could not reject adoption request.');
      } finally {
        setDialogVisible(false);
        setReason(''); // Reset reason after submission
        setSelectedRequestId(null); // Clear the selected request ID
      }
    } else {
      Alert.alert('Error', 'Please provide a rejection reason.');
    }
  };

  // Toggle modal for filter options
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Apply filter
  const applyFilter = (status: 'pending' | 'approved' | 'all') => {
    setSelectedFilter(status);
    toggleModal();
  };

  const renderRequestItem = ({ item }: { item: AdoptionRequest }) => (
    <View style={styles.card}>
      <Text style={styles.petName}>Pet Name: {item.petName}</Text>
      <Text>Adopter Name: {item.adopterName}</Text>
      <Text>Adopter Email: {item.adopterEmail}</Text>
      <Text>Shelter: {item.shelterName}</Text>

      {item.status === 'pending' && (
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
      )}

      {item.status === 'approved' && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleComplete(item.id)}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Show loading
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Filter requests: show based on selected filter
  const filteredRequests = requests.filter((request) => {
    if (selectedFilter === 'all') return request.status === 'pending' || request.status === 'approved';
    return request.status === selectedFilter;
  });

  // Show "No Data" message if there are no filtered requests
  if (filteredRequests.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <MaterialIcons name="hourglass-empty" size={50} color="gray" />
        <Text style={styles.noDataText}>No Pending or Approved Adoption Requests Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Confirm Adoption Requests</Text>
        {filteredRequests.length > 0 && (
          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons name="filter-list" size={28} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
      />

      {/* Modal for filtering */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Status</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => applyFilter('all')}
            >
              <Text style={styles.buttonText}>Show All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => applyFilter('pending')}
            >
              <Text style={styles.buttonText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => applyFilter('approved')}
            >
              <Text style={styles.buttonText}>Approved</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Dialog for reject reason */}
      <Modal visible={dialogVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Provide a reason for rejection</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter rejection reason"
              value={reason}
              onChangeText={setReason}
            />
            <View style={styles.dialogButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmReject}>
                <Text style={styles.buttonText}>Confirm Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setDialogVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A99F',
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
  completeButton: {
    backgroundColor: '#16A99F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    marginTop: 10,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#16A99F',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalCancelButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
  },
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
