<template>
	<view class="">
		<view class="dis-flex mt40 mb40 flex-y-center flex-x-center flex-dir-column">
			<image class="wh56 mb24" src="/pagesUser/static/progress-icon02.png"></image>
			<view class="f-40 col-brank-22 f-b">正在申请取消订单</view>
		</view>
		<view class="bg-white-ff  radio-16 pl32 pr32 box-size cont">
			<view class="f-28 f-b col-brank-20 line pt32 pb24 ">请选择取消订单原因，帮助我们改进</view>
			<radio-group @change="cancalChange">
				<label class="dis-flex flex-y-center flex-x-between w-100 border-t-f7" v-for="(item,index) in cancelList" :key="item.id">
					<view class="f-28 pt24 pb24 ">{{item.title}}</view>
					<radio :value="item.title" color="#D62E36" :checked="cancel==item.title"></radio>
				</label>
			</radio-group>
		</view>
		<view class="btn-box fixed-bottom">
			<view class="btn t-c f-30  radio-48 bg-red-d6-ec col-white-ff" @tap="submit">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cancelList:[{
					title:"不想要了/临时有事",
					value:"1"
				},{
					title:"点错了/点多了/点少了",
					value:"2"
				},{
					title:"地址/电话填错了",
					value:"3"
				},{
					title:"送达时间选错了",
					value:"4"
				},{
					title:"忘记用红包/优惠券",
					value:"5"
				},{
					title:"忘记写备注",
					value:"6"
				},{
					title:"商家联系我取消",
					value:"7"
				},{
					title:"骑手联系我取消",
					value:"8"
				},{
					title:"其他原因",
					value:"9"
				}],
				cancel:'',
				options:null
			};
		},
		onLoad(options) {
			this.options=options||null
		},
		methods:{
			//取消更改原因
			cancalChange(e){
				this.cancel=e.detail.value
			},
			//确认提交
			async submit(){
				if(this.cancel==''){
					this.$u.toast("请选择取消原因")
					return
				}else{
					uni.showLoading({
						title: "正在加载中"
					})
					var that = this
					const {
						data,
						status,
						msg
					} = await that.$api.refundOrder({
						order_id: this.options.order_id,
						order_type:this.options.order_type,
						cancel_reason:this.cancel
					})
					uni.hideLoading()
					if (status == 200) {
						that.$u.toast("已申请取消订单，等待商家审核")
						setTimeout(function() {
							uni.navigateBack()
						}, 500)
					}
					
				}
			},
		}
	}
</script>

<style lang="scss">

radio{
	transform: scale(0.75);
}
.cont{
	width:702rpx ;
	margin: 0 auto;
}
page{
	padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
}
</style>
