import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:8000/api/adoptions"; // Update with your API endpoint

export function AdoptionHistoryScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
          Alert.alert("Error", "No token found. Please log in again.");
          return;
        }

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adoptionData = response.data.data
          .filter(
            (adoption) =>
              adoption.status === "rejected" || adoption.status === "completed"
          )
          .map((adoption) => ({
            id: adoption._id,
            petName: adoption.pet.name,
            adopterName: adoption.customer.username,
            adopterEmail: adoption.customer.email,
            shelterName: adoption.shelter.name,
            status: adoption.status,
          }));

        setRequests(adoptionData);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
        Alert.alert("Error", "Could not fetch adoption requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#16A99F" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejected and Completed Adoption Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Ionicons
              name="paw"
              size={24}
              color="#16A99F"
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.petName}>{item.petName}</Text>
              <Text style={styles.adopterText}>
                Adopted by{" "}
                <Text style={styles.adopter}>{item.adopterName}</Text>
              </Text>
              <Text style={styles.email}>{item.adopterEmail}</Text>
              <Text style={styles.shelterText}>
                Shelter: {item.shelterName}
              </Text>
              <Text style={styles.status}>Status: {item.status}</Text>
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
    backgroundColor: "#16A99F1A",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16A99F",
    marginBottom: 20,
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  historyItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    marginRight: 15,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  adopterText: {
    fontSize: 16,
    color: "#555",
  },
  adopter: {
    fontWeight: "bold",
    color: "#16A99F",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 3,
  },
  shelterText: {
    fontSize: 14,
    color: "#777",
    marginTop: 3,
  },
  status: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
});
