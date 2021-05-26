import Home from "./pages/Home";
import Root from "./pages/Root";
import user from "./pages/user";
import Login from "./pages/user/Login";

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/user",
        component: user,
        routes: [
          {
            path: "/user",
            component: Login,
          },
          {
            path: "/user/login",
            component: Login,
          },
        ],
      },
    ],
  },
];

export default routes;
