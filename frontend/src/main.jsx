import { StrictMode } from "react";
import React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import "./App.css";
import "./i18n/i18n.js";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
