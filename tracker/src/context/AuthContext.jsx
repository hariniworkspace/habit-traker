import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");
    const savedUser =
      localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const register = async (
    name,
    email,
    password
  ) => {
    const res = await API.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setUser(res.data);
  };

  const login = async (
    email,
    password
  ) => {
    const res = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setUser(res.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}  
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}