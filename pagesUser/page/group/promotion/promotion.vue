<template>
  <view class="wrap">
    <view class="promotion-num">
      <view class="title">推广人数</view>
      <view class="num">{{promotionList.length}}</view>
    </view>
    <view class="list-title">人员列表</view>
    <view class="promotion-list">
      <view class="promotion-list-item" v-for="item of promotionList" :key="item.id">
        <image :src="item.portrait"></image>
        <view class="info">
          <view class="name">{{item.user_name}}</view>
          <view class="date">{{item.date}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        promotionList:[],
        userInfo:{}
      }
    },
    onLoad() {
      this.userInfo=uni.getStorageSync('userInfo')||{}
      this.getPromotionList()
    },
    methods:{
      async getPromotionList(){
        const data = {
          userId:this.userInfo.id
        }
        const res = await this.$http.post('/api/user/myBinds',data)
        if(res.code == 200){
          this.promotionList = res.data.list
        }
      }
    }
  }
</script>

<style lang="scss">
  .wrap{
    box-sizing: border-box;
    padding: 20rpx 20rpx 0 20rpx;
    .promotion-num{
      background: #ffffff;
      border-radius: 16rpx;
      box-sizing: border-box;
      padding: 24rpx 0 24rpx 32rpx;
      margin-bottom: 32rpx;
      .title{
        color: #888888;
        font-size: 24rpx;
        margin-bottom: 10rpx;
      }
      .num{
        font-weight: 700;
        color: #101010;
        font-size: 56rpx;
        line-height: 72rpx;
      }
    }
    .promotion-list{
      background: #ffffff;
      border-radius: 16rpx;
      box-sizing: border-box;
      padding: 32rpx 0 24rpx 32rpx;
      .promotion-list-item{
        margin-bottom: 50rpx;
        display: flex;
        image{
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          margin-right: 32rpx;
        }
        .info{
          display: flex;
          flex-direction: column;
          .name{
            font-size: 28rpx;
            color: #181818;
            font-weight: 700;
          }
          .date{
            margin-top: auto;
            font-size: 24rpx;
            color: #7A7B84;
          }
        }
      }

    }
    .list-title{
      font-size: 24rpx;
      color: #888888;
      margin-bottom: 20rpx;
    }
  }
</style>
<style>
  page{
    background: #F6F6F8;
  }
</style>