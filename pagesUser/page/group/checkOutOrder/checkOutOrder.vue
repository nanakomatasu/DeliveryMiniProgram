<template>
  <view class="wrap">
    <view class="check-out-item" @click="modalShow=true">
      <image class="icon" src="@/static/img/phone@2x.png"></image>
      <view class="text">手机尾号确认</view>
      <view class="check-out-item-right">
        <view>输入手机尾号核验</view>
        <image src="@/static/img/ico-gengduo.png"></image>
      </view>
    </view>
    <view class="check-out-item" @click="scanOutOfStock">
      <image class="icon" src="@/static/img/scan_blue.png"></image>
      <view class="text">扫码确认</view>
      <view class="check-out-item-right">
        <view>扫码提货核验</view>
        <image src="@/static/img/ico-gengduo.png"></image>
      </view>
    </view>
    <!-- 弹出层 -->
    <u-modal :show="modalShow" confirmColor="#D62E36" showCancelButton @cancel="modalShow=false" @confirm="submit" title="输入手机尾号">
          <u-code-input v-model="value" :maxlength="4"></u-code-input>
    </u-modal>
    <u-notify ref="uNotify"></u-notify>
  </view>
</template>

<script>
	import urlConfig from '@/config/index.js'
  export default{
    data(){
      return{
        phone:'',
        modalShow:false,
        value:'',
        userInfo:{},
        locationId:''
      }
    },
    onLoad() {
      this.userInfo = uni.getStorageSync('userInfo')
      this.locationId = uni.getStorageSync('default_location')
      if(!this.locationId){
        this.$nextTick(()=>{
          this.$refs.uNotify.error('请先选择默认自提点')
        })
        return
      }
    },
    methods:{
      submit(){
        if(this.value.length !== 4){
          this.$refs.uNotify.error('请输入正确的手机尾号')
          return
        }
        uni.navigateTo({
          url:"/pagesUser/page/group/checkOutOrder/outOfStock?phone="+this.value
        })
      },
      scanOutOfStock(){
        uni.chooseImage({
        	count:1,// 限制选取图像数量
        	mediaType:["image"],// 设置选取资源为图片类型
          sizeType: ['compressed'],
        	sourceType:["camera"],// 设置图像来源：相册或相机
        	camera:"back",// 设置相机为后置摄像头
        	success:(res)=>{
        		// 获取微信拿到的图片的临时地址并保存到本地
              uni.showLoading({
                title: '加载中'
              });            
        		this.photoPath=res.tempFilePaths[0];
            			uni.uploadFile({
            				url:urlConfig+'tradmin/Upload/upload',
            				filePath: this.photoPath,
            				name: 'file',
            				// header: {
            				// 	'token': uni.getStorageSync('u_token'),
            				// },
            				success: async (res) => {
            					  const data = JSON.parse(res.data)
                        await this.confirmOutOfStock(data.data)
                        uni.hideLoading()
            				},
            			})
        	}
        })
      },
      async confirmOutOfStock(image){
        const data = {
          userId:this.userInfo.id,
          pick_up_location_id:this.locationId,
          image
        }
        const res =  await this.$http.post('/api/user/pickUpGoods',data)
        if(res.code === 200){
          this.$refs.uNotify.success('出货成功')
        }else{
          this.$refs.uNotify.error(res.message)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    box-sizing: border-box;
    padding: 24rpx 24rpx 0 24rpx;
    .check-out-item{
      background: #ffffff;
      box-sizing: border-box;
      padding: 36rpx 24rpx;
      border-radius: 16rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      .icon{
        width: 48rpx;
        height: 48rpx;
        margin-right: 28rpx;
      }
      .text{
        color: #202020;
        font-size: 32rpx;
        font-weight: 700;
      }
      .check-out-item-right{
        display: flex;
        margin-left: auto;
        align-items: center;
        view{
          font-size: 24rpx;
          color: #888888;
          margin-right: 12rpx;
        }
        image{
          width: 28rpx;
          height: 28rpx;
        }
      }
    }
  }
</style>