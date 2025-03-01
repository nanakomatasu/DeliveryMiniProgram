<template>
	<view>
		<u-navbar leftIconSize="32rpx" :safeAreaInsetTop="true" :fixed="false">
			<view class="u-nav-slot " slot="left">
				<view class="dis-flex" @tap="show=true" style="width:660rpx">
					<u-icon name="arrow-left" size="34rpx"></u-icon>
					<view class="f-34 f-b col-brank-20" style="margin: 0 auto;">提交订单</view>
				</view>
			</view>
		</u-navbar>

		<view class="p-l-25 p-r-25 p-t-25">
			<view class="scanning flex-about flex-centerd">
				<view class="flex">
					<view>桌号:</view>
					<view class="m-l-10">{{tableName}}</view>
				</view>
			</view>

			<view class="scanningx m-t-20">
				<view class="flex">
					<view class="f-600">{{storeInfo.merchant_name}}</view>
				</view>
				<view class="flex-about m-t-40" v-for="(item,index) in detail.goods_list" :key="index">
					<view class="flex-about">
						<image class="saoyisao" :src="item.img" mode=""></image>
						<view class="m-l-20">
							<view class="f-600">{{item.name}}</view>
							<view class="f-24 c-8E">
								<text class="mr10" v-if="item.attribute">{{item.attribute}}</text>
								<text v-if="item.spec">{{item.spec}}</text>
								<text v-if="item.spec1">{{item.spec1}}</text>
							</view>
							<view class="f-24 c-8E">x{{item.num}}</view>
						</view>
					</view>
					<view class="">
						<view class="flex-bas">
							<view class="f-24">¥</view>
							<view class="f-32 f-600">{{item.price}}</view>
						</view>
					</view>
				</view>
				<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="detail.mj_money!=0">
					<view class="f-28 col-brank-20">店铺满减</view>
					<view class="f-24 col-red-d9 f-b"><text>-¥</text><text class="f-32">{{detail.mj_money}}</text>
					</view>
				</view>
				<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="redPocket" @click="redpocketShow=true">
					<view class="dis-flex flex-y-center">
						<image class="wh28 mr10" src="/static/img/red-back.png"></image>
						<view class="f-28 col-brank-20">商家红包</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between">
						<view class="f-24 col-red-d9 f-b mr5"><text>-¥</text><text
								class="f-32">{{redPocket.money || 0}}</text></view>
						<u-icon name="arrow-right" size="24rpx"></u-icon>
					</view>
				</view>
				<!-- 平台红包 -->
				<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="redPocket" @click="pthbShow=true">
					<view class="dis-flex flex-y-center">
						<image class="wh28 mr10" src="/static/img/red-back.png"></image>
						<view class="f-28 col-brank-20">平台红包</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between">
						<view class="f-24 col-red-d9 f-b mr5"><text>-¥</text><text
								class="f-32">{{pthb.money || 0}}</text></view>
						<u-icon name="arrow-right" size="24rpx"></u-icon>
					</view>
				</view>
			</view>

			<view class="scanningx flex-about flex-centerd m-t-20">
				<view class="flex">
					<view>取餐方式</view>
				</view>
				<radio-group @change="isOutRadioChange" class="dis-flex flex-y-center" name="isOut">
					<label class="dis-flex flex-y-center mr40">
						<radio class="mr5" value="1" :checked="isOut==1" color="#D62E36"></radio>
						<view class="f-28 col-brank-20">店内就餐</view>
					</label>
					<label class="dis-flex flex-y-center">
						<radio class="mr5" value="2" :checked="isOut==2" color="#D62E36"></radio>
						<view class="f-28 col-brank-20">打包带走</view>
					</label>
				</radio-group>
			</view>

			<view class="scanningx m-t-20">
				<view class="flex-about">
					<view>备注</view>
					<view class="flex-centerd">
						<u-input placeholder="请输入备注" border="none" inputAlign="right" v-model="userNote"></u-input>
						<image class="detai" src="/pagesIndex/static/shop-detail08.png" mode=""></image>
					</view>
				</view>

				<view class="flex-about m-t-20" v-if="isOut == 2">
					<view>餐具数量</view>
					<view class="flex-centerd">
						<!-- <u-input placeholder="请输入内容" border="none" inputAlign="right" v-model="value" @change="change"></u-input>份 -->
						<view class="dis-flex flex-y-center  flex-x-end col-gray-88" @tap="showx=true">
							{{!tableware_num?'无需餐具':tableware_num+'份'}}
						</view>
						<image class="detai" src="/pagesIndex/static/shop-detail08.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-gray-f6 submit-box">
			<view class="dis-flex flex-y-center radio-48  flex-x-between">
				<view class="btn-l dis-flex flex-dir-column flex-x-center">
					<view class="price col-white-ff  f-40 ">
						<text class="f-32 f-b">￥</text>{{parseFloat(detail.money).toFixed(2)}}
						<text
							class="f-24 col-white-ff text-line ml10">¥{{parseFloat(detail.originMoney).toFixed(2)}}</text>
					</view>
				</view>
				<button class="submit col-white-ff f-32 bg-red-d6-ec" @click="submit">提交订单</button>
			</view>
		</view>

		<u-popup :show="show" :round="10" mode="center" @close="show=false">
			<view class="contentx">
				<text class="flex-center">订单已创建，确定返回？</text>
				<view class="flex-about m-t-40">
					<view class="cancelx flex-center m-r-10" @tap="cancel">确认取消</view>
					<view class="nocancelx flex-center m-l-10" @tap="show=false">我在想想</view>
				</view>
			</view>
		</u-popup>
		<!--餐具弹窗-->
		<u-popup :show="showx" mode="bottom" @close="showx=false" :round="10">
			<view class="contentx">
				<text>是否需要餐具</text>
				<view class="flex-about m-t-15">
					<view :class="indes==1?'smip flex-center':'chunk flex-center'" @tap="need(1)">需要餐具</view>
					<view :class="indes==2?'smip flex-center':'chunk flex-center'" @tap="need(2)">无需餐具</view>
				</view>

				<view class="m-t-15" v-if="types==true">
					<view class="">选择餐具数量</view>
					<view class="flex-space m-t-10">
						<view :class="indexr==index?'coverx':'cover'  " v-for="(item,index) in service" :key="index"
							@tap="spot(item.id,item.name,index)">
							{{item.name}}
						</view>
					</view>
				</view>


				<view class="m-t-30 flex-right p-b-32 bot-AB" v-if="typex==true">
					<view class="flex-centerd">
						<u--input class="t-r  w-85 f-26" inputAlign="right" placeholder="请输入餐具数量" border="none"
							v-model="tableware_num">
						</u--input>
						<view class="f-28 tip">份</view>
					</view>
				</view>

				<view class="m-t-25 btn f-32 col-white-ff bg-red-d6-ec radio-48 t-c flex-center" style="height: 80rpx;"
					@tap="showx=false">确认</view>

			</view>

		</u-popup>
		<u-popup :show="redpocketShow" :round="10" @close="redpocketShow=false" zIndex="997" :closeable='true'>
			<radio-group @change="selRedpacket">
				<label style="height: 500rpx;background-color:#f2f2f2; border-radius: 20rpx;"
					class="dis-flex  flex-dir-column paddall3624">
					<view class="f-30 w-100 flex-center mb30">本店代金券</view>
					<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
						v-for="(item,index) in detail.red_packet_list" :key="index">
						<view class="dis-flex flex-dir-column">
							<view class="dis-flex flex-dir-row">
								<view class="col-red-d3 mr15">￥{{item.money}}</view>
								<view>{{item.coupon_details}}</view>
							</view>
							<view class="f-24 c-20">有效期至{{item.use_end_time}}</view>
						</view>
						<view v-if="item.can_use ==0">不可用</view>
						<radio v-else color="#E73E46" :value="String(index)" :checked="redPocket.id ==item.id"></radio>
					</view>
				</label>
			</radio-group>
		</u-popup>

		<!-- 平台红包 -->
		<u-popup :show="pthbShow" :round="10" @close="pthbShow=false" zIndex="997" :closeable='true'>
			<radio-group @change="selRedpackets">
				<label style="height: 500rpx;background-color:#f2f2f2; border-radius: 20rpx;"
					class="dis-flex  flex-dir-column paddall3624">
					<view class="f-30 w-100 flex-center mb30">平台红包</view>
					<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
						v-for="(item,index) in detail.pt_red_packet_list" :key="index">
						<view class="dis-flex flex-dir-column">
							<view class="dis-flex flex-dir-row">
								<view class="col-red-d3 mr15">￥{{item.money}}</view>
								<view>{{item.coupon_details}}</view>
							</view>
							<view class="f-24 c-20">有效期至{{item.use_end_time}}</view>
						</view>
						<view v-if="item.can_use ==0">不可用</view>
						<radio v-else color="#E73E46" :value="String(index)" :checked="pthb.id ==item.id"></radio>
					</view>
				</label>
			</radio-group>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				userNote: "",
				isOut: 1, //是否打包
				merchantId: 0,
				tableId: 0,
				tableName: '',
				detail: {},
				storeInfo: {},
				tableware_num: 0,
				showx: false,
				typex: false,
				types: false,
				indes: "",
				indexr: "",
				service: [{
					name: "1份",
					id: 1
				}, {
					name: "2份",
					id: 2
				}, {
					name: "3份",
					id: 3
				}, {
					name: "4份",
					id: 4
				}, {
					name: "5份",
					id: 5
				}, {
					name: "更多"
				}, ],
				redPocket: {},
				redpocketShow: false, //展示商家红包
				pthbShow: false, //展示平台红包
				pthb: ''
			}
		},
		onLoad(option) {
			console.log(option);
			this.merchantId = option.id;
			this.tableId = option.tableId;
		},
		onShow() {
			this.getShopList();
			this.getOrderSettlement();
		},
		methods: {
			need(index) {
				console.log(index)
				if (index == 1) {
					this.indes = index
					this.types = true
				} else {
					this.types = false
					this.indes = index
					this.indexr = -1
					this.tableware_num = ''
				}

			},

			spot(id, name, index) {
				this.indexr = index
				if (name == '更多') {
					this.typex = true
				} else {
					this.typex = false
				}
				this.tableware_num = id
			},
			isOutRadioChange(e) {
				this.isOut = e.detail.value
			},

			cancel() {
				this.show = false;
				uni.navigateBack()
			},
			//选择红包
			selRedpacket(e) {
				console.log(e)
				let val = e.detail.value;
				this.redPocket = this.detail.red_packet_list[val];
				this.redpocketShow = false;
				this.getOrderSettlement();
			},
			selRedpackets(e) {
				console.log(e, 'e是什么收拾收拾')
				let val = e.detail.value;
				this.pthb = this.detail.pt_red_packet_list[val];
				this.pthbShow = false;
				this.getOrderSettlement();
			},
			//获取商品列表
			async getShopList() {
				uni.showLoading({
					title: '加载中'
				})
				let that = this;
				const {
					data,
					status
				} = await that.$api.dinningShopList({
					// trade_area_id: that.trade_area_id,
					table_id: this.tableId
				})
				uni.hideLoading();
				if (status == 200) {
					console.log(data)
					this.tableName = data.table.name;
				}

			},
			//获取订单信息
			async getOrderSettlement() {
				var that = this
				const {
					data,
					status
				} = await that.$api.inStoreSettlement({
					storeId: this.merchantId, //到店的id
					tableId: this.tableId,
					isOut: this.isOut, // 1店内就餐 2打包带走
					red_packet_id: this.redPocket.id,
					pt_red_packet_id: this.pthb.id
				})
				if (status == 200) {
					console.log(data);
					this.detail = data;
					this.storeInfo = data.store_info;
				}
			},
			//提交订单
			async submit() {
				console.log('提交订单')
				uni.showLoading({
					title: "正在提交"
				})
				if (this.isOut == 1) {
					this.tableware_num = ''
				}
				let params = {
					storeId: this.merchantId, //到店的id
					tableId: this.tableId,
					isOut: this.isOut, // 1店内就餐 2打包带走
					tablewareNum: this.tableware_num,
					userNote: this.userNote,
					red_packet_id: this.redPocket.id,
					pt_red_packet_id: this.pthb.id
				}
				// #ifdef APP-PLUS
				params.app_type = 1
				// #endif
				// #ifdef H5
				if (this.isWxBrowser()) {
					params.app_type = 3
				} else {
					params.app_type = 2;
				}
				// #endif

				//#ifdef MP-WEIXIN
				params.app_type = 3;
				//#endif

				const {
					data,
					status
				} = await this.$api.inStoreSettlementPost(params);
				uni.hideLoading();
				if (status == 200) {
					uni.redirectTo({
						url: '/pagesIndex/page/diningroom/stpayofforder/stpayofforder?id=' + data.order_id +
							"&return_type=3"
					})
				}
			},
			//是否微信内部浏览器
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			}
		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.scanning {
		padding: 40rpx 48rpx 40rpx 24rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.scanningx {
		padding: 30rpx 48rpx 30rpx 24rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.saoyisao {
		width: 111rpx;
		height: 112rpx;
	}

	.detai {
		width: 24rpx;
		height: 24rpx;
	}

	radio {
		transform: scale(0.75);
	}

	.submit-box {
		padding: 16rpx 24rpx calc(16rpx + env(safe-area-inset-bottom)) 24rpx;
		width: 100%;
		position: fixed;
		box-sizing: border-box;
		left: 0;
		bottom: 0;
		z-index: 2;
	}

	.submit-box>view {
		height: 96rpx;
		overflow: hidden;
	}

	.btn-l {
		width: 522rpx;
		background: #202020;
		padding-left: 60rpx;
		box-sizing: border-box;
		height: 96rpx;
		border-radius: 48rpx 0 0 48rpx;
	}

	.price {
		line-height: 32rpx;
	}

	.submit {
		width: 180rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 0;
		padding: 0;
		text-align: center;
		border-radius: 0 48rpx 48rpx 0;

	}

	.contentx {
		padding: 48rpx 65rpx 48rpx 65rpx;
	}


	.cancelx {
		width: 210rpx;
		height: 64rpx;
		background: #EFEFEF;
		border-radius: 33rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #101010;
		line-height: 40rpx;
	}

	.nocancelx {
		width: 210rpx;
		height: 64rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 33rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 40rpx;

	}

	.contentx {
		padding: 25rpx;
	}

	.chunk {
		width: 300rpx;
		height: 120rpx;
		border: 1rpx rgba(230, 230, 230, 1) solid;
		border-radius: 8rpx;

	}

	.cover {
		padding: 5rpx 20rpx 5rpx 20rpx;
		border: 1rpx rgba(230, 230, 230, 1) solid;
		border-radius: 8rpx;
	}

	.coverx {
		padding: 5rpx 20rpx 5rpx 20rpx;
		border: 1rpx #FF8C00 solid;
		border-radius: 8rpx;
		background-image: linear-gradient(#fffee3, #fffee3);
		color: #FF8C00;
	}


	.smip {
		width: 300rpx;
		height: 120rpx;
		border: 1rpx #FF8C00 solid;
		border-radius: 8rpx;
		background-image: linear-gradient(#f7f4574f, #f7f4573d);
		color: #FF8C00;
	}
</style>