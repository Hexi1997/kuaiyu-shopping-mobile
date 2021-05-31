import { BrowserRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { IntlProvider } from "react-intl";
import zh_CN from "./locale/zh_CN";
import en_US from "./locale/en_US";
import routes from "./react-router-config";
import { RenderRoutes } from "./components/RenderRoutes";

const chooseLocale = (val: string) => {
  if (val === "zh") {
    return zh_CN;
  } else {
    return en_US;
  }
};

const App = ({ GlobalStore }: any) => {
  const { lang } = GlobalStore;

  return (
    // 国际化
    <IntlProvider
      key={lang}
      locale={lang}
      defaultLocale={lang}
      messages={chooseLocale(lang)}
    >
      {/* 渲染路由 */}
      <BrowserRouter>{RenderRoutes(routes)}</BrowserRouter>
    </IntlProvider>
  );
};

//函数组件注入mobx，并且设置为观察者模式
export default inject("GlobalStore")(observer(App));
