import request from "../utils/request";

/**
 * 查询pid下的所有children数据，省市县数据查询
 * @param pid 父id
 */
export const getCity = (pid: number = 0) => {
  return request("/city", "GET", false, { pid });
};

type AddAddressParamsType = {
  name: string;
  address: string;
  phone: string;
  province: string;
  city: string;
  county: string;
  is_default?: number;
};
/**
 * 添加地址
 * @param params 参数
 */
export const addAddress = (params: AddAddressParamsType) => {
  return request("/address", "POST", true, params);
};
export type AddressInfoType = {
  id: number;
  name: string;
  province: string;
  city: string;
  county: string;
  address: string;
  phone: string;
  is_default: number;
  created_at: Date;
  updated_at: Date;
};
/**
 * 获取当前用户的地址列表
 */
export const getAddressList = () => {
  return request("/address", "GET", true);
};

type UpdateAddressParamsType = {
  name: string;
  address: string;
  phone: string;
  province: string;
  city: string;
  county: string;
  is_default?: number;
};
/**
 * 更新地址
 * @param addressId 地址id
 * @param params 参数
 */
export const updateAddress = (
  addressId: number,
  params: UpdateAddressParamsType
) => {
  return request(`/address/${addressId}`, "PUT", true, params);
};

/**
 * 删除地址
 * @param addressId 地址id
 */
export const deleteAddress = (addressId: number) => {
  return request(`/address/${addressId}`, "DELETE", true);
};
/**
 * 设为默认地址
 * @param addressId 地址id
 */
export const setDefaultAddress = (addressId: number) => {
  return request(`/address/${addressId}/default`, "PATCH", true, {
    address: addressId,
  });
};
