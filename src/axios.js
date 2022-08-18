import axios from "axios";
import { toast } from "~/composables/util";
import { getToken } from "~/composables/auth";
import store from "~/store";

const severs = axios.create({
  baseURL: "/api",
  timeout: 1000,
});
// 添加请求拦截器
severs.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // 像header头传token
    const token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
severs.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    return res.data.data;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.data.msg == "非法token，请先登录！") {
      store.dispatch("logout").finally(() => location.reload());
    }
    toast(error.response.data.msg || "请求失败", "error");
    return Promise.reject(error);
  }
);
export default severs;
