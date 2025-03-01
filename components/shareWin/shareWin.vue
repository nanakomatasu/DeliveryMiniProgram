<template>
	<view :catchtouchmove="true">
		<!-- 分享弹窗 -->
		<u-popup :show="shopShow">
			<view>
				<view class="dis-flex flex-y-center flex-x-center">
					<view
						class="border-b-f7 dis-flex flex-y-center flex-x-center flex-dir-column pt32 pb32 pl26 pr26 box-size"
						v-for="(item,index) in shareList" :key="index" @click="share(index)">
						<image class="wh88" :src="item.icon"></image>
						<view class="f-24 mt16 col-brank-20">{{item.name}}</view>
					</view>
				</view>
				<view class="t-c cancel f-32 col-brank-20" @tap="cancel">取消</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	// #ifdef H5
	import MShare from '@/libs/m-share.js'
	// #endif 
	import urlConfig from '@/config/index.js'
	export default {
		name: "shareWin",
		props: {
			//父组件传值 是否显示
			shopShow: {
				type: Boolean,
				default: false
			},
			shareContent: {
				type: Object,
				default: function() {
					return {
						type: 0,
						href: urlConfig+"/h5",
						title: "美食分享",
						summary: "校园美食，来自校U",
						imageUrl: "",
					}
				}
			}
		},
		data() {
			return {
				shareList: [{ //分享的列表
					icon: `${this.$url}resource/img/share01.png`,
					name: "微信"
				}, {
					icon: `${this.$url}resource/img/share02.png`,
					name: "朋友圈"
				}, {
					icon: `${this.$url}resource/img/share03.png`,
					name: "QQ"
				}, {
					icon: `${this.$url}resource/img/share04.png`,
					name: "QQ空间"
				}, {
					icon: `${this.$url}resource/img/share05.png`,
					name: "复制链接"
				}],
			};
		},
		methods: {
			cancel() {
				this.$emit("cancel");
			},
			share(index) {
				// #ifdef APP-PLUS
				if (index == 0) {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession", //微信聊天
						type: 0,
						href: this.shareContent.href,
						title: this.shareContent.title,
						summary: this.shareContent.summary,
						imageUrl: this.shareContent.imageUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				} else if (index == 1) {
					uni.share({
						provider: "weixin",
						scene: "WXSceneTimeline", //微信朋友圈
						type: 0,
						href: this.shareContent.href,
						title: this.shareContent.title,
						summary: this.shareContent.summary,
						imageUrl: this.shareContent.imageUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				} else if (index == 2 || index == 3) {
					uni.share({
						provider: "qq",
						type: 1,
						href: this.shareContent.href,
						title: this.shareContent.title,
						summary: this.shareContent.summary,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				} else {
					uni.setClipboardData({
						data: this.shareContent.href,
						success: () => {
							uni.showToast({
								title: '复制成功',
								icon:'none',
							})
						}
					});
				}
				// #endif
				//h5分享
				// #ifdef H5
				this.useMshare(index);
				// #endif
			},
			useMshare(index) {
				console.log(MShare)
				let config = {
					title: this.shareContent.title, // 标题
					desc: this.shareContent.summary, // 描述
					imgUrl: this.shareContent.imageUrl, // 图片
					types: ['wx', 'wxline', 'qq', 'qzone', ], // 开启的分享图标, 默认为全部
					fnDoShare: function(type) {
						console.log(1);
					}
				};
				console.log(config)
				// 基础配置
				MShare.init(config);
				switch (index) {
					case 0:
						MShare.to('wx', config);
						break;
					case 1:
						MShare.to('wxline', config);
						break;
					case 2:
						MShare.to('qq', config);
						break;
					case 3:
						MShare.to('qzone', config);
						break;
					case 4:
						let textarea = document.createElement("textarea");
						textarea.value = this.shareContent.href;
						textarea.readOnly = "readOnly";
						document.body.appendChild(textarea);
						textarea.select();
						textarea.setSelectionRange(0, this.shareContent.href.length);
						uni.showToast({ //提示
							title: '复制成功',
							icon:'none',
						})
						document.execCommand("copy");
						textarea.remove();
						break
				}
			}
		}

	}
</script>

<style lang="scss">
	.cancel {
		height: 90rpx;
		line-height: 90rpx;
	}
</style>
