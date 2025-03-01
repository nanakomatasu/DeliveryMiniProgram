<template>
	<view class="chatInterface">
		<!-- <image class="group-icon" src="/static/images/group-icon.png" @click="showMembers" /> -->
		<view class="scroll-view">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<checkbox-group @change="selectMessages">
				<view v-for="(message,index) in messages" :key="message.messageId">
					<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
					<view class="time-lag">
						{{renderMessageDate(message, index)}}
					</view>
					<view class="message-item">
						<view class="message-item-content" :class="{'self' : message.senderId ===  currentUser.uuid}">
							<view class="avatar" @longtap="longPressUser(message)">
								<image :src="message.senderData.avatar"></image>
							</view>
							<view @longpress="showActionPopup(message,index)" class="content">
								<view class="message-payload">
									<b class="pending" v-if="message.status === 'sending'"></b>
									<b class="send-fail" v-if="message.status === 'fail'"></b>
									<view v-if="message.type === 'text'" v-html="renderTextMessage(message)"></view>
									
									<view class="custom-message" v-if="message.type === 'order'">
										<view class="title">
											<image src="../../../../../static/img/ordersd.png"></image>
											<text>自定义消息</text>
										</view>
										<view class="custom-message-item">编号：{{message.payload.number}}</view>
										<view class="custom-message-item">商品: {{message.payload.goods}}</view>
										<view class="custom-message-item">金额: {{message.payload.price}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</checkbox-group>
		</view>
		<view class="action-box">
			<view class="action-top">
				<view class="message-input">
					<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
					<input type="text" maxlength="700" placeholder="发送消息" v-model="content"
						@focus="messageInputFocusin">
				</view>
				<span class="send-message-btn" @click="createTextMessage">发送</span>
			</view>
		</view>

	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	export default {
		name: 'groupChat',
		data() {
			return {
				//聊天文本框
				content: '',
				group: {},
				currentUser: {},
				//群成员
				groupMembers: {},
				//消息记录
				messages: [],
				//是否加载完所有历史消息
				allHistoryLoaded: false,
				// 消息选择
				messageSelector: {
					visible: false,
					messages: []
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '群聊：' + this.group.name
			});
		},
		onShow() {},
		onLoad(options) {
			//聊天对象
			let user = JSON.parse(decodeURIComponent(options.toUser));
			console.log(this.user)
			this.group.name = user.name;
			this.group.avatar = user.avatar;
			this.group.uuid = user.uuid;

			this.currentUser = uni.getStorageSync('userInfo');
			this.currentUser.uuid = 'user' + this.currentUser.id;
			this.currentUser.name = this.currentUser.user_name;
			console.log(this.currentUser)
			//从服务器获取最新的群信息
			// this.groupMembers = restApi.findGroupMembers(groupId);

			this.initialGoEasyListeners();
			this.loadHistoryMessage(true);

		},
		onPullDownRefresh(e) {
			this.loadHistoryMessage(false);
		},
		onUnload() {
			//退出聊天页面之前，清空监听器
			this.$chat.clearGroup()
		},
		methods: {
			//渲染文本消息，如果包含表情，替换为图片
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderTextMessage(message) {
				return '<span class="text-content">'+ message.payload.text  + '</span>';
			},
			//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
			renderMessageDate(message, index) {
				if (index === 0) {
					return this.formatDate(message.timestamp);
				} else {
					if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
						return this.formatDate(message.timestamp);
					}
				}
				return '';
			},
			initialGoEasyListeners() {
				// 监听群聊消息
				this.$chat.eventGroupMessageReceived(message => {
					console.log('监听群消息', message);
					let groupId = message.groupId;
					if (groupId === this.group.uuid) {
						this.messages.push(message);
						//聊天时，收到消息标记为已读
						this.markGroupMessageAsRead(groupId);
						//收到新消息，是滚动到最底部
						this.scrollToBottom();
					}
				})
			},
			createTextMessage() {
				let that = this;
				if (this.content.trim() !== '') {
					let body = this.content;
					if (this.content.length >= 50) {
						body = this.content.substring(0, 30) + '...';
					}
					let message = that.$chat.createMsg(body,that.currentUser, that.group, 'group');
					this.messages.push(message);
					console.log(this.messages);
					this.scrollToBottom();
					//发送
					that.$chat.sendTextMsg(message);
				}
				this.content = '';
			},
			//长按用户头像
			longPressUser(user) {
				console.log(user);
				this.content += '@' + user.senderData.name;
			},

			selectMessages(e) {
				const selectedMessageIds = e.detail.value;
				let selectedMessages = [];
				this.messages.forEach(message => {
					if (selectedMessageIds.includes(message.messageId)) {
						selectedMessages.push(message);
					}
				})
				this.messageSelector.messages = selectedMessages;
			},
			loadHistoryMessage(scrollToBottom) { //历史消息
				let lastMessageTimeStamp;
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				let that = this;
				this.$chat
					.groupHistory(that.group.uuid, lastMessageTimeStamp)
					.then(result => {
						console.log("result:", result);
						uni.stopPullDownRefresh();
						let messages = result.content;
						if (messages.length === 0) {
							that.allHistoryLoaded = true;
						} else {
							that.messages = messages.concat(that.messages);
							console.log(that.messages)
							if (scrollToBottom) {
								that.scrollToBottom();
								//收到的消息设置为已读
								that.$chat.markMsgAsRead(that.group.uuid);
							}
						}
					}).catch(error => {
						//获取失败
						console.log('获取历史消息失败:', error);
						uni.stopPullDownRefresh();
					})
			},
			showMembers() { //显示群成员
				console.log('显示群成员')
			},

			messageInputFocusin() {},

			scrollToBottom() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration: 0
					})
				}, 500);
			},
			//标记为已读
			markGroupMessageAsRead(groupId) {
				this.$chat.markGroupMsgAsRead(groupId)
			}
		}
	}
</script>

<style>
	.chatInterface .action-box .action-top .message-input {
		margin-left: 20rpx;
		border-radius: 12rpx;
		background: #EFEFEF;
		height: 80rpx;
	}

	.chatInterface .action-box .action-top .message-input input {
		width: 520rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 20rpx;
		font-size: 28rpx;
	}

	.chatInterface .action-box .action-top .send-message-btn {
		margin-left: 30rpx;
		font-size: 30rpx;
		text-align: center;
		width: 120rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20rpx;
		background-color: aliceblue;
		color: #0d0e0e;
	}
</style>
