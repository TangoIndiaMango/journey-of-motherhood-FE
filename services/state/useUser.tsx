"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface ProfileData {
  [key: string]: any;
}

interface UserContextType {
  user: ProfileData | null;
  setUser: (user: ProfileData | null) => void;
}

interface User {
  about_me: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  followers_count: number;
  following_count: number;
  gender: string;
  last_name: string;
  post_count: number;
  profile_pic: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const initialUserString: any =
    typeof window !== "undefined" && window.localStorage.getItem("user");

  const initialUser = JSON.parse(initialUserString) as User;
  const [user, setUser] = useState<ProfileData | null>(initialUser);

  useEffect(() => {
    if (!user) return;
    // Save the user object to local storage whenever it changes
    typeof window !== "undefined" &&
      window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
