<template>
  <view class="page pb-120">
    <view class="nav"><text class="back" @tap="goBack">←</text><text class="nav-title">反馈</text></view>

    <view class="card p-24">
      <view class="label">标题</view>
      <input class="ipt" placeholder="简要描述问题或建议" v-model="title" />
      <view class="label mt-16">描述</view>
      <textarea class="ta" placeholder="详细描述，便于我们快速定位~" v-model="desc" />

      <view class="row gap-12 mt-16">
        <view class="up tap-scale" @tap="pickImage">＋ 添加截图</view>
      </view>

      <view class="btn tap-scale mt-24" @tap="submit">提交反馈</view>
    </view>
  </view>
</template>

<script>
export default{
  data(){return{title:'',desc:''}},
  methods:{
    goBack(){ uni.navigateBack() },
    pickImage(){ uni.showToast({ title:'选择图片', icon:'none' }) },
    submit(){
      if(!this.title||!this.desc){ uni.showToast({ title:'请填写完整', icon:'none' }); return }
      uni.showLoading({ title:'提交中' });
      setTimeout(()=>{ uni.hideLoading(); uni.showToast({ title:'已提交', icon:'success' }); uni.navigateBack(); }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
.page{ padding:32rpx }
.nav{ display:flex; align-items:center; gap:24rpx; height:88rpx }
.back{ font-size:40rpx; color:#A1A8AE }
.nav-title{ font-size:36rpx; font-weight:700 }
.label{ color:#6F7A83; font-size:26rpx }
.ipt{ background:#fff; border-radius:16rpx; padding: 18rpx 20rpx; margin-top: 8rpx }
.ta{ background:#fff; border-radius:16rpx; padding: 18rpx 20rpx; margin-top: 8rpx; min-height: 220rpx }
.up{ background:#fff; border-radius: 9999rpx; padding: 12rpx 20rpx; color:#4B8DFF }
.btn{ background:#4B8DFF; color:#fff; height: 96rpx; border-radius:9999rpx; display:flex; align-items:center; justify-content:center; font-weight:700 }
</style>