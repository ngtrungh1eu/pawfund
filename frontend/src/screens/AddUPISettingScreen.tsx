import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const AddUPISetting: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.navbarTitle}>UPI Settings</Text>
            <View style={styles.placeholderView} />
          </View>

          <View style={styles.content}>
            <Text style={styles.subtitle}>
              To verify your account, please provide your UPI details.
            </Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Add your UPI address"
                />
                <TouchableOpacity style={styles.verifyButton}>
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add UPI Address</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: "flex-start", // Đảm bảo các phần tử được phân phối
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
    // Giữ nguyên justifyContent để các phần tử ở trên cùng
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 5,
    color: "#16A99F",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  inputContainer: {
    marginTop: 21,
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
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
  },
  inputIcon: {
    marginHorizontal: 5,
  },
  bottomContainer: {
    padding: 20,
    justifyContent: "flex-end", // Đảm bảo nút nằm ở dưới cùng
  },
  button: {
    backgroundColor: "#A4A4A4",
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
  verifyButton: {
    padding: 10,
  },
  verifyButtonText: {
    fontSize: 12,
    color: "#16A99F",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AddUPISetting;
