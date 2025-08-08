<template>
  <view class="page pb-120">
    <view class="nav">
      <text class="back">←</text>
      <text class="nav-title">饮食日历</text>
    </view>

    <view class="month card">
      <view class="row between">
        <text class="arrow tap-scale" @tap="prevMonth">‹</text>
        <text class="month-text">2025年 八月</text>
        <text class="arrow tap-scale" @tap="nextMonth">›</text>
      </view>
    </view>

    <view class="calendar card mt-24">
      <view class="week">
        <text v-for="w in weeks" :key="w" class="w">{{w}}</text>
      </view>
      <view class="grid">
        <view v-for="d in days" :key="d.key" :class="['cell', d.active && 'active']" @tap="openDay(d)">
          <text class="d">{{d.num}}</text>
          <view v-if="d.dot" class="dot"></view>
          <view v-if="d.active" class="outline"></view>
        </view>
      </view>
    </view>

    <view class="section card mt-24">
      <view class="section-title row center-between">本周营养摄入</view>
      <view class="prog-row" v-for="(i,idx) in weekNutri" :key="idx">
        <text class="prog-name">{{i.name}}</text>
        <view class="bar"><view class="bar-inner" :class="i.cls" :style="{ width: i.value+'%' }"></view></view>
        <text class="prog-val">{{i.value}}%</text>
      </view>
      <view class="hand">👉 点击日期查看</view>
    </view>

    <day-log-sheet :visible="sheetVisible" :title="sheetTitle" @close="sheetVisible=false" />

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
import DayLogSheet from '../../components/day-log-sheet.vue'
export default {
  components: { CustomTabBar, DayLogSheet },
  data() {
    return {
      weeks: ['日','一','二','三','四','五','六'],
      days: this.buildDays(),
      weekNutri: [
        { name: '蛋白质', value: 78, cls:'bar-success' },
        { name: '维生素', value: 65, cls:'bar-primary' },
        { name: '纤维', value: 92, cls:'bar-accent' }
      ],
      sheetVisible: false,
      sheetTitle: ''
    }
  },
  methods: {
    buildDays() {
      const arr = []
      const blanks = 4
      for (let i=0;i<blanks;i++) arr.push({ key: 'b'+i, num: '', active:false })
      for (let d=1; d<=31; d++) {
        arr.push({ key: 'd'+d, num: d, active: [5,6,12].includes(d), dot: [6,7,12].includes(d) })
      }
      return arr
    },
    openDay(d) {
      if (!d.num) return
      this.sheetTitle = `${d.num}日 的食物记录`
      this.sheetVisible = true
    },
    prevMonth(){ uni.showToast({ title: '上一月', icon:'none' }) },
    nextMonth(){ uni.showToast({ title: '下一月', icon:'none' }) }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 32rpx; }
.nav { display:flex; align-items:center; gap: 24rpx; height: 88rpx; }
.back { font-size: 40rpx; color: #A1A8AE; }
.nav-title { font-size: 36rpx; font-weight: 700; }
.month { height: 96rpx; display:flex; align-items:center; padding: 0 20rpx; background:#FFE8B6; border-radius: 20rpx; }
.row.between { width: 100%; display:flex; justify-content:space-between; align-items:center; }
.month-text { font-weight: 700; }
.arrow { font-size: 40rpx; color:#888; transition: color 160ms; }
.arrow:active { color:#4B8DFF }
.calendar { padding: 24rpx; }
.week { display:grid; grid-template-columns: repeat(7, 1fr); color:#778088; margin-bottom: 12rpx; }
.grid { display:grid; grid-template-columns: repeat(7, 1fr); gap: 12rpx; }
.cell { height: 92rpx; background:#fff; border-radius: 24rpx; display:flex; align-items:center; justify-content:center; position:relative; color:#6B757D; }
.cell.active { background:#FFE6B0; color:#222; }
.dot { position:absolute; top: 8rpx; right: 8rpx; width: 14rpx; height: 14rpx; background:#FF84A0; border-radius:9999rpx; }
.outline { position:absolute; inset: 0; border: 2rpx solid #E7C06B; border-radius: 24rpx; pointer-events:none; }
.section { padding: 28rpx; background:#FFD6DC; }
.section-title { font-weight: 700; margin-bottom: 18rpx; }
.prog-row { display:grid; grid-template-columns: 160rpx 1fr 100rpx; align-items:center; gap: 16rpx; margin: 14rpx 0; }
.bar { height: 16rpx; background:#F0F3F5; border-radius: 10rpx; overflow:hidden; }
.bar-inner { height:100%; border-radius:10rpx; }
.prog-name { color:#333 }
.prog-val { text-align:right; color:#6B757D }
.hand { margin-top: 16rpx; color:#818992; font-size: 24rpx; animation: hand-tap 1.2s infinite; }
</style>