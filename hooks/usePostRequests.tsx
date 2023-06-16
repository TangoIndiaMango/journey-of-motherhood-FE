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
  data: T | null | any;
  isLoading: boolean;
  error: string | null;
  postRequest: (params: RequestParams) => void;
};

const usePostRequest = <T extends any>(): Response<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const postRequest = async ({
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
      const response = await axios.post<T>(url, query, { headers });
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

  return { data, isLoading, error, postRequest };
};

export default usePostRequest;
