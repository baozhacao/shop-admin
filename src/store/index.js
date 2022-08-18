import { createStore } from "vuex";
import { getInfo } from "~/api/manager";
import { removeToken } from "~/composables/auth";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
      //侧边栏宽度
      asideWidth: '250px',
      menus: [],
      ruleNames: []
    };
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    //侧边栏展开
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth === '250px' ? '64px' : '250px'
    },
    //菜单
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    //权限
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames;
    },
  },
  actions: {
    // 获取用户登陆用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            commit("SET_MENUS", res.menus);
            commit("SET_RULENAMES", res.ruleNames);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 退出登录
    logOut({ commit }) {
      // 移除cookie
      removeToken();
      // 清除用户信息
      commit("SET_USERINFO", {});
    },
  },
});
export default store;
