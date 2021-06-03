import request from "../utils/request";
/**
 * 获取购物车商品列表
 */
export const getCartList = () => {
  return request("/carts", "GET", true, { include: "goods" });
};
/**
 * 添加商品到购物车
 * @param params 商品参数
 */
export const addGoodToCart = (params: { goods_id: string; num: number }) => {
  return request("/carts", "POST", true, params);
};
/**
 * 购物车数量改变
 * @param cartId 购物车id
 * @param num 商品数量，至少是1
 */
export const changeCartGoodsCount = (cartId: number, num: number) => {
  return request(`/carts/${cartId}`, "PUT", true, { num });
};
/**
 * 移出购物车
 * @param cartId 商品在购物车中的id
 */
export const removeGoodFromCart = (cartId: number) => {
  return request(`/carts/${cartId}`, "DELETE", true);
};
/**
 * 购物车选中改变
 * @param cart_ids 要设置选中的购物车id数组
 */
export const changeCheckedCart = (cart_ids: number[]) => {
  return request(`/carts/checked`, "PATCH", true, { cart_ids });
};
