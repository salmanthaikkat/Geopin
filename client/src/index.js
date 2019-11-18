import React from "react";
import ReactDOM from "react-dom";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
