import { router, addRouters } from "~/router";
import store from "~/store";
import { getToken, showFullLoading, hideFullLoading } from "~/composables/auth";
import { toast } from "~/composables/util";
let hasGetInfo = false
// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading();
  const token = getToken();
  // 没有登陆，强制跳转到登录页
  if (!token && to.path !== "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }
  // 防止重复登陆
  if (token && to.path === "/login") {
    toast("请勿重复登陆", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  //如果用户登陆了，自动获取用户信息，防止页面刷新会空白
  let hasNewRouter = false
  if (token && !hasGetInfo) {
    let { menus } = await store.dispatch("getInfo");
    hasGetInfo = true
    //动态添加路由
    hasNewRouter = addRouters(menus)
  }
  // 切换路由之后改变页面的名称
  let title = (to.meta.title ? to.meta.title : "") + "-商城后台";
  document.title = title;
  // 防止刷新之后路由报404页面，解决方法，再添加新路由的时候定义变量，
  // 把变量换成true，如果有，就手动跳转到现在点的路由，如果没有新添加的，就默认跳转
  hasNewRouter ? next(to.fullPath) : next()
});
router.afterEach((to, from) => {
  // 关闭loading
  hideFullLoading();
});
