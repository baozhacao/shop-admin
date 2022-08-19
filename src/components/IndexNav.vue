<template>
  <el-row :gutter="20" class="mt-5">
    <el-col :span="3" v-for="(item, index) in iconNavs" :key="index">
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="flex flex-col items-center justify-center cursor-pointer">
          <el-icon size="17" :color="item.color">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="mt-2 text-sm">{{ item.title }}</span>
        </div>
      </el-card>

    </el-col>
  </el-row>
</template>

<script setup>
const iconNavs = [
  {
    icon: 'user',
    color: 'text-light-blue-500',
    title: '用户',
    path: '/user/list'
  },
  {
    icon: 'shopping-cart',
    color: 'text-light-blue-500',
    title: '商品',
    path: '/goods/list'
  },
  {
    icon: 'tickets',
    color: 'text-light-blue-500',
    title: '订单',
    path: '/order/list'
  },
  {
    icon: 'chat-dot-square',
    color: 'text-light-blue-500',
    title: '评价',
    path: '/comment/list'
  },
  {
    icon: 'picture',
    color: 'text-light-blue-500',
    title: '图库',
    path: '/image/list'
  },
  {
    icon: 'bell',
    color: 'text-light-blue-500',
    title: '公告',
    path: '/notice/list'
  },
  {
    icon: 'set-up',
    color: 'text-light-blue-500',
    title: '配置',
    path: '/setting/list'
  },
  {
    icon: 'files',
    color: 'text-light-blue-500',
    title: '优惠券',
    path: '/coupon/list'
  }
]
</script>

<style scoped>
</style>
