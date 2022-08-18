import { useCookies } from "@vueuse/integrations/useCookies";
import { ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

export function useTabList() {
  const router = useRouter();
  const cookie = useCookies();
  const activeTab = ref(router.path);
  const tabList = ref([
    {
      title: "首页",
      path: "/",
    },
  ]);
  //监听路由
  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path;
    addTab({
      title: to.meta.title,
      path: to.path,
    });
  });
  //添加标签导航
  function addTab(tab) {
    let noTab = tabList.value.findIndex((t) => t.path === tab.path) === -1;
    if (noTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }
  //初始化标签导航，防止刷新消失
  function initTabList() {
    let tbs = cookie.get("tabList");
    if (tbs) {
      tabList.value = tbs;
    }
  }
  initTabList();
  //点击标签切换
  const changeTabs = (t) => {
    activeTab.value = t;
    router.push(t);
  };
  //移除标签
  const removeTab = (t) => {
    let tabs = tabList.value;
    let a = activeTab.value;
    console.log(a, t);
    if (a === t) {
      tabs.forEach((tab, index) => {
        if (tab.path === t) {
          const nextTabs = tabs[index + 1] || tabs[index - 1];
          if (nextTabs) {
            a = nextTabs.path;
          }
        }
      });
    }
    activeTab.value = a;
    tabList.value = tabList.value.filter((tab) => tab.path !== t);
    cookie.set("tabList", tabList.value);
  };
  const handleClose = (c) => {
    if (c === "clearAll") {
      activeTab.value = "/";
      tabList.value = [
        {
          title: "首页",
          path: "/",
        },
      ];
    } else if (c === "clearOther") {
      //过滤只剩下首页和当前激活的，其他都清除
      tabList.value = tabList.value.filter(
        (tab) => tab.path === "/" || tab.path === activeTab.value
      );
    }
    cookie.set("tabList", tabList.value);
  };
  return {
    activeTab,
    tabList,
    changeTabs,
    removeTab,
    handleClose
  }
}