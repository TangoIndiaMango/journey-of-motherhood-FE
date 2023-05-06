"use client";

import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { removeToken } from "@/services/variables";

type RequestParams = {
  url: string;
  useBearerToken?: boolean;
  bearerToken?: string | null;
};

type Response<T> = {
  data: any;
  isLoading: boolean;
  error: string | null;
};

const useGetRequest = <T extends any>({
  url,
  useBearerToken = false,
  bearerToken,
}: RequestParams): Response<T> => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const headers: AxiosRequestConfig["headers"] = {
        "Content-Type": "application/json",
      };

      if (useBearerToken && bearerToken) {
        headers["Authorization"] = `Bearer ${bearerToken}`;
      }

      try {
        const response = await axios.get<T>(url, { headers });
        setData(response.data);
      } catch (error: any) {
        // if (error.message == "Request failed with status code 401") {
        //   removeToken();
        //   router.replace("/login");
        // }
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, useBearerToken, bearerToken, router]);

  return { data, isLoading, error };
};

export default useGetRequest;
