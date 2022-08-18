import { useCookies } from "@vueuse/integrations/useCookies";
import nprogress from "nprogress";
const TokenKey = "admin-token";
const cookies = useCookies();

//获取token
export const getToken = () => {
  return cookies.get(TokenKey);
};
// 设置token
export const setToken = (token) => {
  return cookies.set(TokenKey, token);
};
// 清楚token
export const removeToken = () => {
  return cookies.remove(TokenKey);
};
// 显示全局loading
export const showFullLoading = () => {
  nprogress.start();
};
// 隐藏全局loading
export const hideFullLoading = () => {
  nprogress.done();
};
