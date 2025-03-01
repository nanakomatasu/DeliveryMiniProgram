<template>
	<view>
		<u-sticky>
			<view class="bgc-ff padd-0-32 padd-b-20">
				<!-- 搜索框 -->
				<view class="flex-al-c padd-t-20">
					<view class=" m-r-22" style="width: 82%;" @click="goSearch">
						<u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" :clearabled="false">
						</u-search>
					</view>
					<view class="flex-column flex-c-c ww-44" @tap="goLocation">
						<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
						<view class=""><text class="f-22">地图</text></view>
					</view>
					<view class="flex-column flex-c-c ww-44 m-l-40" @click="goOrderlist">
						<image class="wh-32-34" src="@/static/img/ico-dingdan.png" mode=""></image>
						<view class=""><text class="f-22">订单</text></view>
					</view>
					<view class="flex-column flex-c-c ww-44 m-l-40" @click="goOrderlistx">
						<image class="wh-32-34" src="../../static/cart-fixed.png" mode=""></image>
						<view class="" style="width:72rpx;"><text class="f-22">购物车</text></view>
					</view>
				</view>
				<!-- 搜索框结束 -->
			</view>
			<view class="padd-tb20 bgc-f6f6f8">
				<!-- 分类 -->
				<view class="pos-r padd-0-24 bgc-f6f6f8">
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class="flex">
							<view class="food-tab flex-column flex-c-c bor-r-20 m-r-16 pos-r"
								v-for="(item, index) in menuArr" :key="index">
								<view class="" style="height: 112rpx; z-index: 99;" @click="navbg=index">
									<view class="food-tab-img">
										<image :src="item.icon" mode=""></image>
									</view>
									<view class="f-24">{{item.name}}</view>
								</view>
								<image v-if="index==navbg" class="food-tab-bg" src="/static/img/nav-bg.png" mode="">
								</image>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 分类结束 -->
				<!-- 筛选 -->
				<view class="flex-jus-spa w-100 padd-0-24 m-t-20 bgc-f6f6f8">
					<view class="flex-al-c" @click="show = true , index=0">
						<!-- 附近 -->
						<view class="f-28 fw-700 color-20">附近</view>
						<view class="m-l-8">
							<image class="wh-20" src="@/static/img/ico-zhankai-b.png" mode=""></image>
						</view>
					</view>
					<view class="flex-al-c">
						<view class="flex-al-c" @click="show = true , index=1">
							<!-- 智能排序 -->
							<view class="f-28 fw-700 color-20" >智能排序</view>
							<view class="m-l-8">
								<image class="wh-20" src="@/static/img/ico-zhankai-b.png" mode=""></image>
							</view>
						</view>
						<!-- 筛选 -->
						<view class="flex-al-c fw-700 m-l-40" @click="show = true ,index=2">
							<view class="f-28 color-20">筛选</view>
							<view class="m-l-8">
								<image class="wh-20" src="@/static/img/ico-zhankai-b.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<!-- 筛选结束 -->
			</view>
		</u-sticky>
		<storebox :list="shopList"></storebox>

		<view class="flex-center m-t-50" v-if="shopList.length==0">
			<view class="">
				<image class="nulls" :src="`${baseImageUrl}resource/img/null-data.png`" mode=""></image>
				<view class="flex-center">
					暂无数据
				</view>
			</view>
		</view>


		<view class="cart wh-80 bor-r-40 flex-c-c" @tap="goCeshi">
			<view class="digit flex-center" v-if="count!==0">
				{{count||''}}
			</view>
			<image class="wh-48" src="/static/img/gouwuche-nor.png" mode=""></image>
		</view>

		<!-- 筛选弹窗 -->
		<view class="">
			<u-popup :show="show" mode="top" @close="close" @open="open">
				<view class="bgc-ff ">
					<!-- 搜索框 -->
					<view class="flex-al-c padd-t-20 padd-0-32 padd-b-20">
						<view class="w-100 m-r-22" @click="goSearch">
							<u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" :clearabled="false">
							</u-search>
						</view>
						<view class="flex-column flex-c-c ww-44" @tap="goLocation">
							<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
							<view class=""><text class="f-22">地图</text></view>
						</view>
						<view class="flex-column flex-c-c ww-44 m-l-40">
							<image class="wh-32-34" src="@/static/img/ico-dingdan.png" mode=""></image>
							<view class=""><text class="f-22">订单</text></view>
						</view>
					</view>
					<!-- 搜索框结束 -->
					<view class="m-t-20 m-b-15 padd-0-32 padd-b-20">
						<view class="flex-jus-spa w-100 padd-0-24 m-t-20 ">
							<view class="flex-al-c" @tap="screen(0)">
								<!-- 附近 -->
								<view class="f-28 fw-700 " :class="index==0?'c-D9':'color-20'">{{stitle||'附近'}}</view>
								<view class="m-l-8">
									
									<image class="wh-20" v-if="index==0" src="@/static/img/screen-top.png" mode=""></image>
									<image class="wh-20" v-else src="@/static/img/ico-zhankai-b.png" mode=""></image>
									
								</view>
							</view>
							<view class="flex-al-c">
								<view class="flex-al-c" @tap="screen(1)">
									<!-- 智能排序 -->
									<view class="f-28 fw-700 " :class="index==1?'c-D9':'color-20'"> {{zntitle||'智能排序'}}
									</view>
									<view class="m-l-8">
										<image class="wh-20" v-if="index==1" src="@/static/img/screen-top.png" mode=""></image>
										<image class="wh-20" v-else src="@/static/img/ico-zhankai-b.png" mode=""></image>
										
									</view>
								</view>
								<!-- 筛选 -->
								<view class="flex-al-c fw-700 m-l-40" @tap="screen(2)">
									<view class="f-28 " :class="index==2?'c-D9':'color-20'">筛选</view>
									<view class="m-l-8">
										<image class="wh-20" v-if="index==2" src="@/static/img/screen-top.png" mode=""></image>
										<image class="wh-20" v-else src="@/static/img/ico-zhankai-b.png" mode=""></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 附近 -->
					<view class="flex" v-if="index==0">
						<view class="bgc-f7 ">
							<view class="f-28 color-20 flex-c-c txt20" :class="indes==1?'b-fff f-600':''"
								@tap="select(1)">距离</view>
							<view class="f-28 color-20 flex-c-c txt20" :class="indes==2?'b-fff f-600':''"
								@tap="select(2)">商圈</view>
						</view>

						<view class="m-l-15" v-if="indes==1">
							<view class="m-b-48" :class="xindex==index?'c-D9':''"
								v-for="(item,index) in nearbyx[1].data" :key="index" @tap="choice(item,index)">
								{{item.title}}
							</view>
						</view>

						<view class="m-l-15" v-if="indes==2">
							<view class="m-b-48" :class="xindex==index?'c-D9':''"
								v-for="(item,index) in nearbyx[2].data" :key="index" @tap="choice(item,index)">
								{{item.title}}
							</view>
						</view>

					</view>
					<!-- 附近结束 -->
					<!-- 筛选 -->
					<view class="padd-0-32 padd-b-20" v-else-if="index==2">
						<view class="f-24 color-888">人均价格筛选</view>
						<view class="flex-al-c m-t-20 flex-jus-spa ">
							<view class="bgc-f6 ">
								<u-input v-model="start" placeholder="最低价" inputAlign="center" fontSize="24rpx"
									color="#888888">
								</u-input>
							</view>
							<view class="wh-24-2"></view>
							<view class="bgc-f6">
								<u-input v-model="end" placeholder="最高价" inputAlign="center" fontSize="24rpx"
									color="#888888">
								</u-input>
							</view>
						</view>
						<!-- 单选 -->
						<view class="m-t-40" v-for="(item,index) in nearbyx" :key="index"
							v-if="index!=0 && item.is_dx==0">
							<view class="">{{item.title}}</view>
							<view class="flex flex-wrap m-t-20 flex-jus-spa">
								<view class="wh-152-64 flex-c-c bgc-f6 bor-r-8 f-24 m-r-16 m-t-16"
									:class="singl==indexs?'bg-red-d6-ec col-white-ff':''"
									v-for="(items,indexs) in item.data" :key="indexs" @tap="singleelect(items,indexs)">
									{{items.title}}
								</view>
							</view>
						</view>

						<!-- 多选 -->
						<view class="m-t-40" v-for="(item,index) in nearbyx" :key="index"
							v-if="index!=0 && item.is_dx==1 && item.data!=''">
							<view class="">{{item.title}}</view>
							<view class="flex flex-wrap m-t-20 flex-jus-spa">
								<view class="wh-152-64 flex-c-c bgc-f6 bor-r-8 f-24 m-r-16 m-t-16"
									:class="cooperation.indexOf(items.value) != -1?'bg-red-d6-ec col-white-ff':''"
									@click="chanegteConstruction(items,items.title)" v-for="(items,indexs) in item.data"
									:key="indexs">{{items.title}}</view>
							</view>
						</view>

						<!-- 按钮 -->
						<view class="flex-al-c flex-jus-spa m-t-40">
							<view class="pop-btn flex-c-c" @tap="reset">重置</view>
							<view class="pop-btn color-fff flex-c-c bgc-d62e" @tap="confirm">完成</view>
						</view>
					</view>
					<!-- 筛选结束 -->
					<!-- 智能排序 -->
					<view class="m-t-20 padd-0-32 padd-b-20" v-else-if="index==1">
						<view class="m-b-48" v-for="(item,index) in sort" :key="index" @tap="reorder(item,index)">
							<text class="f-28 " :class="znindex==index?'c-D9':'color-20'">{{item.name}}</text>
						</view>
					</view>
					<!-- 智能排序结束 -->
				</view>
			</u-popup>
		</view>
		<!-- 筛选弹窗结束 -->
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				cooperation: [],
				singl: -1,
				zntitle: "",
				znindex: -1,
				stitle: "",
				xindex: -1,
				indes: 1, //赛选的左边的选中状态的值
				count: "",
				shopList: [],
				index: 0,
				keyword: "",
				menuArr: [], //菜单栏
				show: false,
				navbg: 0,
				school: "",
				bgc1: {
					bg1: false,
				},
				nearbyx: [],
				type: "",
				sort: [{
					name: "综合",
					type: 1
				}, {
					name: "距离",
					type: 2
				}, {
					name: "销量",
					type: 3
				}, {
					name: "好评",
					type: 4
				}, {
					name: "高价",
					type: 5
				}, {
					name: "低价",
					type: 6
				}, ],

				pepole: "", //用餐人数

				score: [], //餐厅品质
				store: [], //商家特色

				start: "", //人均价最低
				end: "", //人均价最高

				trade: "", //商圈
				juli: "", //距离
				sortx: "", //智能排序
        baseImageUrl: this.$url

			};
		},

		onShow() {
			this.type = 2
			this.school = uni.getStorageSync('school')
			this.getStorecateIndex()
			this.getMerchantLists()
			this.getCartListsx()
			this.nearby()

		},

		onReachBottom() {
			this.getMerchantLists(true)
		},

		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			goCeshi() {
				// uni.navigateTo({
				// 	url: '/pagesIndex/page/foodIndex/sbuySuccess/sbuySuccess'
				// });


				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacymycart/delicacymycart'
				});


			},
			goSearch() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodSearch/foodSearch'
				})
			},
			goOrderlist() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/orderList/orderList'
				})
			},
			//购物车
			goOrderlistx() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacymycart/delicacymycart'
				})
			},

			goLocation() {
				uni.navigateTo({
					url: '/pagesIndex/page/location/location'
				})
			},

			select(index) {
				this.indes = index
				this.xindex = -1
			},

			//获取商家分类列表
			async getStorecateIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.storecateIndex({
					pid: 4, //外卖固定为1，周边固定为2，优选固定为3
				})
				if (status == 200) {
					if (data.data.length > 0) {
						this.menuArr = data.data
					} else {
						this.menuArr = []
					}
				}
			},

			//获取商家列表
			async getMerchantLists(isPage) {
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
				} = await that.$api.merchantLists({
					school_id: this.school.id, //学校id
					// name: this.screen.keyword, //外卖固定为1，周边固定为2，优选固定为3
					category: 4, //商家分类id
					page: this.page,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',

					per_capita_order_price_start: this.start || '', //人均价最低
					per_capita_order_price_end: this.end || '', //人均价最高
					store_labels: this.store.toString(',') || '', //商家特色
					score: this.score.toString(',') || '', //餐厅品质
					sort: this.sortx || '', //1综合，2距离，3销量
					pepole_num: this.pepole || '',
					juli: this.juli || '',
					trade_area: this.trade || '',
				})
				uni.hideLoading()
				if (status == 200) {
					// console.log(data.list)
					shopList = shopList.concat(data.list)
					that.shopList = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false

				}
			},

			//获取订单列表
			async getCartListsx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.delicacycartlist({})
				if (status == 200) {
					that.count = data.count
				}
			},


			screen(index) {
				this.index = index

				if (index == 2) {
					this.type = 2

				} else {
					this.type = 1
				}
				this.nearby()

			},

			//筛选的附近
			async nearby() {
				let that = this
				const {
					data,
					status
				} = await that.$api.selection({
					category: 4,
					type: this.type,
					school_id: this.school.id,
				})
				if (status == 200) {
					this.nearbyx = data
				}
			},

			//筛选附近的右边选择
			choice(item, index) {
				this.xindex = index
				this.stitle = item.title


				if (index == 1) {
					this.juli = item.value
					console.log(item.value)
				} else {
					this.trade = item.value
					console.log(item.value)
				}



			},

			//智能排序选择
			reorder(item, index) {
				this.znindex = index
				this.zntitle = item.name + '排序'
				this.sortx = item.type

			},


			//筛选单选择
			singleelect(items, indexs) {
				this.singl = indexs
				console.log(items, indexs)

				this.pepole = items.value

			},
			//筛选多选择
			chanegteConstruction(item, title) {
				let that = this;
				if (this.cooperation.indexOf(item.value) != -1) { //如果当前点击的建设领域已经选择  就取消选择
					var index = this.cooperation.indexOf(item.value)
					this.cooperation.splice(index, 1)
					var indexx = this.score.indexOf(item.value)
					this.score.splice(indexx, 1)
					var indexxr = this.store.indexOf(item.value)
					this.store.splice(indexxr, 1)
				} else {
					//如果不存在就添加进去列表
					this.cooperation.push(item.value)
					if (item.name == 'score') {
						this.score.push(item.value)
					} else if (item.name == 'store_labels') {
						this.store.push(item.value)
					}
				}
			},


			//赛选确认
			confirm() {
				this.getMerchantLists()
				this.show = false
			},

			//重置
			reset() {
				this.pepole = ''
				this.score = []
				this.store = []
				this.start = ''
				this.end = ''
				this.trade = ''
				this.juli = ''
				this.sortx = ''
				this.cooperation = []
				this.singl = -1
				this.xindex = -1
				this.stitle = ''
				this.znindex = -1
				this.zntitle = ''

				this.getMerchantLists()
			},



		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f6f6f8;
		padding-bottom: 80rpx;
	}

	.bg1 {
		background-color: #000;
		background-image: url('@/static/img/nav-bg.png');
	}

	.bgc-f6f6f8 {
		background-color: #f6f6f8;
	}

	.food-tab {
		box-sizing: border-box;
		padding: 6rpx 24rpx 10rpx 24rpx;
		width: 136rpx;
		height: 122rpx;
		// background-color: #a321ff;
	}

	.food-tab-img image {
		width: 88rpx;
		height: 64rpx;
	}

	// .food-tab-bg {
	// 	width: 136rpx;
	// 	height: 122rpx;

	// }
	.food-tab-bg {
		width: 136rpx;
		height: 122rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.food-tab-fenlei {
		position: absolute;
		top: 0;
		right: 0;
		width: 88rpx;
		height: 132rpx;
		/* box-sizing: border-box; */
		/* padding: 8rpx 24rpx 20rpx 24rpx; */
		background-color: #f6f6f8;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		// width: 638rpx;
	}

	.cart {
		position: fixed;
		bottom: 100rpx;
		right: 30rpx;
		background-color: #fff;
	}

	.wh-24-2 {
		width: 24rpx;
		height: 2rpx;
		background-color: #c3c3c3;
	}

	.uni-input {
		border-radius: 8rpx;
		width: 316rpx;
		height: 24rpx;
		background-color: #aaaa7f;
	}

	.pop-btn {
		width: 332rpx;
		height: 80rpx;
		background-color: #eaeaea;
		border-radius: 8rpx;
	}

	.bgc-d62e {
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
	}

	.nulls {
		width: 300rpx;
		height: 300rpx;
	}

	.digit {
		width: 40rpx;
		height: 40rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 14px;
		border: 1px solid #FFFFFF;
		position: absolute;
		top: -22rpx;
		right: -8rpx;
		color: #ffffff;
	}

	.txt20 {
		width: 176rpx;
		height: 100rpx;
	}
</style>
