import axios, { AxiosResponse } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

export const getUser = async (token: string): Promise<User> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response: AxiosResponse<User> = await axios.get("/api/user", config);

  return response.data;
};
