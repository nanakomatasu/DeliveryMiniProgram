<template>
	<view>
		<view class="mt20 pl32 pr32 pt20 pb20 box-size dis-flex flex-y-center flex-x-between bg-white-ff">
			<view class="f-b col-brank-20">设置头像</view>
			<view class="dis-flex flex-y-center">
				<u-upload style="border-radius: 50px;" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple :maxCount="1" width="120rpx" height="120rpx">
					<view class="head mr20">
						<!-- 	<image v-if="!userInfo.portrait" class="head mr20" src="/static/img/index-shenghuo4.png" mode="">
						</image> -->
						<image v-if="userInfo.portrait" class="head mr20" :src="userInfo.portrait" mode=""></image>
					</view>
				</u-upload>
				<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
			</view>
		</view>
		<view class="mt20 pl32 pr32 box-size bg-white-ff">
			<view class="dis-flex flex-y-center flex-x-between form-item">
				<view class="f-b col-brank-20">昵称</view>
				<input class="t-r f-28 col-brank-20" placeholder="请输入昵称" v-model="user.user_name" />
			</view>
			<view class="dis-flex flex-y-center flex-x-between form-item">
				<view class="f-b col-brank-20">生日</view>
				<view class="dis-flex flex-y-center" @tap="dateShow=true">
					<input class="t-r f-28 col-brank-20 mr20" :disabled="true" placeholder="请选择生日"
						v-model="user.birthday" />
					<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
				</view>
			</view>
		</view>
		<view class="btn-box fixed-bottom">
			<view class="w-100 col-white-ff bg-red-d6-ec t-c radio-48" @tap="submit">提交</view>
		</view>
		<u-datetime-picker ref="datetimePicker" @cancel="dateShow=false" @confirm="dateCom" :show="dateShow"
			v-model="defaultDate" mode="date" :minDate="minDate" :maxDate="maxDate"></u-datetime-picker>
	</view>
</template>

<script>
	import urlConfig from '@/config/index.js'
	const today = new Date().getTime()
	const today_100 = today - (24 * 60 * 60 * 1000 * 365 * 100) //一百年的时间
	export default {
		data() {
			return {
				fileList1: [],
				userInfo: {},
				user: {
					portrait: "",
					user_name: "",
					birthday: "",
				},
				defaultDate: today, //默认选择今天
				minDate: today_100, //最小的选择时间
				maxDate: today, //最大的选择时间
				dateShow: false, //是否显示日期弹窗
			};
		},
		onLoad() {

		},
		onShow() {
			this.information()
		},
		methods: {
			//改变时间
			dateCom(e) {
				this.user.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
				this.dateShow = false
			},


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
						url: urlConfig + 'api/Base/upload', // 仅为示例，非真实的接口地址
						header: {
							'Authorization': uni.getStorageSync('tokens').token
						},
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							this.user.portrait = (JSON.parse(res.data)).data
							setTimeout(() => {
								resolve(res.data.data, "-=-=-=")
							}, 1000)
						},
					});
				})
			},




			//提交  
			async submit() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.newsmodify(that.user)
				uni.hideLoading()
				if (result.status == 200) {
					this.$u.toast("提交成功")
          setTimeout(() => {
            uni.navigateBack()
          }, 1000);
				}
			},

			async information() {
				var that = this
				const result = await that.$api.receivingOrderx()
				if (result.status == 200) {
					this.userInfo = result.data.userInfo
					this.user.user_name = result.data.userInfo.user_name
					this.user.birthday = result.data.userInfo.birthday
				}
			},


		}
	}
</script>

<style lang="scss">
	.head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
	}

	.form-item {
		height: 100rpx;
	}
</style>