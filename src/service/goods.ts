import QueryString from "query-string";
import request from "../utils/request";

export type GoodsSortField = "sales" | "price" | "comments_count";

/**
 * 获取分类模块数据
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
