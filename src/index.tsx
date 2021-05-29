import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//引入全局mobx
import GlobalStore from "./mobx";
//引入Porvider
import { Provider } from "mobx-react";

//引入重置样式
import "./reset.css";
//引入全局样式
import "./global.less";
ReactDOM.render(
  <React.StrictMode>
    <Provider GlobalStore={GlobalStore}>
      {/* 使用global中的自适应container布局 */}
      <div className="globalcontainer">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
