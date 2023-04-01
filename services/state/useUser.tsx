"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface ProfileData {
  [key: string]: any;
}

interface UserContextType {
  user: ProfileData | null;
  setUser: (user: ProfileData | null) => void;
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
  const [user, setUser] = useState<ProfileData | null>(null);

  useEffect(() => {
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
