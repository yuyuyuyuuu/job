<template>
  <view class="page pb-120">
    <view class="header">
      <text class="title">三餐小管家</text>
      <text class="subtitle">智能记录，健康生活</text>
      <view class="mascot">
        <view class="face"></view>
        <view class="dot"></view>
      </view>
      <text class="hint">滑动看小贴士</text>
    </view>

    <view class="tip card">
      <view class="tip-left">
        <view class="mini-face"></view>
      </view>
      <view class="tip-text">多吃蔬菜🥦肠道更开心～</view>
    </view>

    <view class="cta grad-orange" @tap="goRecord">开拍三餐</view>

    <view class="stats row gap-20 mt-32">
      <view class="stat card">
        <view class="stat-num">12</view>
        <view class="stat-label">今日记录</view>
      </view>
      <view class="stat card">
        <view class="stat-num">85%</view>
        <view class="stat-label">营养达标</view>
      </view>
    </view>

    <view class="panels row gap-20 mt-32">
      <view class="pill card">
        <text class="pill-num">7</text>
        <text class="pill-label">连续天</text>
      </view>
      <view class="pill card">
        <text class="pill-num">1.2k</text>
        <text class="pill-label">总卡路里</text>
      </view>
      <view class="pill card">
        <text class="pill-num">A+</text>
        <text class="pill-label">健康评分</text>
      </view>
    </view>

    <view class="section card mt-32">
      <view class="section-title">本周趋势</view>
      <view class="prog-row" v-for="(i,idx) in trends" :key="idx">
        <text class="prog-name">{{i.name}}</text>
        <view class="bar">
          <view class="bar-inner" :style="{ width: i.value + '%', background: i.color }"></view>
        </view>
        <text class="prog-val">{{i.value}}%</text>
      </view>
    </view>

    <view class="section card mt-24">
      <view class="section-title">最近活动</view>
      <view class="activity" v-for="a in activities" :key="a.t">
        <text class="emoji">{{a.emoji}}</text>
        <view class="a-col">
          <text class="a-title">{{a.t}}</text>
          <text class="a-time">{{a.time}}</text>
        </view>
      </view>
    </view>

    <view class="section card mt-24">
      <view class="section-title">成就徽章</view>
      <view class="badges">
        <view class="badge"><text class="b-emoji">🏆</text><text class="b-text">连续7天</text></view>
        <view class="badge"><text class="b-emoji">🌟</text><text class="b-text">营养达人</text></view>
        <view class="badge"><text class="b-emoji">🥇</text><text class="b-text">健康先锋</text></view>
        <view class="badge dim"><text class="b-emoji">🔒</text><text class="b-text">待解锁</text></view>
      </view>
    </view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default {
  components: { CustomTabBar },
  data() {
    return {
      trends: [
        { name: '蔬菜摄入', value: 75, color: '#21C87A' },
        { name: '水分补充', value: 80, color: '#5C8DFF' },
        { name: '均衡营养', value: 85, color: '#A66CFF' }
      ],
      activities: [
        { emoji: '🥗', t: '记录了营养沙拉', time: '2小时前' },
        { emoji: '🍎', t: '吃了苹果', time: '4小时前' },
        { emoji: '🥛', t: '补充了水分', time: '6小时前' }
      ]
    }
  },
  methods: {
    goRecord() { uni.switchTab({ url: '/pages/record/index' }) }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 40rpx 32rpx 160rpx; }
.header { align-items: center; text-align: center; display:flex; flex-direction:column; gap: 14rpx; }
.title { font-size: 40rpx; font-weight: 700; }
.subtitle { color: #6B757D; }
.mascot { position: relative; width: 240rpx; height: 240rpx; border-radius: 9999rpx; background: #FFEFD2; margin: 16rpx auto; box-shadow: 0 8rpx 20rpx rgba(0,0,0,.06) inset; }
.mascot .dot { position: absolute; right: 16rpx; bottom: 24rpx; width: 48rpx; height: 48rpx; background: #1F2A37; border-radius: 9999rpx; }
.hint { color: #8F9AA1; font-size: 24rpx; }

.tip { display:flex; align-items:center; padding: 24rpx; margin-top: 20rpx; background: #FFEED9; }
.tip-left { width: 100rpx; height: 100rpx; display:flex; align-items:center; justify-content:center; }
.mini-face { width: 80rpx; height: 80rpx; border-radius: 9999rpx; background: #FFEFD2; box-shadow: inset 0 8rpx 20rpx rgba(0,0,0,.06); }
.tip-text { flex: 1; color: #555; font-size: 28rpx; }

.cta { margin: 28rpx auto 0; width: 640rpx; height: 120rpx; border-radius: 60rpx; box-shadow: 0 10rpx 30rpx rgba(255,132,96,.35); color: #222; font-weight: 700; font-size: 36rpx; display:flex; align-items:center; justify-content:center; }

.stats .stat { flex: 1; padding: 28rpx; border-radius: 24rpx; background: #FFEED9; }
.stat-num { font-size: 56rpx; font-weight: 800; }
.stat-label { color:#7F8A92; margin-top: 8rpx; }

.panels .pill { flex:1; height: 140rpx; align-items:center; justify-content:center; text-align:center; padding: 20rpx; }
.pill-num { font-weight: 800; font-size: 44rpx; }
.pill-label { color: #7F8A92; font-size: 24rpx; }

.section { padding: 28rpx; border-radius: 24rpx; }
.section-title { font-weight: 700; margin-bottom: 20rpx; }
.prog-row { display:grid; grid-template-columns: 160rpx 1fr 100rpx; align-items: center; gap: 16rpx; margin: 16rpx 0; }
.prog-name { color: #3C3C3C; }
.bar { height: 16rpx; background: #EEF2F4; border-radius: 10rpx; overflow: hidden; }
.bar-inner { height: 100%; border-radius: 10rpx; }
.prog-val { text-align:right; color: #6B757D; }

.activity { display:flex; align-items:center; gap: 20rpx; padding: 16rpx 0; }
.emoji { font-size: 44rpx; }
.a-col { display:flex; flex-direction:column; }
.a-title { font-weight: 600; }
.a-time { color:#8B95A1; font-size: 24rpx; }

.badges { display:flex; gap: 28rpx; }
.badge { display:flex; flex-direction:column; align-items:center; gap: 8rpx; }
.b-emoji { font-size: 48rpx; }
.b-text { color:#6F7A83; font-size: 24rpx; }
.dim { opacity:.5 }
</style>