<template>
	<view class="padd-b-160">
		<u-navbar title="校园圈子" @rightClick="rightClick" :placeholder="true" :bgColor="bgColor">
			<view class="" slot="left" @click="goMy()">

				<image class="wh-64" :src="user_info.portrait" mode="" v-if="user_info.portrait" style="border-radius: 50%;">
				</image>
				<image class="wh-64" src="../../static/img/head.png" mode="" v-if="!user_info.portrait"></image>
			</view>
			<view class="f-34 color-20 fw-700" slot="center">圈子</view>
		</u-navbar>
		<view class="bor-r-100" @click="goForen()">
			<!-- v-if="school.id==circle_info.school.id" -->
			<my-home :homeimg="'/campuscircle/static/ico_issue.png'" :x="'280'" :y="'400'"></my-home>
		</view>
		<u-sticky :offset-top="64">
			<view class="flex-al-c bgc-f7 padd-0-24"
				style="padding-top: 20rpx; padding-bottom: 20rpx; box-sizing: border-box;">
				<view class="" style="width: 534rpx;" @click="unsearched()">
					<u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" bgColor="#fff"></u-search>
				</view>
				<view class="flex-al-c">
					<image class="wh-44 m-l-32" @click="xiaoxi()" src="/campuscircle/static/ico_xiaoxi.png" mode="">
					</image>
					<image class="wh-64 m-l-30" @click="qiandao()" src="/campuscircle/static/ico_qiandao.png" mode="">
					</image>
				</view>
			</view>
		</u-sticky>
		<view class="padd-0-24">
			<!-- 漂流瓶、攒局 -->
			<view class="flex-jus-spa m-t-24">
				<!-- <view class="flex-al-c plp_box" @click="goPlp()">
					<view class="">
						<view class="f-32 color-20 fw-700">漂流瓶</view>
						<view class="plp_btn m-t-20">查看详情</view>
					</view>
					<view class="m-l-38">
						<image class="wh-112" src="/campuscircle/static/ico_piaoliupin.png" mode=""></image>
					</view>
				</view> -->
				<view class="flex-al-c zj_box" @click="goZj()">
					<view class="">
						<view class="f-32 color-20 fw-700">攒局</view>
						<view class="zj_btn m-t-20">查看详情</view>
					</view>
					<view class="m-l-38">
						<image class="wh-112" src="/campuscircle/static/ico_zanju.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 导航分类 -->
			<view class="flex-al-c m-t-28">
				<view class="flex-al-c flex-column" @click="navschool()">
					<view class="f-32 fw-700" :class=" nav_type1 == 1 ? 'color-20' : 'color-888' ">本校</view>
					<view :class=" nav_type1 == 1 ? 'nav_b' : '' "></view>
				</view>
				<view class="nav_r"></view>
				<view class="flex-al-c flex-column" @click="all()">
					<view class="f-32 fw-700" :class=" nav_type2 == 1 ? 'color-20' : 'color-888' ">全站</view>
					<view :class=" nav_type2 == 1 ? 'nav_b' : '' "></view>
				</view>
				<view class="nav_r"></view>
				<view class="flex-al-c flex-column" @click="attention()">
					<view class="f-32 fw-700" :class=" nav_type3 == 1 ? 'color-20' : 'color-888' ">关注</view>
					<view :class=" nav_type3 == 1 ? 'nav_b' : '' "></view>
				</view>
				<view class="nav_r"></view>
				<view class="flex-al-c flex-column" @click="superTopic()">
					<view class="f-32 fw-700" :class=" nav_type4 == 1 ? 'color-20' : 'color-888' ">超话</view>
					<view :class=" nav_type4 == 1 ? 'nav_b' : '' "></view>
				</view>

			</view>
			<!-- 学校 -->
			<view class="school_box m-t-24">
				<view class=" flex-jus-spa" :class="isGroup == 0 ? 'flex-al-c' : '' ">
					<view class="flex-al-c">
						<view class="">
							<!-- <image class="wh-128" src="/campuscircle/static/xuexiao_logo.png" mode=""></image> -->
							<image class="wh-128" :src="school.school_logo" mode=""></image>
						</view>
						<view class="m-l-24">
							<view class="f-32 color-20 fw-700">{{school.school_name}}</view>
							<!-- <view class="f-24 color-888 m-t-16">学校官网</view> -->
						</view>
					</view>
					<view class="flex-end flex-column" v-if="isGroup==0">
						<view class="joinSchool_btn" @click="joinSchool()">立即加入</view>
						<view class="m-t-16 flex-al-c">
							<image class="wh-24" src="/campuscircle/static/ico_redu.png" mode=""></image>
							<text class="f-20 color-888 m-l-6">他们正聊的火热</text>
						</view>
					</view>
					<view class="m-t-24" v-else>
						<view class="flex-al-c">
							<view class="schoolGroup_box">老乡群</view>
							<view class="schoolGroup_box">校友群</view>
						</view>
					</view>
				</view>
				<view class="flex-al-c m-t-32" v-if="text">
					<view class="schoolNotice_box">公告</view>
					<view class="f-24 color-20 m-l-12 text-chaochu" style="width: 578rpx;" @click="clickNews">{{ text }}</view>
				</view>
			</view>
			<!-- 分类标签 -->
			<view class="m-t-32">
				<u-tabs :list="list1" @click="click" lineWidth="0" :activeStyle="{
				            color: '#ffffff',
							fontSize: '24rpx',
							fontWeight: '700',
				            transform: 'scale(1.05)',
							padding: '8rpx 32rpx 8rpx 32rpx',
							borderRadius: '4rpx',
							background: 'linear-gradient(313deg, #D62E36 0%, #EC434B 100%)',
				        }" :inactiveStyle="{
				           color: '#202020',
				           fontSize: '24rpx',
							padding: '8rpx 32rpx 8rpx 32rpx',
							borderRadius: '4rpx',
							background: '#E9EBEF',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 0rpx; padding-right: 20rpx; height: 48rpx;"></u-tabs>
			</view>
			<!-- <circleList :postList='postList'></circleList> -->
			<!-- 朋友圈内容 -->
			<view class="circle_box" v-for="(item,index) in postList" :key="index">
				<view class="flex-jus-spa flex-al-c">
					<view class="flex">
						<view class="">
							<image class="wh-64 bor-r-100" :src="item.member.portrait" mode=""></image>
						</view>
						<view class="m-l-22">
							<view class="f-28 color-18 fw-700">{{item.member.user_name}}</view>
							<view class="f-24 color-7A7B84 m-t-16">
								<text>{{item.create_time.substring(0,16)}}</text>
								<!-- <text>{{formatMsgTime(new Date(item.create_time))}}</text> -->
								<text class="m-l-20">来自{{item.school.school_name}}</text>
							</view>
						</view>
					</view>
					<view class="attention_user_box" @click="attention_user(item.member.id,item.is_follow)">
						<text v-if="item.is_follow == 1">已关注</text>
						<text v-if="item.is_follow != 1">关注</text>
					</view>
				</view>
				<view class="f-28 color-18 m-t-16">
					<text class="color-D93038 m-r-24" @click="gosuperPage(item.topic.id)"
						v-if="item.topic != null">#{{item.topic.super_topic_name}}</text>
					<text class="color-D93038 m-r-24" @click="gosuperPage(item.topic.id)" v-if="item.friends != null">
						<text class="" v-for="(itemfriends,indexfriends) in item.friends" :key="indexfriends">
							@{{itemfriends.user_name}}
						</text>

					</text>
					<text @click="goPostDetails(item.id)">{{item.content}}</text>
				</view>
				<view class="scroll_img_box" @click="goPostDetails(item.id)">
					<u-scroll-list :indicator="indicator">
						<view class="flex ">
							<view style="margin-right: 20rpx;" v-for="(items, indexs) in item.pics" :key="indexs">
								<image class="wh-204 bor-r-10" mode="aspectFill" :src="items"></image>
							</view>
						</view>
					</u-scroll-list>
					<!-- <view class="scroll_tips_box flex-c-c flex-column ">
						共
						<br>
						{{ item.pics.length}}
						<br>
						张
					</view> -->
				</view>
				<view class="color-7A7B84 f-24 flex flex-jus-spa">
					<view class="flex">
						<view class="flex-al-c" @click="transmit(item.id)">
							<image class="wh-40" src="/campuscircle/static/ico_transmit.png" mode=""></image>
							<view class="m-l-8">{{item.forward_num}}</view>
						</view>
						<view class="flex-al-c m-l-60" @click="like(item.id,item.is_like)">
							<image class="wh-40" v-if="item.is_like == 1" src="/campuscircle/static/ico_likes.png" mode=""></image>
							<image class="wh-40" v-if="item.is_like != 1" src="/campuscircle/static/ico_like.png" mode=""></image>
							<view class="m-l-8">{{item.likes_num}}</view>
						</view>
						<view class="flex-al-c m-l-60" @click="goPostDetails(item.id)">
							<image class="wh-40" src="/campuscircle/static/ico_comment.png" mode=""></image>
							<view class="m-l-8">{{item.comment_num}}</view>
						</view>
					</view>
					<!-- <view class="flex-al-c" @click="coin()">
						<image class="wh-40" src="/campuscircle/static/ico_coin.png" mode=""></image>
						<view class="m-l-8">投币</view>
					</view> -->
				</view>
			</view>
		</view>

		<null-data v-if="postList.length==0"></null-data>
		<indexHenu :tabAct="2"></indexHenu>

		<!--公告弹窗 -->
		<view :catchtouchmove="true">
			<u-popup :show="show" mode="center" :safeAreaInsetBottom="false" round="32rpx">
				<view
					class="win-box-mobile dis-flex flex-x-center flex-y-center flex-dir-column  box-size bg-white-ff radio-30">
					<view class="f-32 w-100 t-c f-b">公告</view>
					<scroll-view scroll-y="true" class="scroll-news f-28 t-c mt20">{{ text }}</scroll-view>
					<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="show = false">我知道了</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circle_info: {},
				user_info: {},
				isGroup: '0', //是否加入群聊状态 0未加入 1已加入
				indicator: false,
				bgColor: '#f7f7f7',
				type: '2',
				keyword: '',
				nav_type1: '1',
				nav_type2: '',
				nav_type3: '',
				nav_type4: '',
				school_id: '', //学校id
				nav_state: '', //筛选关注的会员发帖
				super_state: '', //筛选包含超话帖子
				list1: [{
						name: '热门',
						id: 0
					},
					// {
					// 	name: '娱乐',
					// 	id: 1
					// },
					{
						name: '推荐',
						id: 2
					},
					//  {
					// 	name: '榜单',
					// 	id: 3
					// },
				],
				list: [{
					img: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				}],
				attention_type: false, //关注状态
				Circle_list: {},
				school_name: '',
				school_logo: '',
				postList: [], //朋友圈列表
				pics: [],
				school: {},
				is_hot: '1', //热门状态
				is_recommend: '', //推荐
				text: '',
				show: false
			}
		},
		onLoad() {
			this.school_id = uni.getStorageSync('school').id
			this.school = uni.getStorageSync('school')

			this.Postcircleuserinfo()
			// this.PostcirclegetCircle()
			// this.circlepostsList()
			this.getGgpz()
		},
		onShow() {
			this.circlepostsList()
		},
		methods: {
			async clickNews(index) {
				this.show = true
			},
			async getGgpz() {
				const result = await this.$api.getGgpz()
				if (result.status == 200 && result.data) {
					this.text = result.data
				}
			},
			// 去发帖
			goForen() {
				uni.navigateTo({
					url: '/campuscircle/index/foren/foren'
				})
			},
			// 个人中心
			goMy() {
				uni.navigateTo({
					url: '/campuscircle/my/my'
				})
			},
			// 搜索
			unsearched() {
				uni.navigateTo({
					url: '/campuscircle/index/unsearched/unsearched'
				})
				console.log('点击了搜索框');
			},
			// 消息
			xiaoxi() {
				console.log('点击了消息');
			},
			// 签到
			qiandao() {
				console.log('点击了签到');
			},
			// 漂流瓶
			goPlp() {
				console.log('点击了漂流瓶');
			},
			// 攒局
			goZj() {
				uni.navigateTo({
					url: '/campuscircle/gathergame/gathergame'
				})
			},
			// nav导航栏 本校 全站 关注 超话
			navschool() {
				console.log('点击了本校');
				this.nav_type1 = 1
				this.nav_type2 = 2
				this.nav_type3 = 2
				this.nav_type4 = 2
				if (this.nav_type1 == 1) {
					this.school_id = uni.getStorageSync('school').id
					this.nav_state = '' //筛选关注的会员发帖
					this.super_state = '' //筛选包含超话帖子
				}
				this.circlepostsList()
			},
			all() {
				console.log('点击了全站');
				this.nav_type2 = 1
				this.nav_type1 = 2
				this.nav_type3 = 2
				this.nav_type4 = 2
				if (this.nav_type2 == 1) {
					this.school_id = ''
					this.nav_state = '' //筛选关注的会员发帖
					this.super_state = '' //筛选包含超话帖子
				}
				this.circlepostsList()
			},
			attention() {
				console.log('点击了关注');
				this.nav_type3 = 1
				this.nav_type1 = 2
				this.nav_type2 = 2
				this.nav_type4 = 2
				if (this.nav_type3 == 1) {
					this.nav_state = 1 //筛选关注的会员发帖
					this.super_state = '' //筛选包含超话帖子
				}
				this.circlepostsList()
			},
			superTopic() {
				console.log('点击了超话');
				this.nav_type4 = 1
				this.nav_type1 = 2
				this.nav_type2 = 2
				this.nav_type3 = 2
				if (this.nav_type4 == 1) {
					this.super_state = 1 //筛选包含超话帖子
					this.nav_state = '' //筛选关注的会员发帖
				}
				this.circlepostsList()
			},

			// 加入圈子
			joinSchool() {
				uni.navigateTo({
					url: '/campuscircle/index/identity/identity'
				})
				// this.PostcirclesaveCircle()
				console.log('立即加入');
			},
			click(item) {
				console.log('item', item, item.name, item.id);
				if (item.id == 0) {
					this.is_hot = 1
					this.is_recommend = ''
					this.circlepostsList()
				} else if (item.id == 2) {
					this.is_recommend = 1
					this.circlepostsList()
				} else {
					this.$u.toast("功能开发中")
				}

			},

			// 帖子详情
			goPostDetails(id) {
				console.log('ididiidid', id);
				uni.navigateTo({
					url: '/campuscircle/index/postDetails/postDetails?id=' + id
				})
			},
			gosuperPage(id) {
				uni.navigateTo({
					url: '/campuscircle/index/superPage/superPage?id=' + id
				})
			},
			// 朋友圈关注
			attention_user(id, is_follow) {
				this.GetcircleFollow(id, is_follow)
				console.log('点击了关注', is_follow);
			},

			// 朋友圈转发
			transmit(id) {
				uni.navigateTo({
					url: '/campuscircle/index/transmit/transmit?id=' + id
				})
				console.log('点击了转发');
			},

			// 朋友圈喜欢
			like(id, is_like) {
				this.GetcirclepostsLike(id, is_like)
				console.log('点击了喜欢id', this.liketype, id, is_like);
			},

			// 朋友圈评论
			comment() {
				console.log('点击了评论');
				this.$u.toast("功能开发中")
			},

			// 朋友圈投币
			coin() {
				console.log('点击了投币');
				this.$u.toast("功能开发中")
			},

			// 加入圈子接口
			async PostcirclegetCircle() {
				var that = this
				const result = await that.$api.circlegetCircle({

				})
				uni.hideLoading()
				console.log(result.data)
				this.Circle_list = result.data
				// this.school_logo = this.Circle_list.school.school_logo
				// this.school_name = this.Circle_list.school.school_name
			},

			// 获取用户信息接口
			async Postcircleuserinfo() {
				var that = this
				const result = await that.$api.circleuserinfo({

				})
				uni.hideLoading()
				if (result.status == 200) {
					this.school_logo = result.data.circle_info.school?.school_logo
					this.school_name = result.data.circle_info.school?.school_name
					this.circle_info = result.data.circle_info


					this.user_info = result.data.user_info

					if (result.data.circle_info != '') {
						this.isGroup = 1
					}

				}
			},

			// 帖子列表
			async circlepostsList() {
				var that = this
				const result = await that.$api.circlepostsList({
					school_id: this.school_id,
					follow: this.nav_state,
					super_topic: this.super_state,
					is_hot: this.is_hot,
					is_recommend: this.is_recommend
				})
				uni.hideLoading()
				if (result.status == 200) {
					this.postList = result.data.data
					this.postList.forEach((item, index) => {
						if (item.pics) {
							this.postList[index].pics = item.pics.split(',')
						}
					})
				}
			},
			// 点赞,取消点赞接口
			async GetcirclepostsLike(id, is_like) {
				var that = this
				const result = await that.$api.circlepostsLike({
					post_id: id
				})
				console.log(id, '123id奥奥奥');
				if (result.status == 200) {
					if (is_like == 1) {
						this.$u.toast("取消点赞")
					} else if (is_like != 1) {
						this.$u.toast("👍赞一个~")
					}
					this.circlepostsList()
				}
			},
			// 关注接口
			async GetcircleFollow(id, is_follow) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: id
				})
				if (result.status == 200) {
					if (is_follow == 1) {
						this.$u.toast("取消成功")
					} else if (is_follow != 1) {
						this.$u.toast("关注成功")
					}
					this.circlepostsList()
				}
			},

			formatMsgTime(timespan) {
				var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
				var year = dateTime.getFullYear()
				var month = dateTime.getMonth() + 1
				var day = dateTime.getDate()
				var hour = dateTime.getHours()
				var minute = dateTime.getMinutes()
				// var second = dateTime.getSeconds()
				var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
				var now = new Date() // 获取本机当前的时间
				var nowNew = now.getTime() // 将本机的时间转换为毫秒
				var milliseconds = 0
				var timeSpanStr
				milliseconds = nowNew - millisecond
				if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
					timeSpanStr = '刚刚'
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
					timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 *
					15) { // 大于一天小于十五天展示位天
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
					timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
				} else {
					timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
				}
				return timeSpanStr
			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.plp_box {
		box-sizing: border-box;
		padding: 32rpx 24rpx 32rpx 32rpx;
		background: #FDEBEC;
		border-radius: 16rpx;
	}

	.plp_btn {
		width: 136rpx;
		height: 48rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 24rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.zj_box {
		box-sizing: border-box;
		padding: 32rpx 24rpx 32rpx 32rpx;
		background: #FFECD0;
		border-radius: 16rpx;
	}

	.zj_btn {
		width: 136rpx;
		height: 48rpx;
		background: linear-gradient(140deg, #FFC933 0%, #FF9308 100%);
		border-radius: 24rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.nav_b {
		margin-top: 6rpx;
		width: 20rpx;
		height: 6rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 3rpx;
	}

	.nav_r {
		width: 4rpx;
		height: 28rpx;
		background-color: #D5D5D5;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.school_box {
		box-sizing: border-box;
		padding: 24rpx 32rpx 24rpx 24rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
	}

	.joinSchool_btn {
		width: 136rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1rpx solid #D93038;
		color: #D93038;
		font-size: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.schoolNotice_box {
		width: 56rpx;
		height: 32rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 4rpx;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		line-height: 32rpx;
	}

	.attention_user_box {
		width: 96rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1rpx solid #D5D5D5;
		text-align: center;
		line-height: 48rpx;
		color: #202020;
		font-size: 24rpx;
	}

	.circle_box {
		box-sizing: border-box;
		padding: 32rpx 24rpx 28rpx 24rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		margin-top: 20rpx;
	}

	.scroll_img_box {
		position: relative;
		margin-top: 28rpx;
	}

	.scroll_tips_box {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 204rpx;
		background-color: #ffffff;
		color: #202020;
		font-size: 28rpx;
		text-align: center;
		opacity: 0.9;
	}

	.schoolGroup_box {
		width: 84rpx;
		height: 32rpx;
		border-radius: 4rpx;
		border: 1rpx solid #D93038;
		font-size: 22rpx;
		color: #D93038;
		text-align: center;
		line-height: 32rpx;
		margin-left: 8rpx;
	}

	.win-box-mobile {
		width: 560rpx;
		padding: 40rpx 60rpx;

	}

	.scroll-news {
		max-height: 600rpx;
		margin-bottom: 20rpx;
	}

	.btn-win {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
</style>