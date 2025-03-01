<template>
  <view class="wrap">
    <view class="wallet-money">
      <view class="money-wrap">
        <view class="money-wrap-left">
          <view class="title">账户余额(元)</view>
          <view class="num">{{walletData.balance}}</view>
        </view>
        <view class="money-wrap-right">
          <view class="title">可提现额(元)</view>
          <view class="num">{{walletData.withdrawable_amount}}</view>
        </view>
      </view>
      <view class="operate">
        <view class="invest-money" @click="toInvestPage">充值</view>
        <view class="draw-money" @click="toDrawMoneyPage">提现</view>
      </view>
    </view>
    <view class="money-detail">
      <view class="title">
        钱包明细
      </view>
      <view class="date-box" @click="datePickShow = true">
          <text>{{dateText}}</text>
          <image src="../../static/ico_zhankai1@2x.png"></image>
      </view>
      <view class="content" v-if="walletDetail.length">
        <view class="detail-item" v-for="item of walletDetail" :key="item.id">
          <view class="detail-item-left">
            <view class="name">{{item.prefix}}{{item.detail}}</view>
            <view class="time">2021-06-18 11:09:22</view>
          </view>
          <view class="detail-item-right">
            <view class="expense" :class="item.amount>=0?'active':''">
              <text>{{item.amount>=0?'+':'-'}}</text>
              ¥{{Math.abs(item.amount)}}
            </view>
          </view>
        </view>
      </view>
      
    </view>
    <!-- 弹出层 -->
    <u-datetime-picker
            :show="datePickShow"
            v-model="date"
            mode="year-month"
            cancelText="清除"
            @confirm="confirmDate"
            @cancel="clearDatePick"
    ></u-datetime-picker>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        datePickShow:false,
        dateText:'',
        date:Number(new Date()),
        walletData:{},
        userInfo:{},
        walletDetail:[],
        page:1,
        month:'',
        year:''
      };
    },
    onLoad(options) {
      const timeFormat = uni.$u.timeFormat
      this.dateText = timeFormat(Number(new Date()), 'yyyy年mm月')
      this.userInfo = uni.getStorageSync('userInfo')
      this.year = new Date().getFullYear()
      this.month =  new Date().getMonth() + 1
      this.getBalance()
      this.getWalletDetail()
    },
    onReachBottom() {
      this.page++
      this.getWalletDetail()
    },
    methods:{
      confirmDate(e){
        const timeFormat = uni.$u.timeFormat
        this.dateText = timeFormat(e.value, 'yyyy年mm月')
        const dateArr = timeFormat(e.value, 'yyyy-mm').split('-')
        this.year = dateArr[0]
        this.month = dateArr[1]
        this.page = 1
        this.walletDetail = []
        this.getWalletDetail()
        // this.date = timeFormat(e.value, 'yyyy-mm-dd日')
        this.datePickShow = false
      },
      clearDatePick(){
        this.dateText = '----年--月'
        this.year = ''
        this.month = ''
        this.page = 1
        this.walletDetail = []
        this.getWalletDetail()
        this.datePickShow = false
      },
      toDrawMoneyPage(){
        uni.navigateTo({
          url:'/pages/drawMoney/drawMoney'
        })
      },
      toInvestPage(){
        uni.navigateTo({
          url:'/pagesOptimization/pages/invest/invest'
        })
      },
      async getBalance(){
        const data = {
          userId:this.userInfo.id
        }
        const res =  await this.$http.post('/api/user/getBalance', data)
        if(res.code == 200){
          this.walletData = res.data
        }
      },
      async getWalletDetail(){
        const data = {
          userId:this.userInfo.id,
          page:this.page,
          num:10,
          year:this.year,
          month:this.month
        }
        const res = await this.$http.post('/api/user/listWalletDetail',data)
        if(res.code === 200){
          this.walletDetail = [...this.walletDetail,...res.data.list]
        }
      }
    }
  }
</script>

<style lang="scss">
.wrap{
  box-sizing: border-box;
  padding: 20rpx 24rpx 0;
  .wallet-money{
    background: #ffffff;
    box-sizing: border-box;
    padding: 32rpx 0 38rpx;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .money-wrap{
      display: flex;
      .money-wrap-left,.money-wrap-right{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .money-wrap-left{
        padding-right: 92rpx;
      }
    }
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
      margin-bottom: 34rpx;
    }
    .operate{
      display: flex;
      view{
        width: 200rpx;
        height: 64rpx;
        border: 1px solid #dddddd;
        border-radius: 33rpx;
        text-align: center;
        line-height: 64rpx;
        font-size: 28rpx;
        font-weight: 700;
      }
      .invest-money{
        background: linear-gradient(313deg,#d62e36 6%, #ec434b);
        color: #ffffff;
        border: none;
        margin-right: 40rpx;
      }
    }
  }
  .money-detail{
    background: #ffffff;
    margin-top: 20rpx;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 20rpx 24rpx 32rpx;
    .title{
      font-weight: 700;
      color: #101010;
      font-size: 32rpx;
      margin-bottom: 18rpx;
    }
    .date-box{
      margin-bottom: 28rpx;
      text{
        font-size: 28rpx;
        line-height: 44rpx;
        color: #101010;
      }
      image{
        width: 20rpx;
        height: 20rpx;
        margin-left: 8rpx;
      }
    }
    .detail-item{
      display: flex;
      margin-bottom: 48rpx;
      .name{
        font-size: 28rpx;
        color: #202020;
        margin-bottom: 12rpx;
      }
      .time{
        font-size: 24rpx;
        color: #8E8F8E;
      }
      .detail-item-right{
        margin-left: auto;
        font-size: 28rpx;
        color: #101010;
        font-weight: 700;
        .active{
          color: #D93038;
        }
      }
    }
  }
}
</style>
<style>
  page{
    background: #F7F7F7;
  }
</style>
