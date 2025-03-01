<template>
  <view class="wrap">
    <view class="check-trace-btn">
      <view class="distribute-btn" @click="checkExpressTrace">查看物流轨迹</view>
    </view>
    <view class="logistics-template" v-if="logisticsData.length">
    	<common-logistics :logisticsData="logisticsData"></common-logistics>
    </view>
    <u-empty
            v-else
            mode="data"
            icon="https://open.kdzs.com/static/mytishi.e39a1512.png"
            text="暂未查询到物流信息"
    >
    </u-empty>
  </view>
</template>

<script>
import {
  		setAttribute,
  		changeAttribute
  	}from '../../../common/init-logistics.js'
  export default {
    data() {
      return {
        expressDetail:{},
        expessTrace:{},
        testStrList: ['WAIT_ACCEPT', 'ACCEPT', 'TRANSPORT', 'DELIVERING', 'AGENT_SIGN', 'SIGN', 'FAILED'],
        logisticsData:[],
        expressNum:''
      };
    },
    async onLoad(options) {
      const {expressNum} = options
      this.expressNum = expressNum
      await this.getExpressDetail(expressNum)
      this.logisticsData = changeAttribute(this.testStrList, setAttribute(this.expressDetail.data));
      console.log(this.logisticsData)
      this.getExpessTrace(expressNum)
    },
    methods:{
      async getExpressDetail(expressNum){
         const data = {
           no:expressNum
         }
         const res =  await this.$http.post('/api/trace/search',data)
         if(res.code == 200){
           this.expressDetail = res.data
         }
       },
       async getExpessTrace(expressNum){
         const data = {
           no:expressNum
         }
         const res =  await this.$http.post('/api/trace/getH5',data)
         if(res.code == 200){
           this.expessTrace = res.data
         }
       },
       checkExpressTrace(){
         uni.navigateTo({
           url:"/pages/expressDetail/expressTrace?expressNum="+this.expressNum
         })
       }
    }
  }
</script>

<style lang="scss">
  .wrap{
    box-sizing: border-box;
    padding: 20rpx 20rpx 0 20rpx;
    .distribute-btn{
      // background: $uni-bgcolor;
      background: linear-gradient(313deg,#d62e36 6%, #ec434b);
      width: 220rpx;
      height: 64rpx;
      font-size: 28rpx;
      border-radius: 40rpx;
      color: #ffffff;
      line-height: 64rpx;
      text-align: center;
      margin-left: auto;
    }
  }
	.logistics-template {
		width: 100%;
		height: 100%;
	}
</style>
