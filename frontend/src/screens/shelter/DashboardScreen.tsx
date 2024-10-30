import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useAuth } from "../../context/AuthProvider";

// Example statistics data
const stats = {
  totalAnimals: 120,
  totalAdopted: 85,
  totalDonations: 15000000,
};

export function DashboardScreen({ navigation }: any) {
  const { logout } = useAuth();
  // Handle Log Out action
  const handleLogout = async () => {
    await logout(); // Gọi hàm logout từ context
    navigation.navigate("Login" as never); // Điều hướng đến màn hình đăng nhập
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Statistics Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Animals</Text>
          <Text style={styles.cardValue}>{stats.totalAnimals}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Pets Adopted</Text>
          <Text style={styles.cardValue}>{stats.totalAdopted}</Text>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        <Text style={styles.cardTitle}>Total Donations</Text>
        <Text style={styles.cardValue}>{stats.totalDonations} VND</Text>
      </View>
      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register Animal")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register New Animal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Confirm Adoption")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Confirm Adoption Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Adoption History")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Adoption History</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16A99F1A",
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16A99F",
    marginBottom: 20,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    color: "#555",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16A99F",
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#16A99F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#16A99F1A",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#16A99F",
    fontSize: 18,
    fontWeight: "bold",
  },
});
