<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="closeOnClickModal"
  >
    <div class="fromDrawer">
      <div class="body"><slot></slot></div>
      <div class="actions">
        <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">关闭</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref(false);
// 开
const open = () => (showDrawer.value = true);
// 关
const close = () => (showDrawer.value = false);
//接受参数
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "40%",
  },
  closeOnClickModal: {
    type: Boolean,
    default: "false",
  },
  confirmText: String,
});
const emit = defineEmits(["submit"]);
const submit = () => emit("submit");
// 向父组件暴露以下方法
defineExpose({
  open,
  close,
});
</script>

<style scoped>
.fromDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.fromDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.fromDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
