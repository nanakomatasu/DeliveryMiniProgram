<template>
  <view class="wrap">
    <view class="part-one">
      <view class="title">
        余额提现
      </view>
      <view class="money">
        <view class="symbol">
          ¥
        </view>
        <view class="num">
          9020.00
        </view>
      </view>
      <view class="title" style="margin-bottom: 40rpx;">
        当前状态
      </view>
      <view class="step">
        	<u-steps current="0" direction="column" dot inactiveColor="#D8D8D8" activeColor="#D93038">
        		<u-steps-item title="已下单" desc="10:30">
        		</u-steps-item>
        		<u-steps-item title="已出库" desc="10:35">
        		</u-steps-item>
        		<u-steps-item title="运输中" desc="11:40"></u-steps-item>
        	</u-steps>
      </view>
    </view>
    <view class="part-two">
      <view class="title">
        提现信息
      </view>
      <view class="info">
        <view class="info-item">
          <view class="label">提现金额：</view>
          <view class="content">
            ¥9020.00
          </view>
        </view>
      </view>
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

<style lang="scss" scoped>
.wrap{
  box-sizing: border-box;
  padding: 20rpx 30rpx 0;
  .part-one{
    background: #ffffff;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 40rpx 0 30rpx 30rpx;
    margin-bottom: 20rpx;
    .title{
      color: #888888;
      font-size: 24rpx;
      margin-bottom: 12rpx;
    }
    .money{
      display: flex;
      font-weight: 800;
      margin-bottom: 48rpx;
      .symbol{
        font-size: 40rpx;
        margin-right: 8rpx;
        transform: translateY(10rpx);
      }
      .num{
        font-size: 64rpx;
      }
    }
    .step{
      ::v-deep .u-steps-item__line{

      }
    }
  }
  .part-two{
    background: #ffffff;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 40rpx 0 30rpx 30rpx;
    .title{
      color: #202020;
      font-size: 32rpx;
      font-weight: 700;
      margin-bottom: 20rpx;
    }
    .info{
      .info-item{
        display: flex;
        font-size: 28rpx;
        .label{
          color: #888888;
        }
      }
    }
  }
}
</style>
<style>
  page{
    background: #F6F6F8;
  }
</style>
