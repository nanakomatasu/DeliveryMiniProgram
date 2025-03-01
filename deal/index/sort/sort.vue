<template>
	<view>
		<u-navbar title="产品分类" @rightClick="rightClick" :autoBack="false" :placeholder="true" :bgColor="bgColor">
			<view class="flex-al-c" slot="left">
				<view class="" @click="gotoBack()">
					<image class="wh-44" src="/static/image/ico_fanhui.png" mode=""></image>
				</view>
				<view class="search_box m-l-20">
					<!-- <u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" bgColor="#F7F7F7"></u-search> -->
					<!-- 产品分类 -->
				</view>
			</view>
		</u-navbar>
		<view class="flex">
			<view class="">
				<view class="left_nav_box flex-c-c flex-column" :class="navtype==index ? 'bgc-ff' : 'bgc-f7' "
					v-for="(item,index) in list" :key="index" @click="hit_nav(item.name,index,item.id)">
					<!-- @click="hit_nav(item.name,index,item.id)" -->
					<view class="f-28 color-18 fw-700">
						{{item.name}}
					</view>
					<view class="" :class="navtype == index ? 'left_tips_box' : '' "></view>
				</view>
			</view>
			<view class="right_box">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view id="demo1" class="scroll-view-item ">
						<view class="flex-al-c flex-wrap">
							<view class="m-b-40 text-c m-r-32" v-for="(items,indexs) in main" @click="goshopList(items.id)">
								<view class="">
									<image class="wh-140 bor-r-10" src="../../../static/favicon.png" mode=""></image>
								</view>
								<view class="f-24 color-20 m-t-20">
									{{ items.name }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				index: '',
				navtype: '0',
				keyword: '',
				bgColor: '#ffffff',
				list: [],
				main: []

			}
		},
		onLoad() {
			this.PostdealTypelist()
			// this.navid()
			// this.PostdealTypedetail()
		},
		
		methods: {
			goshopList(id) {
				uni.navigateTo({
					url: '/deal/index/shopList/shopList?id=' + id
				})
			},
			gotoBack() {
				uni.navigateBack()
			},
			
			// gosuperPage(id){
			//     var pages = getCurrentPages();
			//     var prevPage = pages[pages.length - 2]; //上一个页面
			//     prevPage.$vm.otherFun(id);//重点$vm
			// 	prevPage.$vm.otherFun_name(super_topic_name);//重点$vm
			//     uni.navigateBack();
			// },
			
			// scroll-view滚动
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// scroll-view滚动结束

			// navid(id) {
			// 	this.PostdealTypelist()
			// 	console.log('ididid',id);
			// },

			hit_nav(name, index,id) {
				this.index = index
				this.navtype = this.index
				console.log('点击了什么', name, index,id);
				this.PostdealTypedetail(id)
			},

			// 列表
			async PostdealTypelist(id) {
				console.log('列表id',id);
				var that = this
				const result = await that.$api.dealTypelist({

				})
				if (result.status) {
					this.list = result.data.data
					
				}
			},


			// 列表-数据
			async PostdealTypedetail(id) {
				console.log(id,'id');
				var that = this
				const result = await that.$api.dealTypedetail({
					pid: id

				})
				if (result.status) {
					this.main = result.data.data
				}
			}


		}
	}
</script>

<style>
	.scroll-Y {
		height: 100vh;
	}

	.scroll-view-item {
		height: 100vh;
		font-size: 36rpx;
	}

	.search_box {
		width: 454rpx;
		height: 64rpx;
	}

	.left_nav_box {
		box-sizing: border-box;
		padding: 36rpx 32rpx 36rpx 32rpx;
		position: relative;
		width: 176rpx;
		/* height: 112rpx; */
	}

	.left_tips_box {
		width: 32rpx;
		height: 10rpx;
		border-radius: 5rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
		margin-top: 10rpx;
	}

	.right_box {
		width: 574rpx;
		height: 100vh;
		background-color: #fff;
		padding-top: 56rpx;
		padding-left: 32rpx;
	}
</style>
