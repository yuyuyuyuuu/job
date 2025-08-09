<template>
  <view class="page">
    <view class="header" :style="{ backgroundColor: `rgba(255,255,255,${headerOpacity})` }">
      <image src="/static/icons/back.svg" class="icon-btn" @tap="goBack" />
      <text class="title">AI识别</text>
      <image src="/static/icons/search.svg" class="icon-btn right" />
    </view>

    <scroll-view scroll-y class="content" @scroll="onScroll">
      <view class="mascot">
        <view class="cap"></view>
        <view class="eye"></view>
        <view class="eye eye-r"></view>
        <view class="blush b-l"></view>
        <view class="blush b-r"></view>
      </view>

      <view class="card recog">
        <text class="card-title">识别到的食材</text>
        <view class="recog-item" v-for="(it,idx) in recognized" :key="idx">
          <image :src="it.icon" class="food-ic"/>
          <text class="name">{{it.name}} ({{it.conf}}%)</text>
          <view class="btn-del" @tap="remove(idx)">×</view>
        </view>
      </view>

      <view class="card fix">
        <text class="card-title">修正食材</text>
        <view class="fix-row">
          <input class="ipt" v-model="fixText" placeholder="添加其他食材" placeholder-style="color:#AAAAAA" />
          <view class="btn-plus" @touchstart="plusActive=true" @touchend="plusActive=false; addFix()" :class="{ active: plusActive }">+</view>
        </view>
        <view class="chips">
          <view class="chip" v-for="(x,i) in fixed" :key="i">{{x}}</view>
        </view>
      </view>

      <view class="card summary">
        <text class="sum-title">营养预估</text>
        <view class="sum-row">
          <view class="sum-item">
            <text class="val cal">320</text>
            <text class="lab">卡路里</text>
          </view>
          <view class="sum-item">
            <text class="val pro">18g</text>
            <text class="lab">蛋白质</text>
          </view>
          <view class="sum-item">
            <text class="val carb">45g</text>
            <text class="lab">碳水</text>
          </view>
        </view>
      </view>

      <view class="btn-wrap">
        <view class="btn primary" @tap="complete">
          <view class="ripple" v-if="ripple"></view>
          完成记录
        </view>
      </view>

      <view style="height: 140rpx" />
    </scroll-view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default {
  components: { CustomTabBar },
  data() {
    return {
      headerOpacity: 0,
      recognized: [
        { name: '米饭', conf: 95, icon: '/static/icons/food-rice.svg' },
        { name: '鸡胸肉', conf: 88, icon: '/static/icons/food-chicken.svg' },
        { name: '蔬菜', conf: 82, icon: '/static/icons/food-veg.svg' }
      ],
      fixed: ['沙拉酱'],
      fixText: '',
      plusActive: false,
      ripple: false
    }
  },
  methods: {
    onScroll(e) {
      const y = e.detail.scrollTop || 0
      this.headerOpacity = Math.min(1, y / 120)
    },
    goBack() { uni.navigateBack() },
    remove(i) { this.recognized.splice(i, 1) },
    addFix() { if (!this.fixText) return; this.fixed.push(this.fixText); this.fixText = '' },
    complete() {
      this.ripple = false
      this.$nextTick(() => { this.ripple = true; setTimeout(()=>{ this.ripple=false }, 350) })
      uni.showToast({ title: '已完成', icon: 'success' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #E6F7F4 0%, #F5FBFA 100%);
  padding-bottom: env(safe-area-inset-bottom);
}
.header {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; padding: 16rpx 32rpx; height: 88rpx;
  transition: background-color .16s ease;
}
.icon-btn { width: 48rpx; height: 48rpx; tint-color: #999; }
.icon-btn.right { margin-left: auto; }
.title { margin-left: 16rpx; font-size: 36rpx; font-weight: 700; color: #333; }

.content { height: calc(100vh - 88rpx); }

.mascot { width: 216rpx; height: 216rpx; margin: 24rpx auto 8rpx; background: #FDEFD6; border-radius: 9999rpx; position: relative; box-shadow: inset 0 8rpx 20rpx rgba(0,0,0,.06); }
.cap { position: absolute; top: 24rpx; left: 64rpx; width: 88rpx; height: 36rpx; background: #fff; border-radius: 16rpx; box-shadow: inset 0 -6rpx 0 rgba(0,0,0,.06); }
.eye { position: absolute; top: 100rpx; left: 76rpx; width: 16rpx; height: 16rpx; background: #222; border-radius: 9999rpx; }
.eye-r { left: 116rpx; }
.blush { position: absolute; top: 124rpx; width: 28rpx; height: 16rpx; background: #FFC7B6; border-radius: 9999rpx; }
.b-l { left: 54rpx } .b-r { right: 54rpx }

.card { width: 90%; margin: 24rpx auto; border-radius: 32rpx; padding: 24rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,.05); }
.recog { background: #FFF4E0; }
.card-title { font-size: 32rpx; font-weight: 600; color: #333; margin-bottom: 16rpx; }
.recog-item { display: flex; align-items: center; gap: 16rpx; height: 88rpx; padding: 0 12rpx; margin-bottom: 16rpx; }
.recog-item:last-child { margin-bottom: 12rpx; }
.food-ic { width: 48rpx; height: 48rpx; }
.name { font-size: 32rpx; color: #333; }
.btn-del { margin-left: auto; width: 40rpx; height: 40rpx; border-radius: 12rpx; background: #FF6666; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; transform: scale(1); transition: transform .1s ease; }
.btn-del:active { transform: scale(.9); }

.fix { background: #FDE9EB; border-radius: 24rpx; }
.fix-row { display: flex; align-items: center; gap: 16rpx; }
.ipt { flex: 1; height: 72rpx; padding: 0 24rpx; background: #fff; border: 2rpx solid #DDDDDD; border-radius: 16rpx; font-size: 28rpx; color: #555; }
.btn-plus { width: 56rpx; height: 56rpx; border-radius: 9999rpx; background: #FF6F91; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 32rpx; }
.btn-plus.active { background: #E8587D; }
.chips { display: flex; flex-wrap: wrap; gap: 12rpx; margin-top: 16rpx; }
.chip { padding: 8rpx 16rpx; background: #fff; border-radius: 9999rpx; color: #666; font-size: 26rpx; }

.summary { background: #fff; border-radius: 24rpx; box-shadow: 0 3rpx 6rpx rgba(0,0,0,.03); }
.sum-title { font-size: 32rpx; font-weight: 600; color: #333; margin-bottom: 16rpx; }
.sum-row { display: flex; justify-content: space-around; align-items: center; }
.sum-item { display: flex; flex-direction: column; align-items: center; gap: 6rpx; }
.val { font-size: 36rpx; font-weight: 700; }
.lab { font-size: 24rpx; color: #888; }
.cal { color: #FF6F00 } .pro { color: #4CAF50 } .carb { color: #2196F3 }

.btn-wrap { width: 90%; margin: 24rpx auto 0; }
.btn.primary { position: relative; overflow: hidden; width: 100%; height: 88rpx; border-radius: 48rpx; background: #00C853; color: #fff; font-size: 32rpx; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.ripple { position: absolute; inset: 0; background: radial-gradient(circle, rgba(255,255,255,.35) 0%, transparent 60%); animation: ripple .35s ease-out; pointer-events: none; }
@keyframes ripple { from { transform: scale(.6); opacity: .7 } to { transform: scale(2); opacity: 0 } }
</style>