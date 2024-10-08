import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const NoNotifications: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navbarTitle}>Notifications</Text>
          <View style={styles.placeholderView} />
        </View>
        <View style={styles.content}>
          <Image
            source={require("../assets/no-notification.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Empty Notification</Text>
          <Text style={styles.subtitle}>
            There are no new notifications at the moment.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 0,
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  placeholderView: {
    width: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 84,
    height: 84,
    marginBottom: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
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
