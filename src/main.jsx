import React from "react";
import ReactDOM from "react-dom/client"
import  {HashRouter } from "react-router-dom";

import { store } from "./app/store.js"
import "./index.css"

import { Provider } from "react-redux"
import App from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
      <App/>
      </HashRouter>
    </Provider>
  </React.StrictMode>
)