<template>
	<view class="11" :style="{background:st.background}" style="padding-left: 16rpx;padding-right: 16rpx;">

		<view class="grid-2" v-if="st.layout =='2'">
			<view :style="{paddingLeft: st.paddingLeft + 'px',paddingTop: st.paddingTop + 'px'}"
				v-for="(item,index) in images" :key="index" @tap="skip(item.linkUrl)">
				<image class="wh-332" :src="item.imgUrl" mode="aspectFill"></image>
			</view>
		</view>
		<view class="grid-3" v-if="st.layout =='3'">
			<view :style="{paddingLeft: st.paddingLeft + 'px',paddingTop: st.paddingTop + 'px'}"
				v-for="(item,index) in images" :key="index" @tap="skip(item.linkUrl)">
				<image style="width: 230rpx;height: 230rpx;" :src="item.imgUrl" mode="aspectFill"></image>
			</view>
		</view>
		<view class="grid-4" v-if="st.layout =='4'">
			<view :style="{paddingLeft: st.paddingLeft + 'px',paddingTop: st.paddingTop + 'px'}"
				v-for="(item,index) in images" :key="index" @tap="skip(item.linkUrl)">
				<image style="width:160rpx ;height: 160rpx;" :src="item.imgUrl" mode="aspectFit"></image>
			</view>
		</view>
		<view v-if="st.layout =='-1'" class="dis-flex ">
			<image class="wh-332" :src="images[0].imgUrl" @tap="skip(images[0].linkUrl)"></image>
			<view class="dis-flex flex-column">
				<image v-if="images[1]" style="width: 332rpx; height: 50%;" :src="images[1].imgUrl"
					@tap="skip(images[1].linkUrl)"></image>
				<view class="dis-flex flex-dir-row flex-space">
					<image v-if="images[2]" style="width: 166rpx; height: 166rpx;" :src="images[2].imgUrl"
						@tap="skip(images[2].linkUrl)"></image>
					<image v-if="images[3]" style="width: 166rpx; height: 166rpx;" :src="images[3].imgUrl"
						@tap="skip(images[3].linkUrl)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexCalendar",
		props: {
			images: {
				type: Array,
				default: function() {
					return []
				}
			},
			st: {
				type: Object,
				default: function() {
					return {
						layout: '2',
						background: "#ffffff",
						paddingLeft: "0",
						paddingTop: "0",
					}
				}
			}
		},
		data() {
			return {
				skip(url) {
					console.log(url)

					uni.navigateTo({
						url: url
					});
				}
			};
		}
	}
</script>

<style>
	.grid-2 {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 45%); */
		justify-content: center;
		grid-template-columns: repeat(2, 1fr);
	}

	.grid-3 {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 45%); */
		justify-content: center;
		grid-template-columns: repeat(3, 1fr);
	}

	.grid-4 {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, 45%); */
		justify-content: center;
		grid-template-columns: repeat(4, 1fr);
	}
</style>