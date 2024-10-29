import React, { useEffect } from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import AuthContext from "./src/context/AuthContext";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./src/screens/NoInternetScreen";
import { Alert, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  username: string;
  role: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState<boolean | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://10.0.2.2:8000/api/auth/login", {
        username,
        password,
      });
      if (response.data && response.data.success) {
        console.log(response.data.accessToken);

        const accessToken = response.data.accessToken;
        await AsyncStorage.setItem("access_token", accessToken);

        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        console.log("username", decoded.username);

        await AsyncStorage.setItem("username", decoded.username);

        setIsAuthenticated(true);
        return decoded;
      } else {
        setIsAuthenticated(false);
        Alert.alert("Login Error", "Invalid credentials");
      }
    } catch (error: any) {
      setIsAuthenticated(false);

      Alert.alert("Login Error", error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://10.0.2.2:8000/api/auth/logout", {});
      AsyncStorage.clear();
      setIsAuthenticated(false);
      Alert.alert("Logged out", "You have successfully logged out.");
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Logout Error", "An error occurred during logout.");
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state: { isConnected: boolean | ((prevState: boolean | null) => boolean | null) | null }) => {
        setIsConnected(state.isConnected);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state: { isConnected: boolean | ((prevState: boolean | null) => boolean | null) | null }) => {
      setIsConnected(state.isConnected);
    });
  };

  if (isConnected === false) {
    return <NoInternet onRetry={handleRetry} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <StatusBar style="auto" />
        <AppNavigator />
      </AuthContext.Provider>
    </SafeAreaView>
  );
}
