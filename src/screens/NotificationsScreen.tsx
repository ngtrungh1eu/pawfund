import {
  FlatList,
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

// Nhập ảnh từ thư mục assets
const icons = {
  checkmark: require("../assets/date_range.png"),
  heart: require("../assets/volunteer_activism.png"),
  mail: require("../assets/chat_bubble.png"),
  people: require("../assets/diversity_1.png"),
};

const Notifications: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = React.useState("light");

  const notifications = [
    {
      id: "1",
      text: "Your scheduled post has been successfully published.",
      icon: icons.checkmark,
    },
    {
      id: "2",
      text: "Thank you for your donation to Sarthak! Your contribution is greatly appreciated.",
      icon: icons.heart,
    },
    {
      id: "3",
      text: "Thank you for your donation to Sarthak! Your contribution is greatly appreciated.",
      icon: icons.heart,
    },
    {
      id: "4",
      text: "You have 10 unread messages. Please check your inbox.",
      icon: icons.mail,
    },
    {
      id: "5",
      text: "Thank you for your donation to Sarthak! Your contribution is greatly appreciated.",
      icon: icons.heart,
    },
    {
      id: "6",
      text: "@Srimanta has added you to the group 'Contribution'.",
      icon: icons.people,
    },
  ];

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
          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <View style={styles.iconContainer}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <Text style={styles.notificationText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
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
    paddingHorizontal: 25,
  },
  themeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  themeText: {
    fontSize: 16,
    color: "#000",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#16A99F",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A99F",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    gap: 10,
  },
  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#E8F7F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  icon: {
    width: 18,
    height: 18,
  },
  notificationText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
});

export default Notifications;
