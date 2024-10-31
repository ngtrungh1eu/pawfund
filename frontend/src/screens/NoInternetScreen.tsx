import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";

interface NoInternetProps {
  onRetry: () => void;
}

const NoInternet: React.FC<NoInternetProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/no-internet.png")}
          style={styles.image}
        />
        <Text style={styles.title}>No Internet Connection Found!</Text>
        <Text style={styles.subtitle}>
          Unable to connect to the internet. Please check your connection and
          try again.
        </Text>
      </View>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16A99F",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 5,
    marginTop: 20,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NoInternet;
