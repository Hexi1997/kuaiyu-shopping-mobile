import request from "../utils/request";
/**
 * 获取我的收藏
 * @param page 页数
 */
export const getCollects = (page: number) => {
  return request("/collects", "GET", true, { page });
};
/**
 * 商品收藏状态切换
 * @param goodId 商品id
 */
export const changeGoodCollect = (goodId: number) => {
  return request(`/collects/goods/${goodId}`, "POST", true, { goods: goodId });
};
