<template>
	<view>
    <!-- @rightClick="rightClick" -->
		<u-navbar :placeholder="true" :bgColor="bgColor">
			<view class="flex-al-c" slot="left" @click="back">
				<image class="wh-44" src="@/campuscircle/static/ico_fanhui.png" mode=""></image>
			</view>
			<view class="f-34 color-18 fw-700" slot="center">发帖子</view>
			<!-- <view class="" slot="right">
				<view class="foren_btn">发布</view>
			</view> -->
		</u-navbar>
		<view class="m-t-20 f-22">
			<u--textarea v-model="value1" placeholder="请输入内容" count maxlength="500" border="none" confirmType="done"
				height="180">
				<span></span>
			</u--textarea>
		</view>
		<view class="padd-0-24 m-t-12">
			<htz-image-upload :max="9" v-model="ceshiData" mediaType="all" :chooseNum="9"
				:sourceType="['album','camera']" :compress="false" :quality="80" :formData="{'files': 'file'}"
				:remove="true" @uploadSuccess="ceshiUploadSuccess1" @imgDelete="ceshiImgDelete" :headers={Authorization}
				@uploadFail="ceshiUploadFail" :action="urlConfig + 'addonsapi/Base/upload'  ">
			</htz-image-upload>
			<view class="f-20">
				视频大小在200M
			</view>
		</view>
		<view class="padd-0-24">
			<view class="flex-al-c flex-jus-spa">
				<view class="flex-al-c">
					<!-- <view class="tips_box2 flex-c-c" @click="weizhi()">
						<image class="wh-28" src="@/campuscircle/static/ico_weizhi.png" mode=""></image>
						<view class="f-24 color-18 m-l-6">位置</view>
					</view> -->
					<view class="tips_box2 flex-c-c m-l-20" @click="chaohua()">
						<image class="wh-28" src="@/campuscircle/static/ico_chaohua.png" mode=""></image>
						<view class="f-24 color-18 m-l-6">{{ super_topic_name.substring(0,2) || '超话'}}</view>

					</view>
					<view class="tips_box2 flex-c-c m-l-20" @click="haoyou()">
						<image class="wh-28" src="@/campuscircle/static/ico_haoyou.png" mode=""></image>
						<view class="f-24 color-18 m-l-6">好友</view>
					</view>
					<view class="tips_box2 flex-c-c m-l-20" @click="huati()">
						<image class="wh-28" src="@/campuscircle/static/ico_huati.png" mode=""></image>
						<view class="f-24 color-18 m-l-6">话题</view>
					</view>
				</view>
				<view class="tips_box3 flex-c-c" @click="istype()">
					<image class="wh-28" src="@/campuscircle/static/ico_gongkai.png" mode=""></image>
					<view class="f-24 color-18 m-l-6" v-if="testdata != 1">公开</view>
					<view class="f-24 color-18 m-l-6" v-if="testdata == 1">隐私</view>
				</view>
			</view>
		</view>
    <view class="join_box">
			<view class="join_btn" @click="rightClick()">发布</view>
		</view>
		<u-popup :show="show" @close="close" @open="openPopup" :round="10" mode="center">
			<view class="flex-al-c flex-column bor-r-20" style="width: 600rpx; height: 300rpx;">
				<view class="f-36 fw-700 m-t-20">请输入话题</view>
				<view class="m-t-20" style="width: 300rpx;">
					<u--input
					    placeholder="请输入内容"
					    border="bottom"
					    v-model="huati_value"
					    @change="change"
					  ></u--input>
				</view>
				<view class="huati_btn_box m-t-20" @click="huati_btn()">确认</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				bgColor: '#fff',
				value1: '',
				fileList1: [],
				goods_image: [],
				video: [],
				ceshiData: [],
				Authorization: '',
				urlConfig: "",
				open: '0',
				testdata: '0',
				superType: '0',
				super_topic_name: '',
				friend: [],
				friend_name: [],
				show: false, //弹窗
				huati_value: '', //话题内容
			}
		},
		onLoad(open) {
			this.open = open.open
			console.log(this.open, '0公开、1隐私');
		},
		onShow() {
			this.Authorization = uni.getStorageSync('tokens').token
			let that = this
			uni.$on('updateData', function(data) {
				that.testdata = data
				this.open = that.testdata
			})

		},
		methods: {
      ceshiUploadFail() {},
			change() {},
      back() {
        uni.navigateBack();
      },
			// 弹窗
			openPopup() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},


			// 选择超话返回的数据
			otherFun(object) {
				if (object) {
					this.superType = object
					console.log('a123', this.superType);
				}
			},
			otherFun_name(object) {
				if (object) {
					this.super_topic_name = object
					console.log('a123456', this.super_topic_name);
				}
			},

			// @好友返回的id
			otherFunx(object) {
				if (object) {
					this.friend = object
					console.log(this.friend, "====213131aa啊啊啊啊====")
				}
			},
			// @好友返回的名字
			otherFunxs(object) {
				if (object) {
					this.friend_name = object
					// this.value1 = this.value1 + '@' + this.friend_name
					console.log(this.friend_name, "====2999999999999999999a啊啊啊啊====")
				}
			},

			// 发布
			rightClick() {

				if (!this.value1) {
					this.$u.toast("请输入内容")
				} else {
					this.PostcirclesavePost()
				}
				console.log('点击了发布');
			},

			//位置
			weizhi() {
				console.log('点击位置');
			},
			chaohua() {
				uni.navigateTo({
					url: '/campuscircle/index/superList/superList'
				})
				console.log('点击超话');
			},
			haoyou() {
				uni.navigateTo({
					url: '/campuscircle/index/issueFriend/issueFriend'
				})
				console.log('点击好友');
			},
			huati() {
				// uni.navigateTo({
				// 	url: '/campuscircle/index/topic/topic'
				// })
				this.show = true
				console.log('话题');
			},
			huati_btn() {
				if (this.huati_value) {
					this.value1 = this.value1 + '#' + this.huati_value + '#'
				}
				this.show = false
			},
			// 公开状态
			istype() {
				uni.navigateTo({
					url: '/campuscircle/index/privacy/privacy'
				})
				console.log('点击了公开');
			},


			ceshiUploadSuccess(res) { //上传成功
				var _res = JSON.parse(res.data);
				if (_res.code == 200) {
					this.imageData.push(urlConfig + _res.result);
				}
			},
			ceshiUploadSuccess1(res) { //上传成功
				var _res = JSON.parse(res.data);
				if (_res.status == 200) {
					const index = _res.data.lastIndexOf(".")
					const res = _res.data.substring(index, _res.data.length)
					if (['.mp4','.avi','.flv','.mov','.wmv'].indexOf(res) > -1) {
						this.video.push(_res.data)
					} else if (['.png', '.jpg', '.gif', '.jpeg'].indexOf(res) > -1) {
						this.goods_image.push(_res.data)
					}
					this.ceshiData.push(_res.data);
					// this.video = this.ceshiData.toString()
          console.log('this.goods_image', this.goods_image);
				} else {
					uni.showModal({
						title: '提示',
						content: _res.msg,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							}
						}
					});
					/* uni.showLoading({
						title: "上传失败"
					}); */
				}
			},

			ceshiImgDelete(e) {
				console.log('ceshiImgDelete', e)
				// this.video = this.ceshiData.toString()
				// console.log(this.video)
        let imaIndex = this.goods_image.findIndex(item => item==e.del)
        let videoIndex = this.video.findIndex(item => item==e.del)
        if (imaIndex > -1) {
          this.goods_image.splice(imaIndex,1)
        }
        if (videoIndex > -1) {
          this.video.splice(videoIndex,1)
        }
			},

			// 发布帖子接口
			async PostcirclesavePost() {
        uni.showLoading({title: '发布中...', mask: true});
        console.log('this.video', this.video);
        console.log('this.goods_image',this.goods_image);
				var that = this
				const result = await that.$api.circlesavePost({
					content: this.value1,
					pics: this.goods_image.toString(),
					video: this.video.toString(),
					address: '长沙',
					super_topic: this.superType,
					open: this.testdata,
					friends: this.friend,
					forward_id: 0,
				})
				if (result.status == 200) {
					this.$u.toast("发布成功")
					setTimeout(() => {
            uni.navigateBack({
							delta: 1,
              success: function () {
                uni.hideLoading()
              },
              fail: function () {
                uni.hideLoading()
              }
						});
					}, 1000)
				} else {
          this.$u.toast(result.msg||'发布失败')
          uni.hideLoading()
        }
			},

			// 超话列表
			async PostcirclesuperTopicList() {
				var that = this
				const result = await that.$api.circlesuperTopicList({
					type: this.index,

				})
				if (result.status) {
					// this.$u.toast("创建成功")
					this.main = result.data.data
					console.log(this.main, '这是什么东西==================================================');
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff !important;
	}

	.foren_btn {
		width: 112rpx;
		height: 52rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 26rpx;
		text-align: center;
		line-height: 52rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.tips_box1 {
		width: 168rpx;
		height: 52rpx;
		background: #F7F7F7;
		border-radius: 26rpx;
		line-height: 52rpx;
	}

	.tips_box2 {
		width: 118rpx;
		height: 52rpx;
		/* box-sizing: border-box;
		padding: 4rpx 18rpx 4rpx 18rpx; */
		background: #F7F7F7;
		border-radius: 26rpx;
		line-height: 52rpx;
	}

	.tips_box3 {
		width: 120rpx;
		height: 52rpx;
		border-radius: 26rpx;
		border: 1rpx solid #D7D7DA;
		line-height: 52rpx;
	}

	/deep/.uni-textarea-textarea {
		font-size: 32rpx !important;
		color: #181818;
	}
	
	.huati_btn_box {
		width: 240rpx;
		height: 60rpx;
		background-color: #d93018;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 100rpx;
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
