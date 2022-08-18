import { ElNotification, ElMessageBox } from "element-plus";
//成功提示统一方法
export const toast = (message, type = "success") => {
  ElNotification({
    title: message,
    type,
    duration: 3000,
  });
};
export const showModel = (
  content = "",
  title = "提示内容",
  type = "warning"
) => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type,
  });
};
