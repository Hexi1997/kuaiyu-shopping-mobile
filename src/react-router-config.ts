import Home from "./pages/Home";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Car from "./pages/Car";
import My from "./pages/My";
import Address from "./pages/Address";
import AddressAddOrUpdate from "./pages/AddressUpdate";
import GoodsInfo from "./pages/GoodsInfo";
import OrderList from "./pages/Order/OrderList";
import OrderPreview from "./pages/Order/OrderPreview";
import OrderExpress from "./pages/Order/OrderExpress";
import OrderComment from "./pages/Order/OrderComment";

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
    exact: true,
    component: My,
  },
  {
    path: "/my/address",
    auth: true,
    exact: true,
    component: Address,
  },
  {
    path: "/my/address/change",
    auth: true,
    exact: true,
    component: AddressAddOrUpdate,
  },
  {
    path: "/good",
    auth: true,
    exact: true,
    component: GoodsInfo,
  },
  {
    path: "/orders",
    auth: true,
    exact: true,
    component: OrderList,
  },
  {
    path: "/orders/preview",
    auth: true,
    exact: true,
    component: OrderPreview,
  },
  {
    path: "/orders/express",
    auth: true,
    exact: true,
    component: OrderExpress,
  },
  {
    path: "/orders/comment",
    auth: true,
    exact: true,
    component: OrderComment,
  },
  {
    path: "/login",
    component: Login,
  },
];

export default routes;
