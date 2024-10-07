import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    if (!text) {
      setPasswordError("Password is required");
    } else if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
    setPassword(text);
  };

  const handleLogin = () => {
    navigation.navigate("SystemSettings" as never);
    // Validate inputs before proceeding
    validateEmail(email);
    validatePassword(password);

    // Check if there are any errors
    if (emailError || passwordError) {
      Alert.alert("Error", "Please correct the errors before logging in.");
      return;
    }

    // Perform login logic here
    // This is where you would typically make an API call to your backend
    console.log("Logging in with:", { email, password });

    // For demonstration purposes, we'll just show an alert
    Alert.alert("Login Attempt", `Attempting to login with email: ${email}`);

    // Reset fields after login attempt
    setEmail("");
    setPassword("");
  };

  const handleSignUp = () => {
    navigation.navigate("Onboarding" as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/imgLogin.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View
            style={[styles.inputWrapper, emailError ? styles.inputError : null]}
          >
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Enter your email"
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
            />
            <Ionicons
              name="at"
              size={24}
              color={emailError ? "#BE1447" : "#16A99F"}
              style={styles.inputIcon}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <Text style={[styles.label, { marginTop: 15 }]}>Password</Text>
          <View
            style={[
              styles.inputWrapper,
              passwordError ? styles.inputError : null,
            ]}
          >
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="Enter your password"
              value={password}
              onChangeText={validatePassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={passwordError ? "#BE1447" : "#ccc"}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text>You don't have any account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupText}>Sign Up Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -174,
    marginBottom: 23,
    alignSelf: "center",
    width: 545,
    height: 545,
    borderRadius: 999999999,
    backgroundColor: "#16A99F",
  },
  image: {
    width: 477,
    height: 528,
    resizeMode: "cover",
    borderRadius: 999999999,
  },
  inputContainer: {
    paddingHorizontal: 20,
    flex: 1,
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
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
  },
  inputIcon: {
    marginHorizontal: 5,
  },
  inputError: {
    borderColor: "#BE1447",
    color: "#BE1447",
  },
  errorText: {
    color: "#BE1447",
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "400",
  },
  forgotPassword: {
    color: "#000000",
    textAlign: "right",
    marginTop: 15,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "400",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 39,
  },
  button: {
    backgroundColor: "#16A99F",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#16A99F",
  },
});
