import GoEasy from '../libs/goeasy.min.js'

//goeasy官网注册
// const APPKEY = 'BC-55ab946530314f44807f56d58e427d67'
const APPKEY = 'BC-5c7610c9dc8049ee8796c2ef360eacd4'

//创建唯一Chat实例
let CreatChat = (function() {
	let instance;
	return function() {
		if (instance) {
			return instance;
		}
		return instance = new Chat();
	}
})();

let Chat = function() {
	this.goEasy = GoEasy.getInstance({
		host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
		appkey: APPKEY, // common key,
		modules: ['im', 'pubsub'], //根据需要，传入‘pubsub’或'im’，或数组方式同时传入
		// true表示支持通知栏提醒，false则表示不需要通知栏提醒
		allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
	});
}


/**
 * 建立连接
 * @param {object} user 当前用户
 */
Chat.prototype.connect = function(user, func) {

	return new Promise((resolve, reject) => {
		this.goEasy.connect({
			id: user.uuid, //pubsub选填，im必填，最大长度60字符
			data: {
				"avatar": user.avatar,
				"name": user.name
			}, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
			onSuccess: () => { //连接成功
				console.log("GoEasy connect successfully.") //连接成功后注册
				resolve('success')
			},
			onFailed: error => { //连接失败
				console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error
					.content);
				reject('fail')
			},
			onProgress: attempts => { //连接或自动重连中
				console.log("GoEasy is connecting", attempts);
			}
		});
	})
}

//断开连接
Chat.prototype.disconnect = function() {
	this.goEasy.disconnect({
		onSuccess: () => {
			console.log("GoEasy disconnect successfully.")
		},
		onFailed: error => {
			console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
		}
	});
}

//判断连接状态
Chat.prototype.getConnectionStatus = function() {
	return this.goEasy.getConnectionStatus();
}

/**
 * 发送通知
 * @param {Object} content 通知内容
 * @param {Object} channel 通知频道
 */
Chat.prototype.publishMsg = function(content, channel) {
	console.log(this.goEasy.pubsub)
	this.goEasy.pubsub.publish({
		channel: channel,
		message: JSON.stringify(content),
		notification: {
			title: "收到一条新消息",
			body: content // 字段最长50字符
		},
		onSuccess: function() {
			console.log('消息发送成功')
		},
		onFailed: function(error) {
			console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
		}
	});
}

/**
 * 订阅消息通知
 * @param {Object} channel
 * @param {Object} func
 */
Chat.prototype.subscribe = function(channel, func) {
	this.goEasy.pubsub.subscribe({
		channel: channel,
		onMessage: function(message) {
			func(message)
		},
		onSuccess: function() {
			console.log('订阅成功channel:' + channel)
		},
		onFailed: function(error) {
			console.log("订阅失败，错误编码：" + error.code + " 错误信息：" + error.content);
		}
	});
}


/**
 * 创建消息
 * @param {string} content 内容
 * @param {object} currentUser 发送者
 * @param {object} toUser 接收者
 * @param {string} type  private 或group
 */
Chat.prototype.createMsg = function(content, currentUser, toUser, type) {
	let textMessage = this.goEasy.im.createTextMessage({
		text: content,
		to: {
			type: type, //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
			id: toUser.uuid,
			data: {
				"avatar": toUser.avatar,
				"name": toUser.name
			}, //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
			notification: {
				title: currentUser.name + '发来一段文字',
				body: content
			}
		}
	});
	return textMessage;
}

//发送私聊文字消息
Chat.prototype.sendTextMsg = function(msg) {
	this.goEasy.im.sendMessage({
		message: msg,
		onSuccess: function(msg) {
			console.log('发送成功.', msg);
		},
		onFailed: function(error) {
			if (error.code === 507) {
				console.log(
					'发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://www.goeasy.io/cn/docs/goeasy-2.x/im/message/media/send-media-message.html'
				);
			} else {
				console.log('发送失败:', error);
			}
		}
	});
}

// 加载最新的会话列表
Chat.prototype.loadConversations = function() {
	return new Promise((resolve, reject) => {
		this.goEasy.im.latestConversations({
			onSuccess: (result) => {
				resolve(result);
			},
			onFailed: (error) => {
				reject(error);
			}
		});
	})

}
//监听群消息
Chat.prototype.subscribeGroup = function(groupIds) {
	this.goEasy.im.subscribeGroup({
		groupIds: groupIds,
		onSuccess: function() {
			console.log(GoEasy.IM_SCENE.GROUP)
			console.log('订阅群消息成功');
		},
		onFailed: function(error) {
			console.log('订阅群消息失败:', error);
		}
	});
}

//取消订阅
Chat.prototype.unsubscribeGroup = function(groupID) {
	this.goEasy.im.unsubscribeGroup({
		groupId: groupID,
		onSuccess: function(message) { //取消成功
			console.log("取消订阅群：" + groupID + "成功");
		},
		onFailed: function(error) { //取消失败
			console.log("取消订阅群失败, code:" + error.code + " content:" + error.content);
		}
	});
}
// 监听会话列表变化
Chat.prototype.listenConversationUpdate = function(func) {
	this.goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (content) => {
		func(content);
	});
}

/**
 * 监听私聊消息
 * @param {function} func 
 */
Chat.prototype.eventPtivateMessageReceved = function(func) {
	this.goEasy.im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
		func(message);
	});
}

/**
 * 监听群消息
 * @param {Function()} func 
 */
Chat.prototype.eventGroupMessageReceived = function(func) {
	this.goEasy.im.on(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, (message) => {
		func(message);
	});
}

/**
 * 监听消息删除
 * @param {Function()} func 
 */
Chat.prototype.eventMessageDeleted = function(func) {
	this.goEasy.im.on(GoEasy.IM_EVENT.MESSAGE_DELETED, (delectedMessages) => {
		func(delectedMessages);
	})
}
/**
 * 标记私聊消息为已读
 * @param {string} uuid  用户ID
 */
Chat.prototype.markMsgAsRead = function(uuid) {
	this.goEasy.im.markPrivateMessageAsRead({
		userId: uuid,
		onSuccess: function() {
			console.log('标记私聊已读成功');
		},
		onFailed: function(error) {
			console.log("标记私聊已读失败", error);
		}
	});
}

/**
 * 标记群聊消息为已读
 * @param {string} groupId  群聊ID
 */
Chat.prototype.markGroupMsgAsRead = function(groupId) {
	this.goEasy.im.markGroupMessageAsRead({
		groupId: groupId,
		onSuccess: function() {
			console.log('标记私聊已读成功');
		},
		onFailed: function(error) {
			console.log("标记私聊已读失败", error);
		}
	});
}


/**
 * 加载历史消息
 * @param {string} userId 用户ID
 * @param {*} lastTimestamp 上条消息时间戳
 */
Chat.prototype.history = function(userId, lastTimestamp) {
	let that = this;
	return new Promise((resolve, reject) => {
		console.log('加载历史消息...' + userId)
		that.goEasy.im.history({
			userId: userId,
			lastTimestamp: lastTimestamp,
			limit: 10,
			onSuccess: (result) => {
				resolve(result)
			},
			onFailed: (error) => {
				//获取失败
				console.log('获取历史消息失败:', error);
				reject(error)
			}
		});
	})
}

/**
 * 加载群历史消息
 * @param {string} groupId 用户ID
 * @param {*} lastTimestamp 上条消息时间戳
 */
Chat.prototype.groupHistory = function(groupId, lastTimestamp) {
	let that = this;
	return new Promise((resolve, reject) => {
		console.log('加载历史消息...' + groupId)
		that.goEasy.im.history({
			groupId: groupId,
			lastTimestamp: lastTimestamp,
			limit: 10,
			onSuccess: (result) => {
				resolve(result)
			},
			onFailed: (error) => {
				//获取失败
				console.log('获取历史消息失败:', error);
				reject(error)
			}
		});
	})
}

/**
 * pubsub历史通知
 * @param {Object} channel
 */
Chat.prototype.pubsubHistory = function(channel) {
	let that = this;
	return new Promise((resolve, reject) => {
		that.goEasy.pubsub.history({
			channel: channel,
			limit: 30,
			onSuccess: result => {
				resolve(result)
			},
			onFailed: error => {
				reject(error)
			}
		})
	})
}

/**
 * 清空监听器
 */
Chat.prototype.clear = function() {
	this.goEasy.im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, () => {});
	this.goEasy.im.on(GoEasy.IM_EVENT.MESSAGE_DELETED, () => {});
}

//清空群聊监听
Chat.prototype.clearGroup = function() {
	this.goEasy.im.on(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, () => {});
	this.goEasy.im.on(GoEasy.IM_EVENT.MESSAGE_DELETED, () => {});
}

export default new CreatChat()