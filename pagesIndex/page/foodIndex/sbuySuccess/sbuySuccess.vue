<template>
	<view class="padd-flex">
		<view class="flex-c-c flex-column padd-0-24">
			<view class="f-36 color-20 fw-700 m-t-32">购买成功</view>
			<view class="w-100 m-t-46">
				<view class="flex-jus-spa padd-32 bor-r-16 m-b-32 bgc-ff"
					v-for="(item,index) in qrcode" :key="index">
					<view class="color-333 flex-column">
						<text class="f-28">{{item.goods.name}}</text>
						<text class="f-40 fw-700 m-t-12">{{item.code}}</text>
					</view>
					<view class="sbuySuccess-btn flex-c-c " @click="consume(item),show = true">二维码核销</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" @close="close" @open="open" mode="bottom" :closeable="true">
			<view class="flex-c-c flex-column padd-32">
				<view class="f-32 color-333 fw-700">
					{{goods}}
				</view>
				<view class="m-t-40">
					<tki-qrcode ref="qrcode" cid="cid" :val="val"  unit="rpx" background="#fff" :onval="true"
						:loadMake="true" :usingComponents="false"  loadingText="正在生码" />
				</view>
				<view class="f-32 color-333 fw-700 m-t-20">
					{{code}}
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				tips: '',
				userInfo: {}, //用户
				qrcode: "", //支付码
				val: "", //二维码内容
				qrcode:[],
				code:"",
				goods:"",
			}
		},
		
		onLoad(e){
			this.qrcode=JSON.parse(e.qrcode)
			
			
		
		},
		
		methods: {
			
			
			consume(item){
				
				this.val=item.code
				this.code=item.code
				this.goods=item.goods.name
			},
			
			
			
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			}
			
			
			
			
		}
	}
</script>

<style>
	.sbuySuccess-btn {
		width: 163rpx;
		height: 64rpx;
		line-height: 64rpx;
		background: #FAE0E1;
		border-radius: 32rpx;
		color: #D93038;
		font-weight: 700;
		font-size: 28rpx;
	}
</style>