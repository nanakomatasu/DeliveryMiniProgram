<template>
	<view>
		<u-popup :show="mobileShow" mode="bottom" :round="10" @close="close" :closeable="true">
			<view class="mycart">
				<text class="flex-center f-32 f-600" v-if="types==1">添加购物车</text>
				<text class="flex-center f-32 f-600" v-if="types==2">确认订单</text>
				<view class="content m-t-20" v-if="types==2">
					<!-- 	<view class="flex-about flex-centerd">
							<view class="flex-centerd">
								<image class="site" src="@/pagesOptimization/static/site.png" mode=""></image>
								<view class="m-l-15 c-D9 f-28">添加地址</view>
							</view>
							<image class="theright" src="@/pagesOptimization/static/theright.png" mode=""></image>
					</view> -->
					<view class="flex-space flex-centerd">
						<view class="flex-centerd">
							<image class="site" src="@/pagesOptimization/static/site.png" mode=""></image>
						</view>
						<view class="" style="width: 500rpx;">
							<view class="f-600 f-28">颜先生189*****9803</view>
							<view class="f-24">湖南省长沙市岳麓区麓谷街道岳麓大道660号萧湘奥林匹克花园25栋</view>
						</view>
						<image class="theright" src="@/pagesOptimization/static/theright.png" mode=""></image>
					</view>

				</view>
				<view class="content m-t-20 m-b-25">
					<view class="flex">
						<!-- <image class="img" src="../../static/img/index-shenghuo2.png" mode=""></image> -->
						<view class="m-l-15 flex-juse" style="width: 490rpx;">
							<view class="flex-bas">
								<view class="f-24 c-D9">券后</view>
								<view class="flex-bas c-D9">
									<view class="f-24">¥</view>
									<view class="f-36 f-600">39.8</view>
								</view>
								<view class="f-24 c-88 m-l-15" style="text-decoration:line-through">¥78.8</view>
							</view>
							<view>已选择：黑色经典（原味）2盒</view>
							<view class="flex-right">
								<view class="">
									<u-number-box v-model="value">
										<view slot="minus" class="minus">
											<u-icon name="minus" size="12"></u-icon>
										</view>
										<text slot="input" style="width: 50rpx;text-align: center;"
											class="input">{{value}}</text>
										<view slot="plus" class="plus">
											<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
										</view>
									</u-number-box>
								</view>
							</view>
						</view>
					</view>

					<view class="m-t-15">
						<view class="f-600">
							规格
						</view>
						<view class="flex-wr flex-space">
							<view :class="indes==index?'specx m-t-15':'specs m-t-15'" v-for="(item,index) in 6"
								:key="index" @tap="specs(index)">
								黑色经典（原味）2盒
							</view>
						</view>
					</view>
				</view>
				<view class="m-b-25 content m-b-40">
					<view class="flex-about">
						<view class="f-28 f-600">配送方式</view>
						<view>快递包邮 ¥0</view>
					</view>
					<view class="flex-about p-t-20 p-b-20">
						<view class="f-28 f-600">优惠券</view>
						<view class="flex-centerd c-D9">店铺券-¥12元 <image class="theright"
								src="@/pagesOptimization/static/theright.png" mode=""></image>
						</view>
					</view>
					<view class="flex-about">
						<view class="f-28 f-600">备注</view>
						<view class="flex-centerd">
							<u--input placeholder="请输入内容" border="none" inputAlign="right" v-model="values"></u--input>
							<image class="theright" src="@/pagesOptimization/static/theright.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="confirm  ">

				<view class="flex-center" v-if="types==1">
					<view class="affirm flex-center">
						确认
					</view>
				</view>

				<view class="flex-right flex-centerd" v-if="types==2">
					<view class="m-r-15">
						<view class="flex-right flex-bas">
							合计:
							<view class="flex-bas m-l-12">
								<view class="f-24 c-D9 ">¥</view>
								<view class="f-36 f-600 c-D9"> 89.0</view>
							</view>
						</view>
						<view class="">优惠券5元 共减¥5.0</view>
					</view>
					<view class="order flex-center">
						提交订单
					</view>
				</view>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "preferredpopup",
		props: {
			types: {
				type: Number, //显示是添加购物车 还是确认订单
			},
			show: {
				type: Boolean,
				default: false
			}, //父组件传值 是否显示
		},
		data() {
			return {
				types: 0,
				indes: "", //选中的规格
				// show: false, //弹窗控制
				value: 1, //数量
				values: "",
				mobileShow: false,
			};
		},
		watch: {
			show: {
				handler(newVal, oldVal) {
					this.mobileShow = newVal
				},
				immediate: true,
			}

		},
		methods: {
			close() {
				this.$emit("close")
			},


			specs(index) {
				this.indes = index
				console.log(index)

			}
		}


	}
</script>

<style>
	.mycart {
		background-color: #F7F7F7;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 40rpx 25rpx 0rpx 25rpx;
	}

	.content {
		padding: 25rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.img {
		width: 148rpx;
		height: 148rpx;
	}

	.minus {
		width: 36rpx;
		height: 36rpx;
		border-radius: 8rpx;
		border: 1rpx solid #D4D4D4;
		@include flex;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	/* .input {
		padding: 0 10px;
	}
 */
	.plus {
		width: 36rpx;
		height: 36rpx;
		border-radius: 8px;
		border: 1rpx solid #D4D4D4;
		border-radius: 8rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}

	.specs {
		padding: 12rpx 25rpx 12rpx 25rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		border: 1px solid #F6F6F6;
		color: #202020;
	}

	.specx {
		padding: 12rpx 25rpx 12rpx 25rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		border: 1px solid #D93038;
		color: #D93038;
	}

	.confirm {
		padding-left: 25rpx;
		padding-right: 25rpx;
		height: 120rpx;
		background: #FEFFFE;
		box-shadow: 0px -4px 20px 0px rgba(0, 0, 0, 0.0400);
	}

	.affirm {
		width: 686rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
	}

	.site {
		width: 48rpx;
		height: 48rpx;
	}

	.theright {
		width: 28rpx;
		height: 28rpx;
	}

	.order {
		width: 200rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FEFFFE;
		line-height: 40rpx;
	}
</style>