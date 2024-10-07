import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileSetupComplete() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/logo-white.png")}
            style={styles.image}
          />
          <Text style={styles.logoText}>AnimalAlly</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.emojiContainer}>
            <Image
              source={require("../assets/emoji.png")}
              style={styles.emojiImage}
            />
          </View>
          <Text style={styles.title}>Profile Setup Complete!</Text>
          <Text style={styles.subtitle}>You're All Set, Sarthak!</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
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
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: -229,
    marginBottom: 23,
    width: 449,
    height: 449,
    borderRadius: 999999999,
    backgroundColor: "#16A99F",
    padding: 38,
    alignSelf: "center",
  },
  image: {
    width: 64,
    height: 79,
    resizeMode: "cover",
  },
  logoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Add this line
    paddingHorizontal: 20,
    transform: [{ translateY: -55 }],
  },
  emojiContainer: {
    marginBottom: 10,
  },
  emojiImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "black", // Changed to black
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "black", // Changed to black
    textAlign: "center",
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
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
