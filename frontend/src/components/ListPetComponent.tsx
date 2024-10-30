import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { PetCard } from "./PetCard"; // Importing the PetCard component
import { useNavigation } from "@react-navigation/native";

export function ListPetComponent({ pets }) {
  const [selectedBreed, setSelectedBreed] = useState<string>("All");
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  // Extract unique breeds from the pet data
  const uniqueBreeds = Array.from(new Set(pets.map((pet) => pet.breed)));

  // Add "All" option for filtering
  const breeds = [
    { breed: "All" },
    ...uniqueBreeds.map((breed) => ({ breed })),
  ];

  const filteredPets =
    selectedBreed === "All"
      ? pets
      : pets.filter((pet) => pet.breed === selectedBreed);

  const petsToShow = showMore ? filteredPets : filteredPets.slice(0, 6);
  const numColumns = 2; // Fixed number of columns

  const renderBreedIcons = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.typeIconContainer}>
        {breeds.map((breed) => (
          <TouchableOpacity
            key={breed.breed}
            style={[
              styles.iconContainer,
              selectedBreed === breed.breed && styles.selectedIconContainer,
            ]}
            onPress={() => setSelectedBreed(breed.breed)}
          >
            <Text
              style={
                selectedBreed === breed.breed
                  ? styles.selectedIconText
                  : styles.iconText
              }
            >
              {breed.breed}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderPetsList = () => (
    <FlatList
      key={`numColumns-${numColumns}`} // Unique key based on numColumns
      data={petsToShow}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <PetCard
            name={item.name}
            breed={item.breed}
            image={item.images[0]}
            onPress={() =>
              navigation.navigate("PetDetailScreen", { petId: item._id })
            }
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      numColumns={numColumns} // Keep it as 2
      columnWrapperStyle={styles.columnWrapper}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>{renderBreedIcons()}</View>
      <View style={styles.petsListContainer}>{renderPetsList()}</View>
      <TouchableOpacity
        style={styles.showMoreButton}
        onPress={() => setShowMore(!showMore)}
      >
        <Text style={styles.showMoreText}>
          {showMore ? "Show Less" : "Show More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  filterContainer: {
    height: 50, // Fixed height to keep the filter position stable
    marginBottom: 20,
  },
  petsListContainer: {
    flex: 1, // Allow the pet list to take up the remaining space
  },
  typeIconContainer: {
    flexDirection: "row",
    alignItems: "center", // Center align the items vertically
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginRight: 10, // Add margin to space items apart
    justifyContent: "center", // Center the text vertically
  },
  selectedIconContainer: {
    backgroundColor: "#16A99F",
  },
  iconText: {
    marginTop: 5,
    color: "#16A99F",
  },
  selectedIconText: {
    color: "#fff",
  },
  columnWrapper: {
    justifyContent: "space-between", // Maintain close spacing between cards
    marginBottom: 10,
  },
  showMoreButton: {
    alignItems: "center",
    marginTop: 20,
  },
  showMoreText: {
    color: "#16A99F",
    fontWeight: "bold",
  },
});
