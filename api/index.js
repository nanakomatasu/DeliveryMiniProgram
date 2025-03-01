import request from '@/common/request.js'

const api = {}
// POST请求方式
//api.article = params => request.globalRequest(`article/lists`, 'POST', params, 1)
// GET请求方式
//api.article =  params => request.globalRequest(`article/lists`, 'GET', params, 1)
// 参数分别对应    接口地址，请求方式，传参，传1是登录过期不会重新请求，传2是登录过期会重新请求

//获取首页数据 
api.getPage = params => request.globalRequest(`client/home/getPage`, 'GET', params, 1)

// 平台活动天降红包列表接口
api.pttj_lists = params => request.globalRequest(`client/activity/pttj_lists`, 'POST', params, 1)

// 抽奖活动接口列表
api.ptdraw_lists = params => request.globalRequest(`client/activity/ptdraw_lists`, 'POST', params, 1)

// 获取抽奖详情
api.ptdraw_info = params => request.globalRequest(`client/activity/ptdraw_info`, 'POST', params, 1)

// 获取抽奖页面轮播
api.tj_draw_banner = params => request.globalRequest(`client/activity/tj_draw_banner`, 'POST', params, 1)

// 抽奖活动邀请列表
api.recommend_list = params => request.globalRequest(`client/activity/recommend_list`, 'POST', params, 1)

//获取抽奖记录接口
api.tj_draw_my = params => request.globalRequest(`client/activity/tj_draw_my`, 'POST', params, 1)

// 获取抽奖最新记录
api.tj_draw_new = params => request.globalRequest(`client/activity/tj_draw_new`, 'POST', params, 1)

//抽奖接口
api.tj_draw = params => request.globalRequest(`client/activity/tj_draw`, 'POST', params, 1)

// 获取二维码
api.getQrcode = params => request.globalRequest(`client/member/getQrcode?scene=${params.scene}&page=${params.page}`, 'GET', {}, 2)

// 红包套餐列表接口
api.tc_lists = params => request.globalRequest(`client/activity/tc_lists`, 'POST', params, 1)

// 商家天降红包列表接口
api.sjtj_lists = params => request.globalRequest(`client/activity/sjtj_lists`, 'POST', params, 1)

// 商家天降红包列表接口
api.tj_gain = params => request.globalRequest(`client/activity/tj_gain`, 'POST', params, 1)

// 红包可使用商家列表接口
api.hbsj_lists = params => request.globalRequest(`client/activity/hbsj_lists`, 'POST', params, 1)

// 红包套餐购买接口
api.tc_buy = params => request.globalRequest(`client/activity/tc_buy`, 'POST', params, 1)

// 邀请会员接口
api.tc_recommend = params => request.globalRequest(`client/recommend/add`, 'POST', params, 1)

// 我的邀请列表
api.tc_recommend_myList = params => request.globalRequest(`client/recommend/myList`, 'POST', params, 1)

//
api.refundPlatOrder = params => request.globalRequest(`client/order/refundPlatOrder`, 'POST', params, 1)
//微信登录
api.wxLogin = params => request.globalRequest(`client/Member/wxLogin`, 'POST', params, 1)
//获取微信手机号
api.phonePower = params => request.globalRequest(`client/Member/phonePower`, 'POST', params, 1)
//发送短信验证码
api.apiSendSms = params => request.globalRequest(`client/api/sendSms`, 'POST', params, 1)
//用户短信注册
api.apiSmsregister = params => request.globalRequest(`client/Member/smsregister`, 'POST', params, 1)
//短信登陆
api.apiSmsLogin = params => request.globalRequest(`client/Member/smsLogin`, 'POST', params, 1)
//账号密码登录
api.apiPasswordLogin = params => request.globalRequest(`client/Member/passwordLogin`, 'POST', params, 1)
//找回密码
api.findPassword = params => request.globalRequest(`client/Member/findPassword`, 'POST', params, 1)
//获取幻灯片列表
api.adsGetList = params => request.globalRequest(`client/ads/getList`, 'GET', params, 1)
//获取通知列表
api.noticeGetList = params => request.globalRequest(`client/notice/getList`, 'GET', params, 1)
//校园配置文件
api.configGetInfo = params => request.globalRequest(`client/config/getInfo`, 'GET', params, 1)
//入驻加盟
api.joininfoAdd = params => request.globalRequest(`client/joininfo/add`, 'POST', params, 2)
//获取学校列表
api.schoolGetList = params => request.globalRequest(`client/school/getList`, 'GET', params, 1)
//商家分类列表
api.storecateIndex = params => request.globalRequest(`client/storecate/index`, 'GET', params, 1)
//商家标签列表
api.storelabelIndex = params => request.globalRequest(`client/storelabel/index`, 'GET', params, 1)
//商家列表
api.merchantLists = params => request.globalRequest(`client/Merchant/lists`, 'POST', params, 1)
//商家详情接口
api.merchantInfo = params => request.globalRequest(`client/Merchant/info`, 'POST', params, 1)
//领取外卖商家红包
api.getRedPokect = params => request.globalRequest(`client/Merchant/receiveRedPacket`, 'POST', params, 2)
//商家商品列表接口
api.takeoutGoodsLists = params => request.globalRequest(`client/TakeoutGoods/lists`, 'POST', params, 2)
//商家商品详情接口
api.takeoutGoodsInfo = params => request.globalRequest(`client/TakeoutGoods/info`, 'POST', params, 2)
//外卖添加购物车
api.takeoutCartAdd = params => request.globalRequest(`client/TakeoutCart/add`, 'POST', params, 2)
//外卖购物车减少接口
api.takeoutCartSub = params => request.globalRequest(`client/TakeoutCart/sub`, 'POST', params, 2)
//修改购物车商品数量接口
api.takeoutCartModify = params => request.globalRequest(`client/TakeoutCart/modify`, 'POST', params, 2)
//购物车列表接口
api.takeoutCartLists = params => request.globalRequest(`client/TakeoutCart/lists`, 'POST', params, 2)
//清空外卖购物车
api.takeoutCartClear = params => request.globalRequest(`client/TakeoutCart/clear`, 'POST', params, 2)
//获取省市区接口
api.AreaInfo = params => request.globalRequest(`client/api/getAreaInfo`, 'GET', params, 1)
//收货地址列表
api.getAddressList = params => request.globalRequest(`client/user/getAddressList`, 'GET', params, 2)
//首页推荐商品列表
api.homeIndex = params => request.globalRequest(`client/home/getRecommendGoodslists`, 'GET', params, 1)
//收货地址添加接口
api.userAddAddres = params => request.globalRequest(`client/user/addAddress`, 'POST', params, 2)
//收货地址编辑
api.userSaveAddress = params => request.globalRequest(`client/user/saveAddress`, 'POST', params, 2)
//获取收货地址详情
api.userGetAddressInfo = params => request.globalRequest(`client/user/getAddressInfo`, 'GET', params, 2)
//收货地址编辑
api.userDeleteAddress = params => request.globalRequest(`client/user/deleteAddress`, 'GET', params, 2)
//获取创建订单详情
api.orderSettlement = params => request.globalRequest(`client/order/settlement`, 'GET', params, 2)
//提交订单详情
api.orderSettlementPost = params => request.globalRequest(`client/order/settlement`, 'POST', params, 2)
//订单支付接口
api.orderPay = params => request.globalRequest(`client/order/pay`, 'POST', params, 2)
//外卖订单详情
api.orderTakeOutInfo = params => request.globalRequest(`client/order/takeOutInfo`, 'GET', params, 2)
//外卖订单列表
api.orderTakeOutList = params => request.globalRequest(`client/order/takeOutList`, 'POST', params, 2)
//订单删除
api.orderDeleteOrder = params => request.globalRequest(`client/order/deleteOrder`, 'GET', params, 2)
//图片上传
api.baseUpload = params => request.globalRequest(`client/Base/upload`, 'POST', params, 2)
//订单评论
api.orderCommentOrder = params => request.globalRequest(`client/order/commentOrder`, 'POST', params, 2)
//评论列表
api.orderCommentList = params => request.globalRequest(`client/order/commentList`, 'POST', params, 2)
//个人中心订单列表接口
api.userOrderList = params => request.globalRequest(`client/order/orderList`, 'POST', params, 2)
//再来一单
api.orderAgain = params => request.globalRequest(`client/order/orderAgain`, 'GET', params, 2)
//自提订单确认取餐
api.receivingOrder = params => request.globalRequest(`client/order/receivingOrder`, 'GET', params, 2)
//购物车列表
api.cartlists = params => request.globalRequest(`client/cart/lists`, 'POST', params, 2)
//订单退款申请（3已接单,4配送中/待取货,）
api.refundOrder = params => request.globalRequest(`client/order/refundOrder`, 'POST', params, 2)
//修改购物车商品数量
api.magnitude = params => request.globalRequest(`client/TakeoutCart/modify`, 'POST', params, 2)
//个人中心
api.receivingOrderx = params => request.globalRequest(`client/user/center`, 'GET', params, 2)
//用户信息修改
api.newsmodify = params => request.globalRequest(`client/user/modifyInfo`, 'POST', params, 2)
//用户收
api.collection = params => request.globalRequest(`client/user/saveCollection`, 'POST', params, 2)
//用户收藏列表
api.collectionlist = params => request.globalRequest(`client/user/myCollection`, 'GET', params, 2)
//用户浏览列表 
api.browse = params => request.globalRequest(`client/user/myVisitlist`, 'GET', params, 2)
//删除用户店铺浏览记录
api.cutoutbrowse = params => request.globalRequest(`client/user/deleteVisit`, 'GET', params, 2)
// 用户修改密码
api.alterhandset = params => request.globalRequest(`client/member/resetPassword`, 'POST', params, 2)
//用户修改手机号
api.altercypher = params => request.globalRequest(`client/member/modifyMobile`, 'POST', params, 2)
//用户浏览列表 
api.getmemberinfo = params => request.globalRequest(`client/member/getinfo`, 'GET', params, 2)
///获取搜索首页
api.searchMainIndex = params => request.globalRequest(`client/Search/searchMainIndex`, 'POST', params, 2)
//获取搜索首页关键词 
api.getHotKeyword = params => request.globalRequest(`client/Search/getHotKeyword`, 'POST', params, 2) ///获取搜索结果 
api.getSearchResult = params => request.globalRequest(`client/Search/getMainSearchResult`, 'POST', params, 2)

//获取子分类商家数据    
api.subcategory = params => request.globalRequest(`client/Merchant/getCateList`, 'POST', params, 2)
//清除搜索关键词 
api.clearHistoryKeyword = params => request.globalRequest(`client/Search/searchClearAll`, 'POST', params, 2)
//换搜索关键词
api.changeKeyword = params => request.globalRequest(`client/Search/changeKeyword`, 'POST', params, 2)
//店铺筛选条件
api.selection = params => request.globalRequest(`client/merchant/getFilterinfo`, 'POST', params, 2)
//举报类型 
api.accusation = params => request.globalRequest(`client/merchant/jbtype`, 'POST', params, 2)
//商户举报 
api.accusationxs = params => request.globalRequest(`client/Merchant/addJuBao`, 'POST', params, 2)
//店铺商品搜索 
api.scoutaround = params => request.globalRequest(`client/TakeoutGoods/searchList`, 'POST', params, 2)
//店铺商品搜索 历史记录
api.chronicle = params => request.globalRequest(`client/Merchant/searchMainIndex`, 'POST', params, 2)
//清除历史记录
api.clearlogs = params => request.globalRequest(`client/Merchant/searchClearAll`, 'POST', params, 2)
//用户意见反馈
api.suggestions = params => request.globalRequest(`client/User/addOpinion`, 'POST', params, 2)
//会员卡开通信息
api.vipmessage = params => request.globalRequest(`client/vip/getInfo`, 'GET', params, 2)
//会员卡下单
api.substance = params => request.globalRequest(`client/vip/vipOrder`, 'POST', params, 2)
//开卡订单信息
api.orderform = params => request.globalRequest(`client/vip/getOrderInfo`, 'GET', params, 2)
//会员卡支付 
api.vippay = params => request.globalRequest(`client/vip/pay`, 'POST', params, 2)
//优惠券列表 
api.couponlist = params => request.globalRequest(`client/user/getCouponList`, 'GET', params, 2)

//公众号获取授权 
api.getWxOauthRedirect = params => request.globalRequest(`client/member/getOauthRedirect`, 'GET', params, 2)

api.getWxPayOauthRedirect = params => request.globalRequest(`client/member/getpayOauthRedirect`, 'GET', params, 2)

//美食商品列表
api.delicacywares = params => request.globalRequest(`client/GroupBuyGoods/lists`, 'POST', params, 2)

//美食商品详情
api.delicacyetails = params => request.globalRequest(`client/GroupBuyGoods/info`, 'POST', params, 2)

//美食购物车列表
api.delicacycartlist = params => request.globalRequest(`client/GroupBuyCart/lists`, 'POST', params, 2)

//美食添加购物车
api.delicacyaddcart = params => request.globalRequest(`client/GroupBuyCart/add`, 'POST', params, 2)

//美食减少购物车
api.delicacycartreduce = params => request.globalRequest(`client/GroupBuyCart/sub`, 'POST', params, 2)

api.delicacycartsc = params => request.globalRequest(`client/GroupBuyCart/del`, 'POST', params, 2)

/**  ---------堂食------   **/
//堂食商家列表
api.dinningShopList = params => request.globalRequest(`client/Merchant/tradeArea`, 'POST', params, 2)

//堂食订单列表
api.inStoreOrderList = params => request.globalRequest(`client/InstoreOrder/lists`, 'POST', params, 2)

//获取订单信息
api.inStoreSettlement = params => request.globalRequest(`client/InstoreOrder/settlement`, 'GET', params, 2)
//堂食订单结算 
api.inStoreSettlementPost = params => request.globalRequest(`client/InstoreOrder/settlement`, 'POST', params, 2)

//堂食订单详情 client/InstoreOrder/info
api.inStoreOrderInfo = params => request.globalRequest(`client/InstoreOrder/info`, 'GET', params, 2)

//堂食订单支付 
api.inStoreOrderPay = params => request.globalRequest(`client/InstoreOrder/pay`, 'POST', params, 2)

//堂食删除订单 
api.inStoreOrderDelete = params => request.globalRequest(`client/InstoreOrder/delete`, 'GET', params, 2)

//堂食再来一单 
api.inStoreOrderAgain = params => request.globalRequest(`client/InstoreOrder/again`, 'GET', params, 2)

//堂食订单取消 
api.instoreOrderCancel = params => request.globalRequest(`client/InstoreOrder/cancel`, 'GET', params, 2)

//堂食退款申请 
api.instoreOrderRefund = params => request.globalRequest(`client/InstoreOrder/refund`, 'POST', params, 2)

// 美食获取订单信息 
api.delicacyorderxx = params => request.globalRequest(`client/GroupBuyOrder/buyNow`, 'GET', params, 2)
// 美食获下单
api.delicacyorderxr = params => request.globalRequest(`client/GroupBuyOrder/buyNow`, 'POST', params, 2)
//美食订单详情
api.delicacyorderxq = params => request.globalRequest(`client/GroupBuyOrder/orderInfo`, 'GET', params, 2)

//美食订单支付
api.delicacyorderzf = params => request.globalRequest(`client/GroupBuyOrder/pay`, 'POST', params, 2)

//美食购物车订单详情
api.delicacyordergwcxq = params => request.globalRequest(`client/GroupBuyOrder/cart`, 'GET', params, 2)

//购物车下单提交订单信息
api.delicacyorderddxx = params => request.globalRequest(`client/GroupBuyOrder/cart`, 'POST', params, 2)

//美食购物车订单详情
api.indexsortlist = params => request.globalRequest(`client/home/getHomeCateList`, 'GET', params, 2)

//获取本地生活
api.locallife = params => request.globalRequest(`client/home/getHomeGroupGoods`, 'GET', params, 2)

//美食订单列表接口
api.foodorderlist = params => request.globalRequest(`client/GroupBuyOrder/lists`, 'POST', params, 2)

//订单取消
api.ordercancelled = params => request.globalRequest(`client/order/cancelOrder`, 'GET', params, 2)

//获取通知列表
api.getList = params => request.globalRequest(`client/notice/getList`, 'GET', params, 2)

//资料墙分类列表
api.datawall = params => request.globalRequest(`addonsapi/datawall/index/cate/index`, 'GET', params, 2)

//资料添加
api.datawalladd = params => request.globalRequest(`addonsapi/datawall/index/goods/add`, 'POST', params, 2)

// 资料列表
api.datawallgetList = params => request.globalRequest(`addonsapi/datawall/index/goods/getList`, 'POST', params, 2)

//资料墙分类列表
api.datawall = params => request.globalRequest(`addonsapi/datawall/index/cate/index`, 'GET', params, 2)

//个人中心
api.datawallcore = params => request.globalRequest(`addonsapi/datawall/index/my/center`, 'GET', params, 2)

//我发布列表
api.getGoodsList = params => request.globalRequest(`addonsapi/datawall/index/my/getGoodsList`, 'POST', params, 2)

//资料删除 
api.datawalldelete = params => request.globalRequest(`addonsapi/datawall/index/goods/delete`, 'POST', params, 2)

// 详情 
api.datawalldetail = params => request.globalRequest(`addonsapi/datawall/index/goods/detail`, 'POST', params, 2)

// 个人中心
api.datawallMycenter = params => request.globalRequest(`addonsapi/datawall/index/my/center`, 'POST', params, 2)

//获取订单结算信息接口 
api.datawallsettlement = params => request.globalRequest(`addonsapi/datawall/index/order/settlement`, 'GET', params, 2)

//订单结算提交接口
api.datawallcenter = params => request.globalRequest(`addonsapi/datawall/index/order/settlement`, 'POST', params, 2)

//资料支付
api.datawallpay = params => request.globalRequest(`addonsapi/datawall/index/order/pay`, 'POST', params, 2)

//资料订单 
api.getMyorderList = params => request.globalRequest(`addonsapi/datawall/index/order/getMyorderList`, 'POST', params, 2)

//订单详情 
api.datawallgetInfo = params => request.globalRequest(`addonsapi/datawall/index/order/getInfo`, 'GET', params, 2)

//取消订单
api.cancelOrder = params => request.globalRequest(`addonsapi/datawall/index/order/cancelOrder`, 'GET', params, 2)

//删除订单 
api.ddeleteOrder = params => request.globalRequest(`addonsapi/datawall/index/order/deleteOrder`, 'GET', params, 2)

//资料-用户注销
api.mydelete = params => request.globalRequest(`addonsapi/datawall/index/my/delete`, 'POST', params, 2)

//获取资料文件列表 
api.getFilesList = params => request.globalRequest(`addonsapi/datawall/index/goods/getFilesList`, 'POST', params, 2)

//资料-用户信息修改
api.datawallModifyInfo = params => request.globalRequest(`addonsapi/datawall/index/my/modifyInfo`, 'POST', params, 2)

//作者信息
api.datawallinfo = params => request.globalRequest(`addonsapi/datawall/index/author/info`, 'GET', params, 2)

//关注 
api.saveFans = params => request.globalRequest(`addonsapi/datawall/index/my/saveFans`, 'POST', params, 2)

//资料墙首页数据 
api.datawallindex = params => request.globalRequest(`addonsapi/datawall/index/index/index`, 'GET', params, 2)

//认证信息提交
api.datawallsavesCertification = params => request.globalRequest(`addonsapi/datawall/index/my/savesCertification`,
	'POST', params, 2)

// 获取认证信息
api.datawallgetCertification = params => request.globalRequest(`addonsapi/datawall/index/my/getCertification`, 'POST',
	params, 2)

//下载列表
api.getdownloadlog = params => request.globalRequest(`addonsapi/datawall/index/my/getdownloadlog`, 'POST', params, 2)

//资料下载
api.datawalldownloadLog = params => request.globalRequest(`addonsapi/datawall/index/goods/downloadLog`, 'POST', params,
	2)

//删除下载记录 
api.deletedownloadlog = params => request.globalRequest(`addonsapi/datawall/index/my/deletedownloadlog`, 'GET', params,
	2)

//用户粉丝列表
api.datawallmyFans = params => request.globalRequest(`addonsapi/datawall/index/my/myFans`, 'GET', params, 2)

//用户关注列表
api.datawallmyFollows = params => request.globalRequest(`addonsapi/datawall/index/my/myFollows`, 'GET', params, 2)

//评论列表 
api.datawallcommentOrder = params => request.globalRequest(`addonsapi/datawall/index/goods/commentList`, 'POST', params,
	2)
//订单评论 
api.datawallcommentOrderx = params => request.globalRequest(`addonsapi/datawall/index/order/commentOrder`, 'POST',
	params, 2)

//我的红包列表
api.datawallmylists = params => request.globalRequest(`addonsapi/datawall/index/coupon/mylists`, 'POST', params, 2)

// 红包列表
api.datawallcouponlists = params => request.globalRequest(`addonsapi/datawall/index/coupon/lists`, 'GET', params, 2)

//领取红包
api.datawallcouponreceive = params => request.globalRequest(`addonsapi/datawall/index/coupon/receive`, 'POST', params,
	2)

//我的分销订单列表 
api.getAuthororderList = params => request.globalRequest(`addonsapi/datawall/index/order/getAuthororderList`, 'POST',
	params, 2)

// 我的消息通知
api.datawallmyMessage = params => request.globalRequest(`addonsapi/datawall/index/my/myMessage`, 'GET', params, 2)

//我的余额列表 
api.datawallmyCapitals = params => request.globalRequest(`addonsapi/datawall/index/my/myCapitals`, 'POST', params, 2)

//提现申请提交 
api.withdrawsubmit = params => request.globalRequest(`addonsapi/datawall/index/Withdraw/submit`, 'POST', params, 2)

//我的钱包 
api.getMyWallet = params => request.globalRequest(`addonsapi/datawall/index/my/getMyWallet`, 'GET', params, 2)

//提现记录 
api.withdrawlists = params => request.globalRequest(`addonsapi/datawall/index/Withdraw/lists`, 'POST', params, 2)

//我的资料详情  
api.myGoodsdetail = params => request.globalRequest(`addonsapi/datawall/index/goods/myGoodsdetail`, 'POST', params, 2)

//资料修改  
api.zlmodify = params => request.globalRequest(`addonsapi/datawall/index/goods/modify`, 'POST', params, 2)

api.unbindWx = params => request.globalRequest(`client/Member/unbindWx`, 'GET', params, 2)

api.getbindOauthRedirect = params => request.globalRequest(`client/member/getbindOauthRedirect`, 'GET', params, 2)




// 获取收货地址详情
api.sitedetails = params => request.globalRequest(`client/user/getAddressInfo`, 'GET', params, 2)

//收货地址删除
api.omission = params => request.globalRequest(`client/user/deleteAddress`, 'GET', params, 2)





//隐私政策
api.ptysgetInfo = params => request.globalRequest(`addonsapi/running/index/config/getInfo`, 'GET', params, 2)

//收货码开关  
api.setReceivingCode = params => request.globalRequest(`addonsapi/running/index/my/setReceivingCode`, 'POST', params, 2)


//订单结算提交接口 
api.ordersettlement = params => request.globalRequest(`addonsapi/running/index/order/settlement`, 'POST', params, 2)

//VIP权限 /client/vip/getInfo
api.vipInfo = params => request.globalRequest(`/client/vip/getInfo`, 'GET', params, 2)


// 圈子接口

//圈子个人中心接口
api.circlegrmy = params => request.globalRequest(`addonsapi/circle/index/my/center`, 'GET', params, 2)

//圈子获取用户信息
api.circleuserinfo = params => request.globalRequest(`addonsapi/circle/index/my/getUserInfo`, 'POST', params, 2)

// 加入圈子
api.circlesaveCircle = params => request.globalRequest(`addonsapi/circle/index/my/saveCircle`, 'POST', params, 2)

// 发布帖子
api.circlesavePost = params => request.globalRequest(`addonsapi/circle/index/my/savePost`, 'POST', params, 2)

// 获取我的圈子信息
api.circlegetCircle = params => request.globalRequest(`addonsapi/circle/index/my/getCircle`, 'POST', params, 2)

// 帖子列表
api.circlepostsList = params => request.globalRequest(`addonsapi/circle/index/posts/list`, 'POST', params, 2)

// 我的帖子列表
api.circleMypostList = params => request.globalRequest(`addonsapi/circle/index/my/postList`, 'POST', params, 2)

// 帖子点赞、取消点赞接口
api.circlepostsLike = params => request.globalRequest(`addonsapi/circle/index/posts/like`, 'POST', params, 2)

// 帖子详情
api.circlepostsInfo = params => request.globalRequest(`addonsapi/circle/index/posts/info`, 'POST', params, 2)

// 评论帖子接口
api.circleSaveComment = params => request.globalRequest(`addonsapi/circle/index/posts/saveComment`, 'POST', params, 2)

// 评论帖子列表接口
api.circleCommentList = params => request.globalRequest(`addonsapi/circle/index/posts/commentList`, 'POST', params, 2)

// 删除帖子评论接口
api.circleDeleteComment = params => request.globalRequest(`addonsapi/circle/index/posts/deleteComment`, 'POST', params,
	2)

//我的收藏列表
api.circlecollectList = params => request.globalRequest(`addonsapi/circle/index/my/collectList`, 'POST', params, 2)

//我的点赞列表
api.circlelikeList = params => request.globalRequest(`addonsapi/circle/index/my/likeList`, 'POST', params, 2)

// 收藏
api.circleCollect = params => request.globalRequest(`addonsapi/circle/index/posts/collect`, 'POST', params, 2)

// 关注接口
api.circleFollow = params => request.globalRequest(`addonsapi/circle/index/my/follow`, 'POST', params, 2)

//我的粉丝列表
api.circleMyFans = params => request.globalRequest(`addonsapi/circle/index/my/MyFans`, 'POST', params, 2)

//我的关注列表
api.circleMyFollow = params => request.globalRequest(`addonsapi/circle/index/my/MyFollow`, 'POST', params, 2)

//删除帖子
api.circledeletePost = params => request.globalRequest(`addonsapi/circle/index/my/deletePost`, 'POST', params, 2)

//攒局分类列表接口
api.circlegameTypeList = params => request.globalRequest(`addonsapi/circle/index/game/gameTypeList`, 'POST', params, 2)

//发布攒局
api.circlesaveGame = params => request.globalRequest(`addonsapi/circle/index/my/saveGame`, 'POST', params, 2)

//攒局列表
api.circlelist = params => request.globalRequest(`addonsapi/circle/index/game/list`, 'POST', params, 2)

//攒局详情
api.circleinfo = params => request.globalRequest(`addonsapi/circle/index/game/info`, 'POST', params, 2)

// 浏览记录
api.circleHistoryList = params => request.globalRequest(`addonsapi/circle/index/my/historyList`, 'POST', params, 2)
// api.circleinfo= params => request.globalRequest(`addonsapi/circle/index/game/info`, 'POST', params,2)

//攒局报名
api.circlejoinGame = params => request.globalRequest(`addonsapi/circle/index/my/joinGame`, 'POST', params, 2)

//我加入的局列表
api.circlegameList = params => request.globalRequest(`addonsapi/circle/index/my/gameList`, 'POST', params, 2)

//我加入的局列表
api.circlesaveComment = params => request.globalRequest(`addonsapi/circle/index/game/saveComment`, 'POST', params, 2)

//攒局评论列表
api.circlecommentList = params => request.globalRequest(`addonsapi/circle/index/game/commentList`, 'POST', params, 2)

//删除攒局
api.circledeleteGame = params => request.globalRequest(`addonsapi/circle/index/my/deleteGame`, 'POST', params, 2)

//攒局人数
api.circlejoinNum = params => request.globalRequest(`addonsapi/circle/index/game/joinNum`, 'GET', params, 2)

// 申请超话
api.circlesuperTopicApply = params => request.globalRequest(`addonsapi/circle/index/my/superTopicApply`, 'POST', params,
	2)

// 超话类型
api.circlesuperTopicTypeList = params => request.globalRequest(`addonsapi/circle/index/posts/superTopicTypeList`,
	'POST', params, 2)

// 超话列表
api.circlesuperTopicList = params => request.globalRequest(`addonsapi/circle/index/posts/superTopicList`, 'POST',
	params, 2)

// 超话详情
api.circlesuperTopicInfo = params => request.globalRequest(`addonsapi/circle/index/posts/superTopicInfo`, 'POST',
	params, 2)

// 删除攒局评论
api.circlegamedeleteComment = params => request.globalRequest(`addonsapi/circle/index/game/deleteComment`, 'POST',
	params, 2)

// 协议信息
api.circleConfigGetInfo = params => request.globalRequest(`addonsapi/circle/index/config/getInfo`, 'GET', params, 2)

// 我的动态列表
api.circleDtList = params => request.globalRequest(`addonsapi/circle/index/my/dtList`, 'POST', params, 2)

// 获取最热搜关键词
api.circleGetHotKeyword = params => request.globalRequest(`addonsapi/circle/index/Search/getHotKeyword`, 'POST', params,
	2)
// 获取圈子公告
api.getGgpz = params => request.globalRequest(`/client/home/getGgpz`, 'GET', params, 2)

export default api