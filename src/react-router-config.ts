import Home from "./pages/Home";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Car from "./pages/Car";
import My from "./pages/My";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/car",
    component: Car,
  },
  {
    path: "/my",
    component: My,
  },

  {
    path: "/login",
    component: Login,
  },
];

export default routes;
