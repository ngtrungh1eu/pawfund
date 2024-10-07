import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface NoInternetProps {
  onRetry: () => void;
}

const NoInternet: React.FC<NoInternetProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/no-internet.png")}
        style={styles.image}
      />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your internet connection and try again.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Ionicons name="refresh" size={24} color="white" />
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16A99F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NoInternet;
