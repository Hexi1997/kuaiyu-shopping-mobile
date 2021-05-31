import { Toast } from "antd-mobile";
import axios from "axios";
import { BASE_URL } from "../service/config";
import { GetToken } from "./storageUtils";

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * 基于axios封装的请求
 * @param api 接口地址,基地址已经有，不用加，例如 /index
 * @param method 方法
 * @param params 参数
 * @param config 配置
 */
const request = (
  api: string,
  method: MethodType = "GET",
  showLoading: boolean = false,
  params = {},
  config: { headers?: object } = {}
) => {
  return new Promise((resolve, reject) => {
    if (showLoading) {
      Toast.loading("请求中...", 10000000, undefined, true);
    }
    const apiToken = GetToken();
    const data = method === "GET" ? "params" : "data";
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }
    if (config.headers) {
      headers = {
        ...headers,
        ...config.headers,
      };
    }

    axios({
      url: BASE_URL + api,
      method,
      [data]: params,
      headers,
    })
      .then((value) => {
        //成功，返回data值
        if (showLoading) {
          Toast.hide();
        }
        resolve(value.data);
      })
      .catch((err) => {
        //错误处理
        Toast.hide();
        const { response } = err;
        const { status, data, request } = response;
        let { message } = data;
        const { responseURL } = request;
        if (status === 422) {
          //代表请求失败，弹出组织语言弹出提示
          const { errors } = data;
          if (errors) {
            message = "";
            for (let v of Object.keys(errors)) {
              message +=
                typeof errors[v] === "string" ? errors[v] : errors[v][0] + "  ";
            }
          }
        } else if (status === 401) {
          if ((responseURL as string).includes("/login")) {
            message = "请确认账号密码输入正确";
          }
        }
        Toast.fail(message, 1.5);
        reject(err.response);
      });
  });
};

export default request;
