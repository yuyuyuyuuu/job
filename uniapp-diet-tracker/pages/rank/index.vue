<template>
  <view class="page pb-120">
    <view class="nav"><text class="back" @tap="goBack">←</text><text class="nav-title">排行</text></view>

    <scroll-view scroll-x class="tabs" :show-scrollbar="false">
      <view class="chip" :class="{ 'chip-active': tab==='周榜' }" @tap="tab='周榜'">周榜</view>
      <view class="chip" :class="{ 'chip-active': tab==='月榜' }" @tap="tab='月榜'">月榜</view>
      <view class="chip" :class="{ 'chip-active': tab==='总榜' }" @tap="tab='总榜'">总榜</view>
    </scroll-view>

    <view class="card list">
      <view class="row item" v-for="(u,idx) in list" :key="idx">
        <text class="idx" :class="{m1:idx==0,m2:idx==1,m3:idx==2}">{{idx+1}}</text>
        <text class="avatar">{{u.avatar}}</text>
        <view class="col info">
          <text class="name">{{u.name}}</text>
          <text class="desc">连续{{u.streak}}天 · 达标{{u.score}}%</text>
        </view>
        <text class="medal">{{u.medal}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default{
  data(){
    return{
      tab:'周榜',
      list:[
        { avatar:'🥇', name:'健康先锋', streak:12, score:92, medal:'🏆' },
        { avatar:'🥈', name:'营养达人', streak:10, score:88, medal:'🥈' },
        { avatar:'🥉', name:'轻食爱好者', streak:8, score:85, medal:'🥉' },
        { avatar:'🍎', name:'清爽饮食', streak:7, score:83, medal:'🎖️' }
      ]
    }
  },
  methods:{ goBack(){ uni.navigateBack() } }
}
</script>

<style lang="scss" scoped>
.page{ padding:32rpx }
.nav{ display:flex; align-items:center; gap:24rpx; height:88rpx }
.back{ font-size:40rpx; color:#A1A8AE }
.nav-title{ font-size:36rpx; font-weight:700 }
.tabs{ white-space: nowrap; margin: 8rpx 0 }
.list{ margin-top: 12rpx; padding: 8rpx 0 }
.item{ padding: 20rpx 16rpx; align-items:center; border-bottom:1rpx solid #EEF2F4 }
.item:last-child{ border-bottom:none }
.idx{ width: 56rpx; text-align:center; font-weight:700 }
.m1{ color:#E1B200 } .m2{ color:#9FA6B2 } .m3{ color:#CD7F32 }
.avatar{ width: 76rpx; height: 76rpx; border-radius: 16rpx; background:#fff; box-shadow:0 8rpx 20rpx rgba(0,0,0,.06); display:flex; align-items:center; justify-content:center; font-size: 36rpx; margin: 0 12rpx }
.info .name{ font-weight:700 } .desc{ color:#8F9AA1; font-size: 24rpx }
.medal{ font-size: 36rpx }
</style>