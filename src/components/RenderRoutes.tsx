import { Route, Redirect, Switch } from "react-router-dom";
import { RouteConfigType } from "../react-router-config";
import { GetToken } from "../utils/storageUtils";

const LOGIN_PATH = "/login";

export const RenderRoutes = (routes: RouteConfigType) => {
  return (
    <Switch>
      {routes.map((route, i: number) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const isLoggedIn = GetToken() ? true : false;
            const pathname = props.location.pathname;
            if (!isLoggedIn && route.auth && pathname !== LOGIN_PATH) {
              //没有登录、当前页面要求登录、当前页面不是登录界面，跳转到登录界面
              // return <Redirect to={LOGIN_PATH} />;
              props.history.push(LOGIN_PATH, pathname);
            } else {
              //直接渲染路由即可，不需要权限认证
              return route.render
                ? route.render({ ...props, route: route })
                : route.component && (
                    <route.component {...props} route={route} />
                  );
            }
          }}
        />
      ))}
    </Switch>
  );
};
