<template>
	<view class="page-b">
		<u--form labelPosition="left" :labelStyle="{fontSize:'28rpx',color:'#202020',fontWeight: '600'}"
			labelWidth="200rpx" :borderBottom="false" errorType="toast">
			<view class="mt20 bg-white-ff pl32 pr32 box-size">
				<u-form-item label="举报类型" @tap="show=true">
					<u--input v-model="title" inputAlign="right" :disabled="true" placeholderClass="f-28 col-gray-88"
						disabled disabledColor="#ffffff" fontSize="28rpx" placeholder="请选择类型" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<u-form-item label="下单状态">

					<u-radio-group v-model="radioValue" @change="groupChange" activeColor="#E63D45"
						inactiveColor="#AEAEAE" iconSize="32rpx" labelSize="28rpx" labelColor="#222426">
						<u-radio :customStyle="{marginRight:index==1?'': '40rpx'}" v-for="(item, index) in radioList"
							:key="index" :label="item.name" :name="item.id">
						</u-radio>
					</u-radio-group>

				</u-form-item>
				<u-form-item label="联系电话">

					<u-input type="number" v-model="model1.userInfo.contact_info" inputAlign="right"
						placeholderClass="f-28 col-gray-88" fontSize="28rpx" placeholder="请在此处留下手机号" border="none"
						maxlength="11">
					</u-input>

				</u-form-item>
			</view>
			<view class="mt20 pt32  pb32 bg-white-ff textarea pl32 pr32 box-size">
				<view class="f-28 col-brank-20  f-b">详细描述</view>
				<u-form-item>
					<u--textarea v-model="model1.userInfo.content" height="240rpx"
						placeholder="请详细描述投诉举报内容,校U网将为您的信息保密…" border="none" confirmType="done">
					</u--textarea>
				</u-form-item>
				<u-upload style="border-radius: 50px;" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple :maxCount="4" width="120rpx" height="120rpx">
				</u-upload>
			</view>
			<view class="btn-box fixed-bottom">
				<view class="radio-48 bg-red-d6-ec t-c w-100 col-white-ff" @tap="referto">提交举报</view>
			</view>
		</u--form>
		<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @change="changeHandler"
			 @cancel="show=false"></u-picker>

		<!-- <u-picker :show="show" ref="uPicker" @cancel="show=false" :loading="loading" @confirm="confirm" :columns="columns" @change="changeHandler"></u-picker> -->

	</view>
</template>

<script>
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				title: "",
				titles: "",
				show: false,
				loading: false,
				type: [],
				fileList1: [],
				model1: {
					userInfo: {
						images: [],
						portrait: "",
						contact_info: '',
						content: '',
						main_type: '',
						type_str: '',
						order_status: "",
					},
				},
				value1: "",
				id: "", //商家id
				radioValue: 0,
				radioList: [{ //单选框内容列表
					name: "已下单",
					id: 1
				}, {
					name: "未下单",
					id: 2
				}],
				columns: [
					['中国', '美国'],
					['深圳', '厦门', '上海', '拉萨']
				],
				columnData: [
					['深圳', '厦门', '上海', '拉萨'],
					['得州', '华盛顿', '纽约', '阿拉斯加']
				],



				cmdx: 0,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.model1.userInfo.merchant_id = e.id
			this.getJoininfoAdd()
		},

		methods: {

			groupChange(n) {
				console.log('groupChange', n);
				this.model1.userInfo.order_status = n
			},

			async getJoininfoAdd() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.accusation()
				uni.hideLoading()
				console.log(result)
				if (result.status == 200) {
					console.log(result)
					this.type = result.data
					this.columns = [[result.data[0].name, result.data[1].name, result.data[2].name],result.data[0].data]
					this.columnData[0] = result.data[0].data
					this.columnData[1] = result.data[1].data
					this.columnData[2] = result.data[2].data
				}
			},

			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				console.log(index)
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log(e,"123132")
				this.title = e.value[0] || ''
				this.titles = e.value[1] || ''
				// this.model1.userInfo.main_type = e.indexs[0]
				// this.model1.userInfo.type_str = e.indexs[1]
				this.model1.userInfo.main_type = e.value[0]
				this.model1.userInfo.type_str = e.value[1]
				this.show = false
			},

			async referto() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.accusationxs(this.model1.userInfo)
				uni.hideLoading()
				console.log(result)
				if (result.status == 500) {
					console.log(result)
				}

				this.fileList1 = []
				this.radioValue = 0
				this.title = ''
				this.model1.userInfo.order_status = ''
				this.model1.userInfo.type_str = ''
				this.model1.userInfo.main_type = ''
				this.model1.userInfo.content = ''
				this.model1.userInfo.contact_info = ''
				this.model1.userInfo.portrait = ''
				this.model1.userInfo.images = ''
				uni.$u.toast("提交成功")
				setTimeout(() => {
					uni.navigateBack({
					})
				}, 1000)
			},



			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.model1.userInfo.images.splice(event.index, 1)
				console.log(event, "event")
				console.log(this.model1.userInfo.images, "event")
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
						url: urlConfig + '/api/Base/upload', // 仅为示例，非真实的接口地址
						header: {
							'Authorization': uni.getStorageSync('tokens').token
						},
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log((JSON.parse(res.data)).data)
							this.model1.userInfo.images.push((JSON.parse(res.data)).data)

							// this.model1.userInfo.images=(JSON.parse(res.data)).data

							console.log(this.model1.userInfo.images)
							setTimeout(() => {
								resolve(res.data.data, "-=-=-=")
							}, 1000)
						},
					});
				})
			},







		}
	}
</script>

<style lang="scss">
	.u-form-item__body {
		height: 108rpx;
		box-sizing: border-box;
	}

	.textarea .u-form-item__body {
		height: max-content;
	}

	.u-radio-group {
		justify-content: flex-end;
	}

	.u-textarea {
		background-color: #F7F7F7 !important;
	}

	.u-upload__button {
		display: flex;
		justify-content: center;
		background-color: #F7F7F7 !important;
		border-radius: 8rpx;
	}
</style>
