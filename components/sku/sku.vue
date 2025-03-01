<template>
	<view :catchtouchmove="true">
		<u-popup :show="skuShow" bgColor="transparent" mode="center">
			<view class="win dis-flex flex-y-center flex-x-center flex-dir-column">
				<view class="win-box bg-white-ff radio-30">
					<view class="f-32 col-brank-20 f-b mb24 pl40 box-size ">{{specsObject.name}}</view>

					<scroll-view class="pl30 box-size sku-scroll mb34 pr30" scroll-y="true"
						v-if="specsObject.specs.length>0">
						<view class="mb24">
							<view class="col-gray-88 ml10 f-24 mb16">规格一</view>
							<view class="dis-flex flex-y-center flex-wrap">

								<!-- <view class="radio-8 mb16  t-c f-24  sku-item " @tap="smipx(1)"
									:class="spescIndex==1?'col-red-d9 border-d9':'bg-gray-f6  border-f6'">
									<view class="flex">
										<view class="onelist-hidden">
											默认
										</view>
										 <text class="ml10 mr10">|</text>
										<view class="">
											{{ specsObject.price}}
										</view>
									</view>
								</view> -->

								<view class="radio-8 mb16  t-c f-24  sku-item " @tap="smip(index,1)"
									v-for="(item,index) in specsObject.specs" :key="index"
									:class="spescIndex==index?'col-red-d9 border-d9':'bg-gray-f6  border-f6'">
									<!-- {{item.name}} <text class="ml10 mr10">|</text> {{spescIndex==index?xrc:item.price }} -->
									<view class="flex">
										<view class="onelist-hidden">
											{{item.name}}
										</view>
										<text class="ml10 mr10">|</text>
										<view class="">
											{{ parseFloat(Number(item.price)  +Number(specsObject.price)).toFixed(2)}}
											<!-- {{ parseFloat(Number(item.price)).toFixed(2)}} -->
										</view>
									</view>
									<!-- {{Number(item.price)  +Number(item.price)}} -->
									<!--{{spescIndex==index?xrc:item.price}}-->
								</view>
								<!-- <view class="radio-8 mb16  t-c f-24 onelist-hidden sku-item" @click="chanegteConstructions(item,index)"  v-for="(item,index) in specsObject.specs" :key="index" :class="cooperations.indexOf(item.name) != -1?'col-red-d9 border-d9':'bg-gray-f6  border-f6'" >{{item.name}} <text class="ml10 mr10">|</text> {{item.price}}</view> -->
							</view>

						</view>
					</scroll-view>

					<scroll-view class="pl30 box-size sku-scroll mb34 pr30" scroll-y="true"
						v-if="specsObject.specs1.length>0">
						<view class="mb24">
							<view class="col-gray-88 ml10 f-24 mb16">规格二</view>
							<view class="dis-flex flex-y-center flex-wrap">
								<!-- <view class="radio-8 mb16  t-c f-24 onelist-hidden sku-item" @tap="smipx(index,2)"  v-for="(item,index) in specsObject.specs1" :key="index" :class="spescIndexr==index?'col-red-d9 border-d9':'bg-gray-f6  border-f6'" >{{item.name}} <text class="ml10 mr10">|</text> {{item.price}}</view> -->
								<view class="radio-8 mb16  t-c f-24 onelist-hidden sku-item"
									@click="chanegteConstructions(item,index)"
									v-for="(item,index) in specsObject.specs1" :key="index"
									:class="cooperations == item.name?'col-red-d9 border-d9':'bg-gray-f6  border-f6'">
									<!-- {{item.name}} <text class="ml10 mr10">|</text> {{item.price}} -->
									<view class="flex">
										<view class="onelist-hidden">
											{{item.name}}
										</view>
										<text class="ml10 mr10">|</text>
										<view class="">
											{{ Number(item.price).toFixed(2)}}
										</view>
									</view>

								</view>
							</view>
						</view>
					</scroll-view>


					<scroll-view class="pl30 box-size sku-scroll mb34 pr30" scroll-y="true"
						v-if="specsObject.attribute.length>0">
						<view class="mb24">
							<view class="col-gray-88 f-24 ml10 mb16">属性</view>
							<view class="dis-flex flex-y-center flex-wrap">
								<!-- <view class="radio-8 mb16 mr20 t-c f-24 onelist-hidden sku-item" @tap="skuIndex=index"
									v-for="(item,index) in specsObject.attribute" :key="index"
									:class="skuIndex==index?'col-red-d9 border-d9':'bg-gray-f6 border-f6'">{{item}}
								</view> -->

								<view class="radio-8 mb16 mr20 t-c f-24 onelist-hidden sku-item bg-gray-f6 border-f6"
									@tap="skuIndex=index" v-for="(item,index) in specsObject.attribute" :key="index"
									:class="skuIndex==index?'col-red-d9 border-d9':'bg-gray-f6 border-f6'">{{item}}
								</view>


							</view>
						</view>
					</scroll-view>
					<view class="bg-gray-f6 f-24 pl40 pr40 box-size pt10 w-100 onelist-hidden pb10">
						<text class="col-gray-88">已选：</text>

						<text class="mr12"
							v-if="specsObject.specs[spescIndex]&&specsObject.specs[spescIndex].name&&spescIndex!=-1">{{specsObject.specs[spescIndex].name}}</text>

						<text class="mr12"
							v-if="specsObject.specs1[spescIndexr]&&specsObject.specs1[spescIndexr].name&&spescIndexr!=-1">{{specsObject.specs[spescIndexr].name}}</text>


						<text class="mr12" v-if="specsObject.attribute[skuIndex]">{{cooperations}}</text>


						<text class="mr12"
							v-if="specsObject.attribute[skuIndex]">{{specsObject.attribute[skuIndex]}}</text>
					</view>

					<view class="dis-flex flex-x-between price-box mt20 pl40 pr40 box-size flex-y-end">
						<view class="price t-b">
							<text class="mr16">合计</text>
							<!-- <text class="col-red-d9 f-DINPro f-28 f-b" v-if="spescIndex!=-1">¥<text class="f-44 ml5">{{add(specsObject.price,(specsObject.specs[spescIndex]&&specsObject.specs[spescIndex].price)||0)||'0'}}</text></text> -->
							<!-- <text class="col-red-d9 f-DINPro f-28 f-b" v-if="spescIndexr!=-1">¥<text class="f-44 ml5">{{add(specsObject.price,(specsObject.specs1[spescIndexr]&&specsObject.specs1[spescIndexr].price)||0)||'0'}}</text></text> -->
							<text class="col-red-d9 f-DINPro f-28 f-b">¥<text class="f-44 ml5">
									{{ parseFloat(xr).toFixed(2)||'0'}}</text></text>

						</view>
						<view class="bg-red-d6-ec radio-8 col-white-ff t-c f-24 add-cart " @tap="addCard">加入购物车</view>
					</view>
				</view>
				<image class="wh72 mt60" @tap.stop="cancaelSku" src="/static/img/cancel.png"></image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "sku",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			specsObject: {
				type: Object,
				default: function() {
					return {
						name: "",
						specs: [],
						specs1: [],
						attribute: [],
					}
				}
			},
		},
		data() {
			return {
				skuShow: false,
				skuIndex: -1, //被选中的属性下标
				spescIndex: 0, //被选中的规格下标
				spescIndexr: 0, //
				type: "",
				spec: "",
				spec1: "",
				xr: 0,
				cooperations: "",
				xrc: '',
				cooperationsx: "",
			};
		},
		watch: {
			show: {
				handler(newVal, oldVal) {
					this.skuShow = newVal
				},
				immediate: true,
			},
			specsObject: {
				handler(newVal, oldVal) {
					console.log("aaa")
					this.skuIndex = 0 //被选中的属性下标
					this.spescIndex = 0 //被选中的规格下标
					this.spescIndexr = 0
					console.log(this.specsObject)
					if (this.specsObject.specs.length > 0) {
						this.xr = Number(this.specsObject.specs[0].price) + Number(this.specsObject.price)
					} else {
						this.xr = Number(this.specsObject.price)
					}

					// this.xr = Number(this.specsObject.specs[0].price)
					if (this.specsObject.specs.length > 0) {
						this.xrc = Number(this.specsObject.specs[this.spescIndex].price) + Number(this.specsObject.price)
					}
					console.log(this.specsObject)
					this.spec = this.specsObject.specs.length > 0 ? this.specsObject.specs[this.spescIndex].name : ''
					console.log(this.spec)
					console.log(this.specsObject.price)

				},
				immediate: true,
				deep: true,
			}
		},

		methods: {
			//规格1
			smip(index, type) {

				this.spescIndexr = 0
				this.spescIndex = index
				this.type = type
				this.xrc = Number(this.specsObject.specs[this.spescIndex].price) + Number(this.specsObject.price)
				// this.xrc = Number(this.specsObject.specs[this.spescIndex].price) 

				this.xr = Number(this.specsObject.specs[this.spescIndex].price) + Number(this.cooperationsx)

				this.xr = Number(this.cooperationsx) + this.xrc

				console.log(this.xr)

				this.spec = this.specsObject.specs.length > 0 ? this.specsObject.specs[this.spescIndex].name : ''
				if (!this.cooperations) {
					this.xr = this.xrc
				}
			},

			smipx(index) {
				this.spescIndex = index
				this.xr = Number(this.specsObject.price)
			},
			//规格2
			chanegteConstructions(item, index) {
				console.log(item, index)
				console.log(this.cooperations)
				let that = this;
				if (this.cooperations == item.name) { //如果当前点击的已经选择  就取消选择
					this.cooperations = ""
					this.scooperationsx = ""
					this.xr = this.xrc
				} else {
					//如果不存在就添加进去列表
					this.cooperations = item.name
					this.cooperationsx = item.price
					this.xr = Number(this.cooperationsx) + this.xrc
				}
				return
			},

			//点击加入购物车
			async addCard() {
				this.spec = this.specsObject.specs.length > 0 ? this.specsObject.specs[this.spescIndex].name : ''
				this.$emit("addCard", {
					items: this.specsObject,
					spec: this.spec,
					spec1: this.cooperations,
					type: this.type,
					attribute: this.specsObject.attribute.length > 0 ? this.specsObject.attribute[this
						.skuIndex] : ''
				})
				this.skuIndex = 0; //被选中的属性下标
				this.spescIndex = 0; //被选中的规格下标
				this.spescIndexr = 0; //
				this.spec = "";
				this.cooperations = "";
				this.cooperationsx = "";
				this.xr = 0
			},
			//格式化小数加法
			add(arg1, arg2) {
				var r1, r2, m, n
				try {
					r1 = arg1.toString().split('.')[1].length
				} catch (e) {
					r1 = 0
				}
				try {
					r2 = arg2.toString().split('.')[1].length
				} catch (e) {
					r2 = 0
				}
				m = Math.pow(10, Math.max(r1, r2))
				n = (r1 >= r2) ? r1 : r2
				return ((arg1 * m + arg2 * m) / m).toFixed(n)
			},
			//格式化小数减法
			sub(arg1, arg2) {
				var r1, r2, m, n
				try {
					r1 = arg1.toString().split('.')[1].length
				} catch (e) {
					r1 = 0
				}
				try {
					r2 = arg2.toString().split('.')[1].length
				} catch (e) {
					r2 = 0
				}
				m = Math.pow(10, Math.max(r1, r2))
				n = (r1 >= r2) ? r1 : r2
				return ((arg1 * m - arg2 * m) / m).toFixed(n)
			},
			//关闭弹窗
			cancaelSku() {
				// this.skuShow = false
				this.skuIndex = 0; //被选中的属性下标
				this.spescIndex = 0; //被选中的规格下标
				this.spescIndexr = 0; //
				this.cooperations = "";
				this.cooperationsx = "";
				this.xr = 0;
				this.$emit("skuCanel");
			}
		}
	}
</script>

<style lang="scss">
	.win-box {
		width: 600rpx;
		padding: 40rpx 0;
		box-sizing: border-box;
	}

	.sku-item {
		min-width: 158rpx;
		max-width: 100%;
		width: max-content;
		padding: 0 8rpx;
		box-sizing: border-box;
		height: 56rpx;

		line-height: 56rpx;
		margin: 10rpx;
	}

	.u-fade-enter-active {
		height: 100vh;
		overflow: hidden;
	}

	.price-box {
		height: 56rpx;

	}

	.add-cart {
		height: 100%;
		line-height: 56rpx;
		width: 160rpx;
	}

	.sku-scroll {
		max-height: 250rpx;
	}

	.price {
		min-width: 20rpx;
	}
</style>