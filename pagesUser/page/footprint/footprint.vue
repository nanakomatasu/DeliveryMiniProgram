<template>
	<view class="pl24 pr24 box-size">
		<view class="mt22 bg-white-ff cont24 radio-16 dis-flex flex-y-center" v-for="(item,index) in shopList" :key="index">
			<image class="wh148 radio-8 mr24" :src="item.info.img||item.info.logo"></image>
			<view class="w-75 dis-flex   right flex-about">
					<view class="f-32 f-b col-gray-33 onelist-hidden w-100 flex-about caoshus">
					{{item.info.name}}
					</view>
					<image class="wh28" src="/pagesUser/static/del.png" @tap.stop="cancel(item)"></image>
				<!-- <view>
					<view class="dis-flex flex-y-center mb14">
						<image class="wh24" src="/static/img/case.png"></image>
						<view class="col-orange-ff ml8 f-b mr16">4.5</view>
						<view class="col-gray-88 f-24">¥20/人</view>
					</view>
					<view class="dis-flex flex-y-center">
						<view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb col-red-d9">满30减15</view>
						<view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb  col-red-d9">首单满减</view>
					</view>
				</view> -->
			</view>
		</view>
		
		<view class="m-t-60" v-if="shopList.length==0">
			<view class="flex-center">
				<image class="zanwu " src="/pagesUser/static/zanwu.png"></image>
			</view>
			<view class="flex-center">
				暂无足迹
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				status: "loadmore",
				shopList:[],
				
			};
		},
		onReachBottom() {
			this.getMerchantLists(true)
		},
		onLoad(){
		this.getMerchantLists()	
		},
		methods:{
			async getMerchantLists(isPage) {
				if (this.isLoad) {
					return
				}
				this.isLoad = true
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.shopList = []
					this.status = 'loadmore'
				}
				var shopList = this.shopList;
				const {
					data,
					status
				} = await that.$api.browse({
					limit:10,
					page:this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
			
				}
			},
			
			
			//删除足迹
			cancel(item){
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取删除足迹',
					success: function (res) {
						if (res.confirm) {
							that.cancelx(item)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			
			//删除足迹接口
			async cancelx(item){
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.cutoutbrowse({
					id:item.id,
				})
				uni.hideLoading()
				if (result.status == 200) {
					this.getMerchantLists()
				}
				
			},
			
			
			
			
			
		},
		
	}
</script>

<style lang="scss">
.right{
	height: 148rpx;
}
.label{
	height: 28rpx;
	line-height: 28rpx;
}
.zanwu{
		width: 304rpx;
		height: 304rpx;
	}
</style>
