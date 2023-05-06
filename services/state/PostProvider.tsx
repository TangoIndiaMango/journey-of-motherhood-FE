"use client";

import { createContext, useContext, useState } from "react";

export interface PostData {
  [key: string]: any;
}

interface PostContextType {
  postValue: PostData | null;
  setPostValue: (post: PostData | null) => void;
}

export const PostContext = createContext<PostContextType>({
  postValue: null,
  setPostValue: () => {},
});

export const usePost = () => useContext(PostContext);

interface PostProviderProps {
  children: React.ReactNode;
}

const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [postValue, setPostValue] = useState<PostData | null>(null);

  return (
    <PostContext.Provider value={{ postValue, setPostValue }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
