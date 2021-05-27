import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//引入全局mobx
import GlobalStore from "./mobx";
//引入Porvider
import { Provider } from "mobx-react";
ReactDOM.render(
  <React.StrictMode>
    <Provider GlobalStore={GlobalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
