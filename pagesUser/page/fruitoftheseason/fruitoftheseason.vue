<template>
	<view>
		<view class="paddall20">
			<!-- <view class="">
				<u-search placeholder="请输入关键词" v-model="keyword"></u-search>
			</view> -->
			<u-navbar title="个人中心" @rightClick="rightClick" :autoBack="true">
			</u-navbar>

			<view class="xs ">
				<view class="flex-space">
					<view class="f-32 cd93 f-b flex-c-c ">
						综合排序 <image src="/static/img/ico_zhankai.png" class="wid20 m-l-10" mode=""></image>
					</view>
					<view class="f-32 cd93 f-b flex-c-c ">
						销量优先
					</view>
					<view class="f-32 cd93 f-b flex-c-c ">
						价格 <image src="/static/img/ico_zhankai1.png" class="wid20 m-l-10" mode=""></image>
						<image src="/static/img/ico_zhankai2.png" class="wid20 m-l-10" mode=""></image>
						<image src="/static/img/ico_zhankai3.png" class="wid20 m-l-10" mode=""></image>
					</view>
				</view>
			</view>





			<view class="dis-flex flex-x-between flex-wrap p-t-160">
				<view v-for="(item,index) in shopcartsalelist" :key="index" @tap="toProductDetails(item,0,0)"
					class="vipre dis-flex br-10 flex-dir-column m-b-20">
					<image :src="item.goods_image" mode="" class="imglist" style="border-radius: 8px 8px 0px 0px;">
					</image>
					<view class="recontent">
						<view class="f-32 f-b c20 onelist-hidden m-b-20">
							{{item.goods_name}}
						</view>

						<view class="dis-flex flex-x-between m-b-5 m-t-10 flex-y-start">
							<view class=" dis-flex flex-wrap  ">
								<view class="labela f-14">30减15</view>
								<view class="labelb">已拼3万件</view>
							</view>
						</view>

						<view class="dis-flex flex-x-between flex-y-center widbottomtwo">
							<view class=" dis-flex flex-y-end cd93  f-36 f-b m-r-5">
								<text class="f-24 cd93 m-r-5">券后</text>
								<text class=" cd93 m-r-5 line16">¥{{ item.goods_price }}</text>
								<text class="line-through f-24 onelist-hidden c88 m-b-3"
									style="text-decoration:line-through">
									¥{{ item.goods_price }}
								</text>
							</view>
							<image src="/static/img/ico_jiagouwuche.png" mode="" class="wid50"
								@tap.stop="toProductDetails(item,0,1)"> </image>
						</view>
					</view>
				</view>

			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				shopcartsalelist: [{
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}, {
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}, {
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}, {
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}, {
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}, {
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}, {
					goods_image: "https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					goods_name: "好欢螺螺狮粉12好欢螺螺狮好欢螺螺狮粉包装好欢螺螺狮粉包装好欢螺螺狮粉包装粉包装",
					goods_price: '14',
					goods_sku: {
						goods_price: "41",
						line_price: 'caca'
					}
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.m-tb-20 {
		margin: 20rpx 0;
		padding: 0 25rpx;
	}

	.line16 {
		line-height: 34rpx;
	}

	.he40 {
		height: 36rpx;
	}

	.wid452 {
		width: 452rpx;
	}

	.uni-swipe_button {
		margin-left: 20rpx;
		height: 184rpx;
	}

	.wid50 {
		width: 50rpx;
		height: 50rpx;
	}

	.retitle {
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #202020;
		line-height: 40rpx;
	}

	.vipre {
		.imglist {
			border: 10rpx 10rpx 0 0 !important;
			width: 344rpx;
			height: 344rpx;
		}

		.recontent {
			width: 346rpx;
			// height: 182rpx;
			background: #FEFFFE;
			border-radius: 0px 0px 16rpx 16rpx;
			box-sizing: border-box;
			padding: 20rpx;
		}

	}



	.widbottom {
		width: 380rpx;
	}

	/* .widbottomtwo {
		width: 300rpx;
	} */

	.fonttwo {
		font-size: 30rpx;
		width: 40rpx;
		height: 40rpx;
		background: #FFFFFF;
		border-radius: 4rpx 0px 0px 4rpx;
		border: 1rpx solid #DDDDDD;
	}











	.shopsettlement {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 100rpx;
		background: #FEFFFE;
		box-sizing: border-box;
		box-shadow: 0px -4rpx 24rpx 0px rgba(0, 0, 0, 0.05);
		padding: 0 32rpx;

		.btn {
			width: 200rpx;
			height: 72rpx;

			background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
			border-radius: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 72rpx;
			text-align: center;
		}

		.quanxuan {

			height: 40rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;

			color: #888888;
			line-height: 40rpx;
		}

		.total {
			// height: 48rpx;
			margin-left: 20rpx;

			.totaltetx {
				height: 40rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #202020;
				line-height: 40rpx;
			}


		}

	}

	.shoppingCartlist {
		box-sizing: border-box;
		margin: 20rpx 20rpx;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 32rpx 34rpx 32rpx 24rpx;


	}

	::v-deep .u-tag__text--error--plain {
		padding: 0px 1px;
	}

	.shopcartimg {
		margin: 0 24rpx 0 16rpx;
		width: 184rpx !important;
		height: 184rpx !important;
	}

	.labela {
		height: 14px;
		line-height: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		padding: 0 3px;
		border-radius: 2px;
		border: 0.5px solid #EB979B;
		color: #DD343C;
		max-width: 100%;
	}

	.labelb {
		height: 14px;
		line-height: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		padding: 0 3px;
		border-radius: 2px;

		border: 1px solid #D6D6D6;
		color: #888888;
		max-width: 100%;
	}

	.xs {
		width: 95%;
		position: fixed;
		top: 88rpx;
		z-index: 9999;
		background-color: #F6F6F6;
		
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		
	}
</style>
