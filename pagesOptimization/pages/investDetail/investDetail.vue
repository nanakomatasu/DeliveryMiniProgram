<template>
  <view class="wrap">
    <view class="part-one">
      <view class="title">钱包充值</view>
      <view class="money">
        <view class="symbol">
          ¥
        </view>
        <view class="num">
          9020.00
        </view>
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
    height: 196rpx;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .title{
      font-size: 24rpx;
      color: #888888;
      margin-bottom: 12rpx;
      margin-top: 40rpx;
    }
    .money{
      display: flex;
      font-weight: 700;
      .symbol{
        font-size: 40rpx;
        margin-right: 8rpx;
        transform: translateY(8rpx);
      }
      .num{
        font-size: 64rpx;
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
