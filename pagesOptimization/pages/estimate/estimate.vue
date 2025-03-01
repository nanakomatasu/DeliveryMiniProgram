<template>
	<view class="cont20">
		<form @submit="commentOrder">
			<view class="bg-white-ff radio-16 cont32-24">
				<view class="dis-flex flex-y-center mb20 flex-x-between">
					<view class="f-32 f-b col-brank-20">您对商品满意吗？</view>
					<label class="dis-flex flex-y-center " @click="changeAnonymous">
						<view class="f-24">匿名提交</view>
						<radio value="1" :checked="anonymous" color="#D62E36"></radio>
					</label>
				</view>
				<view class="dis-flex flex-y-center mb40">
					<image class="wh-80 mr20 radio-4" mode="aspectFill" :src="goodsInfo.picture"></image>
					<view class="">
						<view class="f-28 col-gray-33 f-b">{{goodsInfo.goods_name}}</view>
						<view class="child_type">
							<view class="child_type_style" v-for="item in goodsInfo.styles">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="dis-flex flex-y-center mb40">
					<view class="col-gray-33 mr32">评分</view>
					<u-rate :count="5" size="58rpx" inactiveIcon="star-fill" :minCount="1" v-model="value"
						gutter="24rpx" active-color="#FF9531" inactive-color="#D8D8D8"></u-rate>
				</view>
				<textarea class="mb20 f-28" name="body" placeholder="给点评价吧,最多500字" maxlength="500"></textarea>
				<u-upload uploadIcon="camera" :fileList="media" uploadText="添加图片" width="148rpx" height="148rpx"
					uploadIconColor="#C1C1C1" :multiple="true" maxCount="9" @afterRead="afterRead" @delete="deletePic"
					name="1"></u-upload>
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
				order_id: "", //订单id
				goodsInfo: {}, //商品信息
				order_type: "", //订单类型
				detail: {}, //商家详情
				value: 0, //默认评价星
				media: [], //评论图片
				goodName: '', //商品名称,
				goodNum: '', //商品数量
				anonymous: false,
			};
		},
		onLoad(e) {
			console.log(e);
			// this.merchant_id = e.merchant_id
			this.order_id = e.order_id
			this.goodsInfo = JSON.parse(e.goodsInfo)
			// console.log(this.goodsInfo,'11111111');
		},
		onShow() {
			// this.getMerchantInfo()
			this.getOderDetails()
		},
		methods: {
			//订单详情
			getOderDetails() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					order_id: this.order_id
				}
				this.$http.post('/api/user/getOrderInfo', data)
					.then(res => {
						if (res.code == 200) {
							this.goodName = res.data.goodsList[0].goods_name
							this.goodNum = res.data.goodsList[0].num
						}
					})
			},
			//评论
			commentOrder(e) {
				console.log(this.media)
				var body = e.detail.value.body
				if (this.value == 0) {
					this.$u.toast("您还没有评分哦~")
				} else if (body == '') {
					this.$u.toast("给点评价吧~")
				} else {
					this.postOrderCommentOrder(body)
				}
			},
			async postOrderCommentOrder(body) {
				var media = []
				this.media.forEach(item => {
					media.push(item.url)
				})
				const data = {
					userId: uni.getStorageSync('userInfo').id, //用户Id
					shop_id: this.goodsInfo.shop_id, //店铺id
					order_id: this.order_id, //订单id
					goods_id: this.goodsInfo.shop_goods_id, //商品ID
					goods: this.goodName + "*" + this.goodNum, //商品详情
					body: body, //内容
					anonymous: this.anonymous == 1 ? 1 : 2,
					star: this.value,
					media: media
				}
				await this.$http.post('/api/user/commentOrder', data)
					.then(res => {
						if (res.code == 200) {
							this.$u.toast("评论成功")
							setTimeout(function() {
								uni.redirectTo({
									url: '/pagesUser/page/orderList/orderList'
								});
							}, 500)
						}
					})
			},
			//更改是否匿名
			changeAnonymous() {
				this.anonymous = !this.anonymous
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
						url: this.$url + '/addonsapi/Base/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'files',
						header: {
							Authorization: uni.getStorageSync('tokens').token
						},
						success: (res) => {
							var res = JSON.parse(res.data)
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
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

	.child_type {
		display: flex;
		font-size: 12px;
		color: #8e8f8e;
	}

	.child_type_style {
		padding: 10rpx 10rpx 10rpx 0;
	}
</style>
