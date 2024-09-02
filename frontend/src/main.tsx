import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

//redux
import { Provider } from "react-redux";
import { storeConfig } from "./store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={storeConfig}>
      <App />
    </Provider>
  </React.StrictMode>
);
