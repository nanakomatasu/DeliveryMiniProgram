<template>
	<view class="album">
		<view class="flex-about m-t-40" v-for="(item,index) in shopList" :key="index" v-if="item.pics">
			<view class="m-t-20" style="width: 144rpx;">
				<view class="f-32 color-20 f-600">{{item.create_time.substring(5,7)}}月{{item.create_time.substring(8,10)}}日</view>
				<view class="flex-right f-24 c-99 m-t-10">{{item.create_time.substring(0,4)}}年</view>
			</view>
			<view class="flex-wr " style="width:78%;">
				<view class="flex-space m-l-15 m-t-20"  v-for="(items,indexs) in item.pics" :keu="indexs">
					<view class="">
						<image class="imgx bor-r-16" :src="items" mode="" ></image>
					</view>
				</view>
			</view>
		</view>
		
		<null-data v-if="shopList.length==0"></null-data>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				status: "loadmore",
				shopList: [],
			}
		},
		
		onShow() {
			this.getMerchantLists()
		},
		
		onReachBottom() {
			this.getMerchantLists(true)
		},
		
		methods: {
			
			async getMerchantLists(isPage) {
				let that = this
				if (this.isLoad) {
					return
				}
				this.isLoad = true
				// uni.showLoading({
				// 	title: "正在加载中"
				// })
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
				} = await that.$api.circleMypostList({
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					
					this.shopList.forEach((item,index)=>{
						if(item.pics){
							this.shopList[index].pics=item.pics.split(',')
						}
						
						
						
						console.log(item.create_time.substring(8,10),"-=-=-");
						
						
					})
					console.log(that.shopList,"-=-=-");
					
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
			
				}
			},
			
			
			
			
			
			
		}
	}
</script>

<style>
.album{
	padding: 0rpx 25rpx 0rpx 25rpx;
}
.imgx{
	width: 164rpx;
	height: 164rpx;
}
</style>
