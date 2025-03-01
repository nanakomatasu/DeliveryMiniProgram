<template>
	<view class="">
		<view class="bgc-ff padd-0-32 padd-b-30">
			<!-- 搜索框 -->
			<view class="flex-al-c padd-t-20">
				<view class="w-100 m-r-22">
					<u-search placeholder="请输入学校名称" v-model="keyword" :showAction="false" @search='search'></u-search>
				</view>
				<view class="">
					<!-- <view class="flex-column flex-c-c ww-44" @tap="openmap">
						<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
						<view class=""><text class="f-22">地图</text></view>
					</view> -->

					<view class="" style="width: 150rpx;" @tap="chooseLocation">
						手动定位
						<!-- 	<uni-section title="本地数据" type="line" padding style="height: calc(100vh - 100px);">
							<uni-data-picker placeholder="手动定位" popup-title="请选择所在地区" :localdata="items"
								v-model="classes" @change="onchange" @nodeclick="onnodeclick"
								@popupopened="onpopupopened" @popupclosed="onpopupclosed">
							</uni-data-picker>
						</uni-section> -->
					</view>


				</view>

			</view>
			<!-- 搜索框结束 -->
			<!-- 定位栏 -->
			<view class="flex-al-c flex-jus-spa m-t-46">
				<view class="flex-al-c">
					<view class="wh-40 flex-c-c m-r-6">
						<image class="wh-28" src="/static/img/ico-xian-dingwei.png" mode=""></image>
					</view>
					<view class="h-40 flex-c-c"><text>{{ schoolName}}</text></view>
				</view>
				<!-- <view class="flex-al-c" @click="show = true"> -->
				<view class="flex-al-c" @click="getLocationAddress">
					<view class="h-40 flex-c-c m-r-8">
						<image class="wh-28" src="/static/img/ico_dingwei.png" mode=""></image>
					</view>
					<view class="h-40 flex-c-c"><text class="color-D93038 f-28">重新定位</text></view>
				</view>
			</view>
			<!-- 定位栏结束	 -->
		</view>
		<view class="location"></view>
		<!-- 附近学校 -->
		<view class="shool-box bg-white-ff m-t-20">
			<view class="flex-al-c m-b-20">
				<view class="wh-8-32 m-r-20"></view>
				<view class="h-32"><text class="f-32 color-20 fw-700">附近的学校</text></view>
			</view>
			<view class="school border-b-f7" v-for="(item, index) in shopListx" :key="index" @tap="chooseSchool(item)">
				{{item.school_name}}
			</view>
		</view>
		<!-- 附近学校结束 -->
		<u-modal :show="show" title="提示" content='您所选校区与当前校区不一样是否更换' :showCancelButton="true" width="500rpx"
			@confirm="confirm" @cancel="show=false">
		</u-modal>



	</view>
</template>

<script>
	export default {

		data() {
			return {
				classes: "",
				keyword: "",
				show: false,
				items: [],
				city: "",
				province: "",
				page: 1,
				status: "loadmore",
				shopListx: [],
				schoolName: '',
				values: {},
				lat: 0,
				lng: 0,
				school: {},
				area: "",
				detail: [],
				addTips: false,
				add_type: 1
			};
		},
		onReachBottom() {
			this.getMerchantLists(true)
		},
		onLoad() {
			this.lat = uni.getStorageSync('lat');
			this.lng = uni.getStorageSync('lng');
			if (this.lat == 0 || !this.lat) {
				uni.getLocation({
					// #ifdef H5
					type: 'gcj02',
					altitude: true,
					// #endif
					success: (res) => {
						console.log(res)
						this.lat = res.latitude;
						this.lng = res.longitude;
					},
					fail: error => {
						console.log(error)
					}
				});
			}

		},
		onShow() {
			var that = this
			this.values = uni.getStorageSync('school');

			console.log('---------------------------------', uni.getStorageSync('addTips'));
			console.log(this.values)
			// uni.$on('onAddressChange', (res) => {
			// 	uni.setStorageSync('lat', res.latlng.lat)
			// 	uni.setStorageSync('lng', res.latlng.lng)

			// })
			this.$nextTick(function() {
				that.getMerchantLists()
			})
			this.getSchoolGetListx()








		},

		methods: {
			chooseLocation() {
				uni.chooseLocation({
					success: res => {
						this.locationAddress = res.address;
						console.log(res);
						this.lat = res.latitude;
						this.lng = res.longitude;
						uni.setStorageSync("lat", this.lat);
						uni.setStorageSync("lng", this.lng);
						this.getMerchantLists()
					},
					fail: error => {
						console.log(error)
					}
				})
			},

			handelShowDialog() {
				this.showDialog = true;

				console.log("11")
			},

			doConfirmCategorys(items) {
				let arr = [];
				for (let i = 0; i < items.length; i++) {
					arr.push(items[i].label);
				}
				this.selectedItemsStr = arr.join(',');
			},


			// onnodeclick(node) {
			// 	let _this = this
			// 	// console.log(node)

			// 	// this.province = this.detail[0].value.text
			// 	// this.city = this.detail.value[1].text
			// 	// this.area = this.detail.value[2].text


			// 	this.detail.forEach((item,index)=>{
			// 		this.province = this.detail[0].value
			// 		this.city = this.detail[1].value
			// 		this.area = this.detail[2].value
			// 		this.getMerchantLists()
			// 	})

			// 	console.log(this.province)
			// 	console.log(this.city)
			// 	console.log(this.area)



			// 	// this.items.forEach((item, index) => {
			// 	// 	if (node.value == item.value) {
			// 	// 		console.log(item)
			// 	// 		this.province = item.label
			// 	// 	}
			// 	// 	this.items[index].children.forEach((itmx, indr) => {
			// 	// 		if (node.value == itmx.value) {
			// 	// 			console.log(itmx)
			// 	// 			this.city = itmx.label
			// 	// 		}
			// 	// 	})
			// 	// })


			// },

			onnodeclick() {
				this.detail.forEach((item, index) => {
					this.province = this.detail[0].value
					this.city = this.detail[1].value
					this.area = this.detail[2].value
					this.getMerchantLists(true)
				})
			},



			async getMerchantLists(isPage) {
				console.log("aaaaaaa")

				if (this.isLoad) {
					return
				}
				this.isLoad = true
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.shopList = []
					this.status = 'loadmore'
				}
				var shopList = this.shopList;
				const {
					data,
					status
				} = await that.$api.schoolGetList({
					school_name: that.keyword,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
					province: this.province || '',
					city: this.city || '',
					area: this.area || '',
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopListx = shopList
					// console.log(that.shopListx, "that.shopListthat.shopListthat.shopList")
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
					that.schoolName = shopList[0].school_name
				}
			},

			search() {
				this.getMerchantLists()
			},

			//切换学校
			chooseSchool(item) {
				if (item.school_name == this.values.school_name) {
					uni.navigateBack();
				} else {
					this.school = item;
					this.show = true
					this.addTips = uni.getStorageSync('addTips')
					uni.setStorageSync('add_type', this.add_type)
					// this.add_type = uni.getStorageSync('add_type')
					console.log(this.add_type, '123123');
				}
				// console.log(item)
			},
			//弹出框确定
			confirm() {
				console.log('确定')
				uni.setStorageSync('school', this.school);
				uni.setStorageSync('lng', this.school.lng);
				uni.setStorageSync('lat', this.school.lat);
				uni.navigateBack();
			},
			//地图选位置
			openmap() {
				console.log('获取定位')
				//选择地图位置
				if (this.lat == 0) {
					uni.showModal({
						title: '提示',
						content: '无定位信息，请点击重新定位'
					})
					return
				}
				uni.chooseLocation({
					latitude: this.lat,
					longitude: this.lng,
					success: res => {
						this.locationAddress = res.address;
						console.log(res);
						this.lat = res.latitude;
						this.lng = res.longitude;
						uni.setStorageSync("lat", this.lat);
						uni.setStorageSync("lng", this.lng);
					},
					fail: error => {
						console.log(error)
					}
				})
				//跳转webview地图
				// uni.navigateTo({
				// 	url: '/pages/map/map'
				// });
			},

			//获取定位
			getLocationAddress() {
				let that = this
				uni.getLocation({
					// #ifdef H5
					type: 'gcj02',
					altitude: true,
					// #endif
					highAccuracyExpireTime: 100,
					success: (res) => {
						//获取获取 
						console.log(res, "res")
						that.lat = res.latitude;
						that.lng = res.longitude;
						uni.setStorageSync('lng', res.longitude);
						uni.setStorageSync('lat', res.latitude);
						that.getMerchantLists()
					},
				});
				uni.setStorageSync('school', that.shopListx[0]);
				uni.setStorageSync('lng', that.shopListx[0].lng);
				uni.setStorageSync('lat', that.shopListx[0].lat);
			},


			async getSchoolGetListx() {
				var that = this
				const {
					data,
					status
				} = await that.$api.AreaInfo({
					type: '3',
				})
				if (status == 200) {
					this.items = data
          if (!this.items) return
					this.items.forEach((item, index) => {
						this.items[index].text = item.label
						this.items[index].children[0].aaa = item.label
						if (this.items[index].children[0].aaa == "北京市") {
							this.items[index].children[0].bj = 1
						}
						if (this.items[index].children[0].aaa == "天津市") {
							this.items[index].children[0].tj = 2
						}
						if (this.items[index].children[0].aaa == "上海市") {
							this.items[index].children[0].sh = 3
						}
						if (this.items[index].children[0].aaa == "重庆市") {
							this.items[index].children[0].cq = 4
						}

						this.items[index].children.forEach((itmx, indr) => {
							this.items[index].children[indr].text = itmx.label
							this.items[index].children[indr].children.forEach((itmc, indc) => {
								// console.log(itmc)
								if (itmx.aaa) {
									// console.log(itmx.aaa)
									// if(itmx.bj ==1){
									// 			this.items[index].children[indr].children[indc].text = itmc
									// 				.label
									// }
									// if (itmx.tj == 2) {
									// 	this.items[index].children[indr].children[indc].text =
									// 		itmc
									// 		.label
									// }
									// if(itmx.sh ==3){
									// 			this.items[index].children[indr].children[indc].text = itmc
									// 				.label
									// }
									// if(itmx.cq ==4){
									// 			this.items[index].children[indr].children[indc].text = itmc
									// 				.label
									// }
								}

								// if (this.items[index].children[0].aaa != "北京市") {

								// 	this.items[index].children[indr].children[indc].text = itmc
								// 					.label
								// }
								// if (this.items[index].children[0].aaa != "天津市") {

								// 	this.items[index].children[indr].children[indc].text = itmc
								// 					.label
								// }
								// if (this.items[index].children[0].aaa != "上海市") {

								// this.items[index].children[indr].children[indc].text = itmc
								// 				.label
								// }
								// if (this.items[index].children[0].aaa != "重庆市") {
								// 	this.items[index].children[indr].children[indc].text = itmc
								// 					.label
								// }


								this.items[index].children[indr].children[indc].text = itmc
									.label

								this.items[index].children[indr].children[indc].childrenx =
									that.shopListx


							})

						})

					})



					console.log(this.items)
				}
			},

			onpopupopened(e) {
				// console.log('popupopened',e);
			},
			onpopupclosed(e) {

				// console.log('popupclosed',e);
			},
			onchange(e) {
				this.detail = e.detail.value || ''
			}

		},
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.location {
		height: 20rpx;
		background: #f6f6f6;
	}

	.ww-44 {
		width: 64rpx;
	}

	.wh-8-32 {
		width: 8rpx;
		height: 32rpx;
		background: linear-gradient(313deg, #d62e36 0%, #ec434b 100%);
		border-radius: 4rpx;
	}

	.shool-box {
		padding: 24rpx 32rpx;
	}

	.school {
		// padding-left:28rpx ;
		margin-left: 28rpx;
		box-sizing: border-box;
		height: 104rpx;
		line-height: 104rpx;
	}

	.school:last-child {
		border: none;
	}

	.h-88 {
		height: 88rpx;
	}

	.choose-box {
		box-sizing: border-box;
		padding: 40rpx 0rpx 100rpx 0rpx;
		background-color: coral;
	}

	.choose-main {
		padding-top: 8rpx;
		// padding-left: 40rpx;
		box-sizing: border-box;
	}

	.choose-yincang {
		color: transparent;
	}

	.scroll-Y {
		height: 600rpx;
	}

	.xrs {
		width: 100rpx;
		// background-color: red;
	}




	.counter-warp {
		font-size: 16px;
	}

	.label {
		margin: 10px;
	}

	button {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 4px;
		cursor: pointer;
		border: 1px solid #1989fa;
		padding: 0 15px;
		font-size: 16px;
		background: #1989fa;
		color: #ffffff;
		margin: 10px;
		margin-top: 0;


	}
</style>