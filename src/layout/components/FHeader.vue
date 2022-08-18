<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><Position /></el-icon>
      后台管理
    </span>
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <Fold v-if="$store.state.asideWidth === '250px'" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle"
          ><FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" e="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="LogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 修改密码的抽屉组件 -->
  <FromDrawer
    ref="fromDrawerRef"
    title="修改密码"
    confirmText="提交"
    @submit="onSubmit"
    closeOnClickModal
  >
    <el-form :model="form" :rules="rules" ref="refFrom" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"> </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          v-model="form.password"
          placeholder="请输入新密码"
          type="password"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          placeholder="请确认密码"
          type="password"
          show-password
        >
        </el-input>
      </el-form-item>
    </el-form>
  </FromDrawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import FromDrawer from "~/components/FromDrawer.vue";
import { useRePassword, useHandleLogOut } from "~/composables/useManager.js";
const { isFullscreen, toggle } = useFullscreen();
const { fromDrawerRef, form, rules, refFrom, onSubmit } = useRePassword();
const { handleLogOut } = useHandleLogOut();

// 刷新
const handleRefresh = () => {
  location.reload();
};
const handleCommand = (c) => {
  switch (c) {
    case "LogOut":
      handleLogOut();
      break;
    case "rePassword":
      fromDrawerRef.value.open();
      break;
  }
};
</script>

<style scoped>
.f-header {
  height: 64px;
  @apply flex items-center bg-indigo-500 text-light-50 fixed top-0 right-0 left-0;
}
.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn {
  width: 42px;
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
