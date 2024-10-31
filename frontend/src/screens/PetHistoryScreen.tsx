import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity, // Import TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure Ionicons is imported if you're using Expo
import axios from "axios"; // Import Axios
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class PetHistoryScreen extends Component {
  state = {
    adoptionHistoryData: [], // To store fetched data
    loading: true, // To manage loading state
    error: null, // To handle any errors
    userId: null, // To store logged-in user's ID
  };

  componentDidMount() {
    this.fetchProfileAndAdoptionHistory();
  }

  fetchProfileAndAdoptionHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      // Fetch the user's profile
      const profileResponse = await axios.get(
        "http://10.0.2.2:8000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userId = profileResponse.data._id; // Get the user's ID
      this.setState({ userId });

      // Fetch adoption history
      const adoptionResponse = await axios.get(
        "http://10.0.2.2:8000/api/adoptions/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Adoption History Data:", adoptionResponse.data); // Log the fetched data

      // Filter adoption data based on user's ID
      const adoptionData = adoptionResponse.data.data
        .filter((adoption) => adoption.customer._id === userId) // Match user ID
        .map((adoption) => ({
          id: adoption._id, // ID of the adoption request
          petName: adoption.pet.name, // Pet's name
          adopter: adoption.customer.username, // Adopter's username
          applicationDate: new Date(
            adoption.applicationDate
          ).toLocaleDateString(), // Formatted application date
          status: adoption.status, // Status of the adoption
        }));

      this.setState({ adoptionHistoryData: adoptionData, loading: false });
    } catch (error) {
      console.error("Failed to fetch adoption history:", error);
      this.setState({ loading: false, error: error.message });
    }
  };

  handleLongPress = (status) => {
    let message;

    switch (status) {
      case "pending":
        message = "🐾 Your application is pending approval! Hang tight! 🕒";
        break;
      case "approved":
        message =
          "🎉 Hooray! Your application is approved! Bring your furry friend home! 🏠";
        break;
      case "rejected":
        message =
          "💔 Oh no! Your application was rejected. Don't lose hope! 🌈";
        break;
      case "completed":
        message =
          "🌟 Yay! Your adoption is complete! Enjoy your new best friend! 🐶";
        break;
      default:
        message = "🤔 Unknown status. Please check back later!";
        break;
    }

    Alert.alert("Adoption Status", message);
  };

  render() {
    const { adoptionHistoryData, loading, error } = this.state;

    if (loading) {
      return <ActivityIndicator size="large" color="#16A99F" />; // Show loading indicator
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Adoption History</Text>
        <FlatList
          data={adoptionHistoryData}
          keyExtractor={(item) => item.id} // Use the ID for the key extractor
          renderItem={({ item }) => (
            <TouchableOpacity // Add TouchableOpacity for long press
              style={styles.historyItem}
              onLongPress={() => this.handleLongPress(item.status)} // Handle long press
            >
              <Ionicons
                name="paw"
                size={24}
                color="#16A99F"
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.petName}>{item.petName}</Text>
                <Text style={styles.date}>
                  Applied on {item.applicationDate}
                </Text>
                <Text style={styles.status}>Status: {item.status}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16A99F1A", // Light background color
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16A99F",
    marginBottom: 20,
    textAlign: "center",
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
  date: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
