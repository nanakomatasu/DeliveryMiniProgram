<template>
  <view class="wrap">
    <view class="role-item" @click="changeRole(1)">
      <view>我是买家</view>
      <image src="../../../static/img/ico_gengduo.png"></image>
     </view>
    <view class="role-item" @click="changeRole(2)">
      <view>
        我是团长
      </view>  
      <image src="../../../static/img/ico_gengduo.png"></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userId:''
      };
    },
    onLoad(options) {
      const {userId} = options
      this.userId = userId
    },
    methods:{
      changeRole(type){
        if(type == 1){
          uni.removeStorageSync('role')
          uni.reLaunch({
            url:"/pages/user/user"
          })
        }else{
			console.log('状态状态222',type);
          uni.setStorageSync('role',JSON.stringify({id:this.userId, role:'group'}))
          uni.navigateTo({
            url:"/pagesUser/page/group/group"
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.wrap{
  box-sizing: border-box;
  padding: 20rpx;
  .role-item{
    background: #ffffff;
    font-size: 32rpx;
    padding: 20rpx 15rpx;
    margin-bottom: 20rpx;
    font-weight: 700;
    display: flex;
    align-items: center;
    image{
      width: 30rpx;
      height: 30rpx;
      margin-left: auto;
    }
  }
}
</style>
