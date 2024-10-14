import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { PetCard } from "../components/PetCard";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ListPetComponent } from "../components/ListPetComponent";

export function HomeScreen() {
  const navigation = useNavigation();
  const [showAllPets, setShowAllPets] = useState(false);
  const [selectedType, setSelectedType] = useState<"All" | "Dog" | "Cat" | "Bird" | "Others">("All");

  const pets = [
    {
      id: 1,
      name: "Jodo",
      type: "Dog",
      breed: "Golden Retriever",
      description: "A friendly and playful dog, loves to fetch balls.",
      age: 3,
      weight: "20kg",
      gender: "Male",
      owner: "John Doe",
      avatar: "https://example.com/avatar1.jpg",
      image: "https://i.pinimg.com/564x/33/ec/02/33ec0258525aac21e84b6d1c76342346.jpg",
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      breed: "Abyssinian",
      description: "An active and curious cat that loves to explore.",
      age: 2,
      weight: "5kg",
      gender: "Female",
      owner: "Jane Doe",
      avatar: "https://example.com/avatar2.jpg",
      image: "https://i.pinimg.com/564x/98/fa/73/98fa73fba3520fecdd89930f40d23bc9.jpg",
    },
    {
      id: 3,
      name: "Bella",
      type: "Dog",
      breed: "Bulldog",
      description: "A loyal and protective dog, loves to lounge around.",
      age: 4,
      weight: "23kg",
      gender: "Female",
      owner: "Michael Johnson",
      avatar: "https://example.com/avatar3.jpg",
      image: "https://i.pinimg.com/564x/0b/15/d2/0b15d20cc893d7be0c5c864564567960.jpg",
    },
    {
      id: 4,
      name: "Shadow",
      type: "Cat",
      breed: "Siamese",
      description: "A calm and affectionate cat, loves to stay near you.",
      age: 3,
      weight: "4.5kg",
      gender: "Male",
      owner: "Emily Stone",
      avatar: "https://example.com/avatar4.jpg",
      image: "https://i.pinimg.com/564x/72/7e/9a/727e9aa9c5988270e7e6ed28baff08a5.jpg",
    },
    {
      id: 5,
      name: "Rocky",
      type: "Dog",
      breed: "Pug",
      description: "A small but energetic dog, always happy to see people.",
      age: 2,
      weight: "8kg",
      gender: "Male",
      owner: "Sarah Lee",
      avatar: "https://example.com/avatar5.jpg",
      image: "https://i.pinimg.com/564x/d9/41/26/d941263cf3299e47d5807d453d8e4491.jpg",
    },
    {
      id: 6,
      name: "Simba",
      type: "Cat",
      breed: "Maine Coon",
      description: "A large and fluffy cat, loves to be the center of attention.",
      age: 5,
      weight: "6.5kg",
      gender: "Male",
      owner: "David Green",
      avatar: "https://example.com/avatar6.jpg",
      image: "https://i.pinimg.com/564x/d4/3a/b6/d43ab6bf0bd18e37abf03cace8c7857a.jpg",
    },
    {
      id: 7,
      name: "Coco",
      type: "Dog",
      breed: "Labrador",
      description: "A friendly dog with a love for water and playing fetch.",
      age: 3,
      weight: "22kg",
      gender: "Female",
      owner: "Alice Brown",
      avatar: "https://example.com/avatar7.jpg",
      image: "https://i.pinimg.com/564x/47/da/d2/47dad2bc350f4fbebce3eeb3ea2761ef.jpg",
    },
  ];

  const petsToShow = showAllPets ? pets : pets.slice(0, 6);

  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading1}>Hello thinhnc!</Text>
          <Text style={styles.heading}>Ready to Rescue?</Text>
        </View>
        <View style={styles.bellIconContainer}>
          <FontAwesome name="bell" size={24} color="#16A99F" />
        </View>
      </View>

      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput style={styles.searchInput} placeholder="Search nearest pet" />
        <FontAwesome name="filter" size={20} color="gray" />
      </View>
      {/* Two cards in a row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Adopt a pet")}>
          <View>
            <FontAwesome name="paw" size={24} color="#fff" style={styles.iconSquare} />
          </View>
          <Text style={styles.cardTitle}>Adopt a Pet</Text>
          <Text style={styles.cardDescription}>Browse animals available for adoption.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Lost and Found")}>
          <View>
            <FontAwesome name="search" size={24} color="#fff" style={styles.iconSquare} />
          </View>
          <Text style={styles.cardTitle}>Lost & Found</Text>
          <Text style={styles.cardDescription}>Report a lost pet or a found animal.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fullWidthCard} onPress={() => navigation.navigate("LostFoundScreen")}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <FontAwesome name="list-alt" size={24} color="#fff" style={styles.iconSquare} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Feeds</Text>
            <Text style={styles.cardDesfeeds}>Stay Updated: Your Source for the Latest feeds and Updates.</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <Text style={styles.subHeading}>Pets List</Text> */}
      {/* Pet Types Section (ListPetComponent) */}
      {/* <ListPetComponent /> */}
    </View>
  );

  const ListFooter = () => (
    <View>
      {/* <TouchableOpacity onPress={() => setShowAllPets(!showAllPets)} style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>{showAllPets ? 'See Less' : 'See All'}</Text>
      </TouchableOpacity> */}

      <Text style={styles.subHeading}>Near You</Text>
      <FlatList
        horizontal
        data={pets}
        renderItem={({ item }) => <PetCard name={item.name} breed={item.breed} image={item.image} />}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bellIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#16A99F1A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  seeAllButton: {
    marginVertical: 20,
    alignItems: "center",
  },
  seeAllText: {
    color: "#16A99F",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#16A99F1A",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },

  iconSquare: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16A99F",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16A99F",
    marginBottom: 5,
  },
  cardDescription: {
    textAlign: "center",
    color: "#000",
  },
  cardDesfeeds: {
    textAlign: "left",
    color: "#000",
  },
  fullWidthCard: {
    backgroundColor: "#16A99F1A",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading1: {
    fontSize: 20,
    marginBottom: 6,
  },
});
