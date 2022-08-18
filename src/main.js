import { createApp } from "vue";
import App from "./App.vue";

import { router } from "./router";
import store from "./store";

import "virtual:windi.css";

// 全局引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

// 全局引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

import "./permission";
import "../node_modules/nprogress/nprogress.css";
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
