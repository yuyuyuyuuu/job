<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back">←</text>
      <text class="nav-title">拍摄食物</text>
    </view>

    <view class="mascot">
      <view class="cap"></view>
      <view class="blush blush-l"></view>
      <view class="blush blush-r"></view>
      <view class="eye"></view>
      <view class="eye eye-r"></view>
    </view>

    <view class="camera card-soft camera-box">
      <image class="cam-svg" src="/static/icons/camera.svg" mode="aspectFit" />
      <text class="cam-tip">将食物放在框内</text>
    </view>

    <view class="shoot tap-scale" @tap="takePhoto">拍照</view>

    <view class="album card-soft" @tap="openAlbum">
      <view class="album-left">
        <view class="avatar">😊</view>
        <view class="album-text">从相册挖宝～</view>
      </view>
      <view class="album-arrows">
        <image src="/static/icons/arrow-up.svg" class="arr"/>
        <image src="/static/icons/arrow-down.svg" class="arr"/>
      </view>
    </view>

    <view class="recent mt-16" v-if="recent.length">
      <view class="recent-title">最近拍摄</view>
      <scroll-view scroll-x class="thumbs">
        <view class="thumb-item card-soft" v-for="(t,idx) in recent" :key="idx" @tap="preview(t)">
          <view class="thumb">{{t.emoji}}</view>
          <text class="t-time">{{t.time}}</text>
        </view>
      </scroll-view>
    </view>

    <view class="tips-float bubble-yellow" v-if="showTips" @tap="dismissTips">
      <text>💡 拍全食物边缘，光线充足识别更准</text>
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
    takePhoto() { uni.navigateTo({ url: '/pages/record/result' }) },
    openAlbum(){ uni.showToast({ title: '打开相册', icon: 'none' }) },
    dismissTips(){ this.showTips=false },
    preview(t){ uni.showToast({ title: `预览 ${t.emoji}`, icon: 'none' }) }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: calc(env(safe-area-inset-top) + 24rpx) 32rpx 160rpx; }
.nav { display:flex; align-items:center; gap: 24rpx; height: 88rpx; }
.back { font-size: 40rpx; color: #A1A8AE; }
.nav-title { font-size: 36rpx; font-weight: 700; }

.mascot { position: relative; width: 200rpx; height: 200rpx; background:#FFEFD2; border-radius: 9999rpx; margin: 6rpx auto 12rpx; box-shadow: inset 0 8rpx 20rpx rgba(0,0,0,.06); }
.cap { position:absolute; top: 20rpx; left: 66rpx; width: 72rpx; height: 32rpx; background:#fff; border-radius: 12rpx; box-shadow: inset 0 -4rpx 0 rgba(0,0,0,.06) }
.eye { position:absolute; top: 90rpx; left: 70rpx; width: 14rpx; height: 14rpx; background:#222; border-radius:9999rpx; }
.eye-r { left: 114rpx }
.blush { position:absolute; width: 22rpx; height: 12rpx; background:#FFC7B6; border-radius: 9999rpx; bottom: 64rpx }
.blush-l { left: 54rpx } .blush-r { right: 54rpx }

.camera { margin-top: 8rpx; height: 420rpx; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 12rpx; border: 2rpx dashed #CFE4DE; }
.cam-svg { width: 72rpx; height: 72rpx }
.cam-tip { color:#6F7A83; font-size: 28rpx }

.shoot { width: 420rpx; height: 96rpx; border-radius: 60rpx; background:#4B8DFF; color:#fff; font-weight:700; display:flex; align-items:center; justify-content:center; margin: 22rpx auto; transition: filter 200ms; }
.shoot:active { filter: brightness(.92); }

.album { margin-top: 6rpx; padding: 18rpx; display:flex; align-items:center; justify-content:space-between; }
.album-left { display:flex; align-items:center; gap: 12rpx }
.avatar { width: 44rpx; height: 44rpx; border-radius: 9999rpx; background:#FFF0D8; display:flex; align-items:center; justify-content:center; }
.album-text { color:#6B757D }
.album-arrows { display:flex; gap: 8rpx }
.arr { width: 28rpx; height: 28rpx }

.recent-title { color:#7F8A92; margin: 8rpx 4rpx; font-size: 24rpx; }
.thumbs { white-space: nowrap; }
.thumb-item { display:inline-flex; flex-direction:column; align-items:center; margin-right: 16rpx; padding: 10rpx }
.thumb { width: 128rpx; height: 128rpx; border-radius: 16rpx; background:#F7FAF9; display:flex; align-items:center; justify-content:center; font-size: 48rpx; }
.t-time { font-size: 22rpx; color:#99A2A9; margin-top: 8rpx; }

.tips-float { position: fixed; left: 32rpx; right: 32rpx; bottom: 176rpx; padding: 16rpx 20rpx; color:#556; display:flex; align-items:center; }
</style>