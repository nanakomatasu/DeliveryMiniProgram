<template>
  <view>
    <view class="wrap">
      <u-swipe-action autoClose>
        <u-swipe-action-item :options="options2" v-for="(item,index) in locationList" :key="item.id" @click="(e)=>{handleLocation(e,item.id)}">
          <view class="location-item" @click="toEditLocation(item)">
            <view class="location-left">
              <image src="../../../../static/img/ico-xian-dingwei.png"></image>
              <view class="name">{{item.title}}</view>
              <view class="cur-choose" v-if="defaultLocation == item.id">当前选择</view>
            </view>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
    <view class="bottom">
      <view class="submit-btn" @click="toRegisterLocation">
        注册新的自提点
      </view>
    </view>
    <u-notify ref="uNotify"></u-notify>
    <u-modal :show="deleteConfirmShow"
        showConfirmButton
        showCancelButton
        @cancel="deleteConfirmShow = false"
        @confirm="deleteLocation"
        :closeOnClickOverlay="true"
        >
          <view class="add-cate-box">
            确认删除该自提点吗？
          </view>
      </u-modal>
  </view>
</template>

<script>
  export default {
    data(){
      return{
        userInfo:{},
        school:{},
        locationList:[],
        deleteConfirmShow:false,
        curLocationId:'',
        defaultLocation:'',
        options2: [{
            text: '默认',
            style: {
                backgroundColor: '#3c9cff'
            }
        }, {
            text: '删除',
            style: {
                backgroundColor: '#f56c6c'
            }
        }]
      }
    },
    onShow() {
      this.userInfo=uni.getStorageSync('userInfo')||{}
      this.defaultLocation = uni.getStorageSync('default_location')||''
      this.getLocationList()
    },
    methods:{
      async getLocationList(){
        const data ={
          userId:this.userInfo.id
        }
        const res = await this.$http.post('/api/user/myPickUpLocation',data)
        if(res.code === 200){
          this.locationList = res.data.list
        }
      },
      toRegisterLocation(){
        uni.navigateTo({
          url:"/pagesUser/page/group/pickLocation/addLocation"
        })
      },
      handleLocation(e,id){
        if(e.index === 1){
          this.deleteConfirmShow = true
          this.curLocationId = id
        }else{
          this.defaultLocation = id
          uni.setStorageSync('default_location',id)    
        }
      },
      async deleteLocation(){
        const data = {
          userId:this.userInfo.id,
          id:this.curLocationId
        }
        const res = await this.$http.post('/api/user/delPickUpLocation',data)
        console.log(res)
        if(res.code === 200){
          this.$refs.uNotify.success('删除成功')
          this.deleteConfirmShow = false
          this.getLocationList()
        }else{
          this.$refs.uNotify.error(res.message)
        }
      },
      toEditLocation(item){
        uni.navigateTo({
          url:`/pagesUser/page/group/pickLocation/addLocation?item=${encodeURIComponent(JSON.stringify(item))}`
        })
      }
    }
  }
</script>

<style lang="scss">
  .wrap{
    box-sizing: border-box;
    padding: 24rpx 24rpx 0 24rpx;
    .location-item{
      background: #FFFFFF;
      border-radius: 16rpx;
      height: 100rpx;
      box-sizing: border-box;
      padding: 32rpx 30rpx 32rpx 20rpx;
      margin-bottom: 20rpx;
      .location-left{
        display: flex;
        align-items: center;
        image{
          width: 40rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }
        .name{
          font-weight: 700;
          font-size: 32rpx;
          color: #202020;
          margin-right: 22rpx;
        }
        .cur-choose{
          background: linear-gradient(313deg,#d62e36 6%, #ec434b);
          color: #FFFFFF;
          font-size: 22rpx;
          width: 100rpx;
          height: 32rpx;
          line-height: 32rpx;
          text-align: center;
        }
      }
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
<style>
  page{
    background: #F7F7F7;
  }
</style>