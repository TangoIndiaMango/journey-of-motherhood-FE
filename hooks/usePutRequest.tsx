"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type RequestParams = {
  url: string;
  query?: any;
  useBearerToken?: boolean;
  bearerToken?: string;
};

type Response<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  putRequest: (params: RequestParams) => void;
};

const usePutRequest = <T extends any>(): Response<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const putRequest = async ({
    url,
    query = {},
    useBearerToken = false,
    bearerToken,
  }: RequestParams) => {
    setIsLoading(true);
    setError(null);

    const headers: AxiosRequestConfig["headers"] = {
      "Content-Type": "application/json",
    };

    if (useBearerToken && bearerToken) {
      headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    try {
      const response = await axios.put<T>(url, query, { headers });
      setData(response.data);
      setIsLoading(false);
      return response.data; // Return the response data as a Promise
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
      throw error; // Rethrow the error as a Promise rejection
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, putRequest };
};

export default usePutRequest;
