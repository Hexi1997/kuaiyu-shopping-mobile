import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./react-router-config";
//引入全局mobx
import GlobalStore from "./mobx";
//引入Porvider
import { Provider } from "mobx-react";

const App = () => {
  return (
    <Provider GlobalStore={GlobalStore}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  );
};

export default App;
