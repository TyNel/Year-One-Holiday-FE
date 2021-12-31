import "./App.css";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import Recipes from "./pages/recipes/recipes.component";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/recipes/:id" element={<Recipes />} />
    </Routes>
  );
}

export default App;
