<template>
  <el-row class="min-h-screen bg-indigo-500">
    <!-- 左边 -->
    <el-col :lg="16" :md="12" class="flex">
      <div>
        <div class="title">欢迎光临</div>
        <div>此站点是《vue3+vite实战商城后台开发》视频课程的演示地址</div>
      </div>
    </el-col>
    <!-- 右边 -->
    <el-col :lg="8" :md="12" class="bg-light-50 flex flex-col">
      <h2 class="titleBack">欢迎回来</h2>
      <div class="flex my-5 text-gray-300 space-x-2">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form :model="form" :rules="rules" ref="refFrom">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
            show-password
            @keyup.enter.native="onSubmit"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            round
            class="w-[250px]"
            color="#626aef"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { toast } from "~/composables/util";
import { setToken } from "~/composables/auth";
import { useRouter } from "vue-router";
import { login } from "~/api/manager";

const route = useRouter();

const form = reactive({
  userName: "",
  password: "",
});

const rules = {
  userName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};

// 使用ref变成响应式
const refFrom = ref(null);
const loading = ref(false);

const onSubmit = () => {
  refFrom.value.validate(async (valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;
    try {
      const res = await login(form.userName, form.password);
      // 提示成功
      toast("登陆成功");
      // 存储token
      setToken(res.token);
      // 跳转页面
      route.push("/");
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.el-col {
  display: flex;
}
.flex {
  @apply flex justify-center items-center;
}
.title {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.titleBack {
  @apply font-bold text-3xl text-gray-800;
}
.line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
