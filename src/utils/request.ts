import axios from "axios";

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * 模块说明:有api_token的请求
 */
export const request = (
  api: string,
  method: MethodType = "GET",
  params = {},
  config: { headers?: object } = {}
) => {
  const apiToken = "************";
  const data = method === "GET" ? "params" : "data";
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  };
  if (config.headers) {
    headers = {
      ...headers,
      ...config.headers,
    };
  }
  return new Promise((resolve, reject) => {
    axios({
      url: api,
      method,
      [data]: params,
      headers,
    })
      .then(resolve)
      .catch((error) => {
        console.dir(error);
        console.error(
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data)
        );
        reject(error);
      });
  });
};
