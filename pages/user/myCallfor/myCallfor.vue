<template>
	<view class="padd-b-80 ">
		<view class="padd-0-32">
			<view class="flex-al-c m-t-40" v-for="(item,index) in list">
				<view class="">
					<image v-if=" item.portrait == '' " class="wh-80" src="/static/img/head.png" mode=""></image>
					<image v-if=" item.portrait != '' " class="wh-80" :src="item.portrait" mode=""></image>

				</view>
				<view class="m-l-32">
					<view class="f-28 color-18 fw-700 text-shenglue" style="width: 520rpx;">
						{{ item.user_name }}
					</view>
					<view v-if="item.statues==0" class="f-24 color-7A7B84 m-t-6 text-shenglue" style="width: 520rpx;">
						有效期内未产生下单行为，无法获得红包
					</view>
					<view v-if="item.statues==1 && timeStamp < item.due_date"
						class="f-24 color-7A7B84 m-t-6 text-shenglue" style="width: 520rpx;">
						邀请成功，红包已发放，可前往我的红包查看
					</view>
					<view v-if="item.statues==1 && timeStamp > item.due_date"
						class="f-24 color-7A7B84 m-t-6 text-shenglue" style="width: 520rpx;">
						还未产生下单，24小时后过期，去提醒使用
					</view>
				</view>
			</view>
			<null-data title="暂无邀请成功记录" v-if="list.length == 0"></null-data>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				timeStamp: ''
			}
		},
		onLoad() {
			this.Gettc_recommend_myList()
			this.timeStamp = Date.parse(new Date());
			this.timeStamp = this.timeStamp / 1000
			console.log(this.timeStamp, '时间戳');
		},
		methods: {

			//我的邀请列表
			async Gettc_recommend_myList() {
				const res = await this.$api.tc_recommend_myList({

				})
				if (res.status == 200) {
					this.list = res.data.list

				}

			},
		}
	}
</script>

<style>
	page {
		background-color: #fff !important;
	}
</style>