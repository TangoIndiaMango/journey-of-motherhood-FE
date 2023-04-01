"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

interface IAction {
  type: string;
  payload: any;
}

interface IState {
  token: string[] | null;
}
export const storeContext = createContext<any>(null);

const reducer = (state: IState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case "addToken":
      localStorage.setItem(
        "access_token",
        JSON.stringify(payload.access_token)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(payload.refresh_token)
      );
      return {
        token: payload,
      };

    default:
      return state;
  }
};

const initialState: IState = {
  token: null,
};

const Store = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const initToken: any = {
      access_token,
      refresh_token,
    };
    if (initToken)
      dispatch({ type: "addToken", payload: JSON.parse(initToken) });
  }, []);

  return (
    <storeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default Store;

export const useStore = () => useContext(storeContext);
