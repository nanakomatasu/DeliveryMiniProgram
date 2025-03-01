<template>
  <view class="invite-page">
		<view class="invite-bg1">
			<image :src="`${imgUrl}resource/invite-bg1.jpg`"></image>
			<view class="rule-box" @click.self="ruleClick"></view>
			<view class="invite-btn"></view>
      <button class="share-btn" open-type="share"></button>
			<view class="qr-code-box" @click="getQrcode">
				<u-icon name="grid" color="#fff" size="18"></u-icon>
				<text>面对面扫码</text>
			</view>
		</view>
		<view class="invite-bg2">
			<image :src="`${imgUrl}resource/invite-bg2.jpg`"></image>
		</view>
		<view class="reward-box mt40">
			<view class="radio-24" style="overflow: hidden;">
				<view class="title">
					<view class="title-left">我的奖励</view>
					<view class="title-right" @click="myCoupon">奖励明细 ></view>
				</view>
				<view class="moeny">
					<view class="f-32 t-c">优惠奖励</view>
					<view class="t-c f-b mt10"><text class="f-46 col-red-ff2a">100</text><text class="f-32">元</text></view>
				</view>
			</view>
		</view>
		<view class="invite-records mt40">
			<view class="radio-24" style="overflow: hidden;">
				<view class="title">
          <view class="title-left">邀请记录</view>
					<view class="title-right" @click="gomyCallfor">我的邀请 ></view>
				</view>
				<view class="recods-list">
					<u-button type="warning" text="查看邀请记录" @click="gomyCallfor" shape="circle"></u-button>
				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<image :src="`${imgUrl}resource/invite-btn.jpg`"></image>
      <button class="share-btn2" open-type="share"></button>
		</view>
    <u-popup :show="showPopup" mode="center" :closeOnClickOverlay="false" bgColor="transparent">
      <view class="package-red" @click="packageRedClick">
        <image :src="`${imgUrl}resource/package-red.png`"></image>
      </view>
    </u-popup>
    <u-popup :show="showRulePopup" :round="20" mode="center" closeable @close="rulePopupClose">
      <view class="rule-popup">
        <view class="f-42 mb16 f-b">活动规则</view>
        <view class="col-gray-90 rule-popup-content"> 1.邀请人奖励:在活动期间内，新用户点击您分享的链接，注册成功并在有效时间（三天）内下单，在线支付订单(找人付、到店自取订单除外)，待订单确认收货后(手动确认收货或者24小时后自动确认收货)，期间未发生退款，则视为邀请成功，您可获得1张5元通用红包（快递店铺不可使用），有效期7天。多邀多得，不限次数。<br>
        2.受邀人奖励:在活动期间内，新用户通过邀请人分享的链接可以领取1张5元通用红包（快递店铺不可使用），有效期7天。
        </view>
        <u-button type="warning" text="我知道了" @click="rulePopupClose" shape="circle"></u-button>
      </view>
    </u-popup>
		<u-modal :show="showQr"  title="扫一扫" @confirm="showQr=false">
			<view class="slot-qr-content">
				<image :src="qrImageUrl"></image>
			</view>
		</u-modal>
	</view>
</template>
<script>
	const app = getApp()
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
        userInfo: {},
        rid: '',
        showPopup: false,
        showRulePopup: false,
        imgUrl: urlConfig,
				qrImageUrl: '',
				showQr: false
      }
		},
    onShareAppMessage() {
			return {
				title: '邀请有奖',
				path: "/pagesUser/page/invite/invite?id=" + this.userInfo.id,
				// imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShareTimeline() {
			return {
				title: '邀请有奖',
				path: "/pagesUser/page/invite/invite?id=" + this.userInfo.id,
				// imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onLoad(e) {
      this.userInfo = uni.getStorageSync('userInfo')
      console.log('urlConfig', urlConfig);
      if(e.id) {
        this.rid = e.id
        this.showPopup = true
      }
    },
    onUnload() {
      // 获取当前页面栈
      const pages = getCurrentPages();
      // 检查页面栈长度
      if (pages.length > 1) {
          // 如果页面栈长度大于1，则可以返回
          // uni.navigateBack();
      } else {
          // 否则可以提示用户或者执行其他逻辑
          uni.redirectTo({
            url: '/pages/index/index'
          })
      }
    },
		methods: {
			async getQrcode() {
				uni.showLoading({
						title: '加载中...'
					});
				const res = await this.$api.getQrcode({
					scene: `rid/${this.userInfo.id}`,
					// scene: JSON.stringify({rid: this.userInfo.id, activityid: this.drawId}),
					page: 'pages/login/wxlogin/wxlogin'
				})
				uni.hideLoading();
				if (res.status == 200) {
					this.qrImageUrl = res.msg
					this.showQr = true
				} else {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				}
			},
			ruleClick() {
        this.showRulePopup = true
      },
      rulePopupClose(){
        this.showRulePopup = false
      },
      gomyCallfor() {
				uni.navigateTo({
					url: '/pages/user/myCallfor/myCallfor'
				})
			},
			myCoupon() {
        uni.navigateTo({
					url: "/pagesUser/page/couponList/couponList"
				})
      },
      packageRedClick() {
        uni.navigateTo({
					url: "/pages/login/wxlogin/wxlogin?rid=" + this.rid
				})
      }
		}
	}
</script>
<style lang="scss">
.invite-page {
	width: 100%;
	min-height: 100vh;
	background-color: #cbf8ff;
	padding-bottom: 200rpx;
	.invite-bg1 {
		width: 100%;
		height: 1000rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.rule-box {
			position: absolute;
			right: 0px;
			top: 100rpx;
			width: 30px;
			height: 65px;
      z-index: 99999;
		}
		.invite-btn {
	    position: absolute;
			top: 848rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 270rpx;
			height: 45px;
		}
    .share-btn {
	    position: absolute;
			top: 848rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 270rpx;
			height: 45px;
      background: transparent;
    }
		.qr-code-box {
			display: flex;
			align-content: center;
			justify-content: center;
			position: absolute;
			width: 100%;
			bottom: 28rpx;
			color: #fff;
			text {
				font-size: 24rpx;
			}
		}
	}
	.invite-bg2 {
		width: 100%;
		height: 400rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.reward-box {
		padding: 0 20rpx;
		.title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 25rpx;
			background: linear-gradient(to right, #e3f5f2, #c7fff5);
			.title-left {
				font-size: 34rpx;
				font-weight: bold;
			}
			.title-right {
				border-radius: 24rpx;
				background: #e6e6e6;
				opacity: .8;
				padding: 6rpx 20rpx;
				font-size: 28rpx;
			}
		}
		.moeny {
			text-align: center;
			padding: 20rpx 0;
			background: #fff;
		}
	}
	.invite-records {
		padding: 0 20rpx;
		.title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 25rpx;
			background: linear-gradient(to right, #e3f5f2, #c7fff5);
			.title-left {
				font-size: 34rpx;
				font-weight: bold;
			}
			.title-right {
				border-radius: 24rpx;
				background: #e6e6e6;
				opacity: .8;
				padding: 10rpx 20rpx;
				font-size: 28rpx;
			}
		}
		.recods-list {
			height: 200rpx;
			overflow-y: auto;
      display: flex;
      align-items: center;
      justify-content: center;
			background: #fff;
      padding: 0 150rpx;
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
  .share-btn2 {
    position: fixed;
		bottom: 0;
		width: 100%;
		height: 150rpx;
    background: transparent;
  }
  .package-red{
    width: 600rpx;
    overflow: hidden;
    height: 800rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 40rpx;
    }
  }
  .rule-popup {
    width: 620rpx;
    padding: 30rpx;
    .rule-popup-content {
      height: 600rpx;
      overflow: auto;
    }
  }
}
.slot-qr-content {
    text-align: center;
    image {
      width: 500rpx;
      height: 500rpx;
    }
  }
</style>