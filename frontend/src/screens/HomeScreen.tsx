import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { PetCard } from "../components/PetCard";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePetContext } from "../utils/PetContext";

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [showAllPets, setShowAllPets] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const { favorites, toggleFavorite } = usePetContext();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8000/api/pets/");
        const data = await response.json();
        setPets(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem("username");
        if (savedUsername) {
          setUsername(savedUsername);
        }
      } catch (error) {
        console.error("Error fetching username from AsyncStorage:", error);
      }
    };

    fetchUsername();
  }, []);

  const petsToShow = showAllPets ? pets : pets.slice(0, 6);

  const ListHeader = () => (
    <View>
      <View>
        <Text style={styles.heading1}>
          {username ? `Hello ${username}!` : "Hello!"}
        </Text>
        <Text style={styles.heading}>Ready to Rescue?</Text>
      </View>
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search nearest pet"
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Adopt a pet")}
        >
          <View>
            <FontAwesome
              name="paw"
              size={24}
              color="#fff"
              style={styles.iconSquare}
            />
          </View>
          <Text style={styles.cardTitle}>Adopt a Pet</Text>
          <Text style={styles.cardDescription}>
            Browse animals available for adoption.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Lost and Found")}
        >
          <View>
            <FontAwesome
              name="search"
              size={24}
              color="#fff"
              style={styles.iconSquare}
            />
          </View>
          <Text style={styles.cardTitle}>Lost & Found</Text>
          <Text style={styles.cardDescription}>
            Report a lost pet or a found animal.
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.fullWidthCard}
        onPress={() => navigation.navigate("Events")}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="list-alt"
              size={24}
              color="#fff"
              style={styles.iconSquare}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Events</Text>

            <Text style={styles.cardDescription}>
              Explore upcoming events and stay involved.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const ListFooter = () => (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#16A99F" />
      ) : (
        <>
          <Text style={styles.subHeading}>Near You</Text>
          <FlatList
            style={{ marginBottom: 60 }}
            horizontal
            data={petsToShow}
            renderItem={({ item }) => (
              <PetCard
                name={item.name}
                breed={item.breed}
                image={item.images[0]}
                isFavorite={favorites.includes(item._id)}
                onFavoriteToggle={() => toggleFavorite(item._id)}
                onPress={() =>
                  navigation.navigate("PetDetailScreen", {
                    petId: item._id,
                  })
                }
              />
            )}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
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
  },
  heading1: {
    fontSize: 20,
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
