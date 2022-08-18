# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

# 开发笔记

## 全局配置
- 配置别名
- 全局注册引入element-plus、windiCss、router、vuex
- 创建store文件夹，配置状态管理中心，存放异步请求用户数据。
- 创建router文件夹，配置路由
- 创建permission文件封装路由，对路由进行一些权限校验，并把首次获取用户的所有信息在store里请求存放在store里，防止页面刷新数据消失
- 创建pages存放页面
- 创建composables文件夹存放公共的一些方法和抽离出来的逻辑函数
- 创建api文件夹存放请求的路径函数
- 创建layout文件夹存放整体的布局，包括头部、侧边栏、导航标签和主体部分
- 使用vueuse中cookies、useFullscreen等api
- 使用nprogress加载导航条
- 使用gsap库做数字动画