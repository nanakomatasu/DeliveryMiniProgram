<template>
	<view>
		<view class="contentx">
			<view class="contentr m-t-20" v-for="(item,index) in list" :key="index">
				<view class="flex-centerd">
					<view>
						<image class="imgx" :src="item.member.portrait" mode=""></image>
					</view>
					<view class="m-l-22 flex-al-c">
						<view class="color-D93038 fw-700 f-28">{{item.member.user_name}}</view>
						<view class="color-20 fw-700 f-28 m-l-8">提到了你</view>
					</view>
				</view>

				<view class="m-t-25">
					<!-- 忘不掉的是回忆，继续的是生活，就当是路过忘不掉的是回忆，继续的是生活，就当是路过忘不掉的是回忆，继续的是生活，就当是路过忘不掉的是回忆，继续的是生活，就当是路过 -->
					{{item.content}}
				</view>

				<view class="flex-wr m-t-15">
					<view class="flex-space " v-for="(items,indexs) in item.pics" :key="indexs">
						<view class=" m-t-15 m-r-18">
							<image class="imgs bor-r-16" :src="items" mode=""></image>
						</view>
					</view>
				</view>

				<view class="flex-about flex-centerd m-t-20 color-7A7B84 f-24">
					{{item.create_time.substring(0,16)}}
				</view>
			</view>
		</view>
		<null-data v-if="list.length==0"></null-data>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// pics: [],
			}
		},
		onLoad() {
			this.GetcircleDtList()
		},
		methods: {

			async GetcircleDtList() {
				var that = this
				const result = await that.$api.circleDtList({

				})
				if (result.status == 200) {
					this.list = result.data.data
					this.list.forEach((item,index)=>{
						if(item.pics){
							this.list[index].pics=item.pics.split(',')
						}
					})
				}
			},
		}
	}
</script>

<style>
	.menu {
		width: 85%;
		padding: 20rpx 56rpx 28rpx 56rpx;
		background-color: #ffffff;
		position: fixed;
		top: 86rpx;
	}

	.bar {
		width: 20rpx;
		height: 6rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 3rpx;
	}

	.contentx {
		padding: 0rpx 25rpx 28rpx 25rpx;

	}

	.contentr {
		padding: 32rpx 25rpx 28rpx 25rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.imgx {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}

	.imgs {
		width: 144rpx;
		height: 144rpx;
	}

	.ico {
		width: 40rpx;
		height: 40rpx;
	}
</style>
