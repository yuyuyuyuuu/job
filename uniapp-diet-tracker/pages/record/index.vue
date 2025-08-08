<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back">←</text>
      <text class="nav-title">拍摄食物</text>
    </view>

    <view class="mascot"></view>

    <view class="camera card">
      <text class="cam-icon">📷</text>
      <text class="cam-tip">将食物放在框内</text>
    </view>

    <view class="shoot" @tap="takePhoto">拍照</view>

    <view class="chat card">
      <view class="bubble">
        <text class="face">🙂</text>
        <view class="bubble-col">
          <text class="bubble-text">从相册挖宝～</text>
        </view>
      </view>
    </view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default {
  components: { CustomTabBar },
  methods: {
    takePhoto() { uni.showToast({ title: '打开相机', icon: 'none' }) }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 32rpx 32rpx 160rpx; }
.nav { display:flex; align-items:center; gap: 24rpx; height: 88rpx; }
.back { font-size: 40rpx; color: #A1A8AE; }
.nav-title { font-size: 36rpx; font-weight: 700; }
.mascot { width: 220rpx; height: 220rpx; background:#FFEFD2; border-radius: 9999rpx; margin: 10rpx auto; }
.camera { margin-top: 16rpx; height: 420rpx; border: 2rpx dashed #CFE4DE; border-radius: 24rpx; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 16rpx; }
.cam-icon { font-size: 64rpx; color: #C0C6CC; }
.cam-tip { color:#9AA2A9; }
.shoot { width: 360rpx; height: 96rpx; border-radius: 50rpx; background:#4B8DFF; color:#fff; font-weight:700; display:flex; align-items:center; justify-content:center; margin: 28rpx auto; }
.chat { margin-top: 20rpx; padding: 16rpx; }
.bubble { display:flex; align-items:center; gap: 16rpx; }
.face { font-size: 44rpx; }
.bubble-text { color:#6B757D; }
</style>