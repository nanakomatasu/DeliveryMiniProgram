<template>
	<view>
		<view class="wrap">
			<view class="form">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
					<view class="part-one">
						<u-form-item label="姓名" prop="name" labelWidth="70">
							<u--input v-model="form.name" border="none" maxlength="11" placeholder="请输入"
								placeholderStyle="text-align:right; color:#888888"></u--input>
						</u-form-item>
						<u-form-item label="电话" labelWidth="70" prop="tel"
							placeholderStyle="text-align:right; color:#888888">
							<u--input v-model="form.tel" border="none" maxlength="11" type="number" placeholder="请输入"
								placeholderStyle="text-align:right; color:#888888"></u--input>
						</u-form-item>
						<u-form-item label="地址" labelWidth="80" prop="address" ref="item1">
							<u-input v-model="form.address" border="none" placeholder="请输入"
								placeholderStyle="text-align:right; color:#888888">
								<template slot="suffix">
									<u-icon name="map" @click="selAddress" color="#D62E36"></u-icon>
								</template>
							</u-input>
						</u-form-item>
					</view>
					<view class="part-two">
						<u-form-item label="身份证正反面" prop="fileList1" labelPosition="top" labelWidth="110">
							<u-upload :fileList="form.fileList1" @afterRead="afterRead" @delete="deletePic"
								uploadText="人面像" name="1" :maxCount="1">
							</u-upload>
							<u-upload :fileList="form.fileList2" @afterRead="afterRead" @delete="deletePic"
								uploadText="国徽面" name="2" :maxCount="1">
							</u-upload>
						</u-form-item>
					</view>
					<view class="part-three">
						<u-form-item label="申请理由" prop="reason" labelPosition="top" borderBottom labelWidth="100">
							<u--textarea style="margin-top: 20rpx; backround:#F6F6F8" v-model="form.reason"
								confirmType="done" placeholder="请输入内容" border="none"></u--textarea>
						</u-form-item>
					</view>
				</u--form>
			</view>
		</view>
		<view class="bottom">
			<view class="submit-btn" @click="submitForm">
				申请成为团长
			</view>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					address: '',
					tel: '',
					fileList1: [],
					fileList2: [],
					reason: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请填写姓名'
					}],
					tel: [{
						required: true,
						message: '请填写手机号'
					}],
					address: [{
						required: true,
						message: '请填写地址'
					}],
					// fileList1: [{
					// 		validator: (rule, value, callback) => {
          //       console.log(this.form.fileList1);
					// 			if (!this.form.fileList1.length) {
					// 				return false
					// 			} else {
					// 				return true
					// 			}
					// 		},
					// 		message: '请上传身份证人像面'
					// 	},
					// 	{
					// 		validator: (rule, value, callback) => {
          //       console.log(this.form.fileList2);
					// 			if (!this.form.fileList2.length) {
					// 				return false
					// 			} else {
					// 				return true
					// 			}
					// 		},
					// 		message: '请上传身份证国徽面'
					// 	}
					// ]
				},
				lat: '',
				lng: '',
				userInfo: {},
				school: {}
			};
		},
		onLoad() {
			this.lat = uni.getStorageSync('lat');
			this.lng = uni.getStorageSync('lng');
			this.userInfo = uni.getStorageSync('userInfo')
			this.school = uni.getStorageSync('school')
			if (this.lat == 0 || !this.lat) {
				uni.getLocation({
					// #ifdef H5
					type: 'gcj02',
					altitude: true,
					// #endif
					success: (res) => {
						console.log(res)
						this.lat = res.latitude;
						this.lng = res.longitude;
					},
					fail: error => {
						console.log(error)
					}
				});
			}
		},
		methods: {
			//选择定位
			selAddress() {
				console.log('获取定位')
				//选择地图位置
				if (this.lat == 0) {
					uni.showModal({
						title: '提示',
						content: '无定位信息，请点击重新定位'
					})
					return
				}
				uni.chooseLocation({
					latitude: this.lat,
					longitude: this.lng,
					success: res => {
						this.form.address = res.address + res.name
					},
					fail: error => {
						console.log(error)
					}
				})

			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.form[`fileList${event.name}`].length
				lists.map((item) => {
					this.form[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.form[`fileList${event.name}`][fileListLen]
					this.form[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				console.log(url)
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: urlConfig+'tradmin//Upload/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						success: (res) => {
							setTimeout(() => {
								const data = JSON.parse(res.data)
								resolve(data.data)
							}, 1000)
						}
					});
				})
			},
			// 删除图片
			deletePic(event) {
				this.form[`fileList${event.name}`].splice(event.index, 1)
			},
			submitForm() {
				this.$refs.form.validate().then(() => {
					this.submitRequest()
				})
			},
			async submitRequest() {
				const {
					name,
					address,
					tel: phone,
					reason,
					fileList1,
					fileList2
				} = this.form
        if (!fileList1[0]) {
          this.$u.toast("请上传身份证人像面")
          return
        }
        if (!fileList2[0]) {
          this.$u.toast("请上传身份证国徽面")
          return
        }
				const id_card_front = fileList1[0]?.url
				const id_card_back = fileList2[0]?.url
				const data = {
					userId: this.userInfo.id,
					school_id: this.school.id,
					name,
					address,
					phone,
					reason,
					id_card_back,
					id_card_front
				}
				const res = await this.$http.post('/api/user/askForGroupUser', data)
				if (res.code === 200) {
					this.$refs.uNotify.success('申请成功')
					this.form = {
						name: '',
						address: '',
						tel: '',
						fileList1: [],
						fileList2: [],
						reason: ''
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		box-sizing: border-box;
		padding: 20rpx 20rpx 0 20rpx;

		.part-one {
			background: #ffffff;
			border-radius: 16rpx;
		}

		.part-two {
			background: #ffffff;
			margin-top: 20rpx;
			border-radius: 16rpx;
		}

		.part-three {
			background: #ffffff;
			margin-top: 20rpx;
			border-radius: 16rpx;
		}

		.form {
			::v-deep .u-form-item__body {
				padding-left: 32rpx;
				padding-right: 32rpx;
			}

			::v-deep .u-form-item__body__left__content__label {
				font-weight: 700;
			}
		}

		::v-deep .uni-input-input {
			text-align: right;
		}
	}

	.bottom {
		height: 108rpx;
		background: #fff;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;

		.submit-btn {
			width: 686rpx;
			height: 80rpx;
			background: linear-gradient(313deg, #d62e36 6%, #ec434b);
			border-radius: 40rpx;
			text-align: center;
			align-items: center;
			line-height: 80rpx;
			font-size: 28rpx;
			font-weight: 700;
			color: #ffffff;
		}
	}
</style>
<style>
	page {
		background: #F6F6F8;
	}
</style>
