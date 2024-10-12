import { REACT_NATIVE_API_URL } from "@env";
import axios from "axios";

const api = axios.create({
  baseURL: REACT_NATIVE_API_URL,
});
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw new Error("Logout failed");
  }
};
