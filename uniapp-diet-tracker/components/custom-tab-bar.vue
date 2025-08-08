<template>
  <view class="tabbar">
    <view class="item" v-for="i in tabs" :key="i.page" @tap="switchTab(i.page)">
      <view :class="['icon', { active: current===i.page }]">{{ i.emoji }}</view>
      <text :class="['label', { active: current===i.page }]">{{i.text}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: '',
      tabs: [
        { page: '/pages/index/index', text: '首页', emoji: '🏠' },
        { page: '/pages/record/index', text: '记录', emoji: '📷' },
        { page: '/pages/calendar/index', text: '日历', emoji: '📆' },
        { page: '/pages/profile/index', text: '我的', emoji: '👤' }
      ]
    }
  },
  created() { this.syncRoute() },
  onShow() { this.syncRoute() },
  methods: {
    syncRoute() {
      const pages = getCurrentPages();
      this.current = '/' + pages[pages.length - 1].route;
    },
    switchTab(url) {
      if (this.current === url) return;
      uni.switchTab({ url });
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed; left: 0; right: 0; bottom: 0;
  height: 120rpx; background: #F3FBF8; box-shadow: 0 -8rpx 24rpx rgba(0,0,0,.04);
  display: flex; justify-content: space-around; align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
}
.item { display:flex; flex-direction:column; align-items:center; gap: 8rpx; }
.icon { width: 68rpx; height: 68rpx; border-radius: 16rpx; background: #ffffff; display:flex; align-items:center; justify-content:center; font-size: 36rpx; }
.label { font-size: 22rpx; color: #98A0A6; }
.label.active { color: #4B51FF; font-weight: 600; }
.icon.active { background: #E8EEFF; color: #4B51FF; }
</style>