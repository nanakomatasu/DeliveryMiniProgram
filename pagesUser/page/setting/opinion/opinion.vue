<template>
	<view>
		<form>
			<view class="mt20 bg-white-ff pb32 pl32 pr32 box-size">
				<view class="pt32 pb32 f-b f-32">意见反馈说明</view>
				<textarea class="f-28 cont20 mb12 " v-model="user.content" maxlength="100"
					placeholder-class="col-gray-90" placeholder="说一下您对我们的反馈意见吧"></textarea>
				<view class="t-r col-gray-66 f-24 mb5">{{user.content.length}}/100</view>
				<u-upload uploadIcon="camera" :fileList="fileList1" uploadText="添加图片" width="160rpx" height="160rpx"
					uploadIconColor="#C1C1C1" :multiple="true" maxCount="4" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple></u-upload>
				<view class="col-gray-88 f-24">最多4张图片</view>
			</view>
			<view class="mt20 bg-white-ff pb24 pt24 dis-flex flex-y-center flex-x-between pl32 pr32 box-size">
				<view class="f-28">联系方式</view>
				<input class="f-28 w-80 t-r" placeholder-class="col-gray-90" placeholder="请输入手机号或者QQ号"
					v-model="user.contact_info" />
			</view>
			<button class="bg-red-d6-ec f-28 t-c col-white-ff radio-48" form-type="submit" @tap="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				fileList1: [],
				userInfo: {},
				user: {
					content: "",
					images: [],
					contact_info: "",
				},
			};
		},

		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				console.log(event, "event")
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中',
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url, event.name)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						messages: '',
						url: result,
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url, index) {
				console.log(index)
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: urlConfig + 'Base/upload', // 仅为示例，非真实的接口地址
						header: {
							'Authorization': uni.getStorageSync('tokens').token
						},
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							this.user.images.push((JSON.parse(res.data)).data)
							setTimeout(() => {
								resolve(res.data.data, "-=-=-=")
							}, 1000)
						},
					});
				})
			},

			async submit() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.suggestions(this.user)
				uni.hideLoading()
				if (result.status == 500) {
					this.$u.toast(msg)
					
				}
				this.user.content = ''
				this.user.images = []
				this.user.contact_info = ''
				uni.navigateTo({
					url: '/pagesUser/page/setting/setting'
				});
			}



		}


	}
</script>

<style lang="scss">
	textarea {
		width: 100%;
		height: 240rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
	}

	.u-upload__button {
		background-color: #f7f7f7 !important;
		border-radius: 8rpx !important;
	}

	button {
		width: 480rpx;
		height: 88rpx;
		line-height: 88rpx;
		margin: 24rpx auto;
	}
</style>
