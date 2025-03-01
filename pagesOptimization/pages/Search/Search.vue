<template>
	<view>
		<view class="">
			<u-navbar :placeholder="true" :autoBack="true">
				<view class="w-85 ml15" slot="center">
					<u-search placeholder="请输入关键词" v-model="keyword" bgColor="#f6f6f6" :clearabled="false"
						:actionStyle="{color: 'transparent'}" @search="search"></u-search>
				</view>
			</u-navbar>
		</view>

		<view class="m-t-40">

			<!-- 历史搜索 -->
			<view class="">
				<view class="flex-al-c flex-jus-spa padd-0-32">
					<view class="f-28 fw-700 color-222426">
						历史搜索
					</view>
					<view v-if="historyList.length > 0" @click="deleteHistory">
						<image class="wh-28" src="@/static/img/ico-shanchu.png" mode=""></image>
					</view>
				</view>
				<view class=" flex-wrap padd-l-12">
					<view class=" bor-r-26 m-l-20 m-t-20 bgc-f7 f-24" v-for="(item,index) in historyList" :key="index">
						<u-tag :text="item" shape="circle" bgColor="#e8e8e8" borderColor="#f7f7f7" color="#929399"
							size="mini" :show="close1" @click="choseKeyword(item)">
						</u-tag>
					</view>
				</view>
			</view>
			<!-- 历史搜索结束 -->
			<!-- 			<view class="m-t-40">
				<view class="flex-al-c flex-jus-spa padd-0-32">
					<view class="f-28 fw-700 color-222426">
						搜索发现
					</view>
					<view class="f-24 color-888 flex-al-c" @click="changeKeyword">
						换一换
						<image class="wh-28 m-l-8" src="@/static/img/ico-shuaxin.png" mode=""></image>
					</view>
				</view>
				<view class=" flex-wrap padd-l-12">
					<view class="bor-r-26 m-l-20 m-t-20 bgc-f7 f-24" v-for="(item,index) in hotList" :key="index">
						<u-tag :text="item" bgColor="#e8e8e8" borderColor="#f7f7f7" color="#929399" shape="circle"
							size="mini" :show="close1" @click="choseKeyword(item)">
						</u-tag>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 		<view class="padd-b-40 m-t-28 m-l-38">
			<scroll-view scroll-x="true" class="scroll-view_H">
				<view v-for="(item1,index) in recommendList" :key="index" class=" c1 m-r-20">
					<view class="hot-box padd-12" :class="index==1 ? 'bgc-FDF1E6':' bgc-FBEAEB'">
						<view class="f-28 color-10 fw-700 m-t-20 m-l-20">
							{{item1.title}}
						</view>
						<view class="padd-34 m-t-22 hot-box-main">
							<view class="flex-al-c m-b-40" v-for="(item2,index) in item1.keyword" :key="index"
								@click="choseKeyword(item2)">
								<view v-if="index == 0" class="tips1 flex-c-c f-24">
									1
								</view>
								<view v-else-if="index == 1" class="tips2 flex-c-c f-24">
									2
								</view>
								<view v-else-if="index == 2" class="tips3 flex-c-c f-24">
									3
								</view>
								<view v-else class="tips4 flex-c-c f-24">
									{{index + 1}}
								</view>
								<view class="color-20 f-24 m-l-20">
									{{item2}}
								</view>
							</view>
						</view>
					</view>
				</view>


			</scroll-view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				historyList: [],
				hotList: [],
				recommendList: [],
				close1: true,
				schoolId: 0,
			}
		},
		onShow() {
			this.schoolId = uni.getStorageSync('school').id;
			this.getSearchMainIndex();
		},
		methods: {
			search() {
				this.choseKeyword(this.keyword)
			},
			//获取搜索首页
			async getSearchMainIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.searchMainIndex({
					school_id: that.schoolId
				})
				if (status == 200) {
					console.log(data);
					that.historyList = data.userLog;
					that.hotList = data.randLog;
					that.recommendList = data.recommendLog;
				}
			},
			choseKeyword(keyword) {
				this.keyword = keyword;
				uni.navigateTo({
					url: "/pagesOptimization/pages/searchResult/searchResult?keyword=" + keyword
				})
			},
			//删除历史记录 
			async deleteHistory() {
				var that = this
				const {
					data,
					status
				} = await that.$api.clearHistoryKeyword({
					school_id: that.schoolId
				})
				if (status == 200) {
					console.log(data);
					that.historyList = [];
				}
			},
			//换一换搜索 
			async changeKeyword() {
				var that = this
				const {
					data,
					status
				} = await that.$api.changeKeyword({
					school_id: that.schoolId
				})
				if (status == 200) {
					console.log(data);
					that.hotList = data;
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.c1 {
		display: inline-block;
	}

	.tips1 {
		width: 28rpx;
		height: 28rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 4rpx;
		color: #fff;
		border-radius: 4rpx;
	}

	.tips2 {
		width: 28rpx;
		height: 28rpx;
		background: linear-gradient(126deg, #FA9400 0%, #F26912 100%);
		border-radius: 4rpx;
		color: #fff;
		border-radius: 4rpx;
	}

	.tips3 {
		width: 28rpx;
		height: 28rpx;
		background: linear-gradient(140deg, #FFC933 0%, #FF9308 100%);
		border-radius: 4rpx;
		color: #fff;
		border-radius: 4rpx;
	}

	.tips4 {
		width: 28rpx;
		height: 28rpx;
		background: #C5AC91;
		border-radius: 4rpx;
		color: #fff;
		border-radius: 4rpx;
	}

	.hot-box {
		width: 484rpx;
		height: 842rpx;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.hot-box-main {
		width: 460rpx;
		height: 744rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		/* 	height: 842rpx; */
	}

	.u-tag--primary.data-v-1481d46d {
		background-color: #F7F7F7 !important;
		border-width: 0 !important;
		padding: 2rpx 20rpx !important;
	}

	.u-tag__text--primary.data-v-1481d46d {
		font-size: 24rpx !important;
		color: #222426 !important;
	}
</style>
