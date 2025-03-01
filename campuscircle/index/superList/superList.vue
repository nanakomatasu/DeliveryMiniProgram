<template>
	<view>
		<u-navbar title="个人中心" @rightClick="rightClick" :autoBack="false" :placeholder="true" :bgColor="bgColor">
			<view class="flex-al-c" slot="left">
				<view class="" @click="gotoBack()">
					<image class="wh-44" src="@/campuscircle/static/ico_fanhui.png" mode=""></image>
				</view>
				<view class="search_box m-l-20">
					<u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" bgColor="#F7F7F7"></u-search>
				</view>
			</view>
		</u-navbar>
		<view class="flex">
			<view class="">
				<view class="flex-c-c left_nav_box" :class="navtype==index ? 'bgc-ff' : 'bgc-f7' "
					v-for="(item,index) in list" :key="index" @click="hit_nav(item.name,index)">
					<view class="" :class="navtype == index ? 'left_tips_box' : '' "></view>
					<view class="f-28 color-18 fw-700">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="right_box">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view id="demo1" class="scroll-view-item">
						<view class="flex-al-c m-b-40" v-for="(items,indexs) in main" @click="gosuperPage(items.id,items.super_topic_name)">
							<view class="">
								<image class="wh-128 bor-r-10" src="../../../static/favicon.png" mode=""></image>
							</view>
							<view class="m-l-24">
								<view class="f-32 color-20 fw-700">
									{{items.super_topic_name}}
								</view>
								<view class="flex-al-c m-t-28 f-28 color-888">
									<view class="">
										<text>帖子数：</text>
										<text>{{items.post_num}}</text>
									</view>
									<view class="m-l-20">
										<text>粉丝</text>
										<text>{{items.fans_num}}</text>
									</view>
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
			this.PostcirclesuperTopicTypeList()
			this.PostcirclesuperTopicList()
		},
		
		methods: {
			gotoBack() {
				uni.navigateBack()
			},
			
			gosuperPage(id,super_topic_name){
			    var pages = getCurrentPages();
			    var prevPage = pages[pages.length - 2]; //上一个页面
			    prevPage.$vm.otherFun(id);//重点$vm
				prevPage.$vm.otherFun_name(super_topic_name);//重点$vm
			    uni.navigateBack();
			},
			
			
			

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

			hit_nav(name, index) {
				this.index = index
				this.navtype = this.index
				console.log('点击了什么', name, index);
				this.PostcirclesuperTopicList()
			},

			// 超话类型
			async PostcirclesuperTopicTypeList() {
				var that = this
				const result = await that.$api.circlesuperTopicTypeList({

				})
				if (result.status) {
					this.list = result.data
				}
			},


			// 超话列表
			async PostcirclesuperTopicList() {
				var that = this
				const result = await that.$api.circlesuperTopicList({
					type: this.index + 1,

				})
				if (result.status) {
					// this.$u.toast("创建成功")
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
		height: 112rpx;
	}

	.left_tips_box {
		width: 8rpx;
		height: 40rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
		position: absolute;
		left: 0;
	}

	.right_box {
		width: 574rpx;
		height: 100vh;
		background-color: #fff;
		padding-top: 56rpx;
		padding-left: 32rpx;
	}
</style>
