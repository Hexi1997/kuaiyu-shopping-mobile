import request from "../utils/request";

type GetOrderListParamType = {
  /**
   * 分页
   */
  page?: number;
  /**
   * 标题模糊搜索
   */
  title?: string;
  /**
   * 订单状态: 1下单 2支付 3发货 4收货 5过期
   */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * 包含额外的数据： goods 商品，user 用户 ，orderDetails订单详情
   */
  include?: string;
};
/**
 * 获取订单列表
 * @param params 请求参数
 */
export const getOrderList = (params: GetOrderListParamType) => {
  return request("/orders", "GET", true, params);
};
/**
 * 获取订单详情
 * @param orderId 订单id
 */
export const getOrderDetail = (orderId: number) => {
  return request(`/orders/${orderId}`, "GET", true);
};
/**
 * 获取订单预览信息
 */
export const getOrderPreview = () => {
  return request("/orders/preview");
};
/**
 * 提交订单
 * @param address_id 地址id
 */
export const generateOrder = (address_id: number) => {
  return request("/orders", "POST", true, { address_id });
};
/**
 * 获取订单物流信息
 * @param order 订单id
 */
export const getOrderExpressInfo = (order: number) => {
  return request(`/orders/${order}/express`);
};
/**
 * 确认收货
 * @param order 订单id
 */
export const orderConfirm = (order: number) => {
  return request(`/orders/${order}/confirm`, "PATCH", true);
};
