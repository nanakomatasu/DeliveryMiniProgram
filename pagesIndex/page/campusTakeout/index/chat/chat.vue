<template>
	<view class="chatInterface">
		<view class="scroll-view">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<checkbox-group>
				<!--消息记录-->
				<view v-for="(message,index) in messages" :key="message.messageId">
					<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
					<view class="time-lag">
						{{renderMessageDate(message, index)}}
					</view>

					<view class="message-item">
						<view class="message-item-content" :class="{'self' : message.senderId ===  currentUser.uuid}">
							<view class="avatar">
								<image
									:src="message.senderId === currentUser.uuid? currentUser.portrait : toUser.avatar">
								</image>
							</view>
							<view class="content" @longpress="showActionPopup(message)">
								<view class="message-payload">
									<b class="pending" v-if="message.status === 'sending'"></b>
									<b class="send-fail" v-if="message.status === 'fail'"></b>
									<view v-if="message.type === 'text'" v-html="renderTextMessage(message)"></view>
									<!-- <view class="video-snapshot" v-if="message.type === 'video'"
										:data-url="message.payload.video.url" @click="playVideo">
										<image :src="message.payload.thumbnail.url" mode="aspectFit"></image>
										<view class="video-play-icon"></view>
									</view> -->
								</view>
								<view v-if="message.senderId === currentUser.uuid"
									:class="message.read ?'message-read':'message-unread'">
									<view v-if="message.status === 'success'">{{message.read?'已读':'未读'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="action-box">
			<scroll-view scroll-y="true" class="scroll-Y" v-if="ReplyList.length > 0">
				<view class="action-tip">
					<view class="" style="padding-bottom: 20rpx;" v-for="(item,index) in ReplyList"
						@click="OnReply(item)">
						{{item.question}}
					</view>
				</view>
			</scroll-view>
			<view class="action-top">
				<view class="message-input">
					<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
					<input type="text" maxlength="700" placeholder="发送消息" v-model="content"
						@input="$u.debounce(listAutoReply, 700)" @focus="messageInputFocusin">
				</view>
				<span class="send-message-btn" @click="createTextMessage">发送</span>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: 'privateChat',
		data() {
			return {
				//聊天文本框
				content: '',
				toUser: {},
				currentUser: {},
				//消息记录
				messages: [],
				//是否加载完所有历史消息
				allHistoryLoaded: false,
				shop_id: '',
				ReplyList: [], //自动回复列表,
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.toUser.name
			});
		},

		onLoad(options) {
			//测试聊天对象merchant +id
			this.toUser = JSON.parse(decodeURIComponent(options.toUser));
			// this.toUser.name = user.name;
			// this.toUser.avatar = user.avatar;
			// this.toUser.uuid = user.uuid;
			this.shop_id = this.toUser.shop_id

			console.log('当前用户')
			console.log(this.toUser)
			this.currentUser = uni.getStorageSync('userInfo');
			console.log(this.currentUser)
			this.currentUser.uuid = 'user' + this.currentUser.id;
			this.currentUser.name = this.currentUser.user_name;
			//获取最新的好友信息
			//朋友信息
			this.initialGoEasyListeners();
			this.loadHistoryMessage(true);
		},
		onShow() {

		},
		onPullDownRefresh(e) {
			this.loadHistoryMessage(false);
		},
		onUnload() {
			//退出聊天页面之前，清空监听器
			this.$chat.clear();
		},
		methods: {
			//渲染文本消息，如果包含表情，替换为图片
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderTextMessage(message) {
				return '<span class="text-content">' + message.payload.text + '</span>'
			},
			//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderMessageDate(message, index) {
				if (index === 0) {
					return this.formatDate(message.timestamp)
				} else {
					if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
						return this.formatDate(message.timestamp)
					}
				}
				return '';
			},
			initialGoEasyListeners() {
				// 监听私聊消息
				this.$chat.eventPtivateMessageReceved(message => {
					console.log('监听私聊消息', message);
					let senderId = message.senderId;
					let receiverId = message.receiverId;
					let friendId = this.currentUser.uuid === senderId ? receiverId : senderId;
					if (friendId === this.toUser.uuid) {
						this.messages.push(message);
						//聊天时，收到消息标记为已读
						this.markPrivateMessageAsRead();
						//收到新消息，是滚动到最底部
						this.scrollToBottom();
					}
				})
			},
			createTextMessage() {
				console.log('创建消息');
				console.log('当前用户:');
				console.log(this.currentUser);
				console.log('送达用户');
				console.log(this.toUser);
				let that = this;
				if (this.content.trim() !== '') {
					let body = this.content;
					if (this.content.length >= 50) {
						body = this.content.substring(0, 30) + '...';
					}
					let message = that.$chat.createMsg(body, that.currentUser, that.toUser, 'private');
					this.messages.push(message);
					console.log(message, 'message');
					this.scrollToBottom();
					//发送
					that.$chat.sendTextMsg(message);
				}
				this.content = '';
			},


			loadHistoryMessage(scrollToBottom) { //历史消息
				console.log('历史')
				console.log(this.toUser)
				console.log('查询历史消息:' + this.toUser.uuid)
				let that = this;
				let lastMessageTimeStamp = null;
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				that.$chat
					.history(that.toUser.uuid, lastMessageTimeStamp)
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
								that.$chat.markMsgAsRead(that.toUser.uuid);
							}
						}
					}).catch(error => {
						//获取失败
						console.log('获取历史消息失败:', error);
						uni.stopPullDownRefresh();
					})
			},
			messageInputFocusin() {

			},
			//校U自动回复
			listAutoReply() {
				if (this.content) {
					const data = {
						shop_id: this.shop_id,
						// shop_id: 3,
						key: this.content,
					}
					this.$http.post('/api/shop/listAutoReply', data)
						.then(res => {
							if (res.code == 200) {
								this.ReplyList = res.data.list
							}
						})
				} else {
					this.ReplyList = []
				}
			},
			OnReply(item) {
				let that = this;
				this.content = item.answer
				if (this.content.trim() !== '') {
					let body = this.content;
					if (this.content.length >= 50) {
						body = this.content.substring(0, 30) + '...';
					}
					
					let message = that.$chat.createMsg(body, that.currentUser, that.toUser, 'private');

					message.receiverId = this.currentUser.uuid
					message.senderId = this.toUser.uuid

					this.messages.push(message);
					console.log(message, 'message');
					this.scrollToBottom();
				}
				this.content = '';
				this.ReplyList = []
			},
			scrollToBottom() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration: 0
					})
				}, 500);
			},
			markPrivateMessageAsRead() {

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

	.chatInterface .action-box .action-tip {
		max-height: 840rpx;
		padding: 20rpx;
		overflow-y: auto;
		/* overflow: hidden; */
	}

	.scroll-Y {
		max-height: 300rpx;
		/* max-height: 840rpx; */
	}
</style>
