import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface NoChatProps {
  onStartChat: () => void;
}

const NoChat: React.FC<NoChatProps> = ({ onStartChat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Placeholder for left side if needed */}
        </View>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={onStartChat} style={styles.headerRight}>
          <Image
            source={require("../assets/add-chat-icon.png")}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../assets/sleeping-dog.png")}
          style={styles.image}
        />
        <Text style={styles.title}>No messages Found!</Text>
        <Text style={styles.subtitle}>There is no messages to display.</Text>
      </View>
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={18} color="#000" />
        <Ionicons name="heart-outline" size={18} color="#000" />
        <View style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </View>
        <Ionicons name="chatbubble-outline" size={18} color="#000" />
        <Ionicons name="person-outline" size={18} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 217,
    height: 109,
    resizeMode: "contain",
    marginBottom: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    color: "#666",
  },
  footer: {
    backgroundColor: "#E8F7F6",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 63,
  },
  sosButton: {
    width: 68,
    height: 68,
    borderRadius: 9999,
    backgroundColor: "#16A99F",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -12 }],
  },
  sosText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NoChat;
