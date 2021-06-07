import request from "../utils/request";
/**
 * 生成支付宝支付二维码
 * @param order 订单id
 */
export const getQrCode = (order: number) => {
  return request(`/orders/${order}/pay`, "GET", true, { type: "aliyun" });
};
/**
 * 查询支付状态
 * @param order 订单id
 */
export const getPayStatus = (order: number) => {
  return request(`/orders/${order}/status`);
};
