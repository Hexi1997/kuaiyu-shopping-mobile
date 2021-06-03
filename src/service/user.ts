import request from "../utils/request";

/**
 * 登录
 * @param params 登录参数
 */
export const login = (params: Record<string, string>) => {
  return request(`/auth/login`, "POST", true, params);
};
/**
 * 注册
 * @param params 注册参数
 */
export const register = (params: Record<string, string>) => {
  return request(`/auth/register`, "POST", true, params);
};
/**
 * 退出登录
 */
export const quitLogin = () => {
  return request(`/auth/logout`, "POST", true);
};

/**
 * 获取个人登录信息
 */
export const getUserInfo = () => {
  return request("/user", "GET", true);
};
/**
 * 获取阿里云oss配置
 */
export const getOss = () => {
  return request("/auth/oss/token", "GET", true);
};
/**
 * 更新昵称
 * @param name 昵称
 */
export const updateUserName = (name: string) => {
  return request("/user", "PUT", true, { name });
};
/**
 * 更新头像
 * @param avatar 头像地址
 */
export const updateUserAvatar = (avatar: string) => {
  return request("/user/avatar", "PATCH", true, { avatar });
};

export const uploadImgToOss = (url: string, data: object) => {
  return request(
    url,
    "POST",
    true,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
    false
  );
};
