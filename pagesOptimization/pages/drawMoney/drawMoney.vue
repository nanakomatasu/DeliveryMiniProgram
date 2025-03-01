<template>
  <view class="wrap">
    <view class="bank">
      <view class="left">
        <text>提现到</text>
        <text class="content">交通银行(****3273)</text>
      </view>
      <image src="../../static/ico_gengduo@2x.png" class="right-arrow"></image>
    </view>
    <view class="draw-num">
      <view class="title">提现金额</view>
      <view class="money-input">
        <view class="symbol">¥</view>
        <u-input border="none" fontSize="33" color="#202020" style="font-weight: 700;"></u-input>
      </view>
      <view class="tips">
        当前钱包可提现金额：¥1000.00
      </view>
    </view>
    <view class="draw-btn">
      <u-button
      type="primary"
      text="确定"
      shape="circle"
      color="linear-gradient(313deg,#d62e36 6%, #ec434b)"
      style="font-weight:700; font-size: 32rpx; height: 88rpx; width: 630rpx;"
      ></u-button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.wrap{
  box-sizing: border-box;
  padding: 20rpx 30rpx 0;
  .bank{
    background: #ffffff;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    .left{
      display: flex;
      flex-direction: column;
      text{
        font-size: 28rpx;
        color: #101010;
      }
      .content{
        margin-top: 24rpx;
        font-size: 32rpx;
        font-weight: 700;
      }
    }
    .right-arrow{
      width: 28rpx;
      height: 28rpx;
      margin-left: auto;
    }
  }
  .draw-num{
    background: #ffffff;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 32rpx;
    .title{
      font-size: 28rpx;
      color: #101010;
      margin-bottom: 36rpx;
    }
    .money-input{
      display: flex;
      .symbol{
        font-size: 42rpx;
        color: #303133;
        margin-right: 20rpx;
        font-weight: 700;
        align-self: flex-end;
        transform: translateY(-14rpx);
      }
    }
    .tips{
      margin-top: 32rpx;
      font-size: 28rpx;
      color: #888888;
    }
  }
  .draw-btn{
    margin-top: 100rpx;
  }
}
</style>
<style>
  page{
    background: #f7f7f7;;
  }
</style>
