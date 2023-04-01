"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { loginUrl, refreshUrl } from "../utils/url";
import { useRouter } from "next/navigation";

type AuthContextType = {
  access_token: string | null;
  refresh_token: string | null;
  login: (credentials: { email?: string; password?: string }) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  access_token: null,
  refresh_token: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [refresh_token, setRefreshToken] = useState<string | null>(null);

  const router = useRouter();

  const refreshToken = useCallback(
    async (query: string) => {
      try {
        const response = await fetch(refreshUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: query }),
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
        } else {
          if (response.status === 401) logout();
          throw new Error("Failed to refresh access token");
        }
      } catch (error) {
        console.log(error);
        logout();
      }
    },
    [refresh_token]
  );

  useEffect(() => {
    if (refresh_token) {
      refreshToken(refresh_token);
    }
    const intervalId = setInterval(() => {
      const new_refresh_token =
        typeof window !== "undefined" &&
        window.localStorage.getItem("refresh_token");
      if (new_refresh_token) {
        refreshToken(new_refresh_token);
      }
    }, 240000); // refresh token every four (4) minute

    return () => clearInterval(intervalId);
  }, [refresh_token, refreshToken]);

  const login = async ({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) => {
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        typeof window !== "undefined" &&
          window.localStorage.setItem("access_token", data.access_token);
        typeof window !== "undefined" &&
          window.localStorage.setItem("refresh_token", data.refresh_token);
        return response;
      } else {
        throw new Error("Failed to log in");
      }
    } catch (error) {
      console.log(error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    typeof window !== "undefined" &&
      window.localStorage.removeItem("access_token");
    typeof window !== "undefined" &&
      window.localStorage.removeItem("refresh_token");
    router.replace("/login");
  };

  useEffect(() => {
    const access_token =
      typeof window !== "undefined" &&
      window.localStorage.getItem("access_token");
    const refresh_token =
      typeof window !== "undefined" &&
      window.localStorage.getItem("refresh_token");
    if (access_token) {
      setAccessToken(access_token);
      setRefreshToken(refresh_token as string);
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ access_token, refresh_token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
