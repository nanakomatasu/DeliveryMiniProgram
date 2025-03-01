<template>
	<view>
		<view class="padd-0-20 " style="margin-bottom:150rpx;">
			<view class="flex-jus-spa box1 m-t-20 bor-r-16" v-if="false">
				<view class="f-28 color-20 fw-700">身份角色</view>
				<view class="flex-al-c" @tap.stop="showx=true">
					<view class="f-28 color-888">{{rolex||'请选择'}}</view>
					<image class="wh-28 m-l-12" src="/campuscircle/static/ico_zhankai.png" mode=""></image>
				</view>
			</view>

			<view class="flex-jus-spa box1 m-t-20 bor-r-16">
				<view class="f-28 color-20 fw-700">性别</view>
				<view class="flex-al-c" @tap.stop="shows=true">
					<view class="f-28 color-888">{{gender||"请选择"}}</view>
					<image class="wh-28 m-l-12" src="/campuscircle/static/ico_zhankai.png" mode=""></image>
				</view>
			</view>

			<view class="m-t-20 bor-r-16 box2">
				<view class="flex-jus-spa box2_one flex-al-c">
					<view class="f-28 color-20 fw-700">学校</view>
					<view class="flex-al-c">
						<view class="f-28 color-888" @click="show = true" v-if="columnss.length==0">请选择学校</view>
						<view class="color-303133 f-28 m-l-14" @click="show = true" v-else>{{columnss}}</view>
						<image class="wh-28 m-l-12" src="/campuscircle/static/ico_zhankai.png" mode=""></image>
					</view>
				</view>
				<!-- 学院 -->
				<view class="flex-jus-spa box1 flex-al-c" v-if="false">
					<view class="f-28 color-20 fw-700">学院</view>
					<view class="rzinfor_input">
						<u--input placeholder="请输入学院名称" border="surround" v-model="fromdata.college" maxlength='12'
							fontSize='28rpx' color='#202020' inputAlign='right'
							placeholderStyle="color:#999;fontSize:28rpx; textAlign: right;"></u--input>
					</view>
				</view>
				<!-- 专业 -->
				<view class="flex-jus-spa box1 flex-al-c" v-if="false">
					<view class="f-28 color-20 fw-700">专业</view>
					<view class="rzinfor_input flex-end">
						<u--input placeholder="请输入专业名称" border="surround" v-model="fromdata.professional" maxlength='12'
							fontSize='28rpx' color='#202020' inputAlign='right'
							placeholderStyle="color:#999;fontSize:28rpx; textAlign: right;"></u--input>
					</view>
				</view>
				<!-- 班级 -->
				<view class="flex-jus-spa box2_two flex-al-c" v-if="false">
					<view class="f-28 color-20 fw-700">班级</view>
					<view class="rzinfor_input">
						<u--input placeholder="请输入班级名称" border="surround" v-model="fromdata.grade" maxlength='12'
							fontSize='28rpx' color='#202020' inputAlign='right'
							placeholderStyle="color:#999;fontSize:28rpx; textAlign: right"></u--input>
					</view>
				</view>
			</view>
			<!-- 籍贯 -->
			<view class="flex-jus-spa box1 m-t-20 bor-r-16" v-if="false">
				<view class="f-28 color-20 fw-700">籍贯</view>
				<view class="flex-al-c">
					<view class="" style="width: 200rpx;">
						<u--input placeholder="xx省" border="surround" v-model="fromdata.place_province" maxlength='10'
							fontSize='28rpx' color='#202020' inputAlign='right'
							placeholderStyle="color:#999;fontSize:28rpx; textAlign: right"></u--input>
					</view>
					<view class="" style="width: 200rpx;">
						<u--input placeholder="xx市" border="surround" v-model="fromdata.place_city" maxlength='10'
							fontSize='28rpx' color='#202020' inputAlign='right'
							placeholderStyle="color:#999;fontSize:28rpx; textAlign: right"></u--input>
					</view>
					<!-- <view class="f-28 color-888">省</view> -->
					<!-- <image class="wh-28 m-l-12" src="/campuscircle/static/ico_zhankai.png" mode=""></image> -->
				</view>
				<!-- <view class="flex-al-c">
					<view class="" style="width: 150rpx;">
						<u--input placeholder="xx市" border="surround" v-model="fromdata.grade" maxlength='4'
							fontSize='28rpx' color='#202020' inputAlign='right'
							placeholderStyle="color:#999;fontSize:28rpx; textAlign: right"></u--input>
					</view>
					<view class="f-28 color-888">市</view>
					<image class="wh-28 m-l-12" src="/campuscircle/static/ico_zhankai.png" mode=""></image>
				</view> -->
			</view>
			<!-- 爱好 -->
		<!-- 	<view class="box3 m-t-20 bor-r-16">
				<view class="f-28 color-20 fw-700">爱好</view>
				<view class="flex-al-c flex-wrap m-t-16">
					<view class="hobby_tips flex-al-c flex-jus-spa m-b-20"
						:class="type==index?'hobby_tipsx':'hobby_tips'" v-for="(item,index) in list" :key="index"
						@tap="lists(item,index)">
						<view class="f-24 color-20">{{item.name}}
						</view>
						<image class="wh-24 m-l-28" src="/campuscircle/static/ico_guanbi.png" mode=""></image>
					</view>
					<view class="hobby_tips_custom">
						自定义
					</view>
				</view>
			</view> -->




			<view class="flex-al-c flex-wrap m-t-16">
				<view class="hobby_tips flex-al-c flex-jus-spa m-b-20" :class="type==indexs?'hobby_tipsx':'hobby_tips'"
					v-for="(items,indexs) in list" :key="indexs" @tap="changeScreenWinx(items,indexs)">
					<view class="f-24 color-20" :class="cooperatiox.indexOf(items.id) != -1?'hobby_tipsx' :'hobby_tips'">
						{{items.name}}</view>
				</view>
			</view>
		</view>
		<!-- 身份弹窗 -->
		<!-- <u-picker :show="idshow" :columns="idcolumns" @confirm="idconfirm" @cancel="idcancel" keyName="school_name"></u-picker> -->
		<!-- 选择学校弹窗 -->
		<u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" keyName="school_name"></u-picker>
		<u-picker :show="showx" :columns="columnsx" @confirm="confirmx" @cancel="showx=false" keyName="label">
		</u-picker>
		<u-picker :show="shows" :columns="columnsr" @confirm="columnsrs" @cancel="shows=false" keyName="label">
		</u-picker>
		<!-- 立即加入 -->
		<view class="join_box">
			<view class="join_btn" @click="joinbtn()">
				立即加入
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gender: "",
				rolex: "",
				type: -1,
				list: [],
				showx: false,
				shows: false,
				show: false,
				idshow: false,
				fromdata: {
					school: '', //学校名称
					college: '', //学院
					professional: '', //专业
					grade: '', //班级
					nativePlace: '', // 籍贯
					place_province: '', //籍贯-省
					place_city: '', //籍贯-市
				},
				columns: [],
				columnss: '',
				role: 0,
				love: "",
				sex: "",
				columnsr: [
					[{
						label: '女',
						id: 0
					}, {
						label: '男',
						id: 1
					}]
				],
				columnsx: [
					[{
						label: '学生',
						id: 0
					}, {
						label: '其他',
						id: 1
					}]
				],
				cooperatiox: [],

			}
		},
		onLoad() {
			this.getMyWalletx()
			this.getSchoolGetList()
			this.id = uni.getStorageSync('school').id
		},
		methods: {
			confirm(e) {
				this.show = false
				this.columnss = e.value[0].school_name
				this.id = e.value[0].id
			},

			confirmx(e) {
				this.role = e.value[0].id
				this.showx = false
				this.rolex = e.value[0].label
				console.log(e.value[0].label)
				console.log(e.value[0].id)
			},

			columnsrs(e) {
				console.log(e.value[0].label)
				console.log(e.value[0].id)
				this.gender = e.value[0].label
				this.sex = e.value[0].id
				this.shows = false
			},

			cancel() {
				this.show = false
			},
			joinbtn() {
				this.PostcirclesaveCircle()
			},
			lists(item, index) {
				this.type = index
				this.love = item.id
			},
			// 加入圈子接口
			async PostcirclesaveCircle() {
				var that = this
				const result = await that.$api.circlesaveCircle({
					school_id: this.id, //学校选择
					college: this.fromdata.college, //学院
					major: this.fromdata.professional, //专业
					class: this.fromdata.grade, //班级
					native_place_province: this.fromdata.place_province, //籍贯-省
					native_place_city: this.fromdata.place_city, //籍贯-市
					love: this.cooperatiox, //爱好
					// custom: '1', //自定义
					sex: this.sex,
					role: this.role, //身份角色
					// custom:
				})
				if (result.status == 200) {
					this.$u.toast("提交成功")
					setTimeout(function() {
						uni.redirectTo({
							url: '/campuscircle/index/index'
						})
					}, 1000)

				}

			},
			//学校列表
			async getSchoolGetList() {
				var that = this
				const {
					data,
					status
				} = await that.$api.schoolGetList({
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
				})
				if (status == 200) {
					this.columns = [data.data]
				}
			},

			async getMyWalletx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlegameTypeList({})
				if (status == 200) {
					this.list = data

				}
			},

			changeScreenWinx(items, index) {
				console.log(items, index,'==1==');

				if (this.cooperatiox.indexOf(items.id) != -1) { //如果当前点击的已经选择  就取消选择
					var index = this.cooperatiox.indexOf(items.id)
					this.cooperatiox.splice(index, 1)
					console.log(this.cooperatiox,'==123')
				} else {
					//如果不存在就添加进去列表
					this.cooperatiox.push(items.id)
					console.log(this.cooperatiox,'==123=====')
					// console.log(this.cooperatiox)
					// this.identifiex.push(items.follow.user_name)

					// console.log(this.cooperatiox)
					// console.log(this.identifiex)
				}
			},

		}
	}
</script>

<style>
	.box1 {
		box-sizing: border-box;
		padding: 36rpx 24rpx 36rpx 24rpx;
		background-color: #ffffff;
	}

	.rzinfor_input /deep/ .u-border {
		border-style: none !important;
		text-align: right !important;
	}

	.box2 {
		box-sizing: border-box;
		padding-top: 36rpx;
		padding-bottom: 36rpx;
		background-color: #ffffff;
	}

	.box2_one {
		box-sizing: border-box;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-bottom: 36rpx;
	}

	.box2_two {
		box-sizing: border-box;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-top: 36rpx;
	}

	.box3 {
		box-sizing: border-box;
		padding: 32rpx 24rpx 32rpx 24rpx;
		background-color: #ffffff;
	}

	.hobby_tips {
		/* width: 160rpx; */
		/* height: 64rpx; */
		margin-right: 16rpx;
		box-sizing: border-box;
		padding: 16rpx 16rpx 16rpx 20rpx;
		background: #F5F6F8;
		border-radius: 4rpx;
		border: 1px solid #F5F6F8;
		/* line-height: 64rpx; */
		/* max-width: 200rpx; */
	}

	.hobby_tipsx {
		margin-right: 16rpx;
		box-sizing: border-box;
		padding: 16rpx 16rpx 16rpx 20rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		border-radius: 4px;
		border: 1px solid #D93038;
	}



	.hobby_tips_custom {
		width: 106rpx;
		height: 64rpx;
		border-radius: 4rpx;
		border: 1rpx solid #D93038;
		color: #D93038;
		font-size: 24rpx;
		text-align: center;
		line-height: 64rpx;
	}

	.join_box {
		width: 100%;
		box-sizing: border-box;
		padding: 14rpx 32rpx 24rpx 32rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}

	.join_btn {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		color: #ffffff;
		font-size: 28rpx;
	}
</style>
