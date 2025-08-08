<template>
  <view class="page pb-120">
    <view class="nav"><text class="back" @tap="goBack">←</text><text class="nav-title">设置</text></view>

    <view class="group card">
      <view class="row item between">
        <text>通知提醒</text>
        <switch :checked="notify" @change="e=>notify=e.detail.value" color="#4B8DFF" />
      </view>
      <view class="row item between">
        <text>声音提示</text>
        <switch :checked="sound" @change="e=>sound=e.detail.value" color="#4B8DFF" />
      </view>
      <view class="row item between">
        <text>深色模式</text>
        <switch :checked="dark" @change="e=>dark=e.detail.value" color="#4B8DFF" />
      </view>
    </view>

    <view class="group card mt-16">
      <view class="row item between tap-highlight" @tap="openPrivacy">
        <text>隐私政策</text>
        <text class="arr">›</text>
      </view>
      <view class="row item between tap-highlight" @tap="clearCache">
        <text>清理缓存</text>
        <text class="arr">›</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data(){return{notify:true,sound:true,dark:false}},
  methods:{
    goBack(){ uni.navigateBack() },
    openPrivacy(){ uni.showModal({ title:'隐私政策', content:'示例文本', showCancel:false }) },
    clearCache(){ uni.showToast({ title:'已清理', icon:'success' }) }
  }
}
</script>

<style lang="scss" scoped>
.page{ padding:32rpx }
.nav{ display:flex; align-items:center; gap:24rpx; height:88rpx }
.back{ font-size:40rpx; color:#A1A8AE }
.nav-title{ font-size:36rpx; font-weight:700 }
.group{ padding: 8rpx 16rpx }
.item{ padding: 24rpx 8rpx; border-bottom: 1rpx solid #EDF2F4 }
.item:last-child{ border-bottom: none }
.arr{ color:#9AA2A9 }
</style>