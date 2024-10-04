import { StyleSheet, Text, View } from "react-native";

import React from "react";

const OnboardingScreens = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to PawFund!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreens;
