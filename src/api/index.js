import axios from "~/axios";
// 首页数据
export const getStatistics1 = () => {
  return axios.get("admin/statistics1");
};