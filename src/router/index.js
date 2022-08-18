import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("~/pages/index.vue");
const Login = () => import("~/pages/Login.vue");
const NotFound = () => import("~/pages/404.vue");
const Layout = () => import("~/layout/layout.vue");
const GoodList = () => import("~/pages/goods/list.vue");
const CategoryList = () => import("~/pages/category/list.vue");

const routes = [
  {
    path: "/",
    name: 'admin',
    component: Layout,
    meta: { title: "首页" }
  },
  { path: "/login", component: Login, meta: { title: "登录" } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
//动态路由的数组,匹配菜单动态添加路由
const asyncRoutes = [
  { path: "/", name: '/', component: Index, meta: { title: "首页" } },
  { path: "/goods/list", name: '/goods/list', component: GoodList, meta: { title: "商品管理" } },
  { path: "/category/list", name: '/category/list', component: CategoryList, meta: { title: "分类管理" } }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export function addRouters(menus) {
  //是否有新的路由
  let haNewRouter = false
  const findAndAddRoutes = (arr) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path === e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        // console.log(item);
        router.addRoute('admin', item)
        haNewRouter = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutes(e.child)
      }
    });
  }
  findAndAddRoutes(menus)
  return haNewRouter
}
