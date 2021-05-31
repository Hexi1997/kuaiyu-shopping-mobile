const TOKEN_KEY: string = "token";

/**
 * 设置token值
 * @param token token值
 */
const SetToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
/**
 * 获取token值
 */
const GetToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export { SetToken, GetToken };
