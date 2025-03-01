<template>
  <view>
    <view class="header">
<!--      <image src="../../static/img/ico_fanhui@2x.png" @click="handleBack"></image> -->
      <text class="nav-title">{{navTitle}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        navTitle:'订单管理'
      }
    },
    methods:{
      handleBack(){
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss">
.header{
  height: 88rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-title{
    color: #202020;
    font-weight: 700;
  }
}
</style>