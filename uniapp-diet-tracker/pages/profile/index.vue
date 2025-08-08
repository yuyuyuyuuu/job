<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back">←</text>
      <text class="nav-title">个人中心</text>
      <text class="grid">☰</text>
    </view>

    <view class="avatar"></view>

    <view class="role row center gap-12">
      <text class="role-name">美食探险家</text>
      <view class="tag">连续7天✧达标85%</view>
    </view>

    <view class="quick row gap-20 mt-24">
      <view class="q card"><text class="q-emoji">⚙️</text><text class="q-text">设置反馈</text></view>
      <view class="q card"><text class="q-emoji">✉️</text><text class="q-text">设/反/导</text></view>
      <view class="q card"><text class="q-emoji">🏆</text><text class="q-text">设/反/导</text></view>
    </view>

    <view class="section card mt-32">
      <view class="row between">
        <text class="section-title">本月记录</text>
        <text class="px">2800px →</text>
      </view>
      <view class="month-box">
        <view class="circ">🍽️</view>
        <view class="days">22</view>
        <view class="unit">天</view>
        <view class="chart">📊🍎🍌🥬🥕🍀</view>
      </view>
      <view class="btn" @tap="showReport">查看报告 →</view>
    </view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default {
  components: { CustomTabBar },
  methods: {
    showReport() { uni.showToast({ title: '生成报告', icon: 'none' }) }
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
.role-name { font-weight: 700; }
.tag { background:#FFE6A2; border-radius: 9999rpx; padding: 8rpx 18rpx; color:#715B2E; font-size: 24rpx; }
.quick .q { flex:1; height: 140rpx; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 8rpx; }
.q-emoji { font-size: 44rpx; }
.q-text { color:#6F7A83; font-size: 24rpx; }
.section { padding: 24rpx; }
.section-title { font-weight: 700; }
.px { color:#96A0A7 }
.month-box { display:flex; align-items:center; justify-content:space-around; margin: 10rpx 0 20rpx; }
.circ { width: 120rpx; height: 120rpx; border-radius: 9999rpx; background:#EAF3EE; display:flex; align-items:center; justify-content:center; }
.days { font-size: 88rpx; font-weight: 800; }
.unit { color:#8F9AA1; margin-left: 8rpx; }
.chart { font-size: 40rpx; }
.btn { margin: 6rpx auto 0; width: 360rpx; height: 88rpx; background:#4B8DFF; color:#fff; border-radius: 9999rpx; display:flex; align-items:center; justify-content:center; font-weight: 700; }
</style>