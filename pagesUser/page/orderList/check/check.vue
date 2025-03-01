<template>
	<view class="pl24 pr24 box-size">
		<view class="mt20 cont24 radio-16 bg-white-ff ">
			<view class="dis-flex flex-y-center pb32 border-b-f7-d">
				<!-- <image class="radio-16 wh148 mr24" src="/static/img/index-shenghuo1.png"></image> -->
				<view class="w-75">
					<view class="f-32 f-b w-100 onelist-hidden mb12">工作日酸包菜肉沫套餐</view>
					<view class="f-24 col-gray-88">工作日酸包菜肉沫套餐</view>
					<view class="mt12 dis-flex flex-y-center flex-x-between">
						<view class="dis-flex flex-y-center">
							<image class="wh28 mr10" src="/pagesUser/static/check-icon01.png"></image>
							<view class="f-24 col-gray-88">随时退 过期自动退</view>
						</view>
						<view class="t-b f-b f-32"><text class="f-24">¥</text>15.9</view>
					</view>
				</view>
			</view>
			<view class="mt30 " :class="detail.status==5?'col-gray-88':'col-gray-33'">
				<view class="dis-flex mb34 flex-y-center flex-x-center" :class="detail.status==5?'op-6':''">
					<!-- <image class="qrCode" src="/static/img/index-shenghuo1.png"></image> -->
				</view>
				<view class="f-32 f-b mb8">券码信息</view>
				<view class="dis-flex flex-y-center mb12  f-24 flex-x-between">
					<view>2022-09-12 23:59到期</view>
					<view>{{detail.status==5?'已使用':'待使用'}}</view>
				</view>
				<view class="f-32 f-DINPro f-b" :class="detail.status==5?'text-line':''">3040 8234 3433</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mt20  ">
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
		<view class="bg-white-ff radio-16 mt20 cont24-32 ">
			<view class="f-32 f-b">套餐内容</view>
			<view class="mt40 f-28" v-for="(item,index) in list" :key="index">
				<view class="name f-b mb24">{{item.name}}</view>
				<view class="dis-flex pl24 flex-y-start flex-x-between mt24" v-for="(items,indexs) in item.list"
					:key="indexs">
					<view class="w-70">{{items.name}}</view>
					<view class="w-25 dis-flex flex-y-center flex-x-end">
						<text class="col-gray-88 mr10">(1份)</text>
						<view class="t-b f-b f-32"><text class="f-24">¥</text>15.9</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white-ff radio-16 mt20 cont24-32  f-28 col-brank-20">
			<view class="f-32 f-b">温馨提示</view>
			<view class="dis-flex mt35 flex-y-center ">
				<image class="wh28 mr8" src="/pagesUser/static/check-icon02.png"></image>
				<view>有效期</view>
			</view>
			<view class="mt20 pl35">2022年6月20日-2022年10月20日 23:59</view>
			<view class="dis-flex mt35 flex-y-center ">
				<image class="wh28 mr8" src="/pagesUser/static/check-icon03.png"></image>
				<view>不可用日期</view>
			</view>
			<view class="mt20 pl35">2022年6月3日-2022年6月5日、2022年8月15日-2022年8月16日</view>
		</view>
		<view class="bg-white-ff radio-16 mt24  cont24-32">
			<view class="f-28 f-b col-gray-33">实付金额：¥98</view>
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
		<view class="btn w-100 bg-white-ff dis-flex flex-x-end fixed-bottom box-shad-t flex-y-center flex-x-between">
			<view class="btn-order border-dd col-brank-20 f-24">申请退款</view>
			<view class="btn-order bg-red-d6-ec col-white-ff f-24">再来一单</view>
		</view>
		<!-- 退款取消弹窗 -->
		<view :catchtouchmove="true">
			<u-popup :show="cancelShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
				<view class="win-box-mobile  box-size bg-white-ff radio-30">
					<view class="f-32 w-100 t-c f-b">取消订单并退款</view>
					<view class="f-28 t-c mt20">{{detail.status==1?'商家已接单，如需退款请先与商家联系。':'退款将原路退回至支付账户。'}}</view>
					<view class="dis-flex flex-y-center flex-x-between mt40">
						<view class="btn-win t-c bg-gray-ef radio-40" @tap="cancelClick">确认取消</view>
						<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="cancelShow=false">我在想想</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				cancelShow: true,
				detail: {
					status: 5
				},
				list: [{
					name: "菜品",
					list: [{
						name: "酸包菜肉沫酸包菜肉沫酸包菜肉沫酸包菜肉沫酸包菜肉沫酸包菜肉沫",
					}, {
						name: "蜜汁叉烧",
					}]
				}, {
					name: "小菜",
					list: [{
						name: "白菜",
					}, {
						name: "油麦菜",
					}]
				}, {
					name: "其他",
					list: [{
						name: "纸巾",
					}, {
						name: "茶位费",
					}]
				}]

			};
		}
	}
</script>

<style lang="scss">
	.qrCode {
		width: 332rpx;
		height: 332rpx;
	}

	.address {
		box-shadow: 0 44rpx 44rpx #F7F7F7;
	}

	.name {
		position: relative;
		padding-left: 24rpx;
	}

	.name::before {
		content: '';
		width: 10rpx;
		height: 10rpx;
		background: #202020;
		border-radius: 100%;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
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

	.op-6 {
		opacity: 0.6;
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