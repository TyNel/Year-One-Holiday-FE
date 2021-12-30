import React, { createContext, useReducer } from "react";
import Reducer from "./reducer/reducer.component.js";

const INITIAL_STATE = {
  currentUser: "",
  cookies: [],
  recipes: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(INITIAL_STATE);
export default Store;
