import React from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  role: null,
  login: async () => {},
  logout: () => {},
});

export default AuthContext;
