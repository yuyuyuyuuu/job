<template>
  <view class="tabbar">
    <view class="item" v-for="i in tabs" :key="i.page" @tap="switchTab(i.page)" :class="{active: current===i.page}">
      <view class="top-dot" v-if="current===i.page"></view>
      <view :class="['icon', 'icon-bubble', { active: current===i.page }]" :style="current===i.page ? 'transform: scale(1.06)' : ''">
        <image :src="current===i.page? i.iconActive: i.icon" mode="aspectFit" class="img"/>
      </view>
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
        { page: '/pages/index/index', text: '首页', icon: '/static/icons/home.svg', iconActive: '/static/icons/home-active.svg' },
        { page: '/pages/record/index', text: '记录', icon: '/static/icons/camera.svg', iconActive: '/static/icons/camera-active.svg' },
        { page: '/pages/calendar/index', text: '日历', icon: '/static/icons/calendar.svg', iconActive: '/static/icons/calendar-active.svg' },
        { page: '/pages/profile/index', text: '我的', icon: '/static/icons/user.svg', iconActive: '/static/icons/user-active.svg' }
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
    switchTab(url) { if (this.current !== url) uni.switchTab({ url }) }
  }
}
</script>

<style lang="scss" scoped>
.tabbar { position: fixed; left: 0; right: 0; bottom: 0; height: 120rpx; background: #F3FBF8; box-shadow: 0 -8rpx 24rpx rgba(0,0,0,.04); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom); }
.item { position:relative; display:flex; flex-direction:column; align-items:center; gap: 8rpx; padding-top: 8rpx; }
.top-dot { position:absolute; top: -6rpx; width: 12rpx; height: 12rpx; border-radius: 9999rpx; background: #4B8DFF; }
.icon { width: 68rpx; height: 68rpx; border-radius: 16rpx; display:flex; align-items:center; justify-content:center; font-size: 36rpx; transition: background 200ms, transform 200ms; overflow: hidden; }
.img { width: 44rpx; height: 44rpx; }
.label { font-size: 22rpx; color: #98A0A6; transition: color 200ms; }
.label.active { color: #4B8DFF; font-weight: 600; }
.icon.active { background: #E8EEFF; color: #4B8DFF; box-shadow: inset 0 -4rpx 0 #4B8DFF; }
</style>