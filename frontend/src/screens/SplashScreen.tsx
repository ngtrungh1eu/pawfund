import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the main app after a delay
      navigation.replace("Login");
    }, 2000); // Adjust the delay as needed (2 seconds in this example)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash-screen.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
