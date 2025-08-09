<template>
  <view class="page pb-120">
    <view class="header">
      <text class="title">三餐小管家</text>
      <text class="subtitle">智能记录，健康生活</text>
      <view class="mascot">
        <view class="cap"></view>
        <view class="eye"></view>
        <view class="eye eye-r"></view>
        <view class="dot"></view>
      </view>
      <view class="hint-row">
        <text class="hint">滑动看小贴士</text>
        <text class="arrow">⬇</text>
      </view>
    </view>

    <view class="tip card grad-soft-yellow">
      <view class="tip-left">
        <view class="mini-face"></view>
      </view>
      <view class="tip-text">多吃蔬菜🥦肠道更开心～</view>
      <view class="dec dec-l"></view>
      <view class="dec dec-r"></view>
    </view>

    <view class="cta grad-orange tap-scale" @tap="goRecord">开拍三餐</view>

    <view class="stats row gap-20 mt-32">
      <view class="stat card grad-soft-yellow tap-highlight" @tap="toToday">
        <view class="stat-num num-tnum">12</view>
        <view class="stat-label">今日记录</view>
      </view>
      <view class="stat card grad-soft-yellow tap-highlight" @tap="toNutrition">
        <view class="stat-num num-tnum">85%</view>
        <view class="stat-label">营养达标</view>
      </view>
    </view>

    <view class="panels row gap-20 mt-32">
      <view class="pill card">
        <text class="pill-num num-tnum">7</text>
        <text class="pill-label">连续天</text>
      </view>
      <view class="pill card">
        <text class="pill-num num-tnum">1.2k</text>
        <text class="pill-label">总卡路里</text>
      </view>
      <view class="pill card">
        <text class="pill-num num-tnum">A+</text>
        <text class="pill-label">健康评分</text>
      </view>
    </view>

    <view class="section card mt-32">
      <view class="section-title">本周趋势</view>
      <view class="prog-row" v-for="(i,idx) in trends" :key="idx">
        <text class="prog-name">{{i.name}}</text>
        <view class="bar">
          <view class="bar-inner" :class="i.cls" :style="{ width: i.value + '%' }"></view>
        </view>
        <text class="prog-val num-tnum">{{i.value}}%</text>
      </view>
    </view>

    <view class="section card mt-24">
      <view class="section-title">最近活动</view>
      <view class="activity" v-for="a in activities" :key="a.t">
        <view class="act-icon icon-bubble">{{a.emoji}}</view>
        <view class="a-col">
          <text class="a-title">{{a.t}}</text>
          <text class="a-time">{{a.time}}</text>
        </view>
      </view>
    </view>

    <view class="section card mt-24">
      <view class="section-title">成就徽章</view>
      <view class="badges badges-wrap">
        <view class="badge"><view class="medal gold"></view><text class="b-text">连续7天</text></view>
        <view class="badge"><view class="medal silver"></view><text class="b-text">营养达人</text></view>
        <view class="badge"><view class="medal bronze"></view><text class="b-text">健康先锋</text></view>
        <view class="badge dim"><view class="medal lock"></view><text class="b-text">待解锁</text></view>
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
        { name: '蔬菜摄入', value: 75, cls: 'bar-success' },
        { name: '水分补充', value: 80, cls: 'bar-primary' },
        { name: '均衡营养', value: 85, cls: 'bar-accent' }
      ],
      activities: [
        { emoji: '🥗', t: '记录了营养沙拉', time: '2小时前' },
        { emoji: '🍎', t: '吃了苹果', time: '4小时前' },
        { emoji: '🥛', t: '补充了水分', time: '6小时前' }
      ]
    }
  },
  methods: {
    goRecord() { uni.switchTab({ url: '/pages/record/index' }) },
    toToday(){},
    toNutrition(){}
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 40rpx 32rpx 160rpx; }
.header { align-items: center; text-align: center; display:flex; flex-direction:column; gap: 14rpx; }
.title { font-size: 40rpx; font-weight: 700; }
.subtitle { color: #6B757D; }
.mascot { position: relative; width: 240rpx; height: 240rpx; border-radius: 9999rpx; background: #FFEFD2; margin: 16rpx auto; box-shadow: 0 8rpx 20rpx rgba(0,0,0,.06) inset; }
.cap { position:absolute; top: 24rpx; left: 84rpx; width: 80rpx; height: 36rpx; background:#fff; border-radius: 12rpx; box-shadow: inset 0 -4rpx 0 rgba(0,0,0,.06) }
.eye { position:absolute; top: 100rpx; left: 86rpx; width: 16rpx; height: 16rpx; background:#222; border-radius: 9999rpx; transform-origin: center; animation: eye-blink 4.2s infinite; }
.eye-r { left: 136rpx; }
.mascot .dot { position: absolute; right: 16rpx; bottom: 24rpx; width: 48rpx; height: 48rpx; background: #1F2A37; border-radius: 9999rpx; }
.hint-row { display:flex; align-items:center; gap: 8rpx; }
.hint { color: #8F9AA1; font-size: 24rpx; }
.arrow { animation: arrow-slide 1.2s infinite; color:#8F9AA1 }

.tip { position: relative; display:flex; align-items:center; padding: 24rpx; margin-top: 20rpx; }
.tip-left { width: 100rpx; height: 100rpx; display:flex; align-items:center; justify-content:center; }
.mini-face { width: 80rpx; height: 80rpx; border-radius: 9999rpx; background: #FFEFD2; box-shadow: inset 0 8rpx 20rpx rgba(0,0,0,.06); }
.tip-text { flex: 1; color: #555; font-size: 28rpx; }
.dec { position:absolute; width: 14rpx; height: 14rpx; background: #FFD789; border-radius: 9999rpx; opacity: .7 }
.dec-l { left: 18rpx; top: 18rpx }
.dec-r { right: 18rpx; bottom: 18rpx }

.cta { margin: 28rpx auto 0; width: 640rpx; height: 120rpx; border-radius: 60rpx; box-shadow: 0 10rpx 30rpx rgba(255,132,96,.35); color: #222; font-weight: 700; font-size: 36rpx; display:flex; align-items:center; justify-content:center; }

.stats .stat { flex: 1; padding: 28rpx; border-radius: 24rpx; }
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
.act-icon { width: 72rpx; height: 72rpx; border-radius: 18rpx; display:flex; align-items:center; justify-content:center; font-size: 36rpx; }
.a-col { display:flex; flex-direction:column; }
.a-title { font-weight: 600; }
.a-time { color:#8B95A1; font-size: 24rpx; }

.badges { display:flex; gap: 28rpx; }
.badges-wrap { display:flex; flex-wrap: wrap; gap: 28rpx; }
.badge { display:flex; flex-direction:column; align-items:center; gap: 8rpx; }
.b-text { color:#6F7A83; font-size: 24rpx; }
.dim { opacity:.5 }
.medal.gold { background: linear-gradient(180deg,#FFE39A,#FFCD4D) }
.medal.silver { background: linear-gradient(180deg,#EDEFF5,#C9D1E6) }
.medal.bronze { background: linear-gradient(180deg,#FFD1A0,#E9A869) }
.medal.lock { background: linear-gradient(180deg,#EDEFF2,#D6DADF) }
</style>