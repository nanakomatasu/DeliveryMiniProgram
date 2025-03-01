<template>
	<view>
		<!-- <view class="search_box">
			<u-search placeholder="请输入关键词" v-model="keyword" height="32" :showAction="false"></u-search>
		</view> -->

		<view class="screen-item  onelist-hidden  f-24 radio-8 " @tap="changeScreenWinx(items,indexs)"
			v-if="items.follow !=  null" v-for="(items,indexs) in list" :key="indexs">
			<view class="flex-al-c box-main m-t-20">
				<view class="" :class="cooperatiox.indexOf(items.follow_id) != -1?'Friend_dis' :''">
					<image class="wh-32" src="/campuscircle/static/ico_weixuan.png" mode=""></image>
				</view>
				<view class="" :class="cooperatiox.indexOf(items.follow_id) != -1?'' :'Friend_dis'">
					<image class="wh-32" src="/campuscircle/static/ico_xuanzhong.png" mode=""></image>
				</view>
				<view class="flex-al-c ">
					<view class="m-l-28 flex-al-c">
						<view class="">
							<image class="wh-80 bor-r-100" :src="items.follow.portrait" mode=""></image>
						</view>
						<view class="m-l-20" style="width: 500rpx;">
							<view class="f-28 color-20 fw-700 text-shenglue">{{items.follow.user_name}}</view>
							<view class="f-24 color-18 m-t-6 text-shenglue">忘不掉的是回忆，继续的是生活</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 按钮 -->
		<view class="join_box">
			<view class="join_btn" @click="joinbtn()">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				value: [],
				type: false,

				cooperatiox: [],
				identifiex: [],


			}
		},
		onLoad() {
			this.GetcircleMyFollow()
		},
		methods: {
			// circleMyFollow
			pick(item, index) {


			},


			changeScreenWinx(items, index) {
				console.log(items, index);

				if (this.cooperatiox.indexOf(items.follow_id) != -1) { //如果当前点击的已经选择  就取消选择
					var index = this.cooperatiox.indexOf(items.follow_id)
					this.cooperatiox.splice(index, 1)
					var index = this.identifiex.indexOf(items.follow.user_name)
					this.identifiex.splice(index, 1)

					// console.log(this.cooperatiox,'==123')
					console.log(this.identifiex)
				} else {
					//如果不存在就添加进去列表
					this.cooperatiox.push(items.follow_id)
					// console.log(this.cooperatiox)
					this.identifiex.push(items.follow.user_name)

					// console.log(this.cooperatiox)
					console.log(this.identifiex)
				}
			},


			joinbtn() {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.otherFunx(this.cooperatiox); //重点$vm
				prevPage.$vm.otherFunxs(this.identifiex); //重点$vm
				uni.navigateBack();

				console.log(this.cooperatiox, this.identifiex, '啊啊啊啊嘿嘿嘿合计hi黑')
			},

			// 发布帖子接口
			async GetcircleMyFollow() {
				var that = this
				const result = await that.$api.circleMyFollow({

				})
				if (result.status == 200) {
					this.list = result.data.data

					console.log(this.list);
				}
			},

		}
	}
</script>

<style>
	.search_box {
		box-sizing: border-box;
		padding: 10rpx 24rpx 10rpx 24rpx;
		background-color: #fff;
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.box-main {
		box-sizing: border-box;
		padding: 20rpx 32rpx 20rpx 32rpx;
		background-color: #fff;
	}


	.join_box {
		width: 100%;
		box-sizing: border-box;
		padding: 14rpx 32rpx 24rpx 32rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}

	.join_btn {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		color: #ffffff;
		font-size: 28rpx;
	}


	.Friend_dis {
		display: none;
	}
</style>
