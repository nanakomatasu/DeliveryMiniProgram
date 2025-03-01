<template>
	<view class="p-t-20 p-r-20 p-l-20">
		<view class="">
			<u--textarea v-model="value2" placeholder="请输入内容" border="none" count confirmType="done"></u--textarea>
		</view>

		<!-- <view class="m-t-25">
			<view class="">
				快捷标签
			</view>

			<view class="flex-wr m-t-25">
				<view class="label f-16" v-for="(item,index) in list" :key="index" @tap="choose(item.remark)">
					{{item.remark}}
				</view>
			</view>
		</view>
 -->
		<view class="complete flex-center m-t-25" @tap="choice">
			完成
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value2: '',
				list:[]
			}
		},
		
		onLoad(e){
			if(e.remark){
				this.value2=e.remark
			}
			// this.list=JSON.parse(e.remarks)
		},
		
		methods: {
			choose(remark){
			this.value2=remark
			},
			choice(item){
				var pages = getCurrentPages();
				    var prevPage = pages[pages.length - 2]; //上一个页面
				    prevPage.$vm.otherFunr(this.value2);//重点$vm
				    uni.navigateBack();
			},
		}
	}
</script>

<style>
	.label {
		padding: 10rpx 30rpx 10rpx 30rpx;
		border: 1rpx #888888 solid;
		border-radius: 40rpx;
		color: #888888;
	}

	.complete {
		width: 100%;
		height: 72rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		font-size: 28rpx;
		color: #FEFFFE;
	}
	
	.u-textarea{
		height: 200rpx;
	    border-radius: 4rpx;
	    background-color: #fff;
	    position: relative;
	    display: flex;
	    flex-direction: row;
	    flex: 1;
	    padding: 9rpx;
	}
	
</style>
