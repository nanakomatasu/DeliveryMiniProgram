<template>
  <view class="wrap">
    <view class="method">
      <view class="text">
        充值方式
      </view>
      <image src="../../../static/img/ico_weixinzhifu@2x.png"></image>
      <view class="method-name">微信支付</view>
    </view>
    <view class="money">
      <view class="text">充值金额</view>
      <view class="input-area">
        <view class="symbol">¥</view>
        <u--input placeholder="请输入" style="border: none;" v-model="num" placeholderStyle="{fontSize:'48rpx'}"></u--input>
      </view>
      <view class="tips">充值金额最多保留2位小数</view>
    </view>
    <view class="submit-btn">
      <u-button text="充值" @click="handleInvest" color="linear-gradient(313deg,#d62e36 6%, #ec434b)" shape="circle" style="width: 630rpx;"></u-button>
    </view>
     <u-notify ref="uNotify"></u-notify>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        num:'',
        userInfo:{}
      }
    },
    onLoad() {
      this.userInfo = uni.getStorageSync('userInfo')
    },
    methods:{
      async handleInvest(){
        let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
        console.log()
        if(!reg.test(this.num)){
          this.$refs.uNotify.error('请输入正确的充值金额')
          return
        }
        const reqData={
          userId:this.userInfo.id,
          amount:this.num
        }
        const {code,data} = await this.$http.post('/api/user/recharge',reqData)
        if(code == 200){
          this.payRequest(data.pay_no)
        }
      },
      async payRequest(pay_no){
        const data = {
          userId:this.userInfo.id,
          pay_no,
          pay_type:1,
          return_type:2
        }
        if(this.isWxBrowser()){
          data.app_type = 3
        }else{
          data.app_type = 2
        }
        const res = await this.$http.post('/api/user/pay',data)
        if(res.code == 200){
          console.log(res)
          this.wxPayH5(res.data)
        }
      },
      // H5微信支付
      wxPayH5(data) {
      	let params = {
      		timeStamp: data.timeStamp,
      		nonceStr: data.nonceStr,
      		prepay_id: data.prepay_id,
      		paySign: data.paySign,
      		appId: data.appid,
      	}
      	if (this.isWxBrowser()) { //微信浏览器
      		if (typeof WeixinJSBridge == "undefined") {
      			if (document.addEventListener) {
      				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      			} else if (document.attachEvent) {
      				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      			}
      		} else {
      			this.onBridgeReady(params);
      		}
      	} else {
      		window.location.href = data.mweb_url;
      	}
      },
      //是否微信内部浏览器
      async isWxBrowser() {
      					let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
      	let isWeixin = ua.indexOf("micromessenger") != -1;
      	return isWeixin;
      },
      //微信浏览器拉起支付
      onBridgeReady(params) {
      	let that = this;
      	WeixinJSBridge.invoke('getBrandWCPayRequest', {
      			"appId": params.appId, //公众号ID，由商户传入     
      			"timeStamp": params.timeStamp, //时间戳，自1970年以来的秒数     
      			"nonceStr": params.nonceStr, //随机串     
      			"package": "prepay_id=" + params.prepay_id,
      			"signType": "MD5", //微信签名方式：     
      			"paySign": params.paySign
      		},
      		function(res) {
      			//支付完成调回订单页面
      			uni.redirectTo({
      				url: '/pagesOptimization/pages/wallet/wallet'
      			})
      			if (res.err_msg == "get_brand_wcpay_request:ok") {
      				// 使用以上方式判断前端返回,微信团队郑重提示：
      				//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      				
      			}
      		});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    box-sizing: border-box;
    padding: 24rpx 20rpx 0 20rpx;
    .method{
      background: #ffffff;
      box-sizing: border-box;
      border-radius: 16rpx;
      padding: 36rpx 32rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      .text{
        font-size: 28rpx;
        color: #101010;
        font-weight: 700;
      }
      image{
        width: 40rpx;
        height: 40rpx;
        margin-right: 12rpx;
        margin-left: auto;
      }
      .method-name{
        font-size: 28rpx;
        color: #101010;
        font-weight: 700;
      }
    }
    .money{
      background: #ffffff;
      box-sizing: border-box;
      border-radius: 16rpx;
      padding: 32rpx;
      .text{
        font-size: 28rpx;
        margin-bottom: 52rpx;
      }
      .input-area{
        display: flex;
        .symbol{
          font-size: 42rpx;
          margin-right: 19rpx;
          transform: translateY(20rpx);
        }
        ::v-deep .u-input__content__field-wrapper__field{
          font-size: 48rpx !important;
        }
      }
      .tips{
        font-size: 28rpx;
        color: #888888;
        margin-top: 32rpx;
      }
    }
    .submit-btn{
      margin-top: 120rpx;
    }
  }
</style>