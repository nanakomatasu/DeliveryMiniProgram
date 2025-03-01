<template>
	<view style="width: 100%;display: flex;justify-content: center;">
		<u-scroll-list :indicator="menuArrx.length >1">
			<view v-for="(item, index) in menuArrx" :key="index">
				<view class="">
					<view class=" p-t-20 bor-r-16" style="width: calc(100vw - 48rpx);"
						:class="{'grid-3':st.rowsNum==3, 'grid-4':st.rowsNum==4, 'grid-5':st.rowsNum==5}">
						<view class="dis-flex flex-dir-column flex-x-center  flex-y-center mb20" @tap="toPage(items)"
							v-for="(items, indes) in item" :key="indes">
							<image class="wh80" :src="items.imgUrl" mode=""></image>
							<view class="f-24 t-c w-100 onelist-hidden mt16" :style="{color: item.color}">
								{{ items.text }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-scroll-list>
		<!-- <u-scroll-list>
		        <view v-for="(item, index) in 2" :key="index">
		            	<view class="" style="width:350px;">
		            		<view class=" p-t-20 bor-r-16" :class="{'grid-3':st.rowsNum==3, 'grid-4':st.rowsNum==4, 'grid-5':st.rowsNum==5}"
		            			:style="{background: st.background}">
		            			<view class="dis-flex flex-dir-column flex-x-center  flex-y-center mb20" @tap="toPage(item)"
		            				v-for="(item, index) in data" :key="index" v-if="index<10">
		            				<image class="wh80" :src="item.imgUrl" mode=""></image>
		            				<view class="f-24 t-c w-100 onelist-hidden mt16" :style="{color: item.color}">{{ item.text }}</view>
		            			</view>
								
		            		</view>
		            	</view>
		        </view>
		    </u-scroll-list> -->
	</view>
</template>

<script>
	// :class="{'grid-3': st.rowNum =='3','grid-4': st.rowNum =='4','grid-5': st.rowNum =='5',}"
	const app = getApp()
	export default {
		name: "indexNavItems",
		props: {
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			menuArr: {
				type: Array,
				default: function() {
					return []
				}
			},
			st: {
				type: Object,
				default: function() {
					return {
						rowsNum: '3',
						background: "#ffffff"
					}
				}
			}
		},
		data() {
			return {
				// menuArrx: [
				// 	[],
				// 	[]
				// ],
				current: 0,
			};
		},

		computed: {
			menuArrx() {
				var t = [],
					a = [],
					b = []
				this.data.forEach((items, index) => {
					if (index < 10) {
						a.push(items)
					}
					if (index > 9) {
						b.push(items)
					}
				})
				t[0] = a;
				if (b.length > 0) {
					t[1] = b
				}

				console.log(t)
				return t
			}
		},
		// created(){
		// 	let _this=this
		// 	this.data.forEach((items, indes) => {
		// 		if (indes < 10) {
		// 			this.menuArrx[0].push(this.data[indes])
		// 		}
		// 		if (indes > 9) {
		// 			this.menuArrx[1].push(this.data[indes])
		// 		}
		// 	})
		// },
		methods: {
			//跳转页面
			toPage(item) {
				// app.navTo(item.linkUrl)
				uni.navigateTo({
					url: item.linkUrl
				})
			},
			changeMenuSwiper(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	.menu-swiper {
		padding: 20rpx 0;
		box-sizing: border-box;
		height: 240rpx;
		box-sizing: border-box;
	}

	.indicator-dots view {
		height: 10rpx;
		border-radius: 6rpx;
		margin: 0 4rpx;
	}

	.def-swiper {
		background: #DBDBDB;
		width: 10rpx;
	}

	.act-swiper {
		width: 32rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
	}

	.grid-3 {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 45%); */
		justify-content: center;
		grid-template-columns: repeat(3, 1fr);
	}

	.grid-4 {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 45%); */
		justify-content: center;
		grid-template-columns: repeat(4, 1fr);
	}

	.grid-5 {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 45%); */
		justify-content: center;
		grid-template-columns: repeat(5, 1fr);
	}

	.scroll-view_H {
		display: flex;
	}

	.u-page {
		padding-bottom: 500px;
	}

	.u-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.3px;
		border-radius: 100px;
		border-color: white;
		background-color: transparent;
		padding: 3px 7px;
		opacity: 0.8;
	}

	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 20px;

			&__image {
				width: 60px;
				height: 60px;
				border-radius: 4px;
			}

			&__text {
				color: #f56c6c;
				text-align: center;
				font-size: 12px;
				margin-top: 5px;
			}
		}

		&__show-more {
			background-color: #fff0f0;
			border-radius: 3px;
			padding: 3px 6px;
			@include flex(column);
			align-items: center;

			&__text {
				font-size: 12px;
				width: 12px;
				color: #f56c6c;
				line-height: 16px;
			}
		}

		&__line {
			@include flex;
			margin-top: 10px;

			&__item {
				margin-right: 15px;

				&__image {
					width: 61px;
					height: 48px;
				}

				&__text {
					margin-top: 5px;
					color: $u-content-color;
					font-size: 12px;
					text-align: center;
				}

				&--no-margin-right {
					margin-right: 0;
				}
			}
		}
	}
</style>