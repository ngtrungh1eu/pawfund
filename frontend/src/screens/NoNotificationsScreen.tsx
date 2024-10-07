import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";

const NoNotifications: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/no-notifications.png")}
        style={styles.image}
      />
      <Text style={styles.title}>No Notifications</Text>
      <Text style={styles.subtitle}>
        You don't have any notifications at the moment.
      </Text>
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
    color: "#666",
  },
});

export default NoNotifications;
