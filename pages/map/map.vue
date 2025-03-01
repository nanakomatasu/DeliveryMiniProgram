<template>
	<view class="map-warp">
		<!--#ifdef H5-->
		<web-view
			:src="'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key='+key+'&referer=校u送&coord='+latitude+','+longitude"
			@message="onMessage">
		</web-view>
		<!--#endif-->
		<!-- #ifdef APP-PLUS -->
		<web-view :src="'/static/html/map.html?coord='+latitude+','+longitude" @message="onMessage"></web-view>
		<!--#endif -->

	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				key: "2VSBZ-C72CZ-RCGXH-7A5JQ-H3J7T-P2BGO",
				height: uni.getSystemInfoSync().screenHeight,
				addr: {},
				latitude:'', //纬度
				longitude:'', //经度
			}
		},
		onLoad() {
			this.getConfigGetInfo()

			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				highAccuracyExpireTime: 100,
				success: (res) => {
				this.latitude=res.latitude
				this.longitude=res.longitude	
				},
			});



			
		},
		onReady() {
			const self = this
			//#ifdef H5
			console.log(window.isListen)
			if (window.isListen) {
				// 防止多次注册addEventListener事件
				return
			}
			window.addEventListener('message', function(event) {
				var loc = event.data;
				if (loc && loc.module == 'locationPicker') {
					self.getPositon(loc, self)
				};
				window.isListen = true
				window.removeEventListener('message', function() {
					window.isListen =false
				}, true)
			}, false)
			//#endif
		},
		methods: {
			//获取配置接口
			async getConfigGetInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.configGetInfo({
					ident:"baseset"
				})
				uni.hideLoading()
				if (status == 200) {
					this.key = data.txKey
					console.log(data)
				}
			},
			onMessage(res) {
				console.log(res)
				this.getPositon(res.detail.data[0], this)
			},
			
			
			getPositon(result, self) {
				console.log(result,"1111")
				var that = this
				// #ifdef H5
				that.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
					location: result.latlng.lat + "," + result.latlng.lng,
					
					key: this.key,
					output: "jsonp",
				}).then(res => {
					console.log(res, "逆地址解析")
					var addr = {
						province: res.result.address_component.province,
						city: res.result.address_component.city,
						district: res.result.address_component.district,
						detail: res.result.address_component.street_number
					}
					this.$nextTick(function() {
						result.addr = addr
						uni.$emit('onAddressChange', result)
						setTimeout(function() {
							var pages = getCurrentPages()
							uni.navigateBack()
						}, 1000)
					})

				})
				//#endif


				// #ifdef APP-PLUS
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/',
					data: {
						location: result.latlng.lat + "," + result.latlng.lng,
						key: this.key,
					},
					success: (res) => {
						console.log(res)
						var addr = {
							province: res.data.result.address_component.province,
							city: res.data.result.address_component.city,
							district: res.data.result.address_component.district,
							detail: res.data.result.address_component.street_number
						}
						this.$nextTick(function() {
							result.addr = addr
							uni.$emit('onAddressChange', result)
							setTimeout(function() {
								var pages = getCurrentPages()
								uni.navigateBack()
							}, 1000)
						})
					}
				});
				//#endif
			},

		},
	}
</script>

<style scoped lang="scss">
	.map {
		height: 100%;
	}

	web-view {
		height: 100%;
	}
</style>
