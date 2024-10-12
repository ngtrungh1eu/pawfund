import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const SystemSettingsScreen: React.FC = () => {
  const renderSettingItem = (title: string) => (
    <TouchableOpacity style={styles.settingItem}>
      <Text style={styles.settingLabel}>{title}</Text>
      <Ionicons name="chevron-forward" size={16} color="#000" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navbarTitle}>System Settings</Text>
          <View style={styles.placeholderView} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {renderSettingItem("Customization of Notification Types")}
            {renderSettingItem("Frequency of Notifications")}
            {renderSettingItem("Permissions")}
            {renderSettingItem("App Theme")}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy Settings</Text>
            {renderSettingItem("Data Sharing Preferences")}
            {renderSettingItem("Privacy Policy")}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            {renderSettingItem("App Version")}
            {renderSettingItem("Terms of Service")}
            {renderSettingItem("Help and FAQs")}
            {renderSettingItem("Licenses")}
          </View>
        </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "#E8F7F6",
    marginTop: 8,
    marginHorizontal: 25,
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#666",
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 1,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 14,
    color: "#333",
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

export default SystemSettingsScreen;
