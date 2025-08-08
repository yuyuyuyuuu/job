<template>
  <view v-if="visible" class="overlay" @tap="close">
    <view class="sheet" @tap.stop>
      <view class="sheet-head">
        <text class="title">{{title}}</text>
        <text class="close" @tap="close">×</text>
      </view>
      <scroll-view scroll-x class="tabs">
        <view class="tab" v-for="t in tabs" :key="t" :class="{active: t===currentTab}" @tap="() => currentTab=t">{{t}}</view>
      </scroll-view>
      <scroll-view scroll-y class="list">
        <view class="item card" v-for="(i,idx) in items" :key="idx">
          <view class="row gap">
            <view class="meal-tag" :class="i.mealCls">{{i.meal}}</view>
            <text class="time">{{i.time}}</text>
          </view>
          <view class="row gap item-main">
            <view class="thumb">{{i.emoji}}</view>
            <view class="col">
              <text class="name">{{i.name}}</text>
              <text class="hint">点击图片查看详情</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: { type: String, default: '' }
  },
  data() {
    return {
      tabs: ['全部','早餐','午餐','晚餐','加餐'],
      currentTab: '全部',
      items: [
        { meal: '早餐', mealCls: 'y', time: '08:30', emoji: '🍔', name: '燕麦粥' },
        { meal: '早餐', mealCls: 'y', time: '09:00', emoji: '🥞', name: '水果沙拉' },
        { meal: '午餐', mealCls: 'g', time: '12:15', emoji: '🍝', name: '意大利面' },
        { meal: '晚餐', mealCls: 'b', time: '18:45', emoji: '🥗', name: '蔬菜汤' }
      ]
    }
  },
  methods: {
    close() { this.$emit('close') }
  }
}
</script>

<style lang="scss" scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,.25); z-index: 999; display:flex; align-items:flex-end; }
.sheet { width: 100%; max-height: 85vh; background: #E0F6F0; border-top-left-radius: 24rpx; border-top-right-radius: 24rpx; padding: 24rpx; }
.sheet-head { display:flex; justify-content:space-between; align-items:center; }
.title { font-size: 32rpx; font-weight: 700; }
.close { font-size: 44rpx; color:#8C96A0; padding: 0 8rpx; }
.tabs { white-space: nowrap; margin-top: 12rpx; }
.tab { display:inline-flex; padding: 12rpx 20rpx; background:#EFF7F4; border-radius: 9999rpx; color:#6F7A83; margin-right: 12rpx; }
.tab.active { background:#4B8DFF; color:#fff; }
.list { max-height: 65vh; margin-top: 20rpx; }
.item { padding: 18rpx; border-radius: 20rpx; margin-bottom: 18rpx; background:#fff; }
.row.gap { display:flex; align-items:center; gap: 12rpx; }
.meal-tag { padding: 6rpx 14rpx; border-radius: 9999rpx; font-size: 22rpx; color:#333; }
.meal-tag.y { background:#FFEEC3; }
.meal-tag.g { background:#DFF6E9; }
.meal-tag.b { background:#E0EAFF; }
.time { color:#8C96A0; }
.item-main { margin-top: 10rpx; }
.thumb { width: 120rpx; height: 120rpx; border-radius: 16rpx; background:#F2F4F6; display:flex; align-items:center; justify-content:center; font-size: 44rpx; }
.col { display:flex; flex-direction:column; justify-content:center; margin-left: 10rpx; }
.name { font-weight: 700; font-size: 30rpx; }
.hint { color:#95A0A7; margin-top: 6rpx; }
</style>