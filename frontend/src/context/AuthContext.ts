import React from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
