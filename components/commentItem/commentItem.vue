<template>
	<view>
		<!-- 评论组件 -->
		<view class="dis-flex flex-y-center  bg-white-ff" :class="isTop?'fixed-top pl20 pr20 box-size pb20':''">
			<view class="f-24 comment-tab-item "
				:class="commentTabAct==item.id?'bg-red-d6-ec col-white-ff':'col-brank-10 bg-gray-ea'"
				v-for="(item,index) in commentTab" :key="index" @tap.stop="changeCommentTab(item.id)">
				{{item.name}}<text v-if="item.num">{{item.num}}</text>
			</view>
		</view>
		<block v-if="list.length>0">
			<view class="comment-item mt30 mb24" :class="isTop?'top':''" v-for="(item,index) in list" :key="index">
				<!-- 用户信息 -->
				<view class="dis-flex flex-y-center mb20">
					<image class="user-head mr24" :src="item.member.portrait"></image>
					<view class="w-85 ">
						<view class=" dis-flex flex-y-center flex-x-between">
							<view class="f-28 f-b col-brank-20 w-55 onelist-hidden">{{item.member.user_name}}</view>
							<text class="f-24 col-gray-88">{{item.create_time}}</text>
						</view>
						<view class="dis-flex flex-y-center">
							<image class="wh28 mr5" v-for="(items,index) in item.star" :key="index"
								src="~@/static/img/case.png">
							</image>
							<text v-if="item.star" class="f-24 col-gray-88 ml10">{{item.star>3?'非常满意':'感觉一般'}}</text>
						</view>
					</view>
				</view>
				<!-- 评论内容 -->
				<view class="f-28 col-brank-20 mb20" style="overflow-wrap: break-word;">{{item.body}}</view>
				<!-- 评论图片 -->
				<view class="dis-flex flex-y-center flex-wrap comment-item-cover">
					<image class="radio-8" mode="aspectFill" :src="items" v-for="(items,indexs) in item.media"
						:key="indexs" @tap.stop="previewImage(indexs,item.media)"></image>
				</view>
				<!-- 商家回复 -->
				<view class="cont20 f-24 col-gray-88 bg-gray-f7" v-if="item.reply">商家回复: {{item.reply}}
				</view>
			</view>
		</block>
		<null-data title="暂无评论" v-if="list.length==0"></null-data>

	</view>
</template>

<script>
	export default {
		name: "commentItem",
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			isTop: {
				type: Boolean,
				default: false, //是否置顶
			},
			commentTab: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				commentTabAct: 0, //选中的评论类型id
			};
		},
		mounted() {
			console.log(this.list)

		},
		methods: {
			//修改当前选中的评论类型
			changeCommentTab(id) {
				this.commentTabAct = id
				this.$emit('changeCommentTab', id)
			},
			//预览评论图片
			previewImage(index, cover) {
				uni.previewImage({
					urls: cover,
					current: index,
					indicator: true,
					loop: true,
					fail(e) {
						console.log(e)
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.top {
		padding: 0 24rpx;
		box-sizing: border-box;
		margin-top: 88rpx;
	}

	.comment-tab-item {
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 4rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
	}

	.user-head {
		width: 72rpx;
		height: 72rpx;
		border-radius: 100%;
	}

	.comment-item-cover image {
		width: 216rpx;
		height: 216rpx;
		margin-right: 18rpx;
		margin-bottom: 20rpx;
	}

	.comment-item-cover image:nth-child(3n) {
		margin-right: 0;
	}
</style>