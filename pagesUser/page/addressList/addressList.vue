<template>
	
		<view class="cont24 p-b-120" >
			
			<view @tap="onLink('/pagesUser/page/addAddress/addAddress?id='+item.id+'&length='+addressList.length)"
				class="bg-white-ff dis-flex flex-y-center flex-x-between mb24 radio-16 pt24 pl30 pr24 box-size pb24"
				v-for="(item,index) in addressList" :key="index">
				<view class="w-95">
					<view class="f-32 f-b mb20 twolist-hidden"><!-- <text v-if="item.is_default==1"
							class="status radio-8 bg-red-d6-ec col-white-ff f-24">默认</text> -->{{item.address+item.buildText+item.details}}</view>
					<view class="f-24 col-brank-20">
						<text class="mr10">{{item.member_name}}</text>
						<text>{{item.member_tel}}</text>
					</view>
				</view>
				<u-icon name="edit-pen-fill" color="#888888" size="38rpx"></u-icon>
			</view>
			<null-data title="暂无收货地址" v-if="addressList.length==0"></null-data>
			<view class="btn-box fixed-bottom">
				<view class="btn f-32 col-white-ff bg-red-d6-ec radio-48 t-c"
					@tap="onLink('/pagesUser/page/addAddress/addAddress?length='+addressList.length)">新增收货地址</view>
			</view>
			
		</view>
	
</template>

<script>
	export default {
		data() {
			return {
				addressList: []
			};
		},
		onShow() {
			this.getAddressListData()
		},
		onReachBottom() {
			this.getAddressListData(true)
		},
		methods: {
			//添加地址
			onLink(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
			//获取收货列表
			async getAddressListData(isPage) {
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.addressList = []
					this.status = 'loadmore'
				}

				var addressList = this.addressList;
				const {
					data,
					status
				} = await that.$api.getAddressList({
					page: this.page,
					limit: 10,
				})
				uni.hideLoading()
				if (status == 200) {
					data.data.forEach(item => {
						let arr = item.buildings?JSON.parse(item.buildings): []
						item.buildText = arr.join('')
					})
					addressList = addressList.concat(data.data)
					that.addressList = addressList
					if (data.last_page > this.page) {
						that.status = 'nomore'
					}

				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}

	.status {
		padding: 0 10rpx;
		margin-right: 10rpx;
		position: relative;
		top: -2rpx;


	}
</style>
