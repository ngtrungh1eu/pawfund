import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ListPetComponent } from "../components/ListPetComponent";
import { useNavigation } from "@react-navigation/native";

export function AdoptPetScreen() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8000/api/pets/");
        const data = await response.json();

        // Check if data is directly an array or nested within a data property
        if (Array.isArray(data)) {
          setPets(data);
        } else if (Array.isArray(data.data)) {
          setPets(data.data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A99F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available for Adoption</Text>
      {Array.isArray(pets) && pets.length > 0 ? (
        <ListPetComponent pets={pets} />
      ) : (
        <Text style={styles.errorText}>No pets available for adoption.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
});
