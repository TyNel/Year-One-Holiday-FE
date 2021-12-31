import "./App.css";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import Recipes from "./pages/recipes/recipes.component";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  let user = localStorage.getItem("user");
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/homepage"
        element={user === null ? <Navigate to="/signin" /> : <HomePage />}
      />
      <Route
        path="/recipes/:id"
        element={user === null ? <Navigate to="/signin" /> : <Recipes />}
      />
    </Routes>
  );
}

export default App;
