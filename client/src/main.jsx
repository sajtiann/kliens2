import React from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
