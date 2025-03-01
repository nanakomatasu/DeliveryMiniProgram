<template>
	<view class="bg-white margin-top">
		<view class="common-logistics">
			<view class="logistic-item" v-for="(item,index) in logisticsData" :key="index">
				<view class="total-wrap" :style="{marginTop: item.isFirstNode ? '22rpx' : '6rpx'}">
					<view class="item-container">
						<view class="item-container-left"
							:class="[index == 0 ? 'text-1A1A1A' : 'text-808080']">
							<view class="text-sm">{{formatDay(item.time)}}</view>
              <view class="text-sm">{{formatTime(item.time)}}</view>
						</view>
						<view class="item-container-center">
							<view class="tag-container">
								<!-- <image v-if="item.isFirstNode && String(item.status) != 'null'" :src="nodeIconUrl(item.status,index)" mode="scaleToFill"></image> -->
								<view  class="item-tag-container">
									<image class="item-tag" v-if="index===0" src="/static/images/active-line-state.png" mode="scaleToFill"></image>
                  <image class="item-tag" v-else src="/static/images/line-state.png" mode="scaleToFill"></image>
								</view>
							</view>
							<view class="line-container"
								:style="{height: item.isFirstNode ? '145rpx' : '88rpx' , paddingTop: item.isFirstNode ? '22rpx': '8rpx'}">
								<view v-if="index !== logisticsData.length - 1" class="line" :style="{height: item.isFirstNode ? '120rpx':'80rpx'}"></view>
							</view>
						</view>
						<view class="item-container-right" :style="{paddingTop: item.isFirstNode?'0':'8rpx'}">
							<view v-if="item.isFirstNode" class="item-title" :class="[index == 0 ? 'text-1A1A1A' : 'text-808080']">{{formatStatus(item.logisticsStatus)}}</view>
							<view class="item-desc text-dm" :class="[index == 0 ? 'text-1A1A1A' : 'text-999999']" :style="{marginTop: item.isFirstNode ? '10rpx' : '0'}">{{item.desc}}</view>
							<!-- <view class="item-time">{{item.createTime}}</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			logisticsData: {
				type: [Object, Array]
			}
		},
		computed: {
      formatDay(){
        return function(time){
          return uni.$u.timeFormat(time, 'mm-dd')
        }
      },
      formatTime(){
        return function(time){
          return uni.$u.timeFormat(time, 'hh:MM:ss')
        }
      },
      formatStatus(){
        return function(status){
          switch(status){
            case 'WAIT_ACCEPT':
            return '待揽收';
            case 'ACCEPT':
            return '已揽收	';
            case 'TRANSPORT':
            return '运输中	';
            case 'DELIVERING':
            return '派件中	';
            case 'AGENT_SIGN':
            return '已代签收	';
            case 'SIGN':
            return '已签收	';
            case 'FAILED':
            return '包裹异常	';
          }
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
	.common-logistics {
		height: auto;
		box-sizing: border-box;
		padding: 20rpx 30rpx 50rpx;
	}

	.item-container {
		width: 100%;
		height: auto;
		display: flex;

		.item-container-left {
			width: 120rpx;
			max-width: 120rpx;
      font-size: 24rpx;
		}

		.item-container-center {
			width: 44rpx;
			height: auto;

			.tag-container {
				width: 44rpx;
				height: 44rpx;

				image {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
				}

				.item-tag-container {
					width: 44rpx;
					height: 44rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.item-tag {
						width: 14rpx;
						height: 14rpx;
						border-radius: 50%;
					}
				}
			}

			.line-container {
				box-sizing: border-box;
				width: 44rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.line {
					width: 2rpx;
					background-color: #dcdcdc;
				}
			}
		}

		.item-container-right {
			width: 510rpx;
			max-width: 510rpx;
			box-sizing: border-box;
			padding: 0 10rpx 0 24rpx;

			.item-title {
				width: 100%;
				height: 40rpx;
				line-height: 44rpx;
        font-size: 32rpx;
				// color: #222;
        font-weight: 700;
			}

			.item-desc {
				margin-top: 16rpx;
				width: 100%;
				min-height: 30rpx;
        font-size: 28rpx;
				word-wrap: break-word;
				word-break: normal;
			}

			.item-time {
				margin-top: 12rpx;
				width: 100%;
				height: 34rpx;
				line-height: 34rpx;
				font-size: 24rpx;
			}
		}
	}

	.line-state {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
	}

	.take-space {
		width: 100%;
		height: 80rpx;
	}

	.text-1A1A1A {
		color: #1A1A1A;
	}

	.text-999999 {
		color: #999999;
	}

	.text-808080 {
		color: #808080;
	}
</style>
