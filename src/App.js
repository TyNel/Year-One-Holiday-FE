import "./App.css";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import Recipes from "./pages/recipes/recipes.component";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../src/pages/store/store.component.js";

function App() {
  const [state] = useContext(Context);
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/homepage"
        element={state.currentUser ? <HomePage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/recipes/:id"
        element={state.currentUser ? <Recipes /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

export default App;
