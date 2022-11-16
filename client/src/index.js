import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
// import { AppProvider } from "./context/appContext";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AppProvider>
      <App />
    </AppProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
