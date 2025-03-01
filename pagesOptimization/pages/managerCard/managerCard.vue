<template>
  <view class="wrap">
    <view class="empty" v-if="false">
      <image src="../../static/p_yinhangkaguanli@2x.png"></image>
      <view class="tips">* 请绑定银行卡，绑定后可提现至银行卡</view>
      <view class="add-btn">
        <u-button
        type="primary"
        text="添加银行卡"
        shape="circle"
        color="linear-gradient(313deg,#d62e36 6%, #ec434b)"
        style="font-weight:700; font-size: 32rpx; height: 88rpx; width: 280rpx;"
        ></u-button>
      </view>
    </view>
    <view class="card">
      <view class="card-item">
        <view class="card-item-top">
          <image :src="cover" class="cover"></image>
          <view>
            <view class="name">中信银行</view>
            <view class="type">储蓄卡</view>
          </view>
        </view>
        <view class="dot-wrap">
          <view class="dot" v-for="(item,index) in 3" :key="index">
            <view class="dot-item"></view>
            <view class="dot-item"></view>
            <view class="dot-item"></view>
            <view class="dot-item"></view>
          </view>
          <view class="num-content">
            <view class="num-item">
              9
            </view>
            <view class="num-item">
              0
            </view>
            <view class="num-item">
              8
            </view>
            <view class="num-item">
              8
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="add-btn">+ 添加银行卡</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        cover:'http://www.138top.com/UploadFiles/2011-03/admin/2011032601433491534.gif'
      };
    }
  }
</script>

<style lang="scss">
  .wrap{
    box-sizing: border-box;
    padding: 32rpx 32rpx 0;
  }
.empty{
  display: flex;
  flex-direction: column;
  align-items: center;
  image{
    margin-top: 168rpx;
    margin-bottom: 76rpx;
  }
  .tips{
    font-size: 28rpx;
    color: #202020;
    font-weight: 700;
    margin-bottom: 50rpx;
  }
}
.card{
  background: #ffffff;
  box-sizing: border-box;
  padding: 32rpx;
  .card-item-top{
    display: flex;
    margin-bottom: 68rpx;
    .cover{
      width: 96rpx;
      height: 96rpx;
      margin-right: 20rpx;
    }
    .name{
      color: #202020;
      font-weight: 700;
      font-size: 32rpx;
      margin-bottom: 12rpx;
    }
    .type{
      font-size: 28rpx;
      color: #888888;
    }
  }

  .dot-wrap{
    display: flex;
    align-items: center;
    .num-content{
      display: flex;
      font-size: 48rpx;
      font-weight: 700;margin-left: 52rpx;
      .num-item{
        margin-right: 16rpx;
      }
    }
  }
  .dot:nth-of-type(3){
    margin-right: 0;
  }
  .dot{
    display: flex;
    margin-right: 60rpx;
    .dot-item{
      width: 12rpx;
      height: 12rpx;
      background: #888888;
      border-radius: 50%;
      margin-right: 16rpx;
    }
    .dot-item:last-child{
      margin-right: 0;
    }
  }
}
.add-btn{
  margin-top: 20rpx;
  background: #ffffff;
  height: 100rpx;
  border-radius: 16rpx;
  text-align: center;
  line-height: 100rpx;
  color: #D93038;
  font-size: 32rpx;
}

</style>
<style>
  page{
    background: #F6F6F8;
  }
</style>>
