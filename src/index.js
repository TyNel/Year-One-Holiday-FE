import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Store from "../src/pages/store/store.component";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <BrowserRouter>
    <Store>
      <App />
      <ToastContainer
        theme={"colored"}
        position={"bottom-left"}
        autoClose={1250}
        closeOnClick={true}
      />
    </Store>
  </BrowserRouter>,
  document.getElementById("root")
);
