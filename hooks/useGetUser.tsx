"use client";

import { ProfileData } from "@/services/state/useUser";
import useGetRequest from "./useGetRequest";
import { profileUrl } from "@/services/utils/url";

const useGetUser = ({ accessToken }: any) => {
  const { data, isLoading, error } = useGetRequest<ProfileData>({
    url: profileUrl,
    useBearerToken: true,
    bearerToken: accessToken,
  });

  return { isLoading, error, data };
};

export default useGetUser;
