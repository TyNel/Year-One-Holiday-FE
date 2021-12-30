import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/reducer.component";

const localUser = localStorage.getItem("user");
console.log(localUser);

const INITIAL_STATE = {
  currentUser: localUser === undefined ? localUser : "",
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
