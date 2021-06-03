import { makeAutoObservable } from "mobx";
type UserType =
  | {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string;
      openid: string;
      avatar_url: string;
      is_locked: number;
      created_at: Date;
      updated_at: Date;
    }
  | {};
class GlobalStore {
  //mobx6版本--写法二 自动设置全部可监测
  constructor() {
    makeAutoObservable(this);
  }
  //国际化--语言
  lang: "zh" | "en" = "zh";
  changeLang = (lang: "zh" | "en") => {
    this.lang = lang;
  };
  //用户信息
  user: UserType = {};
  changeUser = (user: UserType) => {
    this.user = user;
  };
}

export default new GlobalStore();
