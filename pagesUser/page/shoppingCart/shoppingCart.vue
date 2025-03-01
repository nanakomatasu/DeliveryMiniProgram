<template>
	<view class="">
		<!-- 选择地址 -->
		<!-- <Publicsiteselection @getopenLocationtwo='getopenLocationtwo' :location="location"
			v-if="shopcartlist.length!=0">
		</Publicsiteselection> -->
		<!-- 购物车商品 -->
		<view class="m-lr-20">
			<view class=" shoppingCartlist" >
				<view class="" v-if="shopcartlist.length>0">
					<uni-swipe-action>
						<uni-swipe-action-item :right-options="options" @click="onClick($event,item)"
							v-for="(item,index) in shopcartlist" :key="index">
							<view class="m-b-20">
								<view class="dis-flex  ">
									<checkbox-group @change="checkboxGroupChange($event,item)">
										<checkbox :checked="item.checked" :name="item.name" shape="circle"
											active-color="#5FC484" class="goodsList" />
									</checkbox-group>
									<view class="m-l-20 ">
										<view class="f-32 m-b-20 f600 c20 dis-flex  flex-y-center">
											柳州好欢螺旗舰店
											<image src="/static/img/ico_gengduo.png" class="wid28 " mode=""></image>
										</view>
										<view class="dis-flex flex-x-between flex-y-start">
											<view class=" dis-flex flex-wrap  ">
												<u-tag text="30减15" type="error" v-for="(item,index1) in 6" :key="index1" borderColor="#DD343C" color="#DD343C" plain="true" size="size" class="m-r-8"></u-tag>
											</view>
											<image src="/static/img/ico_gengduo.png" class="wid28 m-t-8" mode=""></image>
										</view>
									</view>
								</view>
								
							</view>
							<view class="dis-flex  m-b-40 ">
								<view class="dis-flex flex-x-center flex-y-center">
									<checkbox-group @change="checkboxGroupChange($event,item)">
										<checkbox :checked="item.checked" :name="item.name" shape="circle"
											active-color="#5FC484" class="goodsList" />
									</checkbox-group>
									<!-- 		
									<u-checkbox-group>
										<u-checkbox @change="checkboxGroupChange($event,item)" 
											:checked="item.checked" :name="item.name" shape="circle" active-color="#5FC484"
											class="goodsList">
										</u-checkbox>
									</u-checkbox-group> -->
								</view>
								<image :src="item.goods_image" mode="" class="shopcartimg"></image>
								<view class="dis-flex flex-x-between  flex-dir-column flex1 ">
									<view class="f-28 f600 onelist-hidden">
										{{item.goods_name}}
									</view>
									<view class="dis-flex m-tb-10">
										<!-- <image src="/static/image/index-label02.png" mode="" class="ziying"> -->
										</image>
										<image v-if="item.is_tj==1" src="/static/image/index-label01.png" mode=""
											class="ziying">
										</image>
									</view>
									<view class="m-b-10 color-8E8F8E f-24 onelist-hidden">
										{{item.goods_sku.goods_attr}}
									</view>
									<view class="dis-flex flex-x-between  ">
										<view class="dis-flex flex-y-end flex-x-between line44 total">
											<view class="f-36 dis-flex flex-y-end cd93 f-b" v-if="item.is_user_grade">
												¥{{ item.grade_goods_price }}
											</view>
											<view class=" dis-flex flex-y-end cd93 f-36 f-b" v-else>
												<text class="f-24 cd93">券后</text>¥{{ item.goods_price }}
											</view>
											<view class="line-through onelist-hidden c88 m-b-3">
												¥{{ item.goods_price }}
											</view>
										</view>
										<view class="w-35">
											<view class="dis-flex flex-y-center flex-x-center ">
												<view class=" fonttwo dis-flex flex-y-center flex-x-center "
													:class="item.total_num==1?'col-gray-9f':''"
													@click="changnum('del',index,item,$event)">
													-
												</view>
												<input type="number" value="" v-model="item.total_num" disabled="true"
													class="shownumbor   dis-flex flex-y-center flex-x-center t-c" />
												<view class=" fonttwo dis-flex flex-y-center flex-x-center"
													@click="changnum('add',index,item,$event)">
													+
												</view>
											</view>
										</view>
									</view>
								</view>

							</view>

						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
				<view class="" v-else>
					<view class="yoshop-notcont2">
						<image src="/static/image/zanwu.png" mode="" class="wid452"></image>
						<view class="cont t-c">亲，购物车还没有商品哦</view>
						<view class="flow-btn-min" @click="topages">去购物</view>
					</view>
				</view>
			</view>
			<!-- <view class="" v-else>
				<view class="yoshop-notcont2">
					<image src="/static/image/zanwu.png" mode="" class="wid452"></image>
					<view class="cont t-c">亲，购物车还没有商品哦</view>
					<view class="flow-btn-min" @click="topages">去购物</view>
				</view>

			</view> -->

			<block v-if="shopcartsalelist.length>0">
				<!-- 会员推荐 -->
				<view class="viprecommend m-t-40 m-b-16">
					会员推荐
				</view>
				<view class="">
					<view class="dis-flex flex-x-between wrap">
						<view v-for="(item,index) in shopcartsalelist" :key="index" @tap="toProductDetails(item,0,0)"
							class="vipre m-b-20">
							<image :src="item.goods_image" mode="" class="imglist"></image>
							<view class="recontent ">
								<view class="retitle  onelist-hidden m-tb-10">
									{{item.goods_name}}
								</view>
								<view class="">
									<image src="/static/image/index-label02.png" mode="" class="ziying"></image>

									<image src="/static/image/index-label01.png" mode="" class="ziying"
										v-if="item.is_tj==1"></image>
								</view>
								<view class="dis-flex flex-x-between flex-y-center widbottomtwo">
									<view class=" dis-flex flex-y-end cd93  f-36 f-b m-r-5">
										<text class="f-24 cd93 m-r-5">券后</text>
										<text class=" cd93 m-r-5 line16">¥{{ item.goods_price }}</text>
										<text class="line-through f-24 onelist-hidden c88 m-b-3">
											¥{{ item.goods_price }}
										</text>
									</view>

									<image src="/static/image/index-add.png" mode="" class="tianjia"
										@tap.stop="toProductDetails(item,0,1)"> </image>
								</view>
							</view>
						</view>

					</view>
					<u-loadmore :status="status" />
				</view>
			</block>
		</view>





		<!-- 底部跳转 -->
		<view class="shopsettlement dis-flex flex-y-center flex-x-between" v-if="shopcartlist.length!=0">
			<view class="dis-flex flex-y-center flex-x-between">
				<view class="dis-flex flex-y-center flex-x-between">
					<!-- <u-checkbox-group>
						<u-checkbox @change="checkedAllGoods" v-model="checkedAll"  shape="circle"
							active-color="#5FC484">
						</u-checkbox>
					</u-checkbox-group> -->

					<!-- <checkbox-group @change="checkedAllGoods">
						<checkbox :checked="checkedAll" shape="circle" active-color="#5FC484"></checkbox>
					</checkbox-group> -->
					<view class="quanxuan">
						已选2款
					</view>
				</view>

				
			</view>
			<view class="dis-flex flex-y-center">
				<view class="dis-flex flex-y-center m-r-20  total">
					<view class="totaltetx m-r-10">
						合计:
					</view>
					<view class="f-28 f-b cd93">
						¥
					</view>
					<view class="f-36 cd93 f-b  onelist-hidden ">
						<!-- 111 -->
						{{totalPrice}}
					</view>
				</view>
				<view class="btn" @click="toorder">
					<!-- 去结算({{totalPricelength}}) -->
					提交订单
				</view>
			</view>






		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nomore: false,
				totalPricelength: 0,
				totalPrice: 0,
				// showtoken:false,
				showtoken: false,
				pageSize: 10,
				pageNum: 1,
				status: 'loadmore',
				shopcartsalelist: [],
				location: '',
				goodsList: [{
					checked: false
				}, {
					checked: false
				}],

				value: 'cb',
				sellectList: [], //选中的数据
				checkedAll: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				// 购物车列表
				shopcartlist: [{
					goods_sku:{
						goods_attr:'黑色经典(原味)'
					},
					total_num:1,
					checked:true,
					goods_price:"39.8",
					goods_image:"https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					grade_goods_price:'39.8',
					goods_name:"好欢螺螺好欢螺螺狮粉好",
					
				},{
					goods_sku:{
						goods_attr:'黑色经典(原味)'
					},
					total_num:1,
					checked:true,
					goods_price:"39.8",
					goods_image:"https://paimgcdn.baidu.com/DB571A713527AA44?src=http%3A%2F%2Fms.bdimg.com%2Fdsp-image%2F12771557197.jpg&rz=urar_2_968_600&v=0",
					grade_goods_price:'39.8',
					goods_name:"好欢螺螺狮粉12包装",
					
				}]
			}
		},
		// 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
		onShow() {
			const chooseLocation = requirePlugin('chooseLocation');
			const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null

			if (location) {

				this.location = location.address
				console.log(this.location);
			} else {
				this.getgoodslists()
			}

		},
		onUnload() {
			// 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
			const chooseLocation = requirePlugin('chooseLocation');
			chooseLocation.setLocation(null);
			// this.address=''
		},
		onLoad() {

		},
		onShow() {
			/* 	this.sellectList=[]
				this.checkedAll=false */
		/*    this.sellectList=[]
			this.checkedAll=false
			
			const token = uni.getStorageSync('token')
			if (token) {
				this.showtoken = true
				this.shopcartsalelist = []
				this.pageNum = 1
				this.getcartlists()
				this.getgoodslists()

			} else {
				this.showtoken = true
				this.shopcartsalelist = []
				this.pageNum = 1

				this.getgoodslists()
			}
		
				this.totalPricelength=0
				this.totalPrice=0 */
		},
		//计算总价
		computed: {


		},
		// 底部下拉加载
		onReachBottom() {
			if (this.nomore) {
				console.log(111);
				// uni.$u.toast("没有更多数据了")
			} else {
				this.pageNum += 1
				this.status = 'loading'
				this.getgoodslists()
			}


		},
		watch: {
			
			
		},
		methods: {
			NEWshopcartlist(newval, old) {
				let totalPrice = 0
				let totalPricelength = 0
				this.sellectList=[]
				this.shopcartlist.map(item => {
					if (item.checked == true) this.sellectList.push(item)
					if (this.sellectList.length == this.shopcartlist.length) {
						this.checkedAll = true						
					} else {
						this.checkedAll = false
					}
					if(item.checked==true){
						totalPricelength += item.total_num
						totalPrice += item.total_num * item.goods_price						
					}
				})
				console.log(this.sellectList,"sellectList");
				this.totalPrice = totalPrice
				this.totalPricelength = totalPricelength			
			},
			//跳转会员推荐详情
			toProductDetails(item, isAct, showSpec) {
				var id = item.goods_id
				uni.navigateTo({
					url: "/pagesIndex/pages/productDetails/productDetails?id=" + id + '&isAct=' + isAct +
						'&showSpec=' + showSpec
				})
			},
			//计算总价
			gettotalPrice() {
				let totalPrice = 0
				this.shopcartlist.map(item => {
					console.log(item.checked);
					// totalPrice += item.total_num * item.goods_price
					item.checked ? totalPrice += item.total_num * item.goods_price : totalPrice += 0
				})
				console.log(totalPrice);
				this.totalPrice = totalPrice
			},
			topages() {
				console.log(666);
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 增加购物车商品
			async getcartadd(params) {
				const res = await this.$api.addcart(params)
				// this.getcartlists()
			},

			// 减少购物车商品数量接口
			async getcartsub(params) {
				const res = await this.$api.cartsub(params)
				// this.getcartlists()
			},
			// 购物车结算接口
			async getordercart() {
				const token = uni.getStorageSync('token')
				const res = await this.$api.ordercart({
					token: token,
				})
				console.log(2222);
				console.log(res);
			},
			// 获取商品列表接口
			async getgoodslists() {
				const res = await this.$api.goodsLists({
					is_home: 1,
					listRows: this.pageSize,
					page: this.pageNum
				})
				if (this.pageNum >= res.data.list.last_page) {
					this.nomore = true

					setTimeout(() => {

						this.status = 'nomore'
					}, 300)
				}

				this.shopcartsalelist = [...this.shopcartsalelist, ...res.data.list.data]
			},
			// 获取购物车列表
			async getcartlists() {
				uni.showLoading({
					title: "正在加载"
				})
				const token = uni.getStorageSync('token')

				const res = await this.$api.cartlists({
					token: token,
				})
				uni.hideLoading()
				console.log(res);
				this.sellectList=[]
				this.checkedAll=false
					this.totalPricelength=0
					this.totalPrice=0
					this.$forceUpdate()
				this.shopcartlist = res.data.goods_list
				this.location = res.data.address.detail
				// console.log(res.data.address.district);
				
				this.changechecked()
				this.gettotalPrice()
				
			},
			inArray(search, array) {
				for (var i in array) {
					if (array[i].goods_id == search) {
						return true;
					}
				}
				return false;
			},
			changechecked() {
				const that = this
				this.shopcartlist.forEach(item => {
					item.checked = that.inArray(item.goods_id, this.sellectList)

				});
			},
			// 删除购物车商品
			async deletecart(id) {
				const res = await this.$api.deletecart({
					goods_sku_id: id,
					// goods_sku_id: id,
				})
			// this.NEWshopcartlist()
				this.getcartlists()
				
			},
			getopenLocationtwo() {
				const key = '4CMBZ-5OCRU-A3TVG-47P5H-NAXCQ-BCBSM'; //使用在腾讯位置服务申请的key
				const referer = '222'; //调用插件的app的名称
				const location = JSON.stringify({
					latitude: 39.89631551,
					longitude: 116.323459711
				});
				const category = '生活服务,娱乐休闲';

				wx.navigateTo({
					url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' +
						location + '&category=' + category
				});
			},
			getopenLocation() {
				const that = this
				uni.chooseLocation({
					success: function(res) {
						that.form.location = res.address
						console.log(res);
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			// 删除
			onClick(e, item) {
				console.log(e);
				console.log(item.goods_sku_id);
				console.log(item);
				// console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
				const id = item.goods_id + "_" + item.goods_sku_id
				const that = this
				uni.showModal({
					title: '提示',
					content: '是否删除该商品',
					success: function(res) {
						if (res.confirm) {
							item.checked=false
							
							console.log('用户点击确定');
							that.deletecart(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			toorder() {
				if (this.sellectList.length == 0) {
					uni.showToast({
						title: '客官你还没有选择商品',
						icon: "none"
					});
				} else {
					var cart_ids = []
					this.sellectList.forEach(item => {
						cart_ids.push(`${item.goods_id}_${item.goods_sku_id}`);
					})
					uni.navigateTo({
						url: "/pages/shoppingCart/Confirmorder?order_type=1" + '&cart_ids=' + cart_ids
					})
				}

			},
			changnum(type, index, item, e) {
				if (type == 'del' && item.total_num == 1) {
					return
				}
				const params = {
					goods_id: item.goods_id,
					goods_sku_id: item.goods_sku_id,
				}
				const addparams = {
					goods_id: item.goods_id,
					goods_sku_id: item.goods_sku_id,
					goods_num: 1
				}
				if (type == 'add') {
					item.checked = true
					item.total_num += 1
					this.NEWshopcartlist(item)
					console.log(this.shopcartlist,"shopcartlist;");
					/* if (this.sellectList.length == 0) {
						this.sellectList.push(item)
					} else {
						this.sellectList.forEach((item1, index1) => {
							console.log(item1);
							if (item1.goods_id == item.goods_id) {
								item1.total_num += 1
							} else {
								this.sellectList.push(item)
							}
						})
					} */

					this.getcartadd(addparams)
				} else {
					item.total_num -= 1
					this.NEWshopcartlist()
					this.getcartsub(params)
				}
			},

			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e, item) {
				item.checked = !item.checked
				// this.totalPrice()
				this.gettotalPrice()
				console.log("checked值" + item.checked);
				/* if (!item.checked) {
					this.checkedAll = false
				} else {
					// 判断每一个商品是否是被选择的状态
					const cartList = this.shopcartlist.every(item => {
						return item.checked === true
					})
					if (cartList) {
						this.checkedAll = true
					} else {
						this.checkedAll = false
					}
				} */
				this.sellectList = []
				this.shopcartlist.map(res => {
					if (res.checked == true) this.sellectList.push(res)
					if (this.sellectList.length == this.shopcartlist.length) {
						this.checkedAll = true
						console.log(this.checkedAll);
					} else {
						this.checkedAll = false
					}

				})
				console.log(this.sellectList);

				let totalPricelength = 0
				this.sellectList.forEach((item, index) => {
					console.log(item, "this.sellectList");
					totalPricelength += item.total_num
				})
				this.totalPricelength = totalPricelength
			},

			// 全选
			checkedAllGoods() {

				console.log(9999);
				this.checkedAll = !this.checkedAll
				this.sellectList = []
				if (this.checkedAll) {
					this.shopcartlist.map(item => {
						item.checked = true
						this.sellectList.push(item)
					})
				} else {
					this.shopcartlist.map(item => {
						item.checked = false
					})
				}
				this.gettotalPrice()
				// this.shopcartlist.map(val => {
				// 	val.checked = !this.checkedAll;
				// })
				// this.$forceUpdate();
				console.log(this.sellectList.length);
				let totalPricelength = 0
				this.sellectList.forEach((item, index) => {
					console.log(item, "this.sellectList");
					totalPricelength += item.total_num
				})
				this.totalPricelength = totalPricelength
				// this.totalPricelength = this.sellectList.length
			}

		}
	}
</script>

<style lang="scss">
	.line16{
		line-height: 34rpx;
	}
	
	.wid452 {
		width: 452rpx;
	}

	.uni-swipe_button {
		margin-left: 20rpx;
		height: 184rpx;
	}

	.tianjia {
		width: 48rpx;
		height: 48rpx;
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
			width: 344rpx;
			height: 344rpx;
		}

		.recontent {
			width: 346rpx;
			/* height: 182rpx; */
			background: #FEFFFE;
			border-radius: 0px 0px 16rpx 16rpx;
			box-sizing: border-box;
			padding: 20rpx;
		}

	}



	.widbottom {
		width: 380rpx;
	}

	.widbottomtwo {
		width: 300rpx;
	}

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
			height: 48rpx;
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
		margin:20rpx 20rpx ;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 32rpx 34rpx 32rpx 24rpx;

		
	}
	::v-deep .u-tag__text--error--plain {
    padding: 1px 2px;
}
	.shopcartimg {
		margin: 0 24rpx 0 16rpx;
		width: 184rpx !important;
		height: 184rpx !important;
	}
</style>
