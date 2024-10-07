import {
  ScrollView,
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
      <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#000" />
        <Text style={styles.title}>System Settings</Text>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
  },
  section: {
    backgroundColor: "#F5F7F9",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default SystemSettingsScreen;
