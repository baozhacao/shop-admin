import axios from "~/axios";
// 登录
export const login = (username, password) => {
  return axios.post("/admin/login", { username, password });
};
// 获取用户信息
export const getInfo = () => {
  return axios.post("admin/getinfo");
};
// 退出登录
export const logOut = () => {
  return axios.post("admin/logout");
};
// 修改密码
export const updatePassword = (data) => {
  return axios.post("admin/updatepassword", data);
};
