<template>
	<view class="">
		<view class="p-t-20 p-l-20 p-r-20">
			<view class="title flex-vertical flex-about">
				<view class="f-28 color-20 fw-700">超话名称</view>
				<view class="w70">
					<u--input placeholder="请输入（不超过32个字符）" border="none" v-model="value" inputAlign="right" maxlength="10"></u--input>
				</view>
			</view>

			<view class="title flex-vertical flex-about m-t-30" @click="show=true">
				<view class="f-28 color-20 fw-700">超话类型</view>
				<view class="flex-al-c">
					<view class="m-r-10 f-28 color-000 fw-700">{{columnss || '请选择'}}</view>
					<image class="zhankai" src="../../static/ico_zhankai.png" mode=""></image>
				</view>
			</view>

			<view class="m-t-40">
				<view class="f-24 c-99 fw-700">创建规则</view>
				<view class="m-t-15">
					<view class="f-24 c-99">1、名称不超过10个汉字，限汉字、字母、数字和下划线</view>
					<view class="f-24 c-99">2、同一个名称申请人数须≥5人，审核通过后即可开通，我们会在1-3个工作日内反馈审核结果。</view>
				</view>
			</view>

		</view>
		<u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" keyName="name"></u-picker>
		<view class="subscribe_box">
			<view class="subscribe_btn" @click="sub_btn()">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [],
				columnss: '',
				value: '', //超话名称
				id: '', //超话类型id
			}
		},
		onLoad() {
			this.PostcirclesuperTopicTypeList()
		},
		methods: {
			sub_btn() {
				// this.$u.toast("提交成功")
				
				this.PostcirclesuperTopicApply()
			},
			confirm(e) {
				console.log('confirm', e)
				console.log(e,'==============================');
				this.show = false
				this.columnss = e.value[0].name
				this.id = e.value[0].id
				

			},
			cancel() {
				this.show = false
			},
			
			
			// 超话类型
			async PostcirclesuperTopicTypeList() {
				var that = this
				const result = await that.$api.circlesuperTopicTypeList({

				})
				if(result.status) {
					this.columns = [result.data]
					console.log(this.columns,'这是什么东西==================================================');
				}
			},
			
			// 超话申请
			async PostcirclesuperTopicApply() {
				var that = this
				const result = await that.$api.circlesuperTopicApply({
					type: this.id,
					name: this.value
				})
				if(result.status == 200) {
					this.$u.toast("提交成功，审核中!")
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1000)
					console.log(this.columns,'这是什么东西==================================================');
				}
			}
		}
	}
</script>

<style>
	.title {
		padding-left: 35rpx;
		padding-right: 40rpx;
		height: 112rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.zhankai {
		width: 28rpx;
		height: 28rpx;
	}

	.subscribe_box {
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
		padding: 14rpx 34rpx 24rpx 34rpx;
	}

	.subscribe_btn {
		width: 686rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
