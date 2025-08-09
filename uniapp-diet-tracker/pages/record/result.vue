<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back" @tap="goBack">←</text>
      <text class="nav-title">识别结果</text>
      <image src="/static/icons/search.svg" class="search"/>
    </view>

    <view class="mascot">
      <view class="cap"></view>
      <view class="eye"></view>
      <view class="eye eye-r"></view>
    </view>

    <view class="card grad-soft-yellow p-24">
      <view class="title-row">
        <text class="section-title">识别到的食材</text>
      </view>
      <view class="chips">
        <view class="chip">鸡胸肉</view>
        <view class="chip">生菜</view>
        <view class="chip">番茄</view>
        <view class="chip">黄瓜</view>
      </view>
    </view>

    <view class="card grad-soft-orange p-24 mt-16">
      <view class="title-row">
        <text class="section-title">修正食材</text>
      </view>
      <view class="chips">
        <view class="chip chip-active">沙拉酱</view>
        <view class="chip">坚果</view>
      </view>
    </view>

    <view class="row gap-16 mt-24">
      <view class="btn tap-scale" @tap="confirm">确认记录</view>
      <view class="btn light tap-scale" @tap="retake">重新拍摄</view>
    </view>
  </view>
</template>

<script>
export default{
  methods:{
    goBack(){ uni.navigateBack() },
    confirm(){ uni.showToast({ title:'已记录', icon:'success' }) },
    retake(){ uni.navigateBack() }
  }
}
</script>

<style lang="scss" scoped>
.page{ padding: calc(env(safe-area-inset-top) + 24rpx) 32rpx 160rpx }
.nav{ display:flex; align-items:center; justify-content:space-between; height: 88rpx }
.back{ font-size: 40rpx; color:#A1A8AE }
.nav-title{ font-size: 36rpx; font-weight: 700 }
.search{ width: 28rpx; height: 28rpx }
.mascot{ position:relative; width: 160rpx; height:160rpx; background:#FFEFD2; border-radius:9999rpx; margin: 8rpx auto 18rpx; box-shadow: inset 0 8rpx 20rpx rgba(0,0,0,.06) }
.cap{ position:absolute; top: 16rpx; left: 52rpx; width: 64rpx; height: 28rpx; background:#fff; border-radius: 12rpx; box-shadow: inset 0 -4rpx 0 rgba(0,0,0,.06) }
.eye{ position:absolute; top: 72rpx; left: 56rpx; width: 12rpx; height: 12rpx; background:#222; border-radius: 9999rpx }
.eye-r{ left: 92rpx }
.section-title{ font-weight: 700 }
.chips{ display:flex; flex-wrap:wrap; gap: 12rpx; margin-top: 12rpx }
.card{ border-radius: 24rpx }
.btn{ flex:1; height: 96rpx; border-radius: 60rpx; background:#4B8DFF; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700 }
.btn.light{ background:#E8EEFF; color:#4B8DFF }
</style>