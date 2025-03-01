<template>
	<view>
		<view class="comment cont24-32 bg-white-ff">
			<view class="dis-flex flex-y-center flex-x-between mb20">
				<view class="f-32 f-b col-brank-20">{{title}}</view>
				<view class="dis-flex flex-y-center" @tap.stop="toList">
					<view class="col-gray-8e mr8 f-24">全部评论</view>
					<u-icon name="arrow-right" color="#999999" size="28rpx"></u-icon>
				</view>
			</view>
			
			<commentItem :list="list" :commentTab="commentTab" @changeCommentTab="changeCommentTab"></commentItem>
			<view class="dis-flex flex-x-center line-btn flex-y-center " @tap.stop="toList">
				<text class="col-brank-20">查看全部评论</text>
				<u-icon name="arrow-right" color="#999999" size="24rpx"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"commentOne",
		props:{
			title:{
				type:String,
				default:"外卖评价"
			},
			list:{
				type:Array,
				default:[]
			},
			commentTab:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				commentTabAct: 0, //选中的评论类型id
			};
		},
		methods:{
			changeCommentTab(id) {
				console.log(id)
				// this.commentTabAct = id
				// this.getOrderCommentList()
				this.$emit('changeCommentTab',id)
			},
			toList(){
				// 全部评论点击事件
				this.$emit('toList')
			}
			
		}
		
		
	}
</script>

<style lang="scss">

	.line-btn {
		width: 100%;
		height: 80rpx;
		border-radius: 8rpx;
		line-height: 80rpx;
		border: 1px solid rgba($color:#DDDDDD, $alpha: 0.9);
	}
</style>
