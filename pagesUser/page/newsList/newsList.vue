<template>
	<view class="cont24">
		<view class="cont32-24 dis-flex flex-y-center mb20 bg-white-ff radio-16"
			@tap="onLink('/pagesUser/page/newsList/serviceNews/serviceNews')">
			<view class="mr20 wh88 dis-flex p-r">
				<image class="wh88 " src="/pagesUser/static/news-icon01.png"></image>
				<view class="news"></view>
			</view>

			<view class="cont-r">
				<view class="dis-flex mb16  flex-x-between flex-y-center w-100">
					<view class="f-28 col-brank-20 f-b">服务通知</view>
					<view class="f-28 c88">2022-03-19 18:00</view>
				</view>
				<view class="col-gray-8e f-24">新版本更新</view>
			</view>
		</view>

		<view class="cont32-24 dis-flex flex-y-center mb20 bg-white-ff radio-16" @tap="onLink()"
			v-for="(item,index) in detail" :key="index">
			<view class="cont-r">
				<view class="flex-just mb16 w-100 ">
					<view class="f-28 col-brank-20 f-b w-100">{{item.title}}</view>
				</view>

				<view class="flex-just">
					<view class="col-gray-8e f-24 w-100">{{item.body}}</view>
				</view>

			</view>
		</view>

		<view class="p-l-30 p-r-30 p-t-32 bg-white-ff radio-16">
			<view v-for="(item,index) in conversations" :key="index" @tap="tochat(item)">
				<view class="tidings m-b-30 flex-about flex-centerd " @click="toOnlinecontact">
					<view class="flex-centerd">
						<view class="dis-flex tximg porelative">
							<image v-if="item.data.avatar != 'undefined'" class="tximg" :src="item.data.avatar" mode="">
							</image>
							<image v-else class="tximg" src="../../../static/img/default.png"></image>
							<view class="dian f-20 flex-center pot0l0 c-FD" v-if="item.unread">
								{{item.unread}}
							</view>
						</view>
						<view class="m-l-12">
							<view class="f-28 c-20 f600 flex-just">
								<view>{{item.data.name || item.data.nickname}}</view>
								<!-- 	<view class="type-tag server ml10" v-if="item.userId==='001'">服务号</view>
								<view class="type-tag merchant ml10" v-if="item.userId==='002'">商家</view> -->
							</view>
							<view class="c-99 f-20 m-t-15">{{item.lastMessage.payload.text}}</view>
						</view>
					</view>

					<view class="f-28 c88">
						{{formatDate(item.lastMessage.timestamp)}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conversations: [],
				unreadTotal: 0,
				pageIndex: 0,
				allConversations: [],
				detail: [],
			};
		},
		onShow() {
			this.loadConversations();
			this.listenConversationUpdate();
			this.allConversations = [];
			this.getListx()
		},
		methods: {
			//跳转页面链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			toOnlinecontact() {
				uni.navigateTo({
					url: "../Onlinecontact/Onlinecontact"
				})
			},
			option(userId) {
				let path = "/pages/my/chat/chat?to=" + userId
				uni.navigateTo({
					url: path
				});
			},
			//加载最新会话列表
			loadConversations() {
				let that = this;
				that.$chat.loadConversations()
					.then(result => {
						that.unreadTotal = result.content.unreadTotal;
						that.renderConversations(result.content);
						uni.hideLoading();
					}).catch(error => {
						console.log(error);
						console.log('获取最新会话列表失败' + error);
						uni.hideLoading();
					})
			},
			//监听会话列表变化
			listenConversationUpdate() {
				this.$chat.listenConversationUpdate(content => {
					this.renderConversations(content);
				});
			},
			//更新消息
			renderConversations(content) {
				this.conversations = content.conversations;
				console.log(this.conversations)
				//未读总数
				let unreadTotal = content.unreadTotal;

			},

			async getListx() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.getList()
				uni.hideLoading()
				if (status == 200) {
					console.log(data.data)
					this.detail = data.data
				}
			},

			//跳转聊天页
			tochat(user) {
				console.log(user)
				let passUser = {}
				let path = '';
				if (user.type == 'private') {
					passUser = {
						uuid: user.userId,
						name: user.data.name,
						avatar: user.data.avatar,
					}
					path = "/pagesIndex/page/campusTakeout/index/chat/chat?toUser=" +
						encodeURIComponent(JSON.stringify(passUser));
				}
				if (user.type == 'group') {
					passUser = {
						uuid: user.groupId,
						name: user.data.name,
						avatar: user.data.avatar,
					}
					path = "/pagesIndex/page/campusTakeout/index/groupChat/groupChat?toUser=" +
						encodeURIComponent(JSON.stringify(passUser));
				}
				uni.navigateTo({
					url: path
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7 !important;
	}

	.cont-r {
		width: 100%;
	}

	.news {
		width: 16rpx;
		height: 16rpx;
		background: #E03840;
		border-radius: 16rpx;
		border: 4rpx solid #FFFFFF;
		position: absolute;
		right: 0;
		top: -4rpx;
	}

	.head-box {
		height: 50px;
	}

	.pot0l0 {
		position: absolute;
		top: -5rpx;
		right: -5rpx;
	}

	.lianxiline {
		border-bottom: 2rpx solid #ececec;
	}


	.tidings {
		/* padding: 16rpx 27rpx 17rpx 26rpx; */

		border-radius: 20rpx;
	}

	.tximg {
		width: 91rpx;
		height: 91rpx;
		border-radius: 50%;
	}

	.dian {
		width: 33rpx;
		height: 33rpx;
		background: #FF3100;
		border-radius: 50%;
	}

	.type-tag {
		border-width: 1px;
		border-radius: 3px;
		border-style: solid;
		font-size: 12px;
		line-height: 18px;
		height: 18px;
		padding: 0 6px;
	}

	.type-tag.server {
		background-color: #ecf5ff;
		color: #4ac5f2;
		border-color: #4ac5f2;
	}

	.type-tag.merchant {
		background-color: #e4f0ff;
		color: #3266ff;
		border-color: #3266ff;
	}

	.conversation-box {
		background-color: #FF3100;
		border-bottom: 2px solid #EFEFEF;
	}
</style>
