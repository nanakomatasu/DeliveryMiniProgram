<template>
  <view class="draw-page" :style="{ backgroundImage: `url(${imgBaseUrl}resource/draw-bg.png)` }">
    <u-navbar :title="drawInfo.title" leftIconColor="#FFF" placeholder :titleStyle="{ color: '#fff' }" @leftClick="leftClick"
     bgColor="#FE5F5A">
    </u-navbar>
    <view class="draw-content">
      <view class="swiper-box" v-if="swiperList.length > 0">
        <swiper style="height: 380rpx;">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view class="swiper-content">
              <view class="mt16">{{ item.user_name }}{{ item.mobile ? `(${item.mobile.slice(-4)})` : '' }}</view>
              <image :src="item.portrait" class="mt16"></image>
              <view class="swiper-prize mt24">中奖产品：{{ item.title }}</view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="draw-box">
        <view class="new-draw" v-if="drawNewRecord.user_name">
          <image :src="drawNewRecord.portrait"></image>
          <view class="new-draw-content">{{ `${drawNewRecord.user_name}获取${ drawNewRecord.title }` }}</view>
        </view>
        <l-dialer :prizeList="prizeList" :size="280" @click="onClick" @done="onDone" ref="dialer" :drawNum="drawInfo.draw_num"
        :dial-style="`color: rgba(60,48,158,0.7); padding: 32rpx;background-image: url(${imgBaseUrl}resource/lottery-bg.png)`"/>
        <!-- <view class="surplus-draw">13</view> -->
        <view class="draw-date">{{ getCurDate() }}</view>
        <view class="draw-recorde">
          <text @click.self="ruleClick">规则</text> | <text @click.self="recordClick">明细</text>
        </view>
      </view>
      <view class="invite-bg2 mt40">
        <image :src="`${imgBaseUrl}resource/draw-bg2.jpg`"></image>
      </view>
      <view class="invite-records mt40">
        <view class="radio-24" style="overflow: hidden;">
          <view class="title">
            <view class="title-left">邀请记录</view>
            <!-- <view class="title-right" @click="gomyCallfor">我的邀请 ></view> -->
          </view>
          <view class="recods-list">
            <view v-for="(item, index) in inviteList" :key="index">
              <view class="invite-item">
                <image :src="item.portrait" style="width: 60rpx; height: 60rpx; border-radius: 50%; margin-right: 40rpx;"></image>
                <view class="name">{{ item.user_name }}</view>
                <view class="mobile">{{ item.mobile }}</view>
              </view>
            </view>
            <view v-if="!inviteList.length" class="list-empty">还没有邀请好友哦~</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bootom-btn">
      <view class="bottom-left" @click="gomyCallfor">立即邀请</view>
      <button class="share-btn" open-type="share"></button>
      <view class="bottom-right" @click="getQrcode">
        <view class="right-img">
          <!-- <image :src="`${imgBaseUrl}resource/draw-qrcode.jpg`" style="width: 60rpx; height: 60rpx;"></image> -->
          <u-icon name="grid" color="#d2baba" size="32"></u-icon>
        </view>
        <view class="right-text">面对面扫码</view>
      </view>
    </view>
    <u-popup :show="showRulePopup" :round="20" mode="center" closeable @close="rulePopupClose">
      <view class="rule-popup">
        <view class="f-42 mb16 f-b">活动规则</view>
        <view class="col-gray-90 rule-popup-content"> 1.邀请人奖励：在活动期间内，新用户领取您送出的首单红包，并在首单红包有效期内（7天）完成实付金额￥5元及以上的在线支付订单（找人付、到店自取订单除外），待订单确认收货后（手动确认收货或者24小时后自动确认收货），期间未发生退款，则视为邀请成功，您可获得2张5元洞头通用红包（可升级），有效期7天。多邀多得，上不封顶。<br>
          2.受邀人奖励：在活动期间内，新用户通过邀请人分享的链接可以领取7元无门槛首单红包，有效期7天。首单红包是首单立减活动的升级版，使用了首单红包不再享受首单立减活动。
        </view>
        <u-button type="warning" text="我知道了" @click="rulePopupClose" shape="circle"></u-button>
      </view>
    </u-popup>
    <u-popup :show="showRecordPopup" :round="20" mode="center" closeable @close="recordPopupClose">
      <view class="rule-popup">
        <view class="f-42 mb16 f-b">中奖记录</view>
        <view class="col-gray-90 rule-popup-content"> 
          <view v-for="(item, index) in drawRecordList" :key="index">
            <view class="dis-flex flex-y-center record-item">
              <view class="image">
                <image :src="item.pic" style="width: 60rpx; height: 60rpx; border-radius: 50%;"></image>
              </view>
              <view class="text">{{ item.title}}</view>
            </view>
          </view>
        </view>
        <u-button type="warning" text="关闭" @click="recordPopupClose" shape="circle"></u-button>
      </view>
    </u-popup>
    <u-modal :show="showQr"  title="扫一扫" @confirm="showQr=false">
			<view class="slot-qr-content">
				<image :src="qrImageUrl"></image>
			</view>
		</u-modal>
  </view>
</template>
<script>
import urlConfig from '@/config/index.js';
export default {
  data() {
    return {
      imgBaseUrl: urlConfig,
      drawId: '',
      drawInfo: '',
      swiperList: [],
      inviteList: [],
      drawRecordList: [],
      drawNewRecord: {},
      showRulePopup: false,
      showRecordPopup: false,
      drawLoading: false,
      timer: null,
      prizeList: [
        // {
        //   name: '奖品0',
        //   id: 0,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品0'
        // },
        // {
        //   name: '奖品1',
        //   Color: 'rgb(251, 219, 216)',
        //   id: 1,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品1'
        // },
        // {
        //   name: '奖品2',
        //   id: 2,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品2'
        // },
        // {
        //   name: '奖品3',
        //   id: 3,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品3'
        // },
        // {
        //   name: '奖品4',
        //   id: 4,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品4'
        // },
        // {
        //   name: '奖品5',
        //   id: 5,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品5'
        // },
        // {
        //   name: '奖品6',
        //   id: 6,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品6'
        // },
        // {
        //   name: '奖品7',
        //   id: 7,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品7'
        // },
        // {
        //   name: '奖品8',
        //   id: 8,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品8'
        // },
        // {
        //   name: '奖品9',
        //   id: 9,
        //   img: 'https://placehold.jp/999999/ffffff/120x120.png?text=奖品9'
        // },
      ],
      userInfo: {},
      showQr: false,
      qrImageUrl: '',
    };
  },
  onShareAppMessage() {
			return {
				title: this.drawInfo.title,
				path: `/pages/login/wxlogin/wxlogin?rid=${this.userInfo.id}&activityid=${this.drawId}`,
				// imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
    onShareTimeline() {
			return {
				title: this.drawInfo.title,
				path: `/pages/login/wxlogin/wxlogin?rid=${this.userInfo.id}&activityid=${this.drawId}`,
				// imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
  onLoad(e) {
    this.userInfo = uni.getStorageSync('userInfo')
    if (e.id) {
      this.drawId = e.id;
      this.getDrawInfo();
      this.getDrawSwiper()
      this.getInviteList()
      this.getNewDrawRecord()
      // setInterval(() => {
      //   this.getNewDrawRecord()
      // }, 5000);
    }
  },
  methods: {
    getCurDate() {
      let now = new Date().toISOString();
      let yearMonthDate = now.split('T')[0]
      return yearMonthDate
    },
    ruleClick() {
        this.showRulePopup = true
    },
    rulePopupClose(){
      this.showRulePopup = false
    },
    recordClick() {
      this.getMyDrawRecord()
      this.showRecordPopup = true
    },
    recordPopupClose() {
      this.showRecordPopup = false
    },
    leftClick() {
      // 获取当前页面栈
      const pages = getCurrentPages();
      // 检查页面栈长度
      if (pages.length > 1) {
          // 如果页面栈长度大于1，则可以返回
          uni.navigateBack();
      } else {
          // 否则可以提示用户或者执行其他逻辑
          uni.redirectTo({
            url: '/pages/index/index'
          })
      }
    },
    onDone(index) {
      console.log(this.prizeList[index]);
      this.drawLoading = false
      const prize = this.prizeList[index]
      uni.showModal({
          title: prize.type == 'think' ? '很遗憾': '恭喜您',
          content: (prize.type !== 'think' ? `获得`:'') + prize.name
      })
    },
    onClick() {
      if (this.drawLoading) return
      if (this.drawInfo.draw_num == 0) {
        uni.showToast({
					icon: "none",
					title: "当前抽奖次数不足"
				})
        return
      }
      this.drawLoading = true
      this.draw()
    },
    async draw() {
      try {
        const res = await this.$api.tj_draw({
          id: this.drawId,
        })
        if (res.status == 200 && res.data) {
          const index = this.prizeList.findIndex(item => item.title == res.data.title)
          // 奖品的索引
          this.$refs.dialer.run(index)
          this.getDrawInfo()
        } else {
          this.drawLoading = false
        }
      } catch (error) {
        this.drawLoading = false
      }
    },
    async getQrcode() {
      uni.showLoading({
					title: '加载中...'
				});
      const res = await this.$api.getQrcode({
        scene: `rid/${this.userInfo.id}*activityid/${this.drawId}`,
        // scene: JSON.stringify({rid: this.userInfo.id, activityid: this.drawId}),
        page: 'pages/login/wxlogin/wxlogin'
      })
      uni.hideLoading();
      if (res.status == 200) {
        this.qrImageUrl = res.msg
        this.showQr = true
      } else {
        uni.showToast({
					icon: "none",
					title: res.msg
				})
      }
    },
    async getNewDrawRecord() {
      const res = await this.$api.tj_draw_new({
        activity_id: this.drawId,
        id: this.drawNewRecord.id ? this.drawNewRecord.id : ''
      })
      if (res.status == 200 && res.data) {
        this.drawNewRecord = res.data;
      } else {
        this.drawNewRecord = {}
      }
    },
    async getMyDrawRecord() {
      const res = await this.$api.tj_draw_my({
        activity_id: this.drawId,
      })
      if (res.status == 200 && res.data) {
        this.drawRecordList = res.data;
      }
    },
    async getInviteList() {
      const res = await this.$api.recommend_list({
        activity_id: this.drawId,
      })
      if (res.status == 200 && res.data) {
        this.inviteList = res.data;
      }
    },
    async getDrawSwiper() {
      const res = await this.$api.tj_draw_banner({
        activity_id: this.drawId,
      });
      if (res.status == 200 && res.data) {
        this.swiperList = res.data;
      }
    },
    async getDrawInfo() {
      const res = await this.$api.ptdraw_info({
        school_id: uni.getStorageSync('school').id || 1,
        id: this.drawId,
      });
      if (res.status == 200 && res.data) {
        this.drawInfo = res.data;
        let prizeList = (JSON.parse(this.drawInfo.prizes)).map((item, index) => {
          item.id = index + 1;
          item.name = item.title;
          item.img = item.pic;
          return item
        })
        this.prizeList = prizeList
        uni.setNavigationBarTitle({
          title: this.drawInfo.title, // 页面标题为“自定义标题”
        });
      }
    },
  },
};
</script>
<style lang="scss">
.draw-page {
  width: 100%;
  min-height: 100vh;
  background-size: 100%;
  padding-bottom: 200rpx;
}
.draw-content {
  width: 100%;
}
.swiper-box {
  margin-top: 30rpx;
  padding: 0 40rpx;
  .swiper-content {
    width: 100%;
    height: 350rpx;
    border-top: 30rpx solid #fff1de;
    border-bottom: 15rpx solid #fff1de;
    border-left: 12rpx solid #fff1de;
    border-right: 12rpx solid #fff1de;
    border-radius: 20rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30rpx;
    image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
    .swiper-prize {
      padding: 15rpx 30rpx;
      background-color: #FFF1E4;
      border-radius: 18rpx;
    }
  }
}
.draw-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 90rpx;
  position: relative;
  .surplus-draw {
    position: absolute;
    top: 200rpx;
    left: 400rpx;
    background-color: #FFD113;
    color: #FFFFFF;
    padding: 7rpx 14rpx;
    border-radius: 26rpx;
    z-index: 2;
    font-size: 26rpx;
    font-weight: bold;
  }
  .draw-date {
    color: #FFE9B6;
    border: 2px solid #FFE9B6;
    padding: 10rpx 30rpx;
    border-radius: 36rpx;
    margin-top: 30rpx;
    font-size: 30rpx;
  }
  .draw-recorde {
    color: #FFE9B6;
    font-weight: bold;
    margin-top: 20rpx;
    text {
      text-decoration: underline;
      padding: 0 10rpx;
      font-size: 34rpx;
    }
  }
}
.invite-bg2 {
		width: 100%;
		height: 350rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
		image {
      border-radius: 24rpx;
			width: 100%;
			height: 100%;
		}
	}
	.invite-records {
		padding: 0 20rpx;
		.title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 25rpx;
			background: linear-gradient(to right, #e3f5f2, #c7fff5);
			.title-left {
				font-size: 34rpx;
				font-weight: bold;
			}
			.title-right {
				border-radius: 24rpx;
				background: #e6e6e6;
				opacity: .8;
				padding: 10rpx 20rpx;
				font-size: 28rpx;
			}
  }
  .recods-list {
			height: 500rpx;
			overflow-y: auto;
			background: #fff;
      padding: 20rpx;
      position: relative;
      .invite-item {
          display: flex;
          align-items: center;
          margin-bottom: 10rpx;
          padding: 0 30rpx;
          .name {
            width: 300rpx;
            margin-right: 30rpx;
          }
        }
      .list-empty {
        position: absolute;
        width: 100%;
        bottom: 30rpx;
        color: #999;
        text-align: center;
      }
		}
	}
  .bootom-btn {
    height: 120rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    z-index: 999;
    // background-color: #FFFFFF;
    .share-btn {
      position: absolute;
      width: 70%;
      height: 80rpx;
      top: 20rpx;
      left: 0;
      opacity: 0;
    }
    .bottom-left {
      width: 70%;
      background-color: #FEE162;
      color: #FF0000;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      font-size: 30rpx;
    }
    .bottom-right {
      width: 22%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .right-text {
        background-color: #FEE162;
        color: #FF0000;
        font-size: 24rpx;
        padding: 6rpx 12rpx;
        border-radius: 20rpx;
        text-align: center;
      }
      .right-img {
        display: flex;
        justify-content: center;
      }
    }
  }
  .rule-popup {
    width: 620rpx;
    padding: 30rpx;
    .rule-popup-content {
      height: 600rpx;
      overflow: auto;
      padding-bottom: 60rpx;
    }
  }
  .record-item {
    margin-bottom: 10rpx;
    border-bottom: 1px solid #eee;
    .image {
      width: 100rpx;
    }
    .text {
      // width: 100rpx;
    }
  }
  .new-draw {
    position: absolute;
    left: 40rpx;
    top: -100rpx;
    display: flex;
    align-items: center;
    background-color: #FFF7C7;
    padding: 10rpx 15rpx;
    border-radius: 70rpx;
    z-index: 9;
    font-size: 24rpx;
    color: #FF0000;
    image {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .new-draw-content {
      width: 237rpx;
      word-break: break-all;
    }
  }
  .slot-qr-content {
    text-align: center;
    image {
      width: 500rpx;
      height: 500rpx;
    }
  }
</style>
