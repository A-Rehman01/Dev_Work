import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./Store";
import { setUserToken } from "./Utility/setUserToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setUserToken(localStorage.token);
}

const Settoken = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return null;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Settoken />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
