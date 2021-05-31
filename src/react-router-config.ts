import Home from "./pages/Home";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Car from "./pages/Car";
import My from "./pages/My";

export type RouteConfigType = {
  path: string;
  exact?: boolean;
  component: any;
  auth?: boolean;
  strict?: boolean;
  routes?: RouteConfigType;
  render?: any;
}[];

const routes: RouteConfigType = [
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
    auth: true,
    component: Car,
  },
  {
    path: "/my",
    auth: true,
    component: My,
  },

  {
    path: "/login",
    component: Login,
  },
];

export default routes;
