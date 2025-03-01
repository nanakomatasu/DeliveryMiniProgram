<template>
  <view>
    <view class="wrap">
       <view class="order" v-for="item of orderList" :key="item.id" @click="toOrderDetail(item.id)">
         <checkbox-group @change="checkboxChange">
            <order-item class="order-item" :status="activeName" :item="item" ></order-item>
            <view class="check-box">
              <checkbox :value="item.id" />
            </view>
          </checkbox-group>
        </view>
        <view class="bottom-tips">数据加载完成！</view>
    </view>
    <view class="bottom">
      <view class="submit-btn" @click="confirmOutOfStock">
        确定提货
      </view>
    </view>
    <u-notify ref="uNotify"></u-notify>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        userInfo:{},
        locationId:{},
        page:1,
        orderIds:[],
        orderList:[],
        phone:''
      }
    },
    onLoad(option) {
      const {phone} = option
      this.userInfo = uni.getStorageSync('userInfo')
      this.locationId = uni.getStorageSync('default_location')
      if(!this.locationId){
        this.$refs.uNotify.error('请先选择默认自提点')
        return
      }
      this.getOrderList(phone)
    },
    onReachBottom() {
      this.page++
      this.getOrderList()
    },
    methods:{
      async getOrderList(phone){
        const data = {
          userId:this.userInfo.id,
          pick_up_location_id:this.locationId,
          page:this.page,
          phone,
          num:10
        }
        if(this.status){
          data.status = this.status
        }
        if(this.pick_status){
          data.pick_status = this.pick_status
        }
        const res =  await this.$http.get('/api/user/listOrdersForGrouper',data)
        if(res.code == 200){
          this.orderList = [...res.data.list,...this.orderList]
        }else{
          this.$refs.uNotify.error(res.message)
        }
      },
      checkboxChange(e){
        this.orderIds = e.detail.value
      },
      async confirmOutOfStock(){
        if(!this.orderIds.length){
          this.$refs.uNotify.error('请选择出货订单')
          return
        }
        const data = {
          userId:this.userInfo.id,
          pick_up_location_id:this.locationId,
          orderIds:JSON.stringify(this.orderIds)
        }
        const res =  await this.$http.post('/api/user/pickUpGoods',data)
        if(res.code === 200){
          this.$refs.uNotify.success('出货成功')
          this.page = 1
          this.orderList = []
          this.getOrderList(this.phone)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    box-sizing: border-box;
    padding: 20rpx 20rpx 100rpx 20rpx;
    .order{
      box-sizing: border-box;
      background: #ffffff;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 30rpx;
      position: relative;
      .check-box{
        position: absolute;
        right: 24rpx;
        top: 24rpx;
      }
    }
    .bottom-tips{
      text-align: center;
      padding-bottom: 20rpx;
      color: #888888;
      font-size: 28rpx;
    }
  }
  .bottom {
    height: 108rpx;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
  
    .submit-btn {
      width: 686rpx;
      height: 80rpx;
      background: linear-gradient(313deg,#d62e36 6%, #ec434b);
      border-radius: 40rpx;
      text-align: center;
      align-items: center;
      line-height: 80rpx;
      font-size: 28rpx;
      font-weight: 700;
      color: #ffffff;
    }
  }
</style>