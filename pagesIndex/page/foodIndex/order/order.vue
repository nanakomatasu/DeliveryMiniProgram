<template>
	<view>
		<view class="padd-0-30 m-t-15 p-b-120">
			<view class="m-t-25 order-main bor-r-16 padd-t24-b32 padd-0-24 flex" v-for="(item,index) in news.goods_list"
				:key="index">
				<view class="">
					<image class="wh-148" :src="item.img" mode=""></image>
				</view>
				<!-- 右边 -->
				<view class="">
					<!-- 第一行 -->
					<view class="flex-jus-spa">
						<view class="f-32 color-10 text-shenglue m-l-12" style="width: 302rpx;">
							{{item.name}}
						</view>
						<view class="">
							<text class="f-28 color-888 m-r-8 hide">¥{{item.scribe_price}}</text>
							<text class="f-24 color-20 fw-700">¥</text>
							<text class="f-32 color-20 fw-700">{{item.price}}</text>
						</view>
					</view>
					<!-- 第一行结束 -->
					<!-- 第二行 -->
					<view class="m-t-12 f-24 color-888 m-l-12">
						<text>限购2份</text>
						<text>周一至周五</text>
					</view>
					<!-- 第二行结束 -->
					<!-- 第三行 -->
					<view class="flex-about m-t-18">
						<view class="">
							<text class="m-l-12 f-24 color-888">随时退 过期自动退</text>
						</view>

						<view class="flex">
							<view class="" @tap="cut(item,index)">
								<view class="wh-36 flex-center" style="border: 1px #D4D4D4 solid;border-radius: 8rpx;">
									-
								</view>
							</view>

							<view class="f-28 color-20 fw-500 m-lr-16">
								{{item.total_num}}
							</view>
							<view class="" @tap="plus(item,index)">
								<view class="wh-36 flex-center"
									style="border-radius: 8rpx;   border: 1px #D93038 solid;  background: #D93038; color: #ffffff;">
									+
								</view>
							</view>

						</view>

					</view>
					<!-- 第三行结束 -->
					<!-- 第四行 -->
					<view class="flex-row-r m-t-20">
						<view>
							<text class="f-24 color-888 m-r-12">小计</text>
							<text class="f-24 color-D93038">¥</text>
							<text class="f-32 color-D93038">{{Number(item.total_num*item.price).toFixed(2) }}</text>
						</view>
					</view>
					<!-- 第四行结束 -->
				</view>
				<!-- 右边结束 -->
			</view>
			<!-- 红包 -->
			<!-- <view class="flex-jus-spa bgc-ff padd-36-24 bor-r-16 m-t-20">
				<view class="flex-al-c f-28 color-222">
					<image class="wh-28 m-r-12" src="/pagesIndex/static/ico-xiaouhongbao.png" mode=""></image>
					校U送红包
				</view>
				<view class="flex-al-c f-28 color-888">
					暂无可用
					<image class="wh-24 m-l-8" src="/static/img/ico-gengduo.png" mode=""></image>
				</view>
			</view> -->
			<!-- 红包结束 -->
		</view>

		<view class="flex-jus-spa order-btn flex-al-c">
			<view class="flex-centerd">
				<text class="f-24 color-20">合计</text>
				<text class="f-28 color-D93038 fw-700 m-l-16">¥</text>
				<text class="f-44 color-D93038 fw-700 m-l-4">{{xxx||Number(news.order_pay_price).toFixed(2)}}</text>
			</view>
			<view class="order-btn-box flex-c-c" @tap="smipr">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods: "",
				store: "",
				news: [],
				num: '1',
				xxx: "",
				type: "",
			}
		},

		onLoad(e) {
			this.type = e.type
			this.school = uni.getStorageSync('school')

			this.goods = e.goods
			this.store = e.store
			console.log(e)

			//购物车进来
			if (e.type == 1) {
				this.getStorecateIndexgwc()
			}
			//抢购进来
			if (e.type == 2) {
				this.getStorecateIndex()
			}


		},

		onShow() {
			// this.totalPrice()
		},


		methods: {
			totalPrice() {
				var totalPrice = 0;
				for (var i in this.news.goods_list) {
					totalPrice += this.news.goods_list[i].price * this.news.goods_list[i].total_num;
				}
				this.news.order_pay_price = totalPrice.toFixed(2)
				// console.info(totalPrice);
				return totalPrice;
			},

			count() {
				var total = 0
				for (var i = 0; i < this.news.goods_list.length; i++) {
					total += parseInt(this.news.goods_list[i].total_num)
				}
				console.info(total, "----");
				this.num = total
				return total
			},


			plus(item, index) {
				if (this.type == 1) {
					this.getTakeoutCartAdd(item)
				}

				if (this.type == 2) {
					this.news.goods_list[index].total_num++
					let a = this.news.order_pay_price
					this.num++
					this.xxx = Number(this.num * a).toFixed(2)
				}

			},

			//获取加入购物车接口
			async getTakeoutCartAdd(items) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.delicacyaddcart({
					merchant_id: items.merchant_id,
					goods_id: items.goods_id,
					num: 1,
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.getStorecateIndexgwc()
				}
			},




			cut(item, index) {
				if (this.type == 1) {
					if (this.news.goods_list[index].total_num != 1) {
						this.getTakeoutCartSub(item)
					}
				}







				if (this.num != 1) {
					if (this.type == 2) {
						if (this.news.goods_list[index].total_num != 1) {
							this.news.goods_list[index].total_num--
						}
						let a = this.news.order_pay_price
						this.num--
						this.xxx = this.num * a
					}
				}
			},


			//减少购物车接口
			async getTakeoutCartSub(item) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.delicacycartreduce({
					cart_id: item.cart_id
				})
				if (status == 200) {
					uni.showToast({
						title: "数量减少成功",
						icon: "none"
					})
					this.getStorecateIndexgwc()
				}

			},







			//美食订单信息
			async getStorecateIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.delicacyorderxx({
					store_id: this.store,
					school_id: this.school.id,
					goods_id: this.goods,
					// #ifdef APP-PLUS
					origin: "1",
					// #endif
					// #ifdef H5  
					origin: "2",
					// #endif
					trade_area_id: "1",
					goods_num: this.num,
					// user_coupon_id: "",
				})
				if (status == 200) {
					this.news = data
				}
			},

			async smip() {
				var that = this
				const {
					data,
					status
				} = await that.$api.delicacyorderxr({
					store_id: this.store,
					// #ifdef H5
					app_type: "2",
					// #endif
					//#ifdef APP-PLUS
					app_type: "1",
					// #endif

					school_id: this.school.id,
					goods_id: this.goods,
					trade_area_id: "1",
					goods_num: this.num,
					// user_coupon_id:"1",
				})
				if (status == 200) {
					if (this.type == 1) {
						uni.navigateTo({
							url: '/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=' + data
								.order_id +
								"&return_type=" + 3 + '&type=' + 1
						});
					} else if (this.type == 2) {
						uni.navigateTo({
							url: '/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=' + data
								.order_id +
								"&return_type=" + 3 + '&type=' + 2
						});
					}
				}
			},

			//美食购物车订单信息
			async getStorecateIndexgwc() {
				var that = this
				const {
					data,
					status
				} = await that.$api.delicacyordergwcxq({
					store_id: this.store,
					school_id: this.school.id,
					cart_ids: this.goods,
					// #ifdef APP-PLUS
					origin: "1",
					// #endif
					// #ifdef H5  
					origin: "2",
					// #endif
					trade_area_id: "1",
					goods_num: this.num,
					// user_coupon_id: "",
				})
				if (status == 200) {
					this.news = data
				}
			},

			async smipx() {
				var that = this
				const {
					data,
					status
				} = await that.$api.delicacyorderddxx({
					store_id: this.store,
					// #ifdef H5
					app_type: "2",
					// #endif
					//#ifdef APP-PLUS
					app_type: "1",
					// #endif

					school_id: this.school.id,
					cart_ids: this.goods,
					trade_area_id: "1",
					goods_num: this.num,
					// user_coupon_id:"1",
				})
				if (status == 200) {
					if (this.type == 1) {
						uni.navigateTo({
							url: '/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=' + data
								.order_id +
								"&return_type=" + 3 + '&type=' + 1
						});
					} else if (this.type == 2) {
						uni.navigateTo({
							url: '/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=' + data
								.order_id +
								"&return_type=" + 3 + '&type=' + 2
						});
					}
				}
			},


			smipr() {
				if (this.type == 1) {
					this.smipx()
				} else if (this.type == 2) {
					this.smip()
				}
			}




		}
	}
</script>

<style>
	.hide {
		visibility: hidden;
	}

	.order-main {
		/* width: 710rpx; */
		background-color: #fff;
	}

	.order-btn {
		box-sizing: border-box;
		padding: 14rpx 32rpx 14rpx 32rpx;
		width: 750rpx;
		/* height: 100rpx; */
		background: #FEFFFE;
		box-shadow: 0rpx -4rpx 24rpx 0rpx rgba(0, 0, 0, 0.0500);
		position: fixed;
		bottom: 0;
	}

	.order-btn-box {
		width: 200rpx;
		height: 72rpx;
		color: #fff;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
	}
</style>