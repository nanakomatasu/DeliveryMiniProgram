<template>
	<view class="cont20">
		<form @submit="commentOrder">
			<view class="bg-white-ff radio-16 cont32-24">
				<view class="dis-flex flex-y-center mb20 flex-x-between">
					<view class="f-32 f-b col-brank-20">您对商家/菜品满意吗？</view>
						<label class="dis-flex flex-y-center " @click="changeAnonymous">
							<view class="f-24">匿名提交</view>
							<radio value="1"  :checked="anonymous" color="#D62E36"></radio>
						</label>
				</view>
				<view class="dis-flex flex-y-center mb40">
					<image class="wh-80 mr20 radio-4" mode="aspectFill" :src="detail.logo"></image>
					<view class="f-28 col-gray-33 f-b">{{detail.name}}</view>
				</view>
				<view class="dis-flex flex-y-center mb40">
					<view class="col-gray-33 mr32">评分</view>
					<u-rate :count="5" size="58rpx" inactiveIcon="star-fill" :minCount="1" v-model="value"
						gutter="24rpx" active-color="#FF9531" inactive-color="#D8D8D8"></u-rate>
				</view>
				<textarea class="mb20 f-28" name="body" placeholder="给点评价吧,最多500字" maxlength="500"></textarea>
				<u-upload uploadIcon="camera" :fileList="media" uploadText="添加图片" width="148rpx" height="148rpx"
					uploadIconColor="#C1C1C1" :multiple="true" maxCount="9" @afterRead="afterRead" @delete="deletePic"
					name="1" ></u-upload>
			</view>
			<view class="btn-box fixed-bottom">
				<button class="radio-48 bg-red-d6-ec col-white-ff f-32" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				merchant_id: '', //商家id
				id: "", //订单id
				order_type: "", //订单类型
				detail: {}, //商家详情
				value: 0, //默认评价星
				media: [], //评论图片
				anonymous:false,
			};
		},
		onLoad(e) {
			this.merchant_id = e.merchant_id
			this.id = e.id
			this.order_type = e.order_type
		},
		onShow() {
			this.getMerchantInfo()
		},
		methods: {
			//评论
			commentOrder(e){
				console.log(this.media)
				var body=e.detail.value.body
				if(this.value==0){
					this.$u.toast("您还没有评分哦~")
				}else if(body==''){
					this.$u.toast("给点评价吧~")
				}else{
					this.postOrderCommentOrder(body)
				}
			},
			async postOrderCommentOrder(body) {
				var media=[]
				this.media.forEach(item=>{
					media.push(item.url)
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.orderCommentOrder({
					order_id: this.id,//订单id
					order_type:this.order_type,//1外卖2附近，3优选
					body:body,//内容
					anonymous:this.anonymous==1?1:2,
					star:this.value,
					media:media
				})
				if (status == 200) {
					this.$u.toast("评论成功")
					setTimeout(function(){
						// uni.redirectTo({
						// 	url:'/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id='+that.merchant_id
						// })
						uni.redirectTo({
							url: '/pagesUser/page/orderList/orderList'
						});
						
						
					},500)
				}
			},
			//更改是否匿名
			changeAnonymous(){
				console.log(this.merchant_id)
				this.anonymous=!this.anonymous
			},
			// 删除图片
			deletePic(event) {
				this.media.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.media.length
				lists.map((item) => {
					this.media.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.media[fileListLen]
					this.media.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.$url+'/addonsapi/Base/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'files',
						header:{
							Authorization:uni.getStorageSync('tokens').token
						},
						success: (res) => {
							var res=JSON.parse(res.data)
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
			//获取商家详情
			async getMerchantInfo() {
				var that = this
				const {
					data,
					status
				} = await that.$api.merchantInfo({
					merchant_id: this.merchant_id,
				})
				if (status == 200) {
					this.detail = data
				}
			},
		}
	}
</script>

<style lang="scss">
	radio {
		transform: scale(0.7);
		position: relative;
		right: -12rpx;
	}

	textarea {
		width: 654rpx;
		height: 240rpx;
		background: #F7F7F7;
		border-radius: 16rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.u-upload__button {
		background-color: #f7f7f7 !important;
		border-radius: 8rpx !important;
	}

	.btn-box button {
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
