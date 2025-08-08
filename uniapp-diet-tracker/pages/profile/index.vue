<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back">←</text>
      <text class="nav-title">个人中心</text>
      <text class="grid">☰</text>
    </view>

    <view class="avatar"></view>

    <view class="role row center gap-12">
      <text class="role-name breath">美食探险家</text>
      <view class="tag">连续7天✧达标85%</view>
    </view>

    <view class="quick row gap-20 mt-24">
      <view class="q card tap-highlight"><text class="q-emoji">⚙️</text><text class="q-text">设置</text></view>
      <view class="q card tap-highlight"><text class="q-emoji">💬</text><text class="q-text">反馈</text></view>
      <view class="q card tap-highlight"><text class="q-emoji">🧭</text><text class="q-text">引导</text></view>
    </view>

    <view class="section card mt-32">
      <view class="row between">
        <text class="section-title">本月记录</text>
      </view>
      <view class="month-box">
        <view class="circ">🍽️</view>
        <view class="days num-tnum">22</view>
        <view class="unit">天</view>
        <view class="mini-trend"></view>
      </view>
      <view class="btn tap-scale" @tap="showReport">查看报告 →</view>
    </view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default {
  components: { CustomTabBar },
  methods: {
    showReport() {
      uni.showLoading({ title: '生成中' })
      setTimeout(() => { uni.hideLoading(); uni.showToast({ title: '已生成', icon: 'success' }) }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 32rpx; }
.nav { display:flex; align-items:center; justify-content:space-between; height: 88rpx; }
.back { font-size: 40rpx; color:#A1A8AE }
.nav-title { font-size: 36rpx; font-weight: 700; }
.grid { color:#7F8A92; }
.avatar { width: 160rpx; height: 160rpx; background:#FFF0D8; border-radius:9999rpx; margin: 12rpx auto 0; box-shadow: 0 8rpx 20rpx rgba(0,0,0,.08); }
.role { justify-content:center; margin-top: 12rpx; }
.role-name { font-weight: 700; animation: breath 2.6s infinite; }
.tag { background:#FFE6A2; border-radius: 9999rpx; padding: 8rpx 18rpx; color:#715B2E; font-size: 24rpx; }
.quick .q { flex:1; height: 140rpx; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 8rpx; }
.q-emoji { font-size: 44rpx; }
.q-text { color:#6F7A83; font-size: 24rpx; }
.section { padding: 24rpx; }
.section-title { font-weight: 700; }
.month-box { display:flex; align-items:center; justify-content:space-around; margin: 10rpx 0 20rpx; }
.circ { width: 120rpx; height: 120rpx; border-radius: 9999rpx; background:#EAF3EE; display:flex; align-items:center; justify-content:center; }
.days { font-size: 88rpx; font-weight: 800; }
.unit { color:#8F9AA1; margin-left: 8rpx; }
.mini-trend { width: 160rpx; height: 60rpx; border-radius: 12rpx; background: linear-gradient(180deg, rgba(75,141,255,.18), rgba(166,108,255,.18)); position: relative; }
.mini-trend::before { content:''; position:absolute; left: 12rpx; right: 12rpx; bottom: 12rpx; height: 6rpx; background: linear-gradient(90deg, #4B8DFF, #A66CFF); border-radius: 6rpx; box-shadow: 0 -24rpx 0 0 rgba(75,141,255,.08), 40rpx -14rpx 0 0 rgba(166,108,255,.08), 80rpx -28rpx 0 0 rgba(75,141,255,.08); }
.btn { margin: 6rpx auto 0; width: 360rpx; height: 88rpx; background:#4B8DFF; color:#fff; border-radius: 9999rpx; display:flex; align-items:center; justify-content:center; font-weight: 700; }
</style>