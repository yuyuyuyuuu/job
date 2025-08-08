<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back">←</text>
      <text class="nav-title">拍摄食物</text>
    </view>

    <view class="mascot"></view>

    <view class="camera card camera-box">
      <text class="cam-icon">📷</text>
      <text class="cam-tip">将食物放在框内</text>
    </view>

    <view class="shoot tap-scale" @tap="takePhoto">拍照</view>

    <view class="chat card">
      <view class="bubble" @tap="openAlbum">
        <text class="face bounce">🙂</text>
        <view class="bubble-col">
          <text class="bubble-text">从相册挖宝～</text>
        </view>
      </view>
    </view>

    <view class="recent mt-16" v-if="recent.length">
      <view class="recent-title">最近拍摄</view>
      <scroll-view scroll-x class="thumbs">
        <view class="thumb-item" v-for="(t,idx) in recent" :key="idx" @tap="preview(t)">
          <view class="thumb">{{t.emoji}}</view>
          <text class="t-time">{{t.time}}</text>
        </view>
      </scroll-view>
    </view>

    <view v-if="showTips" class="tips-float" @tap="dismissTips">
      📌 拍全食物边缘，光线充足识别更准
    </view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default {
  components: { CustomTabBar },
  data(){
    return {
      showTips: true,
      recent: [
        { emoji: '🥗', time: '10:12' },
        { emoji: '🍜', time: '12:41' },
        { emoji: '🍎', time: '14:05' }
      ]
    }
  },
  methods: {
    takePhoto() { uni.showToast({ title: '打开相机', icon: 'none' }) },
    openAlbum(){ uni.showToast({ title: '打开相册', icon: 'none' }) },
    dismissTips(){ this.showTips=false },
    preview(t){ uni.showToast({ title: `预览 ${t.emoji}`, icon: 'none' }) }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 32rpx 32rpx 160rpx; }
.nav { display:flex; align-items:center; gap: 24rpx; height: 88rpx; }
.back { font-size: 40rpx; color: #A1A8AE; }
.nav-title { font-size: 36rpx; font-weight: 700; }
.mascot { width: 220rpx; height: 220rpx; background:#FFEFD2; border-radius: 9999rpx; margin: 10rpx auto; }
.camera { margin-top: 16rpx; height: 420rpx; border-radius: 24rpx; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 16rpx; }
.camera-box { border: 2rpx dashed #CFE4DE; animation: dash 1.2s infinite; }
.cam-icon { font-size: 64rpx; color: #C0C6CC; }
.cam-tip { color:#9AA2A9; }
.shoot { width: 360rpx; height: 96rpx; border-radius: 50rpx; background:#4B8DFF; color:#fff; font-weight:700; display:flex; align-items:center; justify-content:center; margin: 28rpx auto; transition: filter 200ms; }
.shoot:active { filter: brightness(.92); }
.chat { margin-top: 20rpx; padding: 16rpx; }
.bubble { display:flex; align-items:center; gap: 16rpx; }
.face { font-size: 44rpx; }
.bounce { animation: bounce 1.4s infinite; }
.bubble-text { color:#6B757D; }
.recent-title { color:#7F8A92; margin: 8rpx 4rpx; font-size: 24rpx; }
.thumbs { white-space: nowrap; }
.thumb-item { display:inline-flex; flex-direction:column; align-items:center; margin-right: 16rpx; }
.thumb { width: 128rpx; height: 128rpx; border-radius: 16rpx; background:#fff; box-shadow: 0 8rpx 20rpx rgba(0,0,0,.06); display:flex; align-items:center; justify-content:center; font-size: 48rpx; }
.t-time { font-size: 22rpx; color:#99A2A9; margin-top: 8rpx; }
.tips-float { position: fixed; left: 32rpx; right: 32rpx; bottom: 176rpx; background: rgba(255,255,255,.9); backdrop-filter: blur(4rpx); box-shadow: 0 8rpx 20rpx rgba(0,0,0,.08); border-radius: 16rpx; padding: 16rpx 20rpx; color:#556; }
</style>