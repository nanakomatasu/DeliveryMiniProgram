<template>
	<view>
		<view class="mt20 bg-white-ff pt24 pb24 pl32 pr32 box-size dis-flex flex-y-center flex-x-between" >
			<view class="dis-flex flex-y-center">
				<image class="wh48" :src="userInfo.is_bind_wx==1?'/pagesUser/static/act-bingding.png' :'/pagesUser/static/bingding.png'"></image>
				<view class="col-brank-10 ml24">微信</view>
			</view>
			
			<view class="dis-flex flex-y-center w-70 flex-x-end" @tap="Unbinding" v-if="userInfo.is_bind_wx==1">
				<view class="f-28 " :class="userInfo.user_name?'col-brank-10':'col-gray-88'">{{userInfo.user_name}}</view>
				<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
			</view>
			
			<view class="dis-flex flex-y-center w-70 flex-x-end"  @tap="binding" v-if="userInfo.is_bind_wx==0">
				<view class="f-28 " :class="userInfo.user_name?'col-brank-10':'col-gray-88'">未绑定</view>
				<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
			</view>
			
		</view>
	</view>
</template>

<script>
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				account:{
					name:"会飞的猪"
				},
				userInfo:{},
			};
		},
		
		onShow(){
		this.information()
		
		},
		
		methods:{
			
			Unbinding(){
				if (this.isWxBrowser()) {
					let  _this=this
					uni.showModal({
						title: '提示',
						content: '是否解绑微信',
						success: function (res) {
							if (res.confirm) {
								_this.unbindWxx()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			
			binding(){
				if (this.isWxBrowser()) {
					let  _this=this
					uni.showModal({
						title: '提示',
						content: '是否绑定微信',
						success: function (res) {
							if (res.confirm) {
								_this.getbind()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				
			},
			
			//是否微信内部浏览器
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			},
			
			//个人信息
			async information() {
				var that = this
				const result = await that.$api.receivingOrderx()
				if (result.status == 200) {
					this.userInfo = result.data.userInfo
				}
			},
			
			async unbindWxx() {
				var that = this
				const result = await that.$api.unbindWx()
				if (result.status == 200) {
					this.information()
				}
			},
			
			
			async getbind() {
				var that = this
				const result = await that.$api.getbindOauthRedirect({
					url:  urlConfig+'h5/#/pagesUser/page/setting/accountBinding/accountBinding'
				})
				if (result.status == 200) {
					window.location.href = result.data;
					return false
				}
			},
			
		}
	}
</script>

<style lang="scss">

</style>
