import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/reducer.component";

const localUser = JSON.parse(localStorage.getItem("user"));
const localStorageCookies = JSON.parse(localStorage.getItem("cookies"));
const localStorageRecipes = JSON.parse(localStorage.getItem("recipes"));
const localStorageLikes = JSON.parse(localStorage.getItem("likedCount"));

const INITIAL_STATE = {
  currentUser: localUser,
  cookies: localStorageCookies,
  recipes: localStorageRecipes,
  likedCount: localStorageLikes,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(INITIAL_STATE);
export default Store;
