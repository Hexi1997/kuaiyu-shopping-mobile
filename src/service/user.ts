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
