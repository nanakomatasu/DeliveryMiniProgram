<template>
  <view>
    <u-sticky>
      <view class="top bg-white-ff box-shad-b">
        <view
          class="dis-flex pt24 pb30 flex-y-center pl40 pr40 box-size flex-x-between"
        >
          <view
            class="col-brank-20 f-28 pl40 pr40 tab-item"
            :class="tabAct1 == item1.id ? 'tab-sel f-b' : ''"
            v-for="(item1, index) in tabList1"
            :key="index"
            @tap.stop="changeTab1(item1.id)"
          >
            {{ item1.name }}
          </view>
        </view>
        <view class="pl24 pr24 pt15 pb5 box-size">
          <u-search
            searchIconSize="32rpx"
            searchIcon="/static/img/search.png"
            placeholder="搜索我的订单"
            searchIconColor="#999999"
            color="#202020"
            :showAction="false"
            v-model="keyword"
            height="68rpx"
            bgColor="#F7F7F7"
            @search="search"
            @clear="clearSearch"
          ></u-search>
        </view>
        <scroll-view
          scroll-x="true"
          class="pl10 box-size scroll"
          v-if="tabAct1 == 1"
        >
          <view
            class="col-brank-20 pl35 pr35 tab-item"
            :class="tabAct == item.id ? 'tab-sel f-b f-32' : 'f-28'"
            v-for="(item, index) in tabList"
            :key="index"
            @tap="changeTab(item.id)"
            >{{ item.name }}</view
          >
        </scroll-view>
        <view class="" style="background-color: #fff" v-if="tabAct1 == 3">
          <template>
            <u-tabs
              :list="list1"
              @click="Orderclick"
              lineColor="#d62e36"
              :activeStyle="{
                color: '#202020',
                fontWeight: 'bold',
                transform: 'scale(1.05)',
              }"
            ></u-tabs>
          </template>
        </view>
      </view>
    </u-sticky>
    <view class="cont" v-if="tabAct1 == 1">
      <view
        class="radio-16 mb20 pt24 pl24 pr24 pb24 box-size bg-white-ff"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="dis-flex flex-y-center flex-x-between mb24">
          <view class="dis-flex flex-y-center w-70">
            <image class="wh40 mr12" src="/static/img/ico-tips1.png"></image>
            <view
              class="f-32 col-brank-20 f-b mr5 name onelist-hidden"
              @tap.stop="onLink(item)"
            >
              {{ item.store.name }}
            </view>
            <u-icon name="arrow-right" size="30rpx"></u-icon>
          </view>
          <view
            class="f-24"
            :class="
              item.order_info.order_status == 1 ||
              item.order_info.order_status == 2 ||
              item.order_info.state == 1
                ? 'col-red-d9'
                : 'col-gray-88'
            "
          >
            {{ item.order_info.state_text || "" }}
          </view>

          <!-- <view class=" f-24 col-gray-88"
						v-if="item.order_info.qrcode&&item.order_type==2 && item.order_status==3">
						待使用
					</view>

					<view class=" f-24 col-gray-88" v-if="item.order_info.qrcode&&item.order_status==4">
						商品已送达
					</view>

					<view class=" f-24 col-gray-88" v-if="item.order_info.qrcode&&item.order_status==1">
						已取消
					</view> -->
        </view>
        <view
          class="dis-flex flex-y-center"
          v-if="item.goods.length == 1"
          @tap="
            onLinkx(
              '/pagesUser/page/orderList/oderDetail/oderDetail?id=' +
                item.order_id +
                '&order_type=' +
                item.order_type,
              item
            )
          "
        >
          <image
            class="wh148 radio-8 mr24"
            mode="aspectFill"
            :src="item.goods[0].icon"
          ></image>
          <view class="w-75 goods-r dis-flex flex-x-between flex-dir-column">
            <view>
              <view class="f-28 f-b w-100 mb5 onelist-hidden">{{
                item.goods[0].name
              }}</view>
              <view class="f-24 label w-100 onelist-hidden"
                ><text class="mr10" v-if="item.goods[0].attribute">{{
                  item.goods[0].attribute
                }}</text
                ><text v-if="item.goods[0].material">{{
                  item.goods[0].material
                }}</text></view
              >
            </view>

            <view class="col-gray-88 f-24">共{{ item.goods[0].num }}件</view>
          </view>
        </view>

        <view
          v-else
          class="dis-flex flex-y-center p-r"
          @tap.stop="
            onLinkr(
              '/pagesUser/page/orderList/oderDetail/oderDetail?id=' +
                item.order_id +
                '&order_type=' +
                item.order_type,
              item
            )
          "
        >
          <scroll-view class="scroll-goods" scroll-x="true">
            <image
              class="wh-148 radio-8 mr16"
              mode="aspectFill"
              v-for="(items, indexs) in item.goods"
              :src="items.icon"
							:key="indexs"
            >
            </image>
          </scroll-view>
          <view
            class="length dis-flex flex-y-center flex-dir-column col-gray-88 f-24"
          >
            <view>共</view>
            <view>{{ item.order_info.num }}</view>
            <view>件</view>
          </view>
        </view>

        <view class="dis-flex flex-y-center flex-x-between mt20">
          <view class="f-24 col-gray-88">下单时间：{{ item.create_time }}</view>
          <view class="f-24 col-gray-88 t-b"
            >合计
            <text class="col-brank-22 f-b f-24 ml15"
              >¥<text class="f-36">{{
                parseFloat(item.order_info.money).toFixed(2)
              }}</text></text
            >
          </view>
        </view>

        <view class="f-24 col-gray-88 m-t-15">
          订单号:{{
            item.order_info.out_trade_no || item.order_info.outTradeNo
          }}
        </view>

        <view class="mt20 dis-flex flex-y-center flex-x-end">
          <view
            class="btn-order border-dd col-brank-20 f-24"
            v-if="
              (item.order_info.order_status == 1 && item.order_status == 1) ||
              item.order_info.state == 1
            "
            @tap.stop="cancelled(item)"
          >
            取消订单</view
          >
          <view
            class="btn-order bg-red-d6-ec col-white-ff f-24"
            v-if="
              (item.order_info.order_status == 1 && item.order_status == 1) ||
              item.order_info.state == 1
            "
            @tap.stop="pay(item.id, item)"
          >
            立即支付</view
          >

          <view
            class="btn-order border-dd col-brank-20 f-24"
            v-if="
              (item.order_info.order_status == 4 ||
                item.order_info.order_status == 3) &
              (item.order_info.before_refund_state != 11)
            "
            @tap.stop="cancelShowx(item)"
          >
            申请退款</view
          >

          <block v-else>
            <view
              class="btn-order border-dd col-brank-20 f-24"
              v-if="
                item.order_info.order_status == 6 ||
                item.order_info.order_status == 7 ||
                item.order_info.order_status == 8 ||
                item.order_info.order_status == 10 ||
                item.order_info.order_status == 11 ||
                item.order_info.state == 5
              "
              @tap="delOrder(item, index)"
              >删除订单</view
            >

            <view class="" v-if="item.order_info.state_text == '已完成'">
              <view
                class="btn-order border-dd col-brank-20 f-24"
                @tap="anotherOrder(item)"
                v-if="
                  (item.order_info.order_status != 1 &&
                    item.order_info.order_status != 11 &&
                    item.order_info.order_status != 9 &&
                    !item.order_info.qrcode) ||
                  item.order_status == 4 ||
                  item.order_status == 1 ||
                  item.order_info.order_status == 2 ||
                  item.order_info.order_status == 4
                "
              >
                再来一单</view
              >
            </view>

            <view
              class="btn-order border-dd col-brank-20 f-24"
              @tap="onLinkxr(item)"
              v-if="item.order_info.qrcode && item.order_status == 2"
            >
              去使用</view
            >

            <view
              class="btn-order border-dd col-brank-20 f-24"
              @click="tkjd(item.order_info.id)"
              v-if="
                item.order_info.order_status == 9 ||
                item.order_info.order_status == 10 ||
                item.order_info.order_status == 11
              "
            >
              退款进度</view
            >

            <view
              class="btn-order border-dd col-brank-20 f-24"
              v-if="
                item.order_info.before_refund_state == 11 &&
                item.order_info.order_status < 6
              "
              @tap.stop="terrace(item)"
            >
              平台介入</view
            >

            <view
              class="btn-order bg-red-d6-ec col-white-ff f-24"
              v-if="item.order_info.order_status == 5 && item.order_status == 4"
              @tap.stop="
                addComment(
                  item.order_id,
                  item.store.merchant_id,
                  item.order_status
                )
              "
              >评价
            </view>
            <view
              class="btn-order bg-red-d6-ec col-white-ff f-24"
              v-if="
                item.order_info.delivery_mode == 2 &&
                item.order_info.order_status == 4
              "
              @tap="confirmReceivingOrder(item)"
              >确认取餐
            </view>
          </block>
        </view>
      </view>
      <null-data title="暂无订单" v-if="list.length == 0"></null-data>
      <u-loadmore
        v-else-if="list.length > 1"
        :status="status"
        fontSize="26rpx"
        color="#999"
      />
    </view>
    <!-- 校U订单 -->
    <view v-if="tabAct1 == 3">
      <view class="" v-if="OrderList.length > 0">
        <view
          class=""
          style="padding: 20rpx; margin-top: 20rpx"
          v-for="(item, index) in OrderList"
					:key="index"
        >
          <view class="store_List">
            <view class="store_nav">
              <view class="store_name" @click="toShop(item)">
                <text
                  style="color: #202020; font-size: 32rpx; font-weight: 600"
                  >{{ item.shop_name }}</text
                >
                <image
                  src="/static/ico_gengduo.png"
                  mode=""
                  class="moreimg"
                ></image>
              </view>
              <view
                class=""
                v-if="item.status == 1"
                style="color: #d93038; font-size: 24rpx"
              >
                待支付
              </view>
              <view
                class=""
                v-if="item.status == 2"
                style="color: #d93038; font-size: 24rpx"
              >
                待发货
              </view>
              <view
                class=""
                v-if="item.status == 3"
                style="color: #d93038; font-size: 24rpx"
              >
                待收货
              </view>
              <view
                class=""
                v-if="item.status == 4"
                style="color: #888888; font-size: 24rpx"
              >
                待评价
              </view>
              <view
                class=""
                v-if="item.status == 5"
                style="color: #888888; font-size: 24rpx"
              >
                已完成
              </view>
              <view
                class=""
                v-if="item.status == 6"
                style="color: #888888; font-size: 24rpx"
              >
                已取消
              </view>
              <view
                class=""
                v-if="item.status == 7"
                style="color: #888888; font-size: 24rpx"
              >
                退款审核
              </view>
            </view>
            <scroll-view scroll-y="true" class="scroll-Y">
              <view
                class="store_content"
                v-for="(item2, index2) in item.goodsList"
								:key="index2"
              >
                <image :src="item2.picture" mode="" class="food_img"> </image>
                <view class="" style="flex: 1" @click="toDetailOrder(item)">
                  <view class="" style="margin-left: 20rpx">
                    <view
                      class=""
                      style="
                        color: #202020;
                        font-size: 28rpx;
                        font-weight: 600;
                        padding-top: 10rpx;
                      "
                    >
                      {{ item2.goods_name }}
                    </view>
                    <view class="child_type">
                      <view
                        class="child_type_style"
                        v-for="(item3, index3) in item2.styles"
												:key="index3"
                      >
                        {{ item3.name }}
                      </view>
                    </view>
                    <view
                      class=""
                      style="
                        margin-top: 32rpx;
                        color: #888888;
                        font-size: 24rpx;
                      "
                    >
                      共{{ item.goodsList.length }}件
                    </view>
                  </view>
                </view>
                <view
                  class="other_btn"
                  v-if="item.status == 4"
                  style="margin-top: 80rpx"
                  @click="toEvaluate(item.id, item2)"
                >
                  评价
                </view>
              </view>
            </scroll-view>
            <view
              class=""
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20rpx;
              "
            >
              <view class="" style="color: #888888; font-size: 24rpx">
                下单时间：{{ item.submit_time }}
              </view>
              <view
                class=""
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                "
              >
                <view class="" style="color: #888888; font-size: 24rpx">
                  合计
                </view>
                <view
                  class=""
                  style="color: #202020; font-size: 24rpx; font-weight: 700"
                >
                  ¥
                </view>
                <view
                  class=""
                  style="color: #202020; font-size: 36rpx; font-weight: 700"
                >
                  {{ item.should_pay_amount }}
                </view>
              </view>
            </view>
            <view
              class=""
              style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 20rpx;
              "
            >
              <!-- -1 待付款， 2 待发货， 3 待收货， 4 待评价 5 已完成 6 取消 7 退款中(售后中) -->
              <view
                class="other_btn"
                v-if="item.status == 5 || item.status == 6"
                @click="delOrderU(item.id)"
              >
                删除订单
              </view>
              <view
                class="other_btn"
                v-if="item.status == 1 || item.status == 2"
                @click="applyRefund(item)"
              >
                取消订单
              </view>
              <view
                class="other_btn"
                v-if="item.status == 5"
                @click="AfterSale(item.id)"
              >
                售后退款
              </view>
              <view
                class="other_btn"
                v-if="item.status == 2 || item.status == 3"
                @click="checkLogistics(item)"
              >
                查看物流
              </view>
              <view
                class="other_btn"
                v-if="
                  item.status == 3 ||
                  item.status == 2 ||
                  item.status == 5 ||
                  item.status == 6 ||
                  item.status == 6
                "
                @click="AgainOrder(item.shop_id)"
              >
                再来一单
              </view>
              <view
                class="pay_btn"
                v-if="item.status == 1"
                @click="payOrder(item.order_no, item)"
              >
                立即支付
              </view>
              <view
                class="pay_btn"
                v-if="item.status == 3"
                @click="ConfirmReceipt(item.id)"
              >
                确认收货
              </view>
            </view>
          </view>
        </view>
        <template>
          <view>
            <u-loadmore status="nomore" />
          </view>
        </template>
        <u-gap height="5" bgColor="#f5f5f5"></u-gap>
      </view>
      <view class="" v-if="OrderList.length == 0">
        <null-data title="暂无订单" v-if="OrderList.length == 0"></null-data>
      </view>
    </view>

    <!-- 退款取消弹窗 -->
    <view :catchtouchmove="true">
      <u-popup
        :show="cancelShow"
        mode="center"
        :safeAreaInsetBottom="false"
        round="32rpx"
      >
        <view class="win-box-mobile box-size bg-white-ff radio-30">
          <view class="f-32 w-100 t-c f-b mb20">取消订单</view>
          <template>
            <u--input
              placeholder="请输入退款原因"
              border="surround"
              v-model="refund_reason"
            ></u--input>
          </template>
          <view class="dis-flex flex-y-center flex-x-between mt40">
            <view class="btn-win t-c bg-gray-ef radio-40" @tap="cancelClick"
              >确认取消</view
            >
            <view
              class="btn-win t-c bg-red-d6-ec col-white-ff radio-40"
              @tap="cancelShow = false"
              >我在想想
            </view>
          </view>
        </view>
      </u-popup>
    </view>

    <!-- 售后申请弹框 -->
    <view :catchtouchmove="true">
      <u-popup
        :show="showAfter"
        mode="center"
        :safeAreaInsetBottom="false"
        round="32rpx"
      >
        <view class="win-box-mobile box-size bg-white-ff radio-30">
          <view class="f-32 w-100 t-c f-b mb20">申请售后</view>
          <template>
            <u-radio-group v-model="radiovalue1" placement="column">
              <u-radio
                :customStyle="{ marginBottom: '8px' }"
                v-for="item in radiolist1"
                :key="item.id"
                :label="item.name"
                :name="item.name"
                @change="radioChange(item)"
              >
              </u-radio>
            </u-radio-group>
          </template>
          <view class="dis-flex flex-y-center flex-x-between mt40">
            <view
              class="btn-win t-c bg-gray-ef radio-40"
              @tap="showAfter = false"
              >取消</view
            >
            <view
              class="btn-win t-c bg-red-d6-ec col-white-ff radio-40"
              @tap="SaleClick()"
              >确认
            </view>
          </view>
        </view>
      </u-popup>
    </view>

    <u-popup
      :show="cancelShow"
      mode="center"
      :safeAreaInsetBottom="false"
      round="32rpx"
    >
      <view class="win-box-mobile box-size bg-white-ff radio-30">
        <view class="f-32 w-100 t-c f-b">取消订单</view>
        <view class="f-28 t-c mt20">是否确认取消款订单</view>
        <view class="dis-flex flex-y-center flex-x-between mt40">
          <view class="btn-win t-c bg-gray-ef radio-40" @tap="cancelClickx()"
            >确认取消</view
          >
          <view
            class="btn-win t-c bg-red-d6-ec col-white-ff radio-40"
            @tap="cancelShow = false"
            >我在想想
          </view>
        </view>
      </view>
    </u-popup>

    <u-popup
      :show="cancelNextShow"
      mode="center"
      :safeAreaInsetBottom="false"
      round="32rpx"
      @close="cancelNextShow = false"
      closeable
    >
      <view class="win-box-mobile box-size bg-white-ff radio-30">
        <view class="f-32 w-100 t-c f-b">联系商家退款</view>
        <view class="f-28 t-c mt20">{{xxd.order_info.take_no ? `【${xxd.order_info.take_no}号单】` : ''}}美食可能已经下锅,如需退款请及时联系商家</view>
        <view class="dis-flex flex-y-center flex-x-center mt40">
          <view
            class="t-c bg-red-d6-ec col-white-ff radio-40 pl40 pr40 pt20 pb20"
            @tap="sureClickPhone()"
            >电话联系商家退款
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      xxd: {},
      cancelShow: false,
      tabAct: 0,
      keyword: "",
      tabList: [
        {
          name: "全部",
          id: 0,
        },
        {
          name: "待付款",
          id: 1,
        },
        {
          name: "待收货",
          id: 2,
        },
        {
          name: "待使用",
          id: 3,
        },
        {
          name: "待评价",
          id: 4,
        },
        {
          name: "已完成",
          id: 5,
        },
        {
          name: "退款售后",
          id: 6,
        },
        {
          name: "已取消",
          id: 7,
        },
      ],
      list: [], //订单列表
      page: 1,
      status: "loadmore",
      tabAct1: 1,
      tabList1: [
        {
          name: "校园外卖",
          id: 1,
        },
        /*	{
							name: "本地生活",
							id: 2
						}, {
							name: "校U优选",
							id: 3
						},
					*/
      ],
      //校U优选
      list1: [
        {
          name: "全部",
        },
        {
          name: "待付款",
        },
        {
          name: "待发货",
        },
        {
          name: "待收货",
        },
        {
          name: "待评价",
        },
        {
          name: "已完成",
        },
        {
          name: "已取消",
        },
        {
          name: "售后中",
        },
      ],
      OrderList: [], //订单列表
      tabIndex: 0,
      showAfter: false,
      radiovalue1: "已收到货，确定退款", //申请售后
      radiolist1: [
        {
          name: "已收到货，确定退款",
          id: 1,
          disabled: false,
        },
        {
          name: "已收到货，更换退回",
          id: 2,
          disabled: false,
        },
      ],
      cancelShow: false, //取消订单弹框
      refund_reason: "",
      refund_detail: "", //取消订单的订单详情
      cancelNextShow: false, //取消订单弹框
    };
  },
  onLoad(e) {
    this.tabAct = e.id || 0;
    this.tabAct1 = e.tabAct1 ? e.tabAct1 : 1;
  },
  onShow() {
    this.getOrderTakeOutList();
    //校U优选
    this.getOrderLists();
  },
  onReachBottom() {
    if (this.status != "nomore") {
      this.getOrderTakeOutList(true);
    }
  },
  methods: {
    cancelShowx(item) {
      this.cancelShow = true;
      this.xxd = item;
    },
    cancelClickx() {
      if (this.isWithinLastMinute(this.xxd.order_info.pay_time)) {
        this.cancelNextShow = true
      } else {
        uni.navigateTo({
          url:
            "/pagesUser/page/orderList/cancelList/cancelList?order_id=" +
            this.xxd.order_info.id +
            "&order_type=" +
            this.xxd.order_type,
        });
        this.cancelShow = false;
      }
    },
    sureClickPhone() {
      uni.makePhoneCall({
        phoneNumber: this.xxd.order_info.store.contacts_tel, // 电话号码
        success: function () {
          console.log('拨号成功');
          this.cancelNextShow = false
          this.cancelShow = false;
        },
        fail: function () {
          console.log('拨号失败');
        }
      });
    },
     //判断目标时间是否在当前时间的前一分钟内
    isWithinLastMinute(targetTime) {
				const cur = new Date(targetTime).getTime()
        const now = new Date().getTime();
        const oneMinuteAgo = new Date().getTime() - 70000; // 当前时间减去一分钟的毫秒数
				console.log(cur, oneMinuteAgo, now, cur >= oneMinuteAgo, cur <= now);
        return cur >= oneMinuteAgo && cur <= now;
    },
    //更改id
    changeTab1(id) {
      this.tabAct1 = id;
      if (this.tabAct1 == 1) {
        this.getOrderTakeOutList();
      }
      if (this.tabAct1 == 3) {
        this.getOrderLists();
      }
    },
    //确认取餐
    confirmReceivingOrder(item) {
      var that = this;
      uni.showModal({
        title: "温馨提示",
        content: "请确认是否已取餐",
        async success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在加载中",
            });
            const { data, status } = await that.$api.receivingOrder({
              order_id: item.id,
              order_type: item.order_type, //1外卖，2附近，3优选
            });
            uni.hideLoading();
            if (status == 200) {
              that.$u.toast("取餐成功");
              that.getOrderTakeOutList();
            }
          }
        },
      });
    },

    //退款
    refund(item) {
      console.log(item);
      uni.navigateTo({
        url:
          "/pagesUser/page/orderList/cancelList/cancelList?order_id=" +
          item.order_id +
          "&order_type=" +
          item.order_type,
      });
    },

    //再来一单
    anotherOrder(item) {
      console.log(item);
      //堂食再来一单
      if (item.order_type == 3) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/diningroom/canteenshop/canteenshop?id=" +
            item.store.merchant_id +
            "&table=" +
            "当前桌" +
            "&tableId=" +
            item.order_info.tableId +
            "&name=" +
            item.store.name +
            "&orderId=" +
            item.order_id,
        });
        return;
      }

      //外卖再来一单
      if (item.order_type == 1) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?orderId=" +
            item.order_id +
            "&id=" +
            item.store.merchant_id,
        });
      }
      //团购再来一单
      if (item.order_type == 2)
        uni.navigateTo({
          url:
            "/pagesIndex/page/foodIndex/delicacymycart/delicacymycart?orderId=" +
            item.order_id,
        });
    },

    //立即支付
    pay(id, item) {
      console.log(id, item);

      //1外卖 2团购 3堂食
      if (item.order_type == 1) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/pay/pay?id=" + item.order_id + "&return_type=1",
        });
        return;
      }
      if (item.order_type == 2) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=" +
            item.order_id +
            "&return_type=2",
        });
        return;
      }
      if (item.order_type == 3) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/diningroom/stpayofforder/stpayofforder?id=" +
            item.order_id +
            "&return_type=3",
        });
        return;
      }
    },

    //删除订单
    delOrder(item, index) {
      var that = this;
      uni.showModal({
        title: "温馨提示",
        content: "是否删除订单,删除之后不可恢复",
        async success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在加载中",
            });
            const { data, status } = await that.$api.orderDeleteOrder({
              order_id: item.order_id,
              order_type: item.order_type, //1外卖，2附近，3优选
            });
            uni.hideLoading();
            if (status == 200) {
              that.$u.toast("删除成功");
              that.list.splice(index, 1);
            } else {
              that.$u.toast(res.message);
            }
          }
        },
      });
    },
    //获取订单列表
    async getOrderTakeOutList(isPage) {
      uni.showLoading({
        title: "正在加载中",
      });
      let that = this;
      if (isPage) {
        this.page = this.page + 1;
        that.status = "loading";
      } else {
        this.page = 1;
        this.list = [];
        this.status = "loadmore";
      }
      var list = this.list;
      const { data, status } = await that.$api.userOrderList({
        page: this.page,
        order_status: this.tabAct,
        search: this.keyword,
      });
      uni.hideLoading();
      if (status == 200) {
        that.list = list.concat(data.data);
        console.log(that.list);

        // that.list = list
        if (data.last_page <= this.page) {
          that.status = "nomore";
        }
      }
    },
    //查看券码
    viewQrCode(id) {
      uni.navigateTo({
        url: "/pagesUser/page/orderList/check/check?id=" + id,
      });
    },
    //跳转页面
    onLink(item) {
      if (!item.order_info.qrcode) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" +
            item.store.merchant_id,
        });
      } else {
        if (item.order_info.qrcode) {
          uni.navigateTo({
            url:
              "/pagesIndex/page/foodIndex/homepage/homepage?id=" +
              item.store.merchant_id,
          });
        }
      }
    },

    // /pagesIndex/page/diningroom/orderDetail/orderDetail?id=77

    onLinkxr(item) {
      uni.navigateTo({
        url:
          "/pagesIndex/page/foodIndex/sbuySuccess/sbuySuccess?qrcode=" +
          JSON.stringify(item.order_info.qrcode),
      });
    },

    onLinkx(url, item) {
      console.log(item);

      // //堂食
      if (item.order_type == 3) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/diningroom/orderDetail/orderDetail?id=" +
            item.order_id,
        });
      }

      //外卖
      if (item.order_type == 1) {
        uni.navigateTo({
          url: url,
        });
      }
      //团购
      if (item.order_type == 2) {
        uni.navigateTo({
          url:
            "/pagesUser/page/delicacyshopdetail/delicacyshopdetail?id=" +
            item.order_id,
        });
      }

      // if (!item.order_info.qrcode) {
      // 	uni.navigateTo({
      // 		url: url
      // 	})
      // } else {
      // 	if (item.order_info.qrcode && item.order_type == 2 && item.order_status == 3 ||item.order_status==1 || item.order_status == 4) {
      // 		uni.navigateTo({
      // 			url: '/pagesUser/page/delicacyshopdetail/delicacyshopdetail?id=' + item.order_id
      // 		})
      // 	}
      // }
    },
    onLinkr(url, item) {
      // //堂食
      if (item.order_type == 3) {
        uni.navigateTo({
          url:
            "/pagesIndex/page/diningroom/orderDetail/orderDetail?id=" +
            item.order_id,
        });
      }

      //外卖
      if (item.order_type == 1) {
        uni.navigateTo({
          url: url,
        });
      }
      //团购
      if (item.order_type == 2) {
        uni.navigateTo({
          url:
            "/pagesUser/page/delicacyshopdetail/delicacyshopdetail?id=" +
            item.order_id,
        });
      }
    },

    //更改id
    changeTab(id) {
      this.tabAct = id;
      this.getOrderTakeOutList();
    },
    //搜索回车
    search() {
      if (this.tabAct1 == 1) {
        this.getOrderTakeOutList();
      }
      if (this.tabAct1 == 3) {
        // console.log();
        this.getOrderLists();
      }
    },
    //清除搜索内容
    clearSearch() {
      this.getOrderTakeOutList();
    },
    //跳转评价
    addComment(order_id, merchant_id, order_type) {
      console.log(order_id, merchant_id, order_type);

      uni.navigateTo({
        url:
          "/pagesIndex/page/campusTakeout/order/addComment/addComment?id=" +
          order_id +
          "&order_type=1&merchant_id=" +
          merchant_id,
      });
    },

    //取消订单
    cancelled(item) {
      console.log(item);
      var that = this;
      uni.showModal({
        title: "温馨提示",
        content: "是否取消订单",
        async success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在加载中",
            });
            const { data, status } = await that.$api.ordercancelled({
              order_id: item.order_id,
              order_type: item.order_type, //1外卖，2附近，3优选
            });
            uni.hideLoading();
            if (status == 200) {
              that.$u.toast("取消订单成功");

              that.getOrderTakeOutList();
            }
          }
        },
      });
    },

    //校U优选
    Orderclick(item) {
      console.log("item", item.index);
      this.tabIndex = item.index;
      this.getOrderLists();
      // <!-- 1 待付款，2 待发货，3 待收货，4 待评价 5 已完成 6 取消 7 退款中(售后中) -->
    },
    //获取订单列表 /api/user/listOrders
    getOrderLists(status) {
      const data = {
        userId: uni.getStorageSync("userInfo").id,
        status: this.tabIndex,
        page: 1,
        num: 1000,
      };
      if (this.tabAct1 == 3) {
        data.key = this.keyword;
      }
      // data.status = status
      this.$http.post("/api/user/listOrders", data).then((res) => {
        if (res.code == 200) {
          this.OrderList = res.data.list;
          this.OrderList.forEach((item) => {
            item.goodsList.forEach((item2) => {
              item2.styles = JSON.parse(item2.styles);
            });
          });
        }
      });
    },
    //前往商店主页
    toShop(item) {
      uni.navigateTo({
        url: `/pagesOptimization/pages/storehome/storehome?shopid=${item.shop_id}`,
      });
    },
    //订单详情
    toDetailOrder(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pagesOptimization/pages/DetailsOrder/DetailsOrder?order_id=${item.id}&&order_no=${item.order_no}`,
      });
    },
    //立即支付
    payOrder(id, item) {
      uni.navigateTo({
        url: `/pagesOptimization/pages/PayOrder/PayOrder?type=2&&order_no=${item.order_no}`,
      });
    },
    // 再来一单
    AgainOrder(shop_id) {
      uni.navigateTo({
        url: `/pagesOptimization/pages/storehome/storehome?shopid=${shop_id}`,
      });
    },
    //确认收货
    ConfirmReceipt(id) {
      var that = this;
      uni.showModal({
        title: "提示",
        content: "是否确认收货",
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击确定");
            const data = {
              userId: uni.getStorageSync("userInfo").id,
              order_id: id,
            };
            that.$http.post("/api/user/confirm", data).then((res) => {
              if (res.code == 200) {
                that.$u.toast("确认收货成功");
                that.getOrderLists(that.tabIndex);
              } else {
                that.$u.toast(res.message);
              }
            });
          }
        },
      });
    },
    //查看物流
    checkLogistics(item) {
      console.log(item);
      // order_no
      uni.navigateTo({
        url:
          "/pagesOptimization/pages/expressDetail/expressDetail?expressNum=" +
          item.order_no,
      });
    },
    //去评价
    toEvaluate(order_id, goodsInfo) {
      console.log(order_id, goodsInfo);
      uni.navigateTo({
        url: `/pagesOptimization/pages/estimate/estimate?order_id=${order_id}&&goodsInfo=${JSON.stringify(
          goodsInfo
        )}`,
      });
    },

    //取消订单
    applyRefund(detail) {
      this.refund_detail = "";
      this.refund_detail = detail;
      console.log(detail);
      if (detail.status == 1) {
        //未付款
        this.Ucancelled(detail);
      } else {
        //已付款
        this.refund_reason = "";
        this.cancelShow = true;
      }
    },
    //弹框确认取消--已付款
    cancelClick() {
      this.Ucancelled(this.refund_detail);
    },
    //取消订单
    Ucancelled(item) {
      var that = this;
      console.log(item);
      if (item.status == 1) {
        uni.showModal({
          title: "提示",
          content: "确认取消订单？",
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              const data = {
                userId: uni.getStorageSync("userInfo").id,
                order_id: item.id,
              };
              that.$http.post("/api/user/cancelOrder", data).then((res) => {
                if (res.code == 200) {
                  that.$u.toast("取消订单成功");
                  that.getOrderLists(that.tabIndex);
                } else {
                  that.$u.toast(res.message);
                }
              });
            }
          },
        });
      } else {
        const data = {
          userId: uni.getStorageSync("userInfo").id,
          order_id: item.id,
          refund_reason: this.refund_reason, //退款原因
        };
        that.$http.post("/api/user/cancelOrder", data).then((res) => {
          if (res.code == 200) {
            that.$u.toast("取消订单成功");
            this.cancelShow = false;
          } else {
            that.$u.toast(res.message);
          }
        });
      }
    },
    //删除订单--校U
    delOrderU(id) {
      var that = this;
      uni.showModal({
        title: "提示",
        content: "确认删除订单",
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击确定");
            const data = {
              userId: uni.getStorageSync("userInfo").id,
              order_id: id,
            };
            that.$http.post("/api/user/delOrder", data).then((res) => {
              if (res.code == 200) {
                that.$u.toast("删除成功");
                that.getOrderLists(that.tabIndex);
              } else {
                that.$u.toast(res.message);
              }
            });
          }
        },
      });
    },

    // 申请售后
    AfterSale() {
      this.radiovalue1 = "已收到货，确定退款";
      this.change_id = 1;
      console.log(this.change_id);
      this.showAfter = true;
    },
    //选择
    radioChange(item) {
      // console.log('radioChange', item);
      if (item.name == "已收到货，确定退款") {
        this.change_id = item.id;
        console.log(this.change_id);
      } else if (item.name == "已收到货，更换退回") {
        this.change_id = item.id;
        console.log(this.change_id);
      }
    },

    //售后确认
    SaleClick() {
      this.afterSales();
    },
    //售后接口
    afterSales() {
      const data = {
        userId: uni.getStorageSync("userInfo").id,
        order_id: this.detail.id,
        refund_type: this.change_id,
      };
      this.$http.post("/api/user/afterSales", data).then((res) => {
        if (res.code == 200) {
          this.$u.toast("申请退款成功，等待商家确认");
          this.showAfter = false;
          setTimeout(function () {
            // uni.navigateTo({
            // 	url: '/pagesUser/page/orderList/orderList?tabAct1=3'
            // })
            uni.navigateBack();
          }, 1000);
        }
      });
    },

    terrace(item) {
      console.log(item);
      var that = this;
      uni.showModal({
        title: "温馨提示",
        content: "是否平台介入退款",
        async success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在加载中",
            });
            const { data, status } = await that.$api.refundPlatOrder({
              order_id: item.order_id,
              order_type: item.order_type, //1外卖，2附近，3优选
            });
            uni.hideLoading();
            if (status == 200) {
              that.$u.toast("提交成功");
              that.getOrderTakeOutList();
            }
          }
        },
      });
    },
    // 退款进度
    tkjd(id) {
      uni.navigateTo({
        url:
          "/pagesUser/page/orderList/afterSalesList/progress/progress?id=" + id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  white-space: nowrap;
  height: 96rpx;
  padding-top: 20rpx;
  box-sizing: border-box;
}

.tab-item {
  display: inline-block;
}

.cont {
  padding: 20rpx;
  box-sizing: border-box;
}

.name {
  max-width: 70%;
}

.scroll-goods {
  width: 100%;
  white-space: nowrap;
  height: 148rpx;
}

.scroll-goods image {
  display: inline-flex;
}

.scroll-goods image:last-child {
  margin-right: 80rpx;
}

.length {
  background: linear-gradient(rgba(255, 255, 255, 0.95), #fff);
  position: absolute;
  width: 50rpx;
  height: 152rpx;
  top: -2rpx;
  right: 0;
  padding: 26rpx 12rpx;
  box-sizing: border-box;
  text-align: center;
}

.btn-order {
  width: 160rpx;
  height: 56rpx;
  border-radius: 28rpx;
  line-height: 56rpx;
  text-align: center;
  margin-left: 20rpx;
}

.goods-r {
  height: 148rpx;
  box-sizing: border-box;
}

.more {
  position: fixed;
  right: 22rpx;
  bottom: calc(124rpx + env(safe-area-inset-bottom));
  width: 160rpx;
  height: 238rpx;
  background: #fefffe;
  box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.04);
  border-radius: 16rpx;
  padding: 10rpx 0;
  box-sizing: border-box;
}

.more > view {
  padding: 20rpx 0;
}

.label text {
  background: #f6f6fd;
  color: #999;
  padding: 0 12rpx;
  border-radius: 6rpx;
}

//校U优选
.scroll-Y {
  max-height: 420rpx;
  min-height: 152rpx;
}

.scroll-view_H {
  white-space: nowrap;
  width: 90%;
}

.store_List {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
}

.store_nav {
  display: flex;
  justify-content: space-between;
}

.store_name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.moreimg {
  width: 28rpx;
  height: 28rpx;
}

.food_img {
  width: 148rpx;
  height: 148rpx;
  margin: 16rpx;
}

.store_content {
  display: flex;
  justify-content: flex-start;
  margin-top: 24rpx;
}

.pay_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 24rpx;
  width: 160rpx;
  height: 56rpx;
  background: linear-gradient(313deg, #d62e36 6%, #ec434b);
  border-radius: 28rpx;
}

.other_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #202020;
  font-size: 24rpx;
  width: 160rpx;
  height: 56rpx;
  margin-right: 10rpx;
  border: 0.5px solid #dddddd;
  border-radius: 28rpx;
}

.child_type {
  display: flex;
  font-size: 12px;
  color: #8e8f8e;
}

.child_type_style {
  padding: 10rpx 10rpx 10rpx 0;
}

.win-box-mobile {
  width: 560rpx;
  min-height: 292rpx;
  padding: 40rpx 60rpx;
}

.btn-win {
  width: 210rpx;
  height: 64rpx;
  line-height: 64rpx;
}
</style>
