import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // return context;
  return {
    ...context,
    isAuthenticated: true,
  };
};

export default useAuth;
