import request from "../utils/request";

/**
 * 获取首页数据URL
 */
export const getHomeUrl = () => {
  return request("/index");
};

/**
 * 获取分页的畅销、新书、精选
 * @param pageNum 分页数量
 * @param type 类型
 */
export const getSNRPageData = (
  pageNum: number,
  type: "sale" | "new" | "recommend"
) => {
  let url = "";
  if (type === "sale") {
    url = `/index?recommend=0&sales=1&new=0&page=${pageNum}`;
  } else if (type === "new") {
    url = `/index?recommend=0&sales=0&new=1&page=${pageNum}`;
  } else if (type === "recommend") {
    url = `/index?recommend=1&sales=0&new=0&page=${pageNum}`;
  }
  return request(url);
};
