<template>
  <div>
    <el-row :gutter="20">
      <!-- 骨架屏 -->
      <template v-if="panels.length === 0">
        <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl text-gray-500 font-bold">
            <CountTo :value="item.value"></CountTo>
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IndexNav></IndexNav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getStatistics1 } from "~/api/index.js";
import CountTo from "../components/CountTo.vue";
import IndexNav from "../components/IndexNav.vue";
const panels = ref([]);
getStatistics1().then((res) => {
  panels.value = res.panels;
});
</script>

<style scoped>
</style>
