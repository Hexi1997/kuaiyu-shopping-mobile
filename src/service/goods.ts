import QueryString from "query-string";
import request from "../utils/request";

export type GoodsSortField = "sales" | "price" | "comments_count";

/**
 * 获取商品列表数据
 * @param params 请求参数
 */
export const getGoodsList = (params: Record<string, any>) => {
  let url: string = `/goods`;
  if (params.type) {
    const type = params.type;
    delete params.type;
    params[type] = 1;
  }
  const paramStr = QueryString.stringify(params);
  if (paramStr) {
    url += `?${paramStr}`;
  }
  return request(url);
};
/**
 * 获取商品详情
 * @param goodId 商品id
 */
export const getGoodInfo = (goodId: number) => {
  return request(`/goods/${goodId}`);
};
