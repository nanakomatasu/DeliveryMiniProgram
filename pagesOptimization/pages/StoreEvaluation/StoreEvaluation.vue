<template>
	<view>
		<view class="Customers_nav" style="padding: 30rpx;">
			<view v-for="item,index in tabList "
				:class="tabIndex == index?'Customers_nav_title Customers_nav_color':'Customers_nav_title' "
				@click="tabListSwitch(index)">
				<!-- 全部108 -->
				{{item.Nick}}
			</view>
		</view>
				<view class="" style="padding: 30rpx;" v-for="item in evaluateList" :key="item.id">
			<view class="all_information">
				<view class="Customers_person">
					<view class="Customers_person_infor">
						<view class="Customers_person_img">
							<image :src="item.head_img" class="person_img"></image>
						</view>
						<view class="Customers_person_name">
							<view class="Customers_person_nick">
								{{item.nick}}
							</view>
							<view class="Customers_person_rate">
								<u-rate :value="item.starNum" readonly size="24rpx" gutter="1"></u-rate>
								<text class="f-s-24" v-if='item.starNum == 5'>非常满意</text>
								<text class="f-s-24" v-if='item.starNum == 4'>满意</text>
								<text class="f-s-24" v-if='item.starNum == 3'>一般</text>
								<text class="f-s-24" v-if='item.starNum == 2 '>差评</text>
								<text class="f-s-24" v-if='item.starNum == 1 '>差评</text>
							</view>
						</view>
					</view>
					<view class="Customers_person_time">
						{{item.evaluatetime}}
					</view>
				</view>
				<view>
					<template>
						<view class="u-page">
							<view class="u-demo-block">
								<view class="u-demo-block__content">
									<view class="album">
										<view class="album__content">
											<u--text margin="0 0 16rpx 0" :text="item.text">
											</u--text>
											<u-album :urls="item.urls2" maxCount="6" rowCount="3" multipleSize="108">
											</u-album>
										</view>
									</view>
								</view>
							</view>
						</view>
					</template>
					<view class="store_reply" v-if="item.reply">
						<text class="store_reply_text">{{item.reply}}</text>
					</view>
				</view>
			</view>
		</view>
		<null-data title="暂无评论"></null-data>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				tabList: [{
					id: 1,
					Nick: " 全部",
					Number: "108",
				}, {
					id: 2,
					Nick: "最新",
					Number: "",
				}, {
					id: 3,
					Nick: "好评",
					Number: "89",
				}, {
					id: 4,
					Nick: "差评",
					Number: "33",
				}, ],
				evaluateList: [{
						id: 1,
						head_img: require("../../static/shop-detail.png"),
						nick: "小李飞刀",
						starNum: 5,
						evaluatetime: '2022.12.24 19:00',
						text: "全面的组件和便捷的工具会让您信手拈来",
						urls2: ['https://cdn.uviewui.com/uview/album/1.jpg',
							'https://cdn.uviewui.com/uview/album/2.jpg',
							'https://cdn.uviewui.com/uview/album/3.jpg',
							'https://cdn.uviewui.com/uview/album/4.jpg',
							'https://cdn.uviewui.com/uview/album/5.jpg',
							'https://cdn.uviewui.com/uview/album/6.jpg',
							'https://cdn.uviewui.com/uview/album/7.jpg',
							'https://cdn.uviewui.com/uview/album/8.jpg',
							'https://cdn.uviewui.com/uview/album/9.jpg',
							'https://cdn.uviewui.com/uview/album/10.jpg',
						],
						reply: '商家回复：您的喜欢，是我们最大的动力，欢迎常来～您的喜欢，是我们最大的动力，欢迎常来',
					},
					{
						id: 2,
						head_img: require("../../static/shop-detail.png"),
						nick: "小李飞刀2",
						starNum: 3,
						evaluatetime: '2022.12.24 19:00',
						text: "量非常足，套餐一个人完全吃不完，还是一如既往的好吃，色香味俱全，下次再来试试其他口味的菜",
						urls2: ['https://cdn.uviewui.com/uview/album/1.jpg',
							'https://cdn.uviewui.com/uview/album/2.jpg',
							'https://cdn.uviewui.com/uview/album/3.jpg',
							'https://cdn.uviewui.com/uview/album/4.jpg',
							'https://cdn.uviewui.com/uview/album/5.jpg',
							'https://cdn.uviewui.com/uview/album/6.jpg',
							'https://cdn.uviewui.com/uview/album/7.jpg',
							'https://cdn.uviewui.com/uview/album/8.jpg',
							'https://cdn.uviewui.com/uview/album/9.jpg',
							'https://cdn.uviewui.com/uview/album/10.jpg',
						],
						reply: '商家回复：您的喜欢，是我们最大的动力，欢迎常来～您的喜欢，是我们最大的动力，欢迎常来',
					}, {
						id: 3,
						head_img: require("../../static/shop-detail.png"),
						nick: "小李飞刀2",
						starNum: 3,
						evaluatetime: '2022.12.24 19:00',
						text: "全面的组件和便捷的工具会让您信手拈来2222",
						urls2: ['https://cdn.uviewui.com/uview/album/1.jpg',
							'https://cdn.uviewui.com/uview/album/2.jpg',
							'https://cdn.uviewui.com/uview/album/3.jpg',
							'https://cdn.uviewui.com/uview/album/4.jpg',
							'https://cdn.uviewui.com/uview/album/5.jpg',
							'https://cdn.uviewui.com/uview/album/6.jpg',
							'https://cdn.uviewui.com/uview/album/7.jpg',
							'https://cdn.uviewui.com/uview/album/8.jpg',
							'https://cdn.uviewui.com/uview/album/9.jpg',
							'https://cdn.uviewui.com/uview/album/10.jpg',
						],
						reply: '',
					},
				],
			};
		},
		methods: {
			tabListSwitch(index) {
				this.tabIndex = index
			},
		},
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.Customers_person_nick {
		font-size: 28rpx;
		font-weight: 700;
		color: #202020;
	}

	.f-s-24 {
		font-size: 24rpx;
		color: #888888;
		margin-left: 8rpx;
	}

	.Customers_person_time {
		font-size: 24rpx;
		color: #888888;
	}

	.Customers_nav {
		display: flex;
		align-items: center;
		background: #fff;
	}

	.Customers_nav_title {
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 4rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #101010;
		background: #eaeaea;
	}

	.Customers_nav_color {
		color: #fff;
		background: linear-gradient(313deg, #d62e36, #ec434b);
	}

	.Customers_person {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.Customers_person_rate {
		display: flex;
	}

	.Customers_person_infor {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.person_img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}

	.store_reply {
		margin-top: 20rpx;
		background: #f7f7f7;
		padding: 20rpx;
		border-radius: 8rpx;
	}

	.store_reply_text {
		font-size: 24rpx;
		color: #888888;
	}
</style>
