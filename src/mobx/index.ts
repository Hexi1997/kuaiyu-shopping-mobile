import { makeAutoObservable } from "mobx";

class GlobalStore {
  //mobx6版本--写法二 自动设置全部可监测
  constructor() {
    makeAutoObservable(this);
  }
  lang: "zh" | "en" = "zh";
  changeLang = (lang: "zh" | "en") => {
    this.lang = lang;
  };
}

export default new GlobalStore();
