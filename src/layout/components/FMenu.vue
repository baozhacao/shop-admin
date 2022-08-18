<template>
  <div class="f-menu">
    <el-menu
      :default-active="defaultActive"
      @select="handleSelect"
      :style="{ width: store.state.asideWidth }"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <template v-for="(item, index) in menuList" :key="index">
        <!-- 有两层的菜单 -->
        <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 只有一层的菜单 -->
        <el-menu-item :index="item2.frontpath" v-else>
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref } from "vue";
const router = useRouter();
const route = useRoute();
const store = useStore();
const menuList = computed(() => store.state.menus);
//侧边栏展开收缩
const isCollapse = computed(() => !(store.state.asideWidth === "250px"));
//默认选中当前路由路径
const defaultActive = ref(route.path);
// 点击切换路由
const handleSelect = (e) => {
  router.push(e);
};
</script>

<style scoped>
.f-menu {
  transform: all 0.2s;
  top: 64px;
  left: 0;
  bottom: 0;
  overflow: auto;
  @apply fixed shadow-md bg-light-50;
}
.el-menu {
  border: 0;
}
.f-menu::-webkit-scrollbar {
  width: 0;
}
</style>
