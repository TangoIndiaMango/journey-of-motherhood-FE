"use client";
import { useStore } from "@/services/state/useStore";
import React, { useEffect, useState } from "react";
import usePostRequests from "./usePostRequests";
import { refreshUrl } from "@/services/utils/url";
import { useRouter } from "next/navigation";
import usePostRequest from "./usePostRequests";

const useAuth = () => {
  const { dispatch } = useStore();
  const { postRequest, isLoading, error, data } = usePostRequest();
  const { token } = useStore();
  const router = useRouter();
  const localRefresh: any = localStorage.getItem("token");
  const refresh_token = JSON.parse(localRefresh)?.refresh_token;

  const refresh = token?.refresh_token || refresh_token;

  const [isAuthenticated, setisAuthenticated] = useState(false);

  const getRefreshToken = async () => {
    await postRequest({ url: refreshUrl, query: refresh });
    if (!data) {
      setisAuthenticated(false);
      return;
    }

    if (data) {
      dispatch({ type: "addToken", payload: data });
      setisAuthenticated(true);
    }

    if (error) {
      alert("Error: " + error);
    }
  };

  useEffect(() => {
    if (!refresh) {
      router.replace("/login");
    }
    if (refresh) {
      setisAuthenticated(true);
    }

    getRefreshToken();

    const refreshInterval = setInterval(() => {
      getRefreshToken();
    }, 4000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return { isLoading, isAuthenticated };
};

export default useAuth;
