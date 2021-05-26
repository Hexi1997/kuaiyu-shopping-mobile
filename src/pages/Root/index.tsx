import React from "react";
import { renderRoutes } from "react-router-config";
import { Button } from "antd-mobile";
import { inject, observer } from "mobx-react";
import { IntlProvider } from "react-intl";
import zh_CN from "../../locale/zh_CN";
import en_US from "../../locale/en_US";

const Root = ({ route, GlobalStore }: any) => {
  const { lang, changeLang } = GlobalStore;
  const chooseLocale = (val: string) => {
    if (val === "zh") {
      return zh_CN;
    } else {
      return en_US;
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          if (lang === "zh") {
            changeLang("en");
          } else {
            changeLang("zh");
          }
        }}
      >
        切换到{lang === "zh" ? "英文" : "中文"}
      </Button>
      <IntlProvider
        key={lang}
        locale={lang}
        defaultLocale={lang}
        messages={chooseLocale(lang)}
      >
        {renderRoutes(route.routes)}
      </IntlProvider>
    </div>
  );
};

//函数组件注入mobx，并且设置为观察者模式
export default inject("GlobalStore")(observer(Root));
