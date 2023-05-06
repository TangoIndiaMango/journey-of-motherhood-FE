"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface ISearch {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

interface ISearchProviderProps {
  children: ReactNode;
}

const initialState: ISearch = {
  searchValue: "",
  setSearchValue: (value: string) => {},
};

export const SearchContext = createContext<ISearch>(initialState);

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }: ISearchProviderProps) => {
  const [searchValue, setSearchValue] = useState<any>(initialState);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
