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
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

const ResetPasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Reset Your Password?</Text>
            <Text style={styles.subtitle}>
              Please enter your last password associated with your account, and
              create a new password.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="your current password"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <Ionicons
                    name={showCurrentPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#16A99F"
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.label, { marginTop: 15 }]}>
                New Password
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="your new password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Ionicons
                    name={showNewPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#16A99F"
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reset Password</Text>
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
  forgotPassword: {
    color: "#000000",
    textAlign: "right",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "400",
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
});

export default ResetPasswordScreen;
