<template>
  <view>
    <view class="wrap">
<!--      <view class="month">
        <text @click="showMonthPick">{{monthText}}</text>
        <image src="../../../../pagesOptimization/static/ico_zhankai1@2x.png"></image>
      </view> -->
      <view class="time">
        <view class="time-item" :class="curDate == 1?'active':''" @click="changeDate(1)">今日</view>
        <view class="time-item" :class="curDate == 2?'active':''" @click="changeDate(2)">近7日</view>
        <view class="time-item" :class="curDate == 3?'active':''" @click="changeDate(3)">近30日</view>
      </view>
      <view class="date-box"  @click="showdDatePick">
         <u--input
             placeholder="请选择日期"
             suffixIcon="calendar"
             disabled
             fontSize="12px"
             disabledColor="#ffffff;"
             v-model="dateText"
             clearable
             style=" background-color:#ffffff;; border: none;"
             suffixIconStyle="font-size: 22px;color: #909399"
         ></u--input>
       </view>
      <view class="analysis">
        <view class="analysis-top">
          <view class="business">
            <view class="title">预计收入(元)</view>
            <view class="num">{{businessData.amount}}</view>
          </view>
        </view>
        <view class="analysis-bottom">
          <view class="analysis-bottom-item">
            <view class="title">成交单量</view>
            <view class="num">{{businessData.orderNum}}</view>
          </view>
          <view class="analysis-bottom-item">
            <view class="title">顾客人数</view>
            <view class="num">{{businessData.userNum}}</view>
          </view>
          <view class="analysis-bottom-item">
            <view class="title">退单件数</view>
            <view class="num">{{businessData.refundNum}}</view>
          </view>
        </view>
      </view>
      <view class="income-wrap">
        <view class="income-title">收入明细</view>
        <view class="income-content" v-for="(item,index) of businessDetailList" :key="index">
          <order-item :item="item" :type="'analysis'"></order-item>
        </view>
      </view>
    </view>
    <!-- 弹出层 -->
    <u-calendar :show="datePickShow" mode="range" @confirm="confirmDate" @close="datePickShow = false"></u-calendar>
  </view>
</template>

<script>
  import {sevenDays, thirtyDays} from '../../../../utils/time.js'
  export default {
    data() {
      return {
        dateText:'',
        month:Number(new Date()),
        date:Number(new Date()),
        datePickShow:false,
        startTime:'',
        endTime:'',
        monthText:'',
        businessData:{},
        page:1,
        businessDetailList:[],
        userInfo:{},
        curDate:''
      };
    },
    onLoad(){
      this.userInfo = uni.getStorageSync('userInfo')
      this.getBusinessData()
      this.getBusinessDetail()
    },
    onReachBottom() {
      this.page++
      this.getBusinessDetail()
    },
    computed:{
      
    },
    methods:{
      showMonthPick(){
        this.monthPickShow = true
      },
      showdDatePick(){
        this.datePickShow = true
      },
      confirmDate(e){
        this.startTime = e[0]
        this.endTime = e[e.length-1]
        this.dateText = `${e[0]}~${e[e.length-1]}`
        this.curDate = ''
        this.page = 1
        this.businessDetailList = []
        this.getBusinessData()
        this.getBusinessDetail()
        this.datePickShow = false
      },
      cancelMonthSelect(){
        this.monthText = '所有日期'
        this.month = ''
        this.monthPickShow = false
      },
      cancelDateSelect(){
        this.dateText = ''
        this.date = ''
        this.selectDay = ''
        this.getBusinessData()
        this.page = 1
        this.businessDetailList = []
        this.getBusinessDetail()
        this.datePickShow = false
      },
      async getBusinessData(){
        const data = {
          userId:this.userInfo.id,
          startTime:this.startTime,
          endTime:this.endTime
        }
        // if(this.selectDay){
        //   data.day = this.selectDay
        // }
        const res = await this.$http.get('/api/user/getBusinessData',data)
        if(res.code === 200){
          this.businessData = res.data
        }
      },
      async getBusinessDetail(){
        const data = {
          userId:this.userInfo.id,
          startTime:this.startTime,
          endTime:this.endTime,
          page:this.page,
          num:10
        }
        // if(this.selectDay){
        //   data.day = this.selectDay
        // }
        const res = await this.$http.get('/api/user/businessDetail',data)
        if(res.code === 200){
          this.businessDetailList = [...this.businessDetailList,...res.data.list]
        }
      },
      changeDate(i){
        this.curDate = i
        this.dateText = ''
        this.page = 1
        this.businessDetailList = []
        if(i == 1){
          const timeFormat = uni.$u.timeFormat
          this.startTime = timeFormat(new Date(), 'yyyy-mm-dd')
          this.endTime = timeFormat(new Date(), 'yyyy-mm-dd')
          this.getBusinessData()
          this.getBusinessDetail()
        }else if(i == 2){
          const[startTime, endTime]= sevenDays()
          this.startTime = startTime
          this.endTime = endTime
          this.getBusinessData()
          this.getBusinessDetail()
        }else{
          const[startTime, endTime]= thirtyDays()
          this.startTime = startTime
          this.endTime = endTime
          this.getBusinessData()
          this.getBusinessDetail()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    box-sizing: border-box;
    padding: 24rpx 20rpx 0 20rpx;
    .time{
      display: flex;
      align-items: center;
      .time-item{
        width: 92rpx;
        height: 48rpx;
        font-size: 24rpx;
        line-height: 48rpx;
        text-align: center;
        margin-right: 20rpx;
        background: #E9EBEF;
        border-radius: 4rpx;
      }
      .active{
        background: linear-gradient(313deg,#d62e36 6%, #ec434b);
        color: #ffffff;
      }
    }
    .date-box{
      margin: 20rpx 0 20rpx 0;
      width: 380rpx;
      background: #E9EBEF;
    }
    .month{
      display: flex;
      align-items: center;
      text{
        color: #101010;
        font-size: 32rpx;
        margin-right: 8rpx;
        font-weight: 700;
      }
      image{
        width: 20rpx;
        height: 20rpx;
      }
    }
    .analysis{
      margin-top: 16rpx;
      background: #ffffff;
      border-radius: 16rpx;
      box-sizing: border-box;
      padding: 24rpx 24rpx 24rpx 32rpx;
      .analysis-top{
        display: flex;
        .business{
          .title{
            color:#888888;
            font-size: 24rpx;
            margin-bottom: 10rpx;
          }
          .num{
            color: #101010;
            font-weight: 700;
            line-height: 72rpx;
            font-size: 56rpx;
          }
        }
      }
      .analysis-bottom{
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        .analysis-bottom-item{
          display: flex;
          flex-direction: column;
          .title{
            color: #888888;
            font-size: 24rpx;
          }
          .num{
            color: #101010;
            font-weight: 600;
            line-height: 40rpx;
          }
        }
      }
    }
    .income-wrap{
      margin-top: 40rpx;
      .income-title{
        color: #101010;
        font-size: 32rpx;
        font-weight: 700;
        margin-bottom: 20rpx;
      }
      .income-content{
        background-color: #ffffff;
        box-sizing: border-box;
        padding: 24rpx 24rpx 32rpx 24rpx;
        margin-bottom: 20rpx;
        border-radius: 16rpx;
      }
    }
  }
</style>

<style>
  page{
    background: #F6F6F8;
  }
</style>
