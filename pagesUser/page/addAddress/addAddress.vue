<template>
	<view>
		<form @submit="submit">
			<view class="mt20 bg-white-ff pl32 pr32 box-size">
				<view class="form-item border-b-f7 dis-flex flex-y-center flex-x-between">
					<view class="dis-flex flex-y-center w-65">
						<view class="f-28 form-name">收货人</view>
						<input class="f-28" v-model="formData.member_name" name="member_name"
							placeholder-style="color:#999" placeholder="请输入联系人" maxlength="11" />
					</view>
					<!-- <radio-group name="sex" class="w-35 flex-x-end dis-flex flex-y-center">
						<label class="dis-flex  flex-y-center" :class="index==0?'mr30':''" v-for="(item,index) in sex"
							:key="index">
							<radio :value="item.name" color="#D62E36" :checked="formData.sex==item.name"></radio>
							<view>{{item.name}}</view>
						</label>
					</radio-group> -->
				</view>
				<view class="form-item border-b-f7 dis-flex flex-y-center ">
					<view class="f-28 form-name">手机号码</view>
					<input class="f-28 w-80" name="member_tel" v-model="formData.member_tel" type="number"
						placeholder-style="color:#999" placeholder="请输入手机号" maxlength="11" />
				</view>
				<view class="form-item border-b-f7 dis-flex flex-y-center flex-x-between">
					<view class="dis-flex flex-y-center w-80">
						<view class="f-28 form-name">所在地区</view>
						<input class="f-28 w-70" @tap="selAddress" :disabled="true" name="address"
							v-model="formData.address" placeholder-style="color:#999" placeholder="请选择所在地区" />
					</view>
					<view class="dis-flex flex-y-center" @tap="selAddress">
						<image class="wh-40 mr5" src="/pagesUser/static/address.png"></image>
						<view class="col-brank-22">定位</view>
					</view>
				</view>
        <view class="form-item border-b-f7 dis-flex flex-y-center">
          <template v-for="(n,i) in category">
            <ep-select  :key="i" v-if="i==0" :placeholder="n.value" label_key="value" :curSelectNum="i"  filterable style="width: 260rpx;" v-model="select[i]" 
            :options="optionsBuildings[i]" @change="changeBuildings"></ep-select>
            <ep-select :key="i" v-if="i==1" :placeholder="n.value" label_key="value" :curSelectNum="i"  filterable style="width: 260rpx;" v-model="select[i]" 
            :options="optionsBuildings[i]" @change="changeBuildings"></ep-select>
            <ep-select  :key="i" v-if="i==2" :placeholder="n.value" label_key="value" :curSelectNum="i"  filterable style="width: 260rpx;" v-model="select[i]" 
            :options="optionsBuildings[i]" @change="changeBuildings"></ep-select>
          </template>
				</view>
				<view class="form-item dis-flex flex-y-center ">
					<view class="f-28 form-name">门牌号</view>
					<input class="f-28 w-80" placeholder-style="color:#999" v-model="formData.details" name="details"
						placeholder="请输入详细地址，门牌号" maxlength="11" />
				</view>
			</view>
			<view class="mt20 bg-white-ff pl32 pr32 box-size">
				<!-- <view class="form-item border-b-f7 dis-flex flex-y-center flex-x-between" @tap="show=true">
					<view class="dis-flex flex-y-center w-85">
						<view class="f-28 form-name">学校</view>
						<input class="f-28 w-80" :value="schoolListIndex==-1?'':schoolList[schoolListIndex].school_name"
							:disabled="true" placeholder-style="color:#999" placeholder="请选择绑定的学校" />
					</view>
					<u-icon name="arrow-down" size="24rpx"></u-icon>
				</view> -->
				<!-- <view class="form-item border-b-f7 dis-flex flex-y-center flex-x-between">
					<view class="f-28 form-name">配送范围</view>
					<radio-group name="position" v-model="formData.position" class="w-40 flex-x-end dis-flex flex-y-center">
						<label class="dis-flex  flex-y-center" :class="index==0?'mr30':''"
							v-for="(item,index) in school" :key="index">
							<radio :value="item.value" color="#D62E36" :checked="formData.position==item.value"></radio>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view> -->
			</view>
			<view class="mt20 pl32 pr32 box-size  bg-white-ff form-item dis-flex flex-y-center  flex-x-between">
				<view class="f-28 w-30">设为默认地址</view>
				<u-switch v-model="formData.is_default" size="16" @change="defStatusChange" activeValue="1"
					inactiveValue="0" activeColor="#EC434B"></u-switch>

			</view>
			<view class="mt120 ">
				<button class="bg-red-d6-ec radio-48 f-30 t-c col-white-ff btn " form-type="submit">保存地址</button>
				<button v-if="formData.id" class="border-d9 radio-48 f-30 t-c col-red-d9 mt24 btn"
					@tap="delAddress">删除地址</button>
			</view>

		</form>
		<!-- 学校列表弹窗 -->
		<view :catchtouchmove="true">
			<!-- 分享弹窗 -->
			<u-popup :show="show" @close="show=false">
				<view>
					<form @submit="change">
						<view class=" pt20 pb20 pl24 pr24 box-size">
							<input @input="getSchoolGetList" class="search" v-model="school_name"
								placeholder="请输入学校名称搜索" />
							<scroll-view scroll-y="true" class="sel-school">
								<radio-group name="schoolListIndex">
									<label class="dis-flex pt20 pb20 flex-x-between" v-for="(item,index) in schoolList"
										:key="index">
										<view class="w-80">{{item.school_name}}</view>
										<radio color="#D62E36" :value="String(index)" :checked="index==schoolListIndex">
										</radio>
									</label>
								</radio-group>
							</scroll-view>
						</view>
						<view class="bg-white-ff pt20 pb20 pl24 pr24 box-size">
							<button class="bg-red-d6-ec radio-48 f-30 t-c col-white-ff " form-type="submit">确认</button>
						</view>

					</form>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					member_name: "",
					member_tel: "",
					address: "",
					details: "",
					lat: "", //当前新增地址时选中的经纬度
					lng: "", //当前新增地址时选中的经纬度
					is_default: "1",
					sex: "男",
					id: "",
					position: "2",
					school_id: "",
				},
				schoolList: [], //学校列表
				schoolListIndex: -1, //选中的学校下标
				school_name: "", //搜索的学校名称
				show: false,
				sex: [{
					name: "男",
				}, {
					name: "女",
				}],
				school: [{
					name: "校外",
					value: "1",
				}, {
					name: "校内",
					value: "2",
				}],
        select1:'',
        select: [],
        optionsBuildings:[
          [], [], []
        ],
        category: [],
        treeList: [],
				length: 0, //现在的收货地址有多少条 0条代表必须要选择一个默认的收货地址
			};
		},
		onLoad(e) {
			this.lat = uni.getStorageSync('lat');
			this.lng = uni.getStorageSync('lng');
      const buildings = JSON.parse(uni.getStorageSync('school').buildings)
			if (buildings) {
				this.category = buildings.category ?? []
      	this.treeList = buildings.treeList ?? []
			}
      this.optionsBuildings[0] = this.treeList
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



			// this.getSchoolGetList()
			var that = this
			this.length = e.length
			this.$nextTick(function() {
				if (e.id) {
					uni.setNavigationBarTitle({
						title: "编辑收货地址"
					})
					that.formData.id = e.id
					that.getUserGetAddressInfo()
				}
			})

		},
		onShow() {
			var that = this
			uni.$on('onAddressChange', (res) => {
				console.log(res)
				this.formData.lat = res.latlng.lat
				this.formData.lng = res.latlng.lng
				this.formData.address = res.addr.province + res.addr.city + res.addr.district + res.addr.detail +
					res.poiname
				// this.formData.details = res.addr.detail+res.poiname
			})
		},
		methods: {
      changeBuildings(e, curSelectNum, index) {
        this.select1 = e
        this.select[curSelectNum] = e
        if (curSelectNum === 0) {
          this.optionsBuildings[1] = this.optionsBuildings[0][index].children
          this.optionsBuildings[2] = []
					const buildings = JSON.parse(uni.getStorageSync('school').buildings)
					if (buildings?.category) {
						buildings.category.map(((item,index) => {
							if (index > 0) {
								this.category[index].value = item.value
								this.select[index] = ''
							}
						}))
					}
        }
        if (curSelectNum === 1) {
          this.optionsBuildings[2] = this.optionsBuildings[1][index].children
					this.select[2] = ''
        }
        this.select.slice(1,0)
        this.optionsBuildings.slice(1,0)
        console.log(this.optionsBuildings, this.select);
      },
			//确认更改选中的学校id
			change(e) {
				if (e.detail.value.schoolListIndex == '') {
					this.$u.toast("请选择学校")
					return
				}

				this.schoolListIndex = e.detail.value.schoolListIndex
				this.show = false
			},
			//编辑收货地址详细信息
			async getUserGetAddressInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.userGetAddressInfo({
					id: this.formData.id
				})
				uni.hideLoading()
				if (status == 200) {
					data.id = this.formData.id
					data.is_default = String(data.is_default)
					this.formData = data
					let selectList = data.buildings?JSON.parse(data.buildings): []
					this.$nextTick(() => {
						this.select = selectList
						selectList.map((item, index) => {
							if (item) {
								this.category[index].value = item
								let indexNum = 0
								let indexNum1 = 0
								if (index === 0) {
									console.log('this.treeList', this.treeList);
									indexNum = this.treeList.findIndex(n => n.value === item)
									this.optionsBuildings[1] = this.treeList[indexNum].children
								}
								if (index === 1) {
									indexNum1 = this.optionsBuildings[0][indexNum].children.findIndex(n =>n.value === item)
									this.optionsBuildings[2] = this.optionsBuildings[1][indexNum1].children
								}
							}
						})
					})
				}
			},
			//学校列表
			async getSchoolGetList() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.schoolGetList({
					lat: this.formData.lat,
					lng: this.formData.lng,
					school_name: this.school_name,
					limit: 1000,
				})
				uni.hideLoading()
				if (status == 200) {
					this.schoolList = data.data

				}
			},
			//提交
			submit(e) {
				var formData = this.formData
				// formData.sex=e.detail.value.sex
				formData.sex = '男'
				formData.position = 2
				formData.school_id = uni.getStorageSync('school').id
				if (formData.member_name == '') {
					this.$u.toast("请输入联系人")
				} else if (formData.sex == '') {
					this.$u.toast("请选择性别")
				} else if (formData.member_tel == '') {
					this.$u.toast("请输入手机号")
				} else if (!this.$u.test.mobile(formData.member_tel)) {
					this.$u.toast("请输入正确的11位手机号")
				} else if (formData.address == '') {
					this.$u.toast("请选择所在地区")
				} else if (formData.details == '') {
					this.$u.toast("请输入详细地址门牌号")
				} else if (formData.position == '') {
					this.$u.toast("请选择配送范围")
				} else if (this.length == 0 && formData.is_default == 0) {
					this.$u.toast("至少选择一个默认地址")
				} else {

					this.getUserAddAddres(formData)
				}
			},
			//提交收货地址数据
			async getUserAddAddres(formData) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				this.formData.buildings = this.select?JSON.stringify(this.select): null
				var url = this.formData.id == '' ? 'userAddAddres' : 'userSaveAddress'
				const {
					data,
					status,
					msg
				} = await that.$api[url](formData)
				uni.hideLoading()
				if (status == 200) {
					this.$u.toast(msg)
					setTimeout(function() {
						uni.navigateBack()
					}, 500)

				}
			},
			//删除收货地址
			async delAddress() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.userDeleteAddress({
					id: this.formData.id
				})
				uni.hideLoading()
				if (status == 200) {
					this.$u.toast(msg)
					setTimeout(function() {
						uni.navigateBack()
					}, 500)

				}
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
						// this.lat = res.formData.lat;
						// this.lng = res.formData.lng;


						this.formData.lat = res.latitude
						this.formData.lng = res.longitude
						this.formData.address = res.address + res.name


					},
					fail: error => {
						console.log(error)
					}
				})
				//跳转webview地图
				// uni.navigateTo({
				// 	url: '/pages/map/map'
				// });

			},
			defStatusChange(e) {
				//更改状态
				this.formData.is_default = e
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sel-school {
		max-height: 520rpx;
	}

	radio {
		transform: scale(0.7);
		position: relative;
		right: -6rpx;
	}

	.form-item {
		height: 100rpx;
	}

	.form-name {
		width: 146rpx;
	}

	.btn {
		width: 622rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.search {
		background: #f7f7f7;
		border-radius: 40rpx;
		height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}
</style>
<style lang="scss">
	// .u-switch {
	// 	overflow: unset !important;

	// }
</style>