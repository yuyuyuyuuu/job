<template>
  <view class="page pb-160">
    <view class="header">
      <image src="/static/icons/back.svg" class="back" @tap="goBack"/>
      <text class="title">AI 识别</text>
      <image src="/static/icons/search.svg" class="right"/>
    </view>

    <view class="mascot">
      <view class="cap"></view>
      <view class="blush b-l"></view>
      <view class="blush b-r"></view>
      <view class="eye"></view>
      <view class="eye eye-r"></view>
    </view>

    <view class="card recog">
      <text class="card-title">识别到的食材</text>
      <view class="recog-item" v-for="(it,idx) in recognized" :key="idx">
        <image :src="it.icon" class="food-ic"/>
        <text class="name">{{it.name}} ({{it.conf}}%)</text>
        <view class="del" @tap="remove(idx)">✕</view>
      </view>
    </view>

    <view class="card fix">
      <text class="card-title">修正食材</text>
      <view class="fix-row">
        <input class="ipt" v-model="fixText" placeholder="添加其他食材" />
        <view class="plus" @tap="addFix">+</view>
      </view>
      <view class="chips">
        <view class="chip" v-for="(x,i) in fixed" :key="i">{{x}}</view>
      </view>
    </view>

    <view class="summary">
      <text class="sum-title">营养预估</text>
      <view class="sum-row">
        <text class="sum-item cal">320 卡路里</text>
        <text class="sum-item pro">蛋白质 18g</text>
        <text class="sum-item carb">碳水 45g</text>
      </view>
    </view>

    <view class="complete tap-scale" @tap="complete">完成记录</view>

    <custom-tab-bar />
  </view>
</template>

<script>
import CustomTabBar from '../../components/custom-tab-bar.vue'
export default{
  components:{ CustomTabBar },
  data(){
    return{ 
      recognized:[
        {name:'米饭',conf:95, icon:'/static/icons/food-rice.svg'},
        {name:'鸡胸肉',conf:88, icon:'/static/icons/food-chicken.svg'},
        {name:'蔬菜',conf:82, icon:'/static/icons/food-veg.svg'}
      ], 
      fixed:['沙拉酱'], fixText:'' }
  },
  methods:{
    goBack(){ uni.navigateBack() },
    remove(i){ this.recognized.splice(i,1) },
    addFix(){ if(!this.fixText) return; this.fixed.push(this.fixText); this.fixText=''; },
    complete(){ uni.showToast({ title:'已完成', icon:'success' }) }
  }
}
</script>

<style lang="scss" scoped>
.page{ padding: calc(env(safe-area-inset-top) + 16px) 20px 160rpx; background-color: #EAF8F5; }
.header{ display:flex; align-items:center; justify-content:flex-start; padding: 16px 0 }
.back{ width:24px; height:24px; margin-right: 8px }
.title{ font-size: 18px; font-weight: 600; color:#333 }
.right{ width: 28px; height: 28px; margin-left:auto }

.mascot{ position:relative; width: 160px; height:160px; background:#FFEFD2; border-radius:9999px; margin: 8px auto 16px; box-shadow: inset 0 8rpx 20rpx rgba(0,0,0,.06) }
.cap{ position:absolute; top: 16px; left: 52px; width: 64px; height: 28px; background:#fff; border-radius: 12px; box-shadow: inset 0 -4rpx 0 rgba(0,0,0,.06) }
.eye{ position:absolute; top: 72px; left: 56px; width: 12px; height: 12px; background:#222; border-radius: 9999px }
.eye-r{ left: 92px }
.blush{ position:absolute; width: 24px; height: 12px; background:#FFC7B6; border-radius:9999px; top: 96px }
.b-l{ left: 40px } .b-r{ right: 40px }

.card{ width: 90%; margin: 16px auto; border-radius: 16px; padding: 14px 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.08) }
.recog{ background: linear-gradient(to bottom, #FDEDD8, #FCE6C9); }
.card-title{ font-size: 16px; font-weight: 600; color:#333; margin-bottom: 10px }
.recog-item{ display:flex; align-items:center; padding: 10px 0 }
.food-ic{ width:24px; height:24px; margin-right: 8px }
.name{ font-size:14px; color:#333 }
.del{ width: 18px; height:18px; color:#FF4444; margin-left:auto; text-align:center; line-height:18px; font-weight:700 }

.fix{ background: linear-gradient(to bottom, #FDE4E4, #FCDADA); }
.fix-row{ display:flex; align-items:center; gap: 8px }
.ipt{ flex:1; height:36px; padding:0 12px; border:1px solid #F0C0C0; border-radius:8px; font-size:14px; color:#666; background:#fff }
.plus{ width:36px; height:36px; border-radius:50%; background:#FF66C4; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px }
.chips{ display:flex; flex-wrap:wrap; gap: 8px; margin-top: 8px }

.summary{ width:90%; margin: 16px auto; border-radius: 12px; background:#fff; box-shadow:0 2px 4px rgba(0,0,0,.05); padding: 12px 16px }
.sum-title{ font-size:16px; font-weight:500; color:#333; margin-bottom:10px }
.sum-row{ display:flex; justify-content:space-around; align-items:center }
.sum-item{ font-size:14px; color:#666 }
.cal{ color:#FF9933 } .pro{ color:#33CC66 } .carb{ color:#3399FF }

.complete{ width:80%; margin: 28px auto 24px; height:50px; border-radius:25px; background:#33CC66; color:#fff; font-size:16px; font-weight:600; display:flex; align-items:center; justify-content:center }
.complete:active{ opacity:.8; transform: scale(.98) }
</style>