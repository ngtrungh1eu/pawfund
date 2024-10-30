import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type UserProfile = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
};

export function ProfileScreen({ route }: any) {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("access_token");
          const response = await axios.get(
            "http://10.0.2.2:8000/api/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
          Alert.alert("Error", "Failed to fetch profile data");
        }
      };

      fetchProfile();

      if (route.params?.updatedUser) {
        setUser((prev) => ({ ...prev, ...route.params.updatedUser }));
      }
    }, [route.params])
  );

  // Handle Log Out action
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login" as never);
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/47/da/d2/47dad2bc350f4fbebce3eeb3ea2761ef.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.fullName}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Donated and Adopted Cards */}
      <View style={styles.cardRow}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PetHistoryScreen")}
        >
          <FontAwesome name="paw" size={30} color="#16A99F" />
          <Text style={styles.cardText}>Your Adopt</Text>
        </TouchableOpacity>
      </View>

      {/* Account Security Section */}
      <View style={styles.securityCard}>
        <Text style={styles.sectionTitle}>Account Security</Text>

        <TouchableOpacity
          style={styles.securityItem}
          onPress={() => navigation.navigate("ProfileInfoScreen")}
        >
          <Text style={styles.securityText}>Profile Info</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.securityItem}
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.securityText}>Forgot Password</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.securityItem}
          onPress={() => navigation.navigate("ResetPassword")}
        >
          <Text style={styles.securityText}>Reset Password</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.securityItem}
          onPress={() => navigation.navigate("NumberVerificationWithNumber")}
        >
          <Text style={styles.securityText}>Phone Verification</Text>
          <FontAwesome name="chevron-right" size={24} color="#16A99F" />
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  securityCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  securityText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#16A99F",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
