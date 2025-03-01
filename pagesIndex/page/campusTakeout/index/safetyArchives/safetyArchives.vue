<template>
	<view>
		<view class="pl24 pr24 pt24 pb24 box-size">
			<view class="radio-16 bg-white-ff  pl20 pr20 pt32 pb20 box-size ">
				<view class="f-32 col-brank-20 mb20">商家资质信息公示</view>
				<view class="flex-x-between dis-flex flex-y-center flex-wrap" v-if="imgList.length>0">
					<image mode="aspectFill" class="cover mb16 radio-16" :src="item" v-for="(item,index) in imgList" :key="index" @tap="previewImage(index)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",//商家id
				imgList:[],//食品安全列表
			};
		},
		onLoad(e) {
			this.id=e.id
		},
		onShow() {
			this.getMerchantInfo()
		},
		methods:{
			//获取商家详情
			async getMerchantInfo() {
				var that = this
				const {
					data,
					status
				} = await that.$api.merchantInfo({
					merchant_id: this.id,
				})
				if (status == 200) {
					this.$set(this.imgList,0,data.business_license)
					this.$set(this.imgList,1,data.food_business_license)
				}
			},
			//预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.imgList,
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
	.cover{
		width: 324rpx;
		height: 236rpx;
		
	}
</style>
