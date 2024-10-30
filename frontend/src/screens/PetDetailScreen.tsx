import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { usePetContext } from "../utils/PetContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function PetDetailScreen({ route }) {
  const [pet, setPet] = useState(null);
  const [isAdopted, setIsAdopted] = useState(false);
  const { favorites, toggleFavorite } = usePetContext();
  const { petId } = route.params;

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        console.log(`Fetching details for pet ID: ${petId}`);

        const response = await fetch(`http://10.0.2.2:8000/api/pets/${petId}`);
        const data = await response.json();
        console.log("Pet details fetched successfully:", data);

        setPet(data.data);

        // Check if the pet has any active adoption requests
        const adoptionResponse = await axios.get(
          `http://10.0.2.2:8000/api/adoptions/`,
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "access_token"
              )}`,
            },
          }
        );

        // Filter adoption requests by pet ID
        const activeAdoptions = adoptionResponse.data.data.filter(
          (adoption) =>
            adoption.pet._id === petId &&
            (adoption.status === "pending" ||
              adoption.status === "approved" ||
              adoption.status === "completed")
        );

        if (activeAdoptions.length > 0) {
          setIsAdopted(true);
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetail();
  }, [petId]);

  // Adopt Pet Button
  const handleAdoptPress = async () => {
    Alert.alert(
      "Confirm Adoption",
      `Are you sure you want to adopt ${pet.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const accessToken = await AsyncStorage.getItem("access_token");
              const userResponse = await axios.get(
                "http://10.0.2.2:8000/api/auth/profile",
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );

              const userId = userResponse.data._id;
              const shelterId = pet.shelter._id;
              console.log("User ID:", userId);
              console.log("Shelter ID:", shelterId);

              if (!userId || !shelterId) {
                Alert.alert("Error", "User ID or Shelter ID not found.");
                console.error("User ID or Shelter ID is null");
                return;
              }

              const adoptionRequest = {
                pet: pet._id,
                customer: userId,
                shelter: shelterId,
              };

              console.log("Adoption request object:", adoptionRequest);

              const adoptionResponse = await axios.post(
                "http://10.0.2.2:8000/api/adoptions",
                adoptionRequest,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              setIsAdopted(true);

              Alert.alert(
                "Success",
                "Your adoption request has been submitted!"
              );
            } catch (error) {
              console.error("Error submitting adoption request:", error);
              Alert.alert(
                "Error",
                "There was an issue submitting your adoption request."
              );
            }
          },
        },
      ]
    );
  };

  // Return loading indicator if pet data is not yet loaded
  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isFavorite = favorites.includes(petId);

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
        <TouchableOpacity onPress={() => toggleFavorite(petId)}>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={30}
            color={isFavorite ? "red" : "#16A99F"}
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
          </View>
        </View>
      </View>

      {/* Pet Description */}
      <Text style={styles.descriptionTitle}>About {pet.name}</Text>
      <Text style={styles.descriptionText}>{pet.description}</Text>

      <View style={styles.shelterInfoCard}>
        <Text style={styles.shelterTitle}>Shelter Information</Text>
        <Text style={styles.shelterText}>Name: {pet.shelter.name}</Text>
        <Text style={styles.shelterText}>Phone: {pet.shelter.phoneNumber}</Text>
        <Text style={styles.shelterText}>Email: {pet.shelter.email}</Text>
      </View>

      {/* Adopt Button */}
      {!isAdopted && (
        <View style={styles.adoptButtonContainer}>
          <TouchableOpacity
            onPress={handleAdoptPress}
            style={styles.adoptButton}
          >
            <Text style={styles.adoptButtonText}>Adopt this Pet</Text>
          </TouchableOpacity>
        </View>
      )}
      {isAdopted && (
        <Text style={styles.errorMessage}>
          This pet is already in an adoption process.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  petImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  nameAddressContainer: {
    flexDirection: "column",
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16A99F",
  },
  petAddress: {
    fontSize: 16,
    color: "#666",
  },
  infoCardsContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoCard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#16A99F1A",
    padding: 15,
    borderRadius: 10,
    width: "48%",
  },
  infoText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16A99F",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  shelterInfoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  shelterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16A99F",
    marginBottom: 10,
  },
  shelterText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  adoptButtonContainer: {
    alignItems: "center",
  },
  adoptButton: {
    backgroundColor: "#16A99F",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  adoptButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
