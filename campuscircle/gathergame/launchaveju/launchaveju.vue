<template>
	<view class="p-b-150">

		<view class="chunk m-t-25">
			<view class="">
				活动主题
			</view>
			<view class="m-t-36 flex-wr">
				<view class="spread flex m-l-10 m-b-10" :class="indes==index?'scer':'' " v-for="(item,index) in list"
					:key="index" @tap.stop="choice(item,index)">
					<view class="kuai" :class="indes==index?'scerx':'' " :style="{background: item.color, opacity: 0.7}"></view>
					<view class="flex-center m-l-15 f-28">
						{{item.name}}
						<view class="f-20">({{item.game_num}})</view>
					</view>
				</view>
			</view>
		</view>

		<view class="chunkx m-t-25">
			<view class="">
				活动详情
			</view>

			<view class="m-t-32">
				<u--textarea v-model="formData.content" border="none" maxlength='100'
					placeholder="在此输入活动详情，如时间、地点和活动的内容" confirmType="done"></u--textarea>
			</view>
			<view class="flex-about m-t-15">
				<view class="">
				<!-- 	<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="3" :previewFullImage="true"></u-upload> -->
						
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="1" :previewFullImage="true"></u-upload>
						
						
				</view>
				<view class="c-66 f-24">
					{{formData.content.length}}/100
				</view>
			</view>
		</view>

		<view class="chunkx m-t-25">
			<view class="form-item  dis-flex flex-y-center flex-x-between">
				<view class="dis-flex flex-y-center w-80">
					<view class="f-28 form-name">活动地点</view>
					<input class="f-28 w-70 m-l-15" @tap="selAddress" :disabled="true" name="address"
						v-model="formData.address" placeholder-style="color:#999" placeholder="请选择活动地点" />
				</view>
				<view class="dis-flex flex-y-center" @tap="selAddress">
					<image class="wh-40 mr5" src="/pagesUser/static/address.png"></image>
				</view>
			</view>
		</view>

		<view class="chunkx m-t-25">
			<view class="form-item  dis-flex flex-y-center flex-x-between p-t-32 p-b-32">
				<view class="dis-flex flex-y-center w-80">
					<view class="f-28 form-name">总人数</view>
				</view>
				<view class="">
					<u--input placeholder="请输入" border="none" v-model="formData.num" inputAlign="right" maxlength="3">
					</u--input>
				</view>
			</view>

			<view class="">
				<view class="form-item  dis-flex flex-y-center flex-x-between">
					<view class="dis-flex flex-y-center w-80">
						<view class="f-28 form-name">性别限制</view>
					</view>
					<!-- <view class="dis-flex flex-y-center" @tap.stop="derail">
						<image class="kg" :src="type==false?'../../static/knob_no.png':'../../static/knob_ok.png'     " mode=""></image>
					</view> -->

					<u-switch v-model="formData.sex_limit" space="14rpx" @change="defStatusChange" inactiveValue="0"
						activeValue="1" size="14" activeColor="#F5C2C5"
						background="linear-gradient(313deg, #D62E36 0%, #EC434B 100%)">
					</u-switch>
				</view>

				<view class="flex-about m-t-25" v-if="formData.sex_limit=='1'">
					<view class="male flex-about">
						<view class="m-l-20 flex-center">
							男
						</view>
						<u--input class="m-r-20" placeholder="请输入" border="none" v-model="formData.boy_num"
							inputAlign="right" maxlength="3"></u--input>
					</view>
					<view class="female flex-about">
						<view class="m-l-20 flex-center">
							女
						</view>
						<u--input class="m-r-20" placeholder="请输入" border="none" v-model="formData.girl_num"
							inputAlign="right" maxlength="3"></u--input>
					</view>
				</view>

			</view>

		</view>

		<view class="such flex-center">
			<view class="confirm flex-center" @tap="confirm">
				确认
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				indes: -1,
				type: false,
				fileList1: [],
				list: [],
				formData: {
					content: "", //文字内容
					address: "", //地址
					pics: [], //图片
					lat: "", //当前新增地址时选中的经纬度
					lng: "", //当前新增地址时选中的经纬度
					num: "", //总人数
					sex_limit: 0, //性别限制：0否，1是
					boy_num: "", //男生人数
					girl_num: "", //女生人数
					game_type: "", //攒局类型
				},
			}
		},

		onLoad(e) {
			this.lat = uni.getStorageSync('lat');
			this.lng = uni.getStorageSync('lng');
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


		onLoad() {
			this.typeList()
		},

		methods: {
			//
			choice(item, index) {
				this.indes = index
				this.formData.game_type = item.id
			},

			defStatusChange(e) {
				//更改状态
				console.log(e)
				this.formData.sex_limit = e
			},

			//性别限制开关
			derail() {
				this.type = 1 == 1 ? (!this.type) : true
			},

			//发起攒局
			confirm() {
				this.getMyWalletx()
			},

			//发起接口
			async getMyWalletx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlesaveGame(this.formData)
				if (status == 200) {
					this.$u.toast("发起成功")
					setTimeout(function() {
						uni.navigateBack()
					}, 500)
				}
			},


			//发起接口
			async typeList() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlegameTypeList()
				if (status == 200) {
					this.list = data
					this.list.forEach((item) => {
						item.color = this.makeColor();
					})
					console.log(this.list)
				}
			},

			makeColor() {
				let arr = [6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
				let color = "#";
				for (let i = 0; i < 3; i++) {
					color += arr[Math.floor(Math.random() * 10)];
				}
				return color;
			},

			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
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
							this.formData.pics = (JSON.parse(res.data)).data
							let a=[]
							a.push({url:(JSON.parse(res.data)).data})
							this.fileList1=a
						}
					});
				})
			},
			

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
						console.log(res);
						this.formData.lat = res.latitude
						this.formData.lng = res.longitude
						this.formData.address = res.address + res.name
					},
					fail: error => {
						console.log(error)
					}
				})
			},



		}
	}
</script>

<style>
	.chunk {
		padding: 25rpx;
		height: 294rpx;
		background: #FFFFFF;
	}

	.chunkx {
		padding: 32rpx;
		background: #FFFFFF;
	}



	.spread {
		/* width: 128rpx; */
		/* height: 68rpx; */
		padding: 8rpx 18rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
	}

	.kuai {
		width: 12rpx;
		height: 68rpx;
		background: #3E92FB;
		border-radius: 8rpx 0rpx 0rpx 8rpx;
	}

	.empty {
		width: 128rpx;
		height: 68rpx;
		/* padding: 8rpx 18rpx; */
		background: #F7F7F7;
		border-radius: 8rpx;
	}

	.crochet {
		width: 28rpx;
		height: 28rpx;
	}

	.parade {
		width: 702rpx;
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.before {
		width: 120rpx;
		height: 200rpx;
		background: #FF645A;
		border-radius: 16rpx 0rpx 0rpx 16rpx;
	}

	.u-textarea {
		border-radius: 8rpx;
		background-color: #F7F7F7;
		position: relative;
		display: flex;
		flex-direction: row;
		flex: 1;
		padding: 18rpx;
	}

	.such {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 10rpx;
		position: fixed;
		bottom: 10rpx;
		background: #FEFFFE;
	}

	.confirm {
		width: 686rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.male {
		width: 342rpx;
		height: 80rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
	}

	.female {
		width: 322rpx;
		height: 80rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
	}

	.kg {
		width: 74rpx;
		height: 40rpx;
	}

	.scer {
		/* width: 128rpx;
		height: 68rpx; */
		padding: 8rpx 18rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.scerx {
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
	}
</style>
<style lang="scss">
	.u-switch {
		overflow: unset !important;

	}
</style>
