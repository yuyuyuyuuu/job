<template>
  <view class="page pb-120">
    <view class="nav"><text class="back" @tap="goBack">←</text><text class="nav-title">健康报告</text></view>

    <view class="row gap-16">
      <view class="card sum">
        <text class="s-title">本月记录天数</text>
        <text class="s-num num-tnum">22</text>
      </view>
      <view class="card sum">
        <text class="s-title">平均达标率</text>
        <text class="s-num num-tnum">85%</text>
      </view>
    </view>

    <view class="card p-24 mt-16">
      <view class="section-title">营养维度</view>
      <view class="prog-row" v-for="p in bars" :key="p.name">
        <text class="prog-name">{{p.name}}</text>
        <view class="bar"><view class="bar-inner" :class="p.cls" :style="{width:p.val+'%'}"></view></view>
        <text class="prog-val">{{p.val}}%</text>
      </view>
    </view>

    <view class="card p-24 mt-16">
      <view class="section-title">建议</view>
      <view class="tip">多吃深色蔬菜与优质蛋白，晚间减少高糖零食摄入。</view>
    </view>

    <view class="btn tap-scale mt-24" @tap="exportPdf">导出 PDF</view>
  </view>
</template>

<script>
export default{
  data(){
    return{ bars:[
      { name:'蛋白质', val:78, cls:'bar-success' },
      { name:'维生素', val:65, cls:'bar-primary' },
      { name:'纤维', val:92, cls:'bar-accent' }
    ]}
  },
  methods:{
    goBack(){ uni.navigateBack() },
    exportPdf(){ uni.showLoading({ title:'导出中' }); setTimeout(()=>{ uni.hideLoading(); uni.showToast({ title:'已导出', icon:'success' })}, 900) }
  }
}
</script>

<style lang="scss" scoped>
.page{ padding:32rpx }
.nav{ display:flex; align-items:center; gap:24rpx; height:88rpx }
.back{ font-size:40rpx; color:#A1A8AE }
.nav-title{ font-size:36rpx; font-weight:700 }
.sum{ flex:1; padding: 20rpx; }
.s-title{ color:#8F9AA1; font-size: 24rpx }
.s-num{ font-size: 56rpx; font-weight: 800 }
.section-title{ font-weight:700; margin-bottom: 12rpx }
.prog-row{ display:grid; grid-template-columns: 160rpx 1fr 100rpx; align-items:center; gap:12rpx; margin: 10rpx 0 }
.tip{ color:#6F7A83 }
.btn{ background:#4B8DFF; color:#fff; height: 96rpx; border-radius:9999rpx; display:flex; align-items:center; justify-content:center; font-weight:700 }
</style>