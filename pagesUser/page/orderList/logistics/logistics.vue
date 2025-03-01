<template>
	<view>
		<view class="container p-bottom" v-if="express.express_name">
			<!-- 物流公司 -->
			<view class="flow-all-money dis-flex  ">
				<view class="flex-box">
					<view class="dis-flex flow-all-list-cont mb20">
						<text class="col-gray-88">物流公司: {{express.express_name}}</text>
					</view>
					<view class="dis-flex flow-all-list-cont">
						<text class="col-gray-88" :selectable="true">物流单号: {{express.express_no}}</text>
					</view>
				</view>
			</view>
			<!-- 物流动态 -->
			<view class="logis-detail m-top20 b-f">
				<view class="logis-item radio-8" :class="index === 0 ? 'first' : ''"
					v-for="(item,index) in express.list" :key="index">
					<view class="logis-item-content">
						<view class="logis-item-content__describe">
							<text class="f-26">{{ item.context }}</text>
						</view>
						<view class="logis-item-content__time">
							<text class="f-22">{{ item.ftime }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {},
				express: {
					express_name: "顺丰快递",
					express_no: "sf-45454545",
					list: [{
						context: "长沙市岳麓区",
						ftime: "2021-05-22"
					}, {
						context: "长沙市岳麓区长沙市岳麓区长沙市岳麓区长沙市岳麓区长沙市岳麓区",
						ftime: "2021-05-22"
					}, {
						context: "长沙市岳麓区",
						ftime: "2021-05-22"
					}]
				},
			};
		},
		onLoad: function(options) {
			// 获取物流动态
			// this.getExpressDynamic(options.order_id);
		},
		methods: {
			async getExpressDynamic(order_id) {
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				const {
					code,
					data
				} = await that.$api.orderExpress({
					order_id: order_id
				})
				uni.hideLoading()
				if (code == 1) {
					this.express = data.express
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.flow-all-money {
		padding: 24rpx 32rpx;
		box-sizing: border-box;

	}

	.logis-detail {
		padding: 30rpx;
	}

	.logis-detail .logis-item {
		position: relative;
		padding: 10px 0 10px 25px;
		box-sizing: border-box;
		border-left: 2rpx dashed #dfe2e2;
	}

	.logis-detail .logis-item.first {
		// border-left: 2px solid #f40;
	}

	.logis-detail .logis-item:after {
		content: ' ';
		display: inline-block;
		position: absolute;
		left: -6px;
		top: 30px;
		width: 6px;
		height: 6px;
		border-radius: 10px;
		background: #bdbdbd;
		border: 2px solid #fff;
	}

	.logis-detail .logis-item.first:after {
		content: '';
		width: 36rpx;
		height: 36rpx;
		background-image: url(../../../static/swoosh.png);
		background-size: cover;
		border: none;
		left: -18rpx;
		background-color: #fff;
	}

	.logis-detail .logis-item .logis-item-content {
		position: relative;
		background: #f9f9f9;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		color: #666;
		border-radius: 8rpx;
	}

	.logis-detail .logis-item.first .logis-item-content {
         
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		color: #fff;
	}

	.logis-detail .logis-item .logis-item-content:after {
		content: '';
		display: inline-block;
		position: absolute;
		left: -10px;
		top: 18px;
		border-left: 10px solid #fff;
		border-bottom: 10px solid #f3f3f3;
	}

	.logis-detail .logis-item.first .logis-item-content:after {
		border-bottom-color: #EC434B;
	}
</style>
