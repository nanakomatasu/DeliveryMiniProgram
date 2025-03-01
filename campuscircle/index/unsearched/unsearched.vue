<template>
	<view class="padd-b-160">
		<u-navbar title=" " @rightClick="rightClick"  :placeholder="true" :bgColor="bgColor">
			<view class="flex-al-c" slot="left">
				<view class="" @click="goback()">
					<image class="wh-44" src="@/campuscircle/static/ico_fanhui.png" mode=""></image>
				</view>
				<view class="search_box m-l-20 flex-al-c">
					<u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" bgColor="#fff"></u-search>
					<view class="searchbtn m-l-20" @click="goSearch()">
						搜索
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="padd-0-24 m-t-24">
			<!-- 校园热搜 -->
			<view class="resou_box">
				<view class="flex-al-c">
					<image class="wh-32 m-r-10" src="@/campuscircle/static/ico_sousou.png" mode=""></image>
					<view class="f-28 color-222426 fw-700">校园热搜</view>
				</view>
				<view class="flex-jus-spa pos-r">
					<view class=" flex-wrap flex-jus-spa">
						<view class="f-28 color-222426 m-t-24 text-chaochu w42 " v-for="(item,index) in schoolHotlist">
							<!-- 这才是刚好的相遇 -->{{item}}
						</view>
					</view>
					<view class="m-t-24" style="width: 10rpx; height: 92%; position: absolute; left: 50%; ">
						<u-line direction="col" color="#EAEAEA"></u-line>
					</view>
					<!-- <view class="w42 ">
						<view class="f-28 color-222426 m-t-24 text-chaochu">
							2023央视春晚彩排路透aaa奥奥啊啊啊啊啊奥奥奥
						</view>
						<view class="flex-al-c m-t-24" @click="hotSearch()">
							<view class="f-28 color-D93038 fw-700 m-r-6" style="line-height: 40rpx;">更多热搜</view>
							<image class="wh-28" src="@/campuscircle/static/ico_zhankai1.png" mode=""></image>
						</view>
					</view> -->
				</view>
			</view>
			<!-- 更多热门帖子 -->
			<view class="flex-al-c m-t-32">
				<image class="wh-28" src="@/campuscircle/static/ico_redu.png" mode=""></image>
				<view class="f-28 color-222426 fw-700 m-l-16">更多热门帖子</view>
			</view>
			<view class="">
				<circleList :postList="postList" @like="likes" @attention="attentionBtn" @transmit="transmitBtn"></circleList>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				bgColor: '#f6f6f6',
				postList: [],
				id: '',
				schoolHotlist: [], //学校热搜
				// is_hot: '1', //热门状态
			}
		},
		onLoad() {
			this.circlepostsList()
			this.schoolHot()
		},
		methods: {
			goback() {
					uni.navigateBack({
						delta: 1
					});
			},
			hotSearch() {
				uni.navigateTo({
					url: '/campuscircle/index/hotSearch/hotSearch'
				})
			},
			goSearch() {
				console.log('搜索搜索');
				this.circlepostsList()
			},
			
			// 朋友圈喜欢
			likes(item) {
				console.log(item,'喜欢状态奥奥奥')
				this.GetcirclepostsLike(item.id,item.is_like)
			},
			attentionBtn(item) {
				this.GetcircleFollow(item.member.id,item.is_follow)
				console.log(item.member.id,'关注状态奥奥奥')
			},
			transmitBtn(item) {
					console.log(item.id,'转发状态奥奥奥')
				// uni.navigateTo({
				// 	url: '/campuscircle/index/transmit/transmit?id=' + id
				// })
			
			},
			// 帖子列表
			async circlepostsList() {
				var that = this
				const result = await that.$api.circlepostsList({
					school_id:uni.getStorageSync('school').id,
					keyword: this.keyword,
					is_hot: 1
				})

				if (result.status == 200) {
					this.postList = result.data.data
					this.postList.forEach((item,index)=>{
						if(item.pics){
							this.postList[index].pics=item.pics.split(',')
						}
					})
				}
			},
			// 点赞,取消点赞接口
			async GetcirclepostsLike(id, is_like) {
				var that = this
				const result = await that.$api.circlepostsLike({
					post_id: id
				})
				console.log(id, '123id奥奥奥');
				if (result.status == 200) {
					if (is_like == 1) {
						this.$u.toast("取消点赞")
					} else if (is_like != 1) {
						this.$u.toast("👍赞一个~")
					}
					this.circlepostsList()
				}
			},
			// 关注接口
			async GetcircleFollow(id,is_follow) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: id
				})
				if (result.status == 200) {
					if(is_follow == 1) {
						this.$u.toast("取消成功")
					}else if (is_follow != 1) {
						this.$u.toast("关注成功")
					}
					this.circlepostsList()
				}
			},
			
			//校园热搜
			
			async schoolHot() {
				var that = this
				const result = await that.$api.circleGetHotKeyword({
				
				})
				if(result.status == 200) {
					this.schoolHotlist = result.msg
					console.log(this.schoolHotlist);
				}
				
			},
			
		}
	}
</script>

<style>
	.search_box {
		width: 454rpx;
		height: 64rpx;
	}
	
	.resou_box {
		box-sizing: border-box;
		padding: 24rpx;
		background-color: #fff;
		border-radius: 16rpx;
	}
	
	.searchbtn {
		width: 112rpx;
		height: 52rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 26rpx;
		text-align: center;
		line-height: 52rpx;
		color: #fff;
		font-size: 24rpx;
	}
</style>
