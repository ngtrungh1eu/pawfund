import React, { useEffect } from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import AuthContext from "./src/context/AuthContext";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./src/screens/NoInternetScreen";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState<boolean | null>(null);

  const login = async (username: string, password: string) => {
    // Implement login logic
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement logout logic
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state: {
        isConnected:
          | boolean
          | ((prevState: boolean | null) => boolean | null)
          | null;
      }) => {
        setIsConnected(state.isConnected);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then(
      (state: {
        isConnected:
          | boolean
          | ((prevState: boolean | null) => boolean | null)
          | null;
      }) => {
        setIsConnected(state.isConnected);
      }
    );
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
