import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { store } from "./app/store";
import { Provider } from "react-redux";
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
        <App />
      </SkeletonTheme>
    </Provider>
  </BrowserRouter>
);
