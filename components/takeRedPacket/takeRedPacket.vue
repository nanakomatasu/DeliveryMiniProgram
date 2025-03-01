<template>
	<view>
		<view class="w100 padd-0-24">
			<u-scroll-list :indicator="false">
				<view class="box_main" v-for="(item,index) in tc_lists" :key="index">
					<view class="" style="width:600rpx;">
						<u-scroll-list :indicator="false">
							<view class="flex" style="padding-right: 200rpx;">
								<view class="" v-for="(items,indexs) in Number(item.num)" :key="indexs">
									<view class="tips_img m-r-16">
										<view class="tips_box1">
											{{ item.type_str }}
										</view>
										<view class="color-D93038 fw-700 flex-c-c ">
											<view class="">
												<text class="f-32">￥</text>
												<text class="f-56">{{ item.amount.substring(0,3) }}</text>
											</view>
										</view>
										<view class="color-D93038 f-20 flex-c-c m-b-10">
											满{{ item.use_threshold }}可用
										</view>
									</view>
								</view>
							</view>
						</u-scroll-list>
					</view>
					<view class="box_r flex-c-c fw-700" style="color: #BC1D24;" @click="buy_btn(item.id,item.money)">
						<text class="f-28">￥</text>
						<text class="f-40">{{ item.money.substring(0,4) }}</text>
						<!-- <text class="f-32">购买</text> -->
					</view>
				</view>
			</u-scroll-list>
		</view>
	</view>
</template>

<script>
	export default {
		name: "takeRedPacket",
		props: {
			tc_lists: {

			},

		},
		data() {
			return {
				add: 0.011
				// tc_lists: []
			};
		},
		onLoad() {
			this.Gettc_lists()
		},
		methods: {
			buy_btn(id, money) {
				console.log(id, 'ididid');
				uni.navigateTo({
					url: '/pages/index/redTc/redTc?id=' + id + '&money=' + money
				})
				console.log('购买');
			},

		}
	}
</script>

<style>
	.box_main {
		border-radius: 16rpx;
		position: relative;
		width: 706rpx;
		height: 166rpx;
		background-image: url('https://api.yzgl.top/h5/static/images/takeRed_bg.png');
		/* background-image: url('@/static/images/takeRed_bg.png'); */
		background-size: 706rpx 166rpx;
		background-repeat: no-repeat;
		padding: 12rpx;
		box-sizing: border-box;

	}

	.tips_img {
		width: 164rpx;
		height: 142rpx;
		background-image: url('@/static/images/takeRed_tips.png');
		background-size: 164rpx 142rpx;
		background-repeat: no-repeat;
		/* display: inline-block; */
		box-sizing: border-box;
	}

	.tips_box1 {
		width: 112rpx;
		height: 34rpx;
		background: #F7D6D7;
		border-radius: 16rpx 0px 8rpx 0px;
		font-size: 20rpx;
		color: #d93038;
		text-align: center;
	}

	.box_r {
		position: absolute;
		right: 0rpx;
		top: 0;
		width: 194rpx;
		height: 166rpx;
		background-image: url('https://api.yzgl.top/h5/static/images/takeRed_r.png');
		/* background-image: url('@/static/images/takeRed_r.png'); */
		background-size: 194rpx 166rpx;
		background-repeat: no-repeat;
	}
</style>