import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./react-router-config";

const App = () => {
  return (
    <BrowserRouter>
      {/* kick it all off with the root route */}
      {renderRoutes(routes)}
    </BrowserRouter>
  );
};

export default App;
