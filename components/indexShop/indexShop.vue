<template>
	<view class="bor-r-16" style="padding: 20rpx; background-color: #f7f7f7;">
		<view class="flex-al-c flex-jus-spa" @tap.stop="more">
			<view class="flex-al-c">
				<view class="f-32 fw-700">推荐门店</view>
			</view>
			<view class="flex-al-c">
				<view class="f-24 color-8E8F8E h-36">更多</view>
				<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
			</view>
		</view>
    <view class="bg-white-ff mt20 radio-16 cont24" v-for="(item,index) in shopList" :key="index"
      @tap="shopDetail(item)">
      <view class="dis-flex">
        <view class="p-r mr20">
          <image class="wh180 radio-8" :src="item.logo"></image>
          <view class="reserve-tag" v-if="item.status==1 && item.time_open==0 && item.is_support_yd == 1">可预定</view>
          <view class="rest-tag" v-if="item.status==1 && item.time_open==0 && item.is_support_yd == 0">休息中</view>
          <view class="rest-tag" v-if="item.status==0">已打烊</view>
        </view>
        <view class="dis-flex flex-dir-column flex-space shop-r w-70">
          <view class="dis-flex flex-y-center mb12">
            <!-- <view class="bg-orange-fa-f2 radio-4 mr10 f-22 col-white-ff pl5 pr5 ">神券</view> -->
            <view class="onelist-hidden w-80 f-32 f-b">{{item.name}}</view>
          </view>
          <view class="dis-flex flex-y-center flex-x-between mb5 price">
            <view class="price-l dis-flex flex-y-center w-78">
              <view class="dis-flex flex-y-center f-28 col-orange-ff95 m-r-10 case">
                <image class="wh24 mr10" src="/static/img/case.png"></image>
                <view class="f-b">{{item.score}}</view>
              </view>
              <view class="col-gray-88 f-22  mr10 box-size onelist-hidden ">月售{{item.month_sales}}
              </view>
              <view class="col-gray-88 f-22 w-40 onelist-hidden">
                ¥{{item.per_capita_order_price}}/人</view>
            </view>
            <view class="price-r col-red-d9 f-22">{{item.distribution_type==2?'商家配送':'平台配送'}}</view>
          </view>
          <view class="col-gray-88   dis-flex flex-y-center flex-x-between f-22">
            <view class="w-80 onelist-hidden">
              <text class="mr20">起送¥{{item.starting_price}}</text>
              <text>配送¥{{item.delivery_money}}</text>
            </view>
            <view class="w-20 t-r onelist-hidden">
              <text class="mr10">{{item.delivery_time}}分钟</text>
              <!-- <text v-if=" item.juli != '附近' ">距</text>
              <text class="ml5">{{item.juli}}</text> -->
            </view>
          </view>
          <view class="dis-flex mt15 flex-y-center">
            <scroll-view scroll-x="true" class="tab-scroll" style="width: 100%;">
              <view class="flex">
                <template v-if="item.labels&&item.labels.length">
                  <view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd "
                  v-for="(n,i) in item.labels" :key="i">{{n}}</view>
                </template>
                <template v-if="item.reduce&&item.reduce.length">
                  <view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd "
                  v-for="(n,i) in item.reduce" :key="i">{{n}}</view>
                </template>
                <template v-if="item.redPacket&&item.redPacket.length">
                  <view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd "
                  v-for="(n,i) in item.redPacket" :key="i">
                  {{n.amount}}元红包满{{n.use_threshold}}可用
                </view>
                </template>
              </view>
            </scroll-view>
          </view>
          <view class="dis-flex flex-y-center mt15 f-22" v-if="item.status==1 && item.time_open==0 && item.is_support_yd == 1">
            <view class="bg-orange-ff9c pt1 pb1 col-white-ff radio-lt-lb-8 pr5 pl5">可预定</view>
            <view class="border-o-ff9c col-orange-ff9c radio-rt-rb-8 pr10 pl0">{{item.next_delivery_time}}后开始配送</view>
          </view>
        </view>
      </view>
      <view class="dis-flex mt15 flex-y-center" v-if="item.is_recommend_goods&&JSON.parse(item.is_recommend_goods).length">
          <scroll-view scroll-x="true" class="tab-scroll" style="width: 100%;">
            <view class="flex">
              <view class="dis-flex flex-dir-column mr20 p-r"
                v-for="(n,i) in JSON.parse(item.is_recommend_goods)" :key="i">
                <img class="imgsx radio-16" :src="n.img" alt="">
                <view class="goods-name onelist-hidden f-28" style="width: 160rpx;">{{ n.name }}</view>
                <view class="color-D93038 col-gray-33 f-28">
                  <text>
                    ¥{{ n.price }}
                  </text>
                  <text v-if="n.scribe_price > n.price" class="f-24 col-gray-88 ml10 text-line">{{ n.scribe_price }}</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
    </view>
	</view>
</template>

<script>
	export default {
		name: "indexShop",
		props: {
			shopList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			//外卖首页
			more() {
				console.log('更多')
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/index'
				})
			},
			//店铺详情
			shopDetail(item) {
            console.log(item)
				if (item.channel_type == 1 || item.channel_type == 3) {
          uni.navigateTo({
            url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" + item.merchant_id + '&type=1' +
              '&labels=' + JSON.stringify(item.labels)
          })
				}
				if (item.channel_type == 2) {
					uni.navigateTo({
						url: '/pagesIndex/page/foodIndex/homepage/homepage?id=' + item.merchant_id
					})
				}
			}
		}
	}
</script>

<style>
	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

 .imgsx {
		width: 160rpx;
		height: 160rpx;
	}
  .reserve-tag {
    position: absolute;
    top: 160rpx;
    left: 0rpx;
    width: 100%;
    background-color: rgb(28,182,120);
    border-radius: 0% 0% 20rpx 20rpx;
    text-align: center;
    color: #FFFFFF;
  }
  .rest-tag {
    position: absolute;
    top: 160rpx;
    left: 0rpx;
    width: 100%;
    background-color: rgb(93,78,45, 0.7);
    border-radius: 0% 0% 20rpx 20rpx;
    text-align: center;
    color: #FFFFFF;
  }
  .goods-name {
    position: absolute;
    top: 125rpx;
    left: 0rpx;
    width: 100%;
    background-color: rgb(93,78,45, 0.8);
    border-radius: 0% 0% 20rpx 20rpx;
    text-align: center;
    color: #FFFFFF;
  }
  .tab-scroll {
		white-space: nowrap;
		width: 100%;
	}
</style>
