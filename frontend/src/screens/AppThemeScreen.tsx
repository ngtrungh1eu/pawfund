import {
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

const AppTheme: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = React.useState("light");

  const CustomRadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navbarTitle}>App Theme</Text>
          <View style={styles.placeholderView} />
        </View>
        <View style={styles.content}>
          {["Dark", "Light", "System Default Setting"].map(theme => (
            <TouchableOpacity
              key={theme}
              style={styles.themeOption}
              onPress={() => setSelectedTheme(theme.toLowerCase())}
            >
              <Text style={styles.themeText}>{theme}</Text>
              <CustomRadioButton
                selected={selectedTheme === theme.toLowerCase()}
              />
            </TouchableOpacity>
          ))}
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
});

export default AppTheme;
