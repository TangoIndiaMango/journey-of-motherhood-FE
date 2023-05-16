"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { refreshUrl } from "../utils/url";
import { useRouter } from "next/navigation";
import { clearLocalStorage, removeToken } from "../variables";
import { toast } from "react-hot-toast";

type TokenContextProps = {
  accessToken: string;
  refreshToken: string;
};

type TokenProviderProps = {
  children: ReactNode;
};

export const TokenContext = createContext<TokenContextProps>({
  accessToken: "",
  refreshToken: "",
});

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const user =
    typeof window !== "undefined" && window.localStorage.getItem("user");

  const router = useRouter();
  // Get access token and refresh token from localStorage on initial render
  useEffect(() => {
    const accessToken =
      typeof window !== "undefined" &&
      window.localStorage.getItem("access_token");
    const refreshToken =
      typeof window !== "undefined" &&
      window.localStorage.getItem("refresh_token");
    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }, []);

  // Refresh access token every 4 minutes
  useEffect(() => {
    const getRefresh = async () => {
      try {
        const response: any = await axios.post<{
          access_token: string;
          refresh_token: string;
        }>(refreshUrl, {
          refresh:
            typeof window !== "undefined" &&
            window.localStorage.getItem("refresh_token"),
        });
        setAccessToken(response?.data?.access);
        setRefreshToken(response?.data?.refresh);
        typeof window !== "undefined" &&
          window.localStorage.setItem("access_token", response?.data?.access);
        typeof window !== "undefined" &&
          window.localStorage.setItem("refresh_token", response?.data?.refresh);
      } catch (error: any) {
        if (error.message == "Request failed with status code 401") {
          clearLocalStorage();
          // removeToken();
          router.push("/login");
        }
        console.error(error);
      }
    };

    if (!user) {
      console.log("User not found");
      return;
    }
    getRefresh();

    const interval = setInterval(getRefresh, 240000); // 4 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <TokenContext.Provider value={{ accessToken, refreshToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
