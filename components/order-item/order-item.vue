<template>
  <view v-if="item">
    <view class="top">
      <u-avatar :src="item.portrait" size="24"></u-avatar>
      <text class="nick">{{item.name}}</text>
      <text class="tel">{{item.phone}}</text>
<!--      <text class="status" v-if="item.status == 2">待发货</text>
      <text class="status" v-else-if="item.status == 3" :class="status == 3?'gray':''">已发货</text>
      <text class="status" v-else-if="item.status == 5 && type !== 'analysis'">已签收</text>
      <text class="status gray" v-else-if="item.status == 5 && type === 'analysis' && item.amount>=0">已完成</text>
      <text class="status" v-else-if="item.status == 5 && type === 'analysis' && item.amount<0">已退款</text>
      <text class="status" v-else-if="item.status == 4" :class="item.status == 4 ?'gray':''">待评价</text>
      <text class="status" v-else-if="item.status == 1">待支付</text>
      <text class="status" v-else-if="item.status == 6">取消</text>
      <text class="status" v-else-if="item.status == 7">售后中</text> -->
    </view>
    <view class="middle" v-for="innerItem of item.goodsList" :key="innerItem.id">
      <u-image :src="innerItem.picture" width="74" height="74"></u-image>
      <view class="info">
        <view class="title">{{innerItem.goods_name}}</view>
        <view class="config">
          <view>{{formateStyle(innerItem.styles)}}</view>
          <text class="extra-service">{{innerItem.shipping_method==1?'包邮':innerItem.shipping_method==2?'不包邮':'不配送'}}</text>
        </view>
      </view>
      <view class="price-num">
        <view class="price">¥{{item.buy_type === 1?innerItem.price:innerItem.group_buy_price}}</view>
        <view class="num">共{{innerItem.num}}件</view>
      </view>
    </view>
    <view class="bottom">
      <view class="order-time">下单时间：{{item.submit_time}}</view>
      <view class="pay-money" v-if="item.paid_amount">
        <text class="symbol">¥</text>
        <text class="money-num">{{item.paid_amount}}</text>
      </view>
      <view class="pay-money" v-if="item.amount && type==='analysis'" :class="item.amount<0?'refund-order':''">
        佣金
        <text class="symbol">¥</text>
        <text class="money-num">{{item.amount}}</text>
      </view>
    </view>
    <!-- 待付款 -->
    <view class="wait-pay" v-if="item.status == 1">
      <view class="contact-customer" @click.stop="contactCustomer(item)">联系TA</view>
    </view>
    <!-- end -->
    <!-- 待发货 -->
    <view class="scan" v-if="item.status == 2">
      <u-input
          placeholder="输入快递单号"
          fontSize="12px"
          v-model="expressNum"
          style=" background-color: #F6F6F8; border: none;"
          placeholderStyle="fontSize:14px"
      >
        <template slot="suffix">
          <u-icon name="scan" color="#202020" bold size="20px" @click="handleScan"></u-icon>
        </template>
      </u-input>
    </view>
    <!--end  -->
    <!-- 已发货 -->
    <view class="express" v-if="item.status == 3">
        <view class="express-brand">顺丰</view>
        <view class="express-num">SF02839217839</view>
        <view class="express-status">运输中</view>
    </view>
    <!-- end -->
    <!-- 待发货 -->
<!--    <view class="operate" v-if="item.status == 2">
      <view class="revoke" @click="handleRevoke(item.id)">撤销发货</view>
      <view class="print">打印订单</view>
      <view class="distribute" @click="sendGoods(item.id)">立即发货</view>
    </view> -->
    <!-- end -->
    <!-- 取消 -->
<!--    <view class="operate" v-if="item.status == 6">
      <view class="operate-express-brand">顺丰</view>
      <view class="operate-express-num">SF02839217839</view>
      <view class="print" style="margin-left: auto;">同意</view>
      <view class="distribute">不同意</view>
    </view> -->
    <!-- end -->
    <!-- 售后中 -->
    <view class="express" style="margin-top: 20rpx;" v-if="item.status == 7">
         <view class="express-brand">退款原因</view>
         <view class="express-num">{{item.refund_reason}}</view>
     </view>
<!--    <view class="operate" style="margin-top: 20rpx;" v-if="item.status == 7">
      <view class="operate-express-brand">顺丰</view>
      <view class="operate-express-num">SF02839217839</view>
    </view> -->
<!--    <view class="refund" v-if="item.status == 7">
      <view class="refund-btn">
        <view class="" v-if="item.refund_type == 1" @click="handleRefund(item.id,1)">已收到货，确定退款</view>
        <view class="" v-if="item.refund_type == 2" @click="handleRefund(item.id,2)">已收到货，更换退回</view>
      </view>
      <view>
        <u-input
            placeholder="输入快递单号"
            fontSize="12px"
            v-model="expressNum"
            style=" background-color: #F6F6F8; border: none;"
            placeholderStyle="fontSize:14px"
        >
         <template slot="suffix">
            <u-icon name="scan" color="#202020" bold size="20px" @click="handleScan(2)"></u-icon>
          </template>
        </u-input>
      </view>
    </view> -->
    <u-notify ref="uNotify"></u-notify>
    <u-modal :show="modalShow" confirmColor="#D93038" @confirm="confirmRevoke" showCancelButton
      @cancel="modalShow = false">
      <view style="padding: 40rpx 20rpx; font-size: 34rpx;">确定撤销发货吗?</view>
    </u-modal>
    <u-modal :show="expressShow" confirmColor="#D93038" @confirm="confirmExpress" showCancelButton
      @cancel="expressShow = false">
      <view class="express-list" v-for="(item,index) of experssList" :key="index" @click="tempExpressNum = item">{{item}}</view>
    </u-modal>
    <u-modal :show="refundShow" confirmColor="#D93038" @confirm="confirmRefund" showCancelButton
      @cancel="refundShow = false">
      <view style="padding: 40rpx 20rpx; font-size: 34rpx;">确定{{curRefundText}}吗?</view>
    </u-modal>
  </view>
</template>

<script>
    export default {
      data(){
        return{
          avatar:'https://tengface-live-user-1308721187.file.myqcloud.com/header/167063704736533.jpg',
          cover:'http://tengface-live-user.oss-cn-shenzhen.aliyuncs.com/uploads/-1/2022/12/06/GYHb5CbdrCpfNhFsM2QYQb2x8PnT8Nn2.jpg',
          photoPath:'',
          modalShow:false,
          expressShow:false,
          refundShow:false,
          curOrderId:'',
          experssList:[],
          expressNum:'',
          tempExpressNum:'',
          curRefundText:''
        }
      },
      props:['status','item','type'],
      onLoad() {
        console.log('item',this.item)
      },
      computed:{
        formateStyle(){
          return function(style){
            const nameArr = JSON.parse(style).map(item=>{
              return item.name
            })
            return nameArr.length?nameArr.join('/'):''
          }
        }
      },
      methods:{
        handleScan(){
          // uni.scanCode(
          // {
          //   onlyFromCamera: true,
          //   success: function (res) {
          //     console.log('条码类型：' + res.scanType);
          //     console.log('条码内容：' + res.result);
          //   }
          // })
          
          	uni.chooseImage({
          		count:1,// 限制选取图像数量
          		mediaType:["image"],// 设置选取资源为图片类型
              sizeType: ['compressed'],
          		sourceType:["camera"],// 设置图像来源：相册或相机
          		camera:"back",// 设置相机为后置摄像头
          		success:(res)=>{
          			// 获取微信拿到的图片的临时地址并保存到本地
                console.log(res)
          			this.photoPath=res.tempFilePaths[0];
                console.log(this.photoPath)
                			uni.uploadFile({
                				url:'https://tr.trweilai.com/tradmin//Upload/upload',
                				filePath: this.photoPath,
                				name: 'file',
                				// header: {
                				// 	'token': uni.getStorageSync('u_token'),
                				// },
                				success: (res) => {
                					  const data = JSON.parse(res.data)
                            this.getExpressData(data.data)
                				},
                			})
          		}
          	})
        },
        async getExpressData(image){
          const data ={
            image
          }
          const res = await this.$http.post('/shop/ocr',data)
          if(res.code == 200){
            this.experssList = res.data?.data?.data?.barcode || []
            if(this.experssList.length === 0){
              this.$refs.uNotify.error('识别快递单号失败，请手动输入')
            }else if(this.experssList.length === 1){
              this.expressNum = this.experssList[0]
            }else{
              this.expressShow = true
            }
          }
        },
        confirmExpress(){
          this.expressNum = this.tempExpressNum
          this.expressShow = false
        },
        handleRevoke(id){
          this.modalShow = true
          this.curOrderId = id
        },
        async confirmRevoke(id){
          const data = {
            order_id:this.curOrderId
          }
          const res = await this.$http.get('/shop/cancelSend',data)
          if(res.code == 200){
            this.$refs.uNotify.success('撤销成功')
            uni.$emit('onGetOrderList')
            this.modalShow = false
          }
        },
        async sendGoods(id){
          const {comCode, name} = await this.getExpressCompany()
          const data = {
            order_id:id,
            comCode,
            name,
            barcode:this.expressNum
          }
          const res = this.$http.post('/shop/send',data)
          if(res.code === 200){
            this.$refs.uNotify.success('发货成功')
            uni.$emit('onGetOrderList')
          }
        },
        async contactCustomer(item){
          const toUser={
            name:item.user_name,
            avatar:item.portrait,
            userId:item.user_id
          }
          uni.navigateTo({
            url:`/pages/chat/chat?toUser=${encodeURIComponent(JSON.stringify(toUser))}`
          })
        },
        getExpressCompany(){
          return new Promise(async (resolve,reject)=>{
            const data = {
              num:this.expressNum
            }
            const res =  await this.$http.get('/shop/autoNumber',data)
            if(res.code === 200){
              resolve(res.data.list[0])
            }
          })

        },
        handleRefund(id,type){
            this.curOrderId = id
            this.curRefundType = type
            this.curRefundText = type === 1?'退款':'换货'
            this.refundShow = true
        },
        async confirmRefund(){
          const data = {
            order_id:this.curOrderId,
            refund_type:this.curRefundType
          }
          const res =  await this.$http.get('/shop/afterSale',data)
          if(res.code == 200){
            this.$refs.uNotify.success('操作成功')
            uni.$emit('onGetOrderList')
            this.refundShow = false
          }
        }
      }
    }
  
</script>

<style lang="scss" scoped>
  .top{
    display: flex;
    align-items: center;
    .nick{
      margin: 0 16rpx 0 16rpx;
      font-size: 32rpx;
      font-weight: 700;
    }
    .tel{
      font-size: 24rpx;
      color: #888888;
      margin-right: 10rpx;
    }
    .status{
      color: #D93038;
      font-size: 24rpx;
      margin-left: auto;
    }
    .gray{
      color: #999999;
    }
  }
  .middle{
    display: flex;
    margin-top: 40rpx;
    .info{
      margin-left: 24rpx;
      display: flex;
      flex-direction: column;
      .extra-service{
        width: 60rpx;
        height: 32rpx;
        background: #d93038;
        border-radius: 4rpx;
        color: #FFFFFF;
        font-size: 24rpx;
        text-align: center;
        line-height: 32rpx;
        margin-left: 20rpx;
      }
    }
    .title{
      width: 398rpx;
      height: 88rpx;
      font-size: 28rpx;
      font-weight: 700;
      text-align: left;
      color: #202020;
      line-height: 44rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal !important;
      word-wrap: break-word; 
    }
    .config{
      color: #888888;
      font-size: 24rpx;
      margin-top: auto;
      display: flex;
    }
    .price-num{
      margin-left: auto;
      display: flex;
      flex-direction: column;
      .price{
        font-size: 28rpx;
        font-weight: 700;
        color: #202020;
      }
      .num{
        color: #888888;
        font-size: 24rpx;
        text-align: right;
        margin-top: auto;
      }
    }
  }
  .bottom{
    margin-top: 12rpx;
    display: flex;
    font-size: 24rpx;
    // align-items: center;
    color: #888888;
    .order-time{
    align-self: flex-end;
    }
    .pay-money{
      margin-left: auto;
      align-self: flex-end;
      color: #D93038;
      .symbol{
        font-weight: 700;
        margin-left: 16rpx;
      }
      .money-num{
        font-size: 36rpx;
        font-weight: 700;
      }
    }
    .refund-order{
      color: #D93038;
    }
  }
  .wait-pay{
    margin-top: 32rpx;
    .contact-customer{
      width: 160rpx;
      height: 56rpx;
      // background: $uni-bgcolor;
      border-radius: 28rpx;
      color: #FFFFFF;
      line-height: 56rpx;
      font-size: 24rpx;
      margin-left: auto;
      text-align: center;
    }
  }
  .scan{
    margin-top: 24rpx;
  }
  .express{
    margin-top: 24rpx;
    background: #F6F6F8;
    height: 72rpx;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20rpx;
    .express-brand{
      color: #888888;
      margin-right: 20rpx;
    }
    .express-brand{
      color: #202020;
      font-weight: 700;
    }
    .express-status{
      margin-left: auto;
      color: #D93038;
    }
  }
  .operate{
    margin-top: 32rpx;
    display: flex;
    view{
      width: 160rpx;
      height: 56rpx;
      font-size: 24rpx;
      line-height: 56rpx;
      border-radius: 28rpx;
      background: #FFFFFF;
      outline: none;
      text-align: center;
      border: 1px solid #DDDDDD;
      color: #202020;
    }
    .revoke{
      margin-left: auto;
    }
    .print{
      margin: 0 20rpx;
    }
    .distribute{
      // background: $uni-bgcolor;
      border: none;
      color: #FFFFFF;
    }
    .operate-express-brand{
      width: inherit;
      color: #888888;
      border: none;
      margin-right: 16rpx;
    }
    .operate-express-num{
      width: inherit;
      color: #202020;
      border: none;
      margin-right: 16rpx;
    }
  }
  .refund-btn{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24rpx;
    view{
      width: 320rpx;
      height: 64rpx;
      font-size: 24rpx;
      line-height: 64rpx;
      text-align: center;
      border: 1px solid #dddddd;
      border-radius: 8rpx;
    }
  }
  .express-list{
    margin-bottom: 30rpx;
  }
</style>