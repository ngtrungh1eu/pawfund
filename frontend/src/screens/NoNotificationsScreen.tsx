import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";

const NoNotifications: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/no-notification.png")}
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
    width: 84,
    height: 84,
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
    color: "#666",
  },
});

export default NoNotifications;
