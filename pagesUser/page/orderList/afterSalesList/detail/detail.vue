<template>
	<view class="pl32 pr32 box-size">
		<view class="head pt32 pb24">
			<view class="dis-flex flex-y-center">
				<view class="f-36 f-b">订单已取消</view>
				<u-icon name="arrow-right" size="30rpx"></u-icon>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mb20 dis-flex flex-y-center flex-x-between cont24">
			<view class="f-28 col-gray-33 f-b">退款：79.6元</view>
			<view class="dis-flex flex-y-center"
				@tap="onLink('/pagesUser/page/orderList/afterSalesList/progress/progress?id='+id)">
				<view class="col-brank-22 f-28">商家审核中</view>
				<u-icon name="arrow-right" color="#8E8F8E" size="28rpx"></u-icon>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mb20  ">
			<view class="address radio-16 cont24">
				<view class="f-28 f-b col-gray-33">门店信息</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">门店名称</view>
					<view class="f-28 col-brank-22">叫了个鸡</view>
				</view>
				<view class="pt32 dis-flex flex-x-between">
					<view class="f-28 col-gray-88">用餐地址</view>
					<view class="f-28 col-brank-22 w-75 t-r">湖南省长沙市望城区月亮岛街道金桑园小区C01栋165号C</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">就餐方式</view>
					<view class="f-28 col-brank-22">在店堂食</view>
				</view>
			</view>
			<view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center">
				<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
				<view class="col-brank-22 ">联系商家</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 dis-flex flex-y-center mb20 cont24">
			<image src="/pagesUser/static/address-order.png" class="wh48 mr24"></image>
			<view class="w-90 ">
				<view class="f-28 f-b mb16">
					<text class="mr8">颜先生</text>
					<text>189*****9803</text>
				</view>
				<view class="dis-flex flex-x-between flex-y-start">
					<view class="twolist-hidden f-24 w-100">湖南省长沙市岳麓区麓谷街道岳麓大道660号萧湘奥林匹克花园25栋</view>
					<view class="mt5">
						<u-icon slot="right" name="arrow-right" size="28rpx"></u-icon>
					</view>
				</view>
			</view>

		</view>
		<view class="bg-white-ff radio-16">
			<view class="bg-white-ff radio-16 cont24 address">
				<view class="col-gray-33 f-b f-32 mb24">饭丘丘(五一广场店）</view>
				<view class="dis-flex  flex-x-between goods-item mb40">
					<image class="wh112" src="/static/img/index-shenghuo1.png"></image>
					<view class="w-78 ">
						<view class="dis-flex flex-y-center flex-x-between w-100">
							<view class="f-b f-28 w-70 onelist-hidden">新鲜鸡翅尖新鲜鸡翅尖新鲜鸡翅尖新鲜鸡翅尖</view>
							<view class="t-b f-32 f-b f-DINPro"><text class="f-24">¥</text>15.9</view>
						</view>
						<view class="mt5 f-24 col-gray-88">10串</view>
						<view class="f-24 col-gray-88">x1</view>
					</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-between mb32">
					<view class="col-brank-22">商品金额</view>
					<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text class="f-24">¥</text>15.9</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-between mb32">
					<view class="col-brank-22">运费</view>
					<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text class="f-24">¥</text>15.9</view>
				</view>

				<view class="dis-flex flex-y-center flex-x-between mb32">
					<view class="col-brank-22">预估配送费</view>
					<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text class="f-24">¥</text>15.9</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-between mb32">
					<view class="col-brank-22">店铺满减</view>
					<view class="t-b f-32 col-red-d9 f-b f-DINPro"><text class="f-24">-¥</text>15.9</view>
				</view>
				<view class="dis-flex flex-y-center mt30 flex-x-between">
					<view class="dis-flex flex-y-center">
						<image class="wh28 mr10" src="/static/img/red-back.png"></image>
						<view class="f-28 col-brank-20">红包</view>
					</view>
					<view class="f-24 col-red-d9 f-b mr5 f-DINPro"><text>-¥</text><text class="f-32">15.9</text></view>
				</view>
				<view class="border-t-f7 pt25 mt24 col-gray-33 dis-flex flex-y-center flex-x-end" v-if="id!=1">
					<text class="mr15">合计</text>
					<text class="t-b f-40 col-red-d9 f-b f-DINPro"><text class="f-28">¥</text>15.9</text>
				</view>
			</view>
			<view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center">
				<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
				<view class="col-brank-22 ">联系商家</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mt24 ">
			<view class="address radio-16 cont24">
				<view class="f-28 f-b col-gray-33">配送信息</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">配送地址</view>
					<view class="f-28 col-brank-22">湖南师范大学学生公寓6栋209室</view>
				</view>
				<view class="t-r mt5  f-28 col-brank-22">
					<text class="mr16">胡先生</text>
					18684668908
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">配送寝室</view>
					<view class="f-28 col-brank-22">男寝 2栋201</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">配送方式</view>
					<view class="f-28 col-brank-22">骑手配送</view>
				</view>
			</view>
			<view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center">
				<view class="dis-flex flex-y-center flex-x-center w-50">
					<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
					<view class="col-brank-22 ">联系商家</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-center w-50 bo" v-if="id!=1">
					<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
					<view class="col-brank-22 ">联系骑手</view>
				</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mt24  cont24">
			<view class="f-28 f-b col-gray-33">就餐信息</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">用餐人</view>
				<view class="f-28 col-brank-22">沈生生</view>
			</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">联系方式</view>
				<view class="f-28 col-brank-22">18684678906</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mt24  cont24">
			<view class="f-28 f-b col-gray-33">订单信息</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">订单号</view>
				<view class="f-28 col-brank-22">2022239273892998 <text class="f-24 ml15 col-red-d9">复制</text></view>
			</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">支付方式</view>
				<view class="f-28 col-brank-22">在线支付</view>
			</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">下单时间</view>
				<view class="f-28 col-brank-22">2020-08-05 09:15:34</view>
			</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">支付时间</view>
				<view class="f-28 col-brank-22">2020-08-05 09:15:34</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mt24  cont24">
			<view class="dis-flex flex-y-center flex-x-between">
				<view class="f-28 ">订单备注</view>
				<view class="f-28 col-brank-22">请商家尽快配送</view>
			</view>
			<view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 ">餐具数量</view>
				<view class="f-28 col-brank-22">1份</view>
			</view>
		</view>
		<view class="btn w-100 bg-white-ff dis-flex flex-x-end fixed-bottom box-shad-t flex-y-center flex-x-between">
			<view class="dis-flex flex-y-center">
				<view class="btn-order border-dd col-brank-20 f-24">删除订单</view>
				<view class="btn-order border-dd col-brank-20 f-24">再来一单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 1,
				detail: {
					status: 0, //商家是否已接单
				},

			};
		},
		onLoad(e) {
			this.id = e.id
		},
		methods: {
			//跳转退款进度
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			cancelClick() {
				//取消订单
				uni.navigateTo({
					url: '/pagesUser/page/orderList/cancelList/cancelList'
				})
				this.cancelShow = false

			}
		}


	}
</script>

<style lang="scss">
	.goods-item:last-child {
		margin-bottom: 32rpx;
	}

	.address {
		box-shadow: 0 44rpx 44rpx #F7F7F7;
	}

	page {
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

	.btn-order {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.btn {
		width: 100%;
		padding: 18rpx 32rpx;
		box-sizing: border-box;
		padding-bottom: calc(18rpx + env(safe-area-inset-bottom));
		background: #FEFFFE;
		box-shadow: 0px -4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
	}

	.win-box-mobile {
		width: 560rpx;
		height: 292rpx;
		padding: 40rpx 60rpx;

	}

	.btn-win {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
</style>