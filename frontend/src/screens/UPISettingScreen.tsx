import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";

const UPISetting: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navbarTitle}>UPI Settings</Text>
          <View style={styles.placeholderView} />
        </View>

        <View style={styles.content}>
          <View style={styles.upiItem}>
            <View style={styles.upiInfo}>
              <MaterialIcons name="check-circle" size={20} color="#16A99F" />
              <View style={styles.upiTextContainer}>
                <Text style={styles.upiId}>7894721848@icici</Text>
                <Text style={styles.upiName}>Sarthak Ranjan Hota</Text>
              </View>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="delete-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 5,
    color: "#16A99F",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  inputContainer: {
    marginTop: 19,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    borderColor: "#848484",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
    fontSize: 14,
    fontWeight: "400",
  },
  inputIcon: {
    marginHorizontal: 5,
  },
  bottomContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: "#16A99F",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  upiItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  upiInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  upiTextContainer: {
    marginLeft: 10,
  },
  upiId: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  upiName: {
    fontSize: 12,
    fontWeight: "400",
    color: "#16A99F",
  },
});

export default UPISetting;
