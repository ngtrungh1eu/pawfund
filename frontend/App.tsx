import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import AuthContext from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = async (username: string, password: string) => {
    // Implement login logic
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement logout logic
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthContext.Provider>
    </SafeAreaView>
  );
}
