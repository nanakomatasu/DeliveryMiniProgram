<template>
	<view :class="{popupScroll:popupScroll}">
		<view class="shopping">
			<!-- 头部 -->
			<view class="detail_scroll">
				<image :src="goodsInfoList.picture" mode="" class="good_img"></image>
				<view class="head_btn">
					<view class="collection">
						<view class="collection_pic" @click="isCollect">
							<image :src="collectUrl" class="wh44"></image>
						</view>
						<view class="collection_pic" @click='toChat'>
							<image src="/pagesOptimization/static/shopDetails/shop-icon01.png" class="wh44"></image>
						</view>
						<view class="collection_pic" @click='isShowHref'>
							<image src="/pagesOptimization/static/shopDetails/shop-icon05.png" class="wh44"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 价格 -->
			<view class="detail_contect">
				<view class="detail_title">{{goodsInfoList.name}}</view>
				<view class="detail_price">
					<view v-if="goodsInfoList.afterPrice">
						<text class="ico_price"><span>¥</span></text>
						<text class="ico_price_num"><span>{{goodsInfoList.afterPrice}}</span></text>
						<text class="before_price"><span>劵前¥{{goodsInfoList.price}}</span></text>
					</view>
					<view v-else>
						<text class="ico_price"><span>¥</span></text>
						<text class="ico_price_num"><span>{{goodsInfoList.price}}</span></text>
					</view>
					<view>
						<text class="SoldOut"><span>已拼{{goodsInfoList.sales_num}}件</span></text>
					</view>
				</view>
				<view class="discount">
					<view class="discount_text" v-for="(item,index) in goodsInfoList.redPacket" :key="index" v-show="index<3"
						@click="OnShowPacket">
						{{item.limit_amount}}减{{item.amount}}
					</view>
				</view>
				<view class="ShoppingCar">
          <view class="Car_text" @click="HomepageShow">
            {{Servicename}}
          </view>
					<view class="add-cart" @click="Addcar">
						加入购物车
					</view>
				</view>
			</view>
			<!-- 拼单 -->
			<view class="CrowDordering">
				<view class="Corw_title">
					<view class="Corw_text">
						这些人已拼，参与可立即拼成
					</view>
					<view class="all_CorwDordering" @click="AllDorderingList">
						<view class="all_CorwDordering_text">
							查看全部
						</view>
						<view class="all_CorwDordering_img">
							<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
						</view>
					</view>
				</view>
				<view class="Corw_persons" v-for="(item,index) in DorderingList" :key="index" v-show="index<3">
					<view class="person_infor">
						<image :src="item.portrait" class="person_img"></image>
						{{item.user_name}}
					</view>
					<view class="add_Corw" @click="OnShare(item)">
						去拼单
					</view>
				</view>
			</view>
			<!-- 商品评价 -->
			<view class="Customers CrowDordering">
				<view class="Corw_title">
					<view class="Corw_text">
						商品评价
					</view>
					<view class="all_CorwDordering" @click="toGoodEvaluation">
						<view class="all_CorwDordering_text">
							全部评价
						</view>
						<view class="all_CorwDordering_img">
							<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
						</view>
					</view>
				</view>
				<view class="Customers">
					<view class="Customers_nav">
						<view class="Customers_nav_title Customers_nav_color">
							全部
						</view>
						<view class="Customers_nav_title">
							最新
						</view>
						<view class="Customers_nav_title">
							好评
						</view>
						<view class="Customers_nav_title">
							差评
						</view>
					</view>
					<view class="all_information">
						<!-- 						<view class="Customers_person">
							<view class="Customers_person_infor">
								<view class="Customers_person_img">
									<image src="./static/shop-detail.png" class="person_img"></image>
								</view>
								<view class="Customers_person_name">
									<view class="Customers_person_nick">
										小李飞刀
									</view>
									<view class="Customers_person_rate">
										<u-rate :value="5" readonly size="24rpx" gutter="2"></u-rate>
										<text class="f-s-24">非常满意</text>
									</view>
								</view>
							</view>
							<view class="Customers_person_time">
								2022.12.24 19:00
							</view>
						</view>
						<view>
							<template>
								<view class="u-page">
									<view class="u-demo-block">
										<view class="u-demo-block__content">
											<view class="album">
												<view class="album__content">
													<u--text margin="0 0 16rpx 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水">
													</u--text>
													<u-album :urls="urls2" maxCount="4" rowCount="4"></u-album>
												</view>
											</view>
										</view>
									</view>
								</view>
							</template>
						</view> -->
						<!-- <null-data title="暂无评价" v-if="UserPacketList.length == 0"></null-data> -->
					</view>
					<view class="SeeAllCustomers" @click="toGoodEvaluation">
						<text class="SeeAllCustomers_text">
							查看全部评价
						</text>
						<view class="SeeAllCustomers_ico">
							<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<!-- 进入店铺 -->
			<view class="Customers CrowDordering">
				<view class="Customers">
					<view class="all_information">
						<view class="Customers_person">
							<view class="Customers_person_infor">
								<view class="Customers_person_img">
									<image :src="ShopInfo.logo" class="store_img"></image>
								</view>
								<view class="Customers_person_name">
									<view class="store_person_nick">
										{{ShopInfo.name}}
									</view>
								</view>
							</view>
							<view class="Customers_person_time all_CorwDordering" @click="toStoreHome">
								<view class="all_CorwDordering_text">
									进店逛逛
								</view>
								<view class="all_CorwDordering_img">
									<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
								</view>
							</view>
						</view>
						<view class="Customers_img_content">
							<view class="store_shopping_show" v-for="(item,index) in ShopGoods" :key="index" v-show="index<3">
								<image :src="item.picture" mode="" class="img_content">
								</image>
								<view class="store_shop_nick">{{item.goodsName}}</view>
								<view>
									<text class="store_ico_price"><span>¥{{item.price}}</span></text>
								</view>
								<view>
									<text class="store_SoldOut"><span>已拼{{item.sales_nums || 0}}件</span></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="shopDetail pictures">
				<template>
					<view class="content">
						<view class="uni-padding-wrap">
							<view class="uni-title uni-common-mt Corw_text">
								商品详情
							</view>
							<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
								<view class="" style="color: #202020; font-size: 28rpx;font-weight: 500;">
									{{goodsInfoList.detail}}
								</view>
								<view class="widthFix">
									<view class="" v-for="(item,index) in goodsInfoList.imgList" :key="index">
										<image :src="item" v-if="fileType(item) == 'image'" mode="widthFix">
										</image>
										<video :src="item" controls="true" v-if="fileType(item) == 'video'"
											style="width: 100%;"></video>
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
			<view class="nomore">
				<!-- <uni-load-more :status="status" /> -->
				<u-loadmore :status="status" />
				<u-gap height="60" bgColor="#f5f5f5"></u-gap>
			</view>
		</view>
		<!-- 底部拼单按钮 -->
		<view class="add_pay_btn">
			<view class="ShopCar">
				<view class="shopping_car">
					<view class="shopping_car_ico">
						<image src="/pagesOptimization/static/shopDetails/shopCar.png" mode="" class="ico_car"></image>
						<!-- 						<view class="shoptip">
							99
						</view> -->
					</view>
					<view class="" @click="toShopCar">
						购物车
					</view>
				</view>
				<view class="shopping_car" @click="toStoreHome">
					<view class="shopping_car_ico">
						<image src="/pagesOptimization/static/shopDetails/ico_shangjiafuwu@2x.png" mode="" class="ico_car"></image>
					</view>
					<view class="">
						店铺
					</view>
				</view>
			</view>
			<view class="ShopBtn ">
				<view class="ShopBtn_left" @click="OnlyPayOrder">
					<view class="ShopBtn_style">
						¥{{goodsInfoList.price}}
					</view>
					<view class="ShopBtn_style">
						单独购买
					</view>
				</view>
				<view class="ShopBtn_right" @click="PayShareOrder">
					<view class="ShopBtn_style">
						￥{{goodsInfoList.group_buy_price}}
					</view>
					<view class="ShopBtn_style">
						发起拼单
					</view>
				</view>
			</view>
		</view>
		<!-- 拼单弹出 -->
		<template>
			<u-popup :show="showShare" mode="bottom" @close="closeShowShare" @open="open" :round="10" bgColor="#f3f3f3"
				height="700" :closeable="true" zIndex="10077">
				<view class="Order_title">
					确认订单
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">

					<view style="padding: 20rpx;">
						<view class="">
							<template>
								<u-tabs :list="list1" @click="isSwitch"></u-tabs>
							</template>
							<!-- 默认收地址 -->
							<view class="" v-if="choosAdress == 1 ">
								<view class="Order_address" v-if="delivery.length == 0" @tap="addressList">
									<view class="Order_address_left">
										<image src="/pagesOptimization/static/shopDetails/ico_dingwei_cai@2x.png" mode="" class="add_ico"></image>
										<view class="add_address_text">
											添加地址
										</view>
									</view>
									<view class="">
										<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
									</view>
								</view>
								<view class="Order_address" v-else @click="selDelivery">
									<image src="/pagesOptimization/static/shopDetails/ico_dingwei_cai@2x.png" mode="" class="add_ico"></image>
									<view class="Order_address_left">
										<view class="">
											<view class="address_show_tel">
												<text style="margin-right: 20rpx;">{{address.member_name}}</text>
												<text>{{address.member_tel}}</text>
											</view>
											<view class="address_show_text">
												{{address.address}}
											</view>
										</view>
									</view>
									<view class="">
										<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
									</view>
								</view>
							</view>
							<!-- 自提点地址 -->
							<view class="" v-if="choosAdress == 2">
								<view class="Order_address" v-if="PickLocationList.length == 0">
									<view class=" Order_address_left">
										<image src="/pagesOptimization/static/shopDetails/ico_dingwei_cai@2x.png" mode="" class="add_ico">
										</image>
										<view class="add_address_text">
											暂无自提点
										</view>
									</view>
									<view class="">
										<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
									</view>
								</view>
								<view class="Order_address" @click="selfPick" v-else>
									<image src="/pagesOptimization/static/shopDetails/ico_dingwei_cai@2x.png" mode="" class="add_ico_zt"></image>
									<view class="Order_address_left">
										<view class="">
											<view class="address_show_tel">
												<text style="margin-right: 20rpx;">{{PickLocation.name}}</text>
												<!-- <text>{{address.member_tel}}</text> -->
											</view>
											<view class="address_show_text">
												{{PickLocation.address}}
											</view>
										</view>
									</view>
									<view class="">
										<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
									</view>
								</view>
								<view class="Order_detail_text"
									style="background: #fff;border-radius: 16rpx;padding: 24rpx; margin-bottom: 20rpx;">
									<view class="Order_text_style">
										收货人姓名
									</view>
									<input class="t-r f-26" v-model="selfpickname" name="remark" maxlength="11"
										placeholder="请填写收货人"></input>
								</view>
								<view class="Order_detail_text"
									style="background: #fff;border-radius: 16rpx;padding: 24rpx; margin-bottom: 20rpx;">
									<view class="Order_text_style">
										收货人电话
									</view>
									<input class="t-r f-26 " v-model="selfpicktel" name="remark" type="number"
										maxlength="11" placeholder="请填写联系电话"></input>
								</view>
							</view>
							<view class="Order_content_Show">
								<image :src="picture" mode="" class="Order_shopping_img"></image>
								<view class="Order_content_text">
									<view style="height: 148rpx;">
										<view class="Order_price">
											<text>
												<text class="Order_price_ico">￥</text>
												<text class="Order_price_text"
													v-if='buy_type == 1'>{{buyOneprice}}</text>
												<text class="Order_price_text"
													v-if="buy_type ==2">{{groupBuyprice}}</text>
											</text>
										</view>
										<view class="Order_choose">
											已选择：
											<text style="margin-right: 10rpx;">{{size_show}}</text>
											<text>{{attribute_show}}</text>
										</view>
									</view>
									<view class="Order_num">
										<view class="Order_num_contect">
											<view class="Order_num_del" @click="delNum">
												-
											</view>
											<view class="Order_num_total">
												{{ShopNums}}
											</view>
											<view class="Order_num_add" @click="addNum">
												+
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="Specification"
								style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;">
								<view class="Specification_title">
									{{goodSizes.size_name}}
								</view>
								<view class="Specification_contect">
									<view class="Specification_contect_item " v-for="(item,index) in SizeList" :key="index"
										:class="Size_styles === index?'Specification_contect_style':''"
										@click="OnChooseSize(index,item)">
										{{item.name}}
									</view>
								</view>
							</view>
							<view class="Specification"
								style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;"
								v-if='goodSizes.attribute_name && AttributeList.length >0'>
								<view class="Specification_title">
									{{goodSizes.attribute_name}}
								</view>
								<view class="Specification_contect">
									<view class="Specification_contect_item " v-for="(item,index) in AttributeList" :key="index"
										:class="Attribute_styles === index?'Specification_contect_style':''"
										@click="OnChooseAttribute(index,item)">
										{{item.name}}
									</view>
								</view>
							</view>
						</view>
						<view class="Order_detail">
							<view class="Order_detail_text">
								<view class="Order_text_style">
									快递邮费
								</view>
								<view class="" v-if="CountpostAge=='商品不支持配送'">
									{{CountpostAge}}
								</view>
								<view class="" v-else>
									￥{{CountpostAge}}
								</view>
							</view>
							<view class="Order_detail_text" v-if="choosAdress == 2 && PickLocationList.length>0 ">
								<view class="Order_text_style">
									自提点配送费
								</view>
								<view class="">
									¥{{PickLocation.commission}}
								</view>
							</view>
							<view class="Order_detail_text" @click="UsrePacketList">
								<view class="Order_text_style">
									使用优惠券
								</view>
								<view class="Order_detail_discount">
									<text class="discount_text" v-if="isDiscount&&UserRedPacket.status==1">
										-¥{{UserRedPacket.amount}}元</text>
									<image src="/pagesOptimization/static/shopDetails/ico_gengduo@2x.png" mode="" class="discount_ico"></image>
								</view>
							</view>
							<view class="Order_detail_text">
								<view class="Order_text_style">
									校U红包
								</view>
								<!-- 								<view class="Order_detail_discount">
									<text class="discount_text">店铺券-¥12元</text>
									<image src="./static/ico_gengduo@2x.png" mode="" class="discount_ico"></image>
								</view> -->
							</view>
							<view class="Order_detail_text">
								<view class="Order_text_style">
									备注
								</view>
							</view>
							<view class="Order_detail_text">
								<u-textarea v-model="remarkValue" placeholder="选填,给商家留言" autoHeight border='none'
									confirmType='done'>
								</u-textarea>
							</view>
						</view>
						<view>
							<view class="Order_price_total">
								<view class="price_left">
									<view class="">
										<text>合计：</text>
										<text>
											<text class="Order_price_ico">￥</text>
											<text class="Order_price_text" v-if="buy_type==1">{{totalPrice[1]}}</text>
											<text class="Order_price_text"
												v-if="buy_type==2">{{totalGroupPrice[1]}}</text>
										</text>
									</view>
									<view v-if="isDiscount&&UserRedPacket.status==1">
										<text class="discount_coupon">优惠券{{UserRedPacket.amount}}</text>
										<text class="discount_coupon">共减¥{{UserRedPacket.amount}}元</text>
									</view>
								</view>
								<view class="price_right" v-if="CountpostAge == '商品不支持配送'">
									不可提交
								</view>
								<view class="price_right" @click="SubmitGroupOrder" v-else>
									提交订单
								</view>

							</view>
						</view>
					</view>
					<u-gap height="60" bgColor="#f5f5f5"></u-gap>
				</scroll-view>
				<u-gap height="60" bgColor="#f5f5f5"></u-gap>
			</u-popup>
		</template>
		<!-- 商店红包列表 -->
		<template>
			<view>
				<u-popup :show="showPacket" @close="closePacket" @open="open" mode="bottom" height="700"
					:closeable="true" :overlay="false">
					<view>
						<view class="Order_title">
							优惠明细
						</view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<view style="padding: 20rpx;">
								<view class="" style="color: #ef5248; font-size: 28rpx;font-weight: 600">
									店铺优惠券
								</view>
								<view class="packetList" v-for="(item, index) in goodsInfoList.redPacket" :key="index">
									<view class="packets_detail">
										<view style="display: flex;justify-content:flex-start;align-items: baseline;">
											<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;">
												￥
											</view>
											<view style="font-size: 48rpx;font-weight: 700;color: #ef5248;">
												{{item.amount}}
											</view>
										</view>
										<view style="margin-left: 40rpx;">
											<view style="font-size: 28rpx;font-weight: 500;color: #ef5248;">
												满{{item.limit_amount}}减{{item.amount}}元
											</view>
										</view>
									</view>
									<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;"
										@click="receiveCoupon(item)">
										立即领取
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</template>
		<!-- 加入购物车弹窗 -->
		<template>
			<u-popup :show="showAddcar" mode="bottom" @close="closeAddcar" :round="10" bgColor="#f3f3f3" height="700"
				:closeable="true">
				<view class="Order_title">
					添加购物车
				</view>
				<view style="padding: 20rpx;">
					<view class="Order_content_Show">
						<image :src="picture" mode="" class="Order_shopping_img"></image>
						<view class="Order_content_text">
							<view style="height: 148rpx;">
								<view class="Order_price">
									<text>
										<text class="Order_price_ico">￥</text>
										<text class="Order_price_text">{{buyOneprice}}</text>
									</text>
								</view>
								<view class="Order_choose">
									已选择：
									<text style="margin-right: 10rpx;">{{size_show}}</text>
									<text>{{attribute_show}}</text>
								</view>
							</view>
							<view class="Order_num">
								<view class="Order_num_contect">
									<view class="Order_num_del" @click="delNum">
										-
									</view>
									<view class="Order_num_total">
										{{ShopNums}}
									</view>
									<view class="Order_num_add" @click="addNum">
										+
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="Specification"
						style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;">
						<view class="Specification_title">
							{{goodSizes.size_name}}
						</view>
						<view class="Specification_contect">
							<view class="Specification_contect_item " v-for="(item,index) in SizeList" :key="index"
								:class="Size_styles === index?'Specification_contect_style':''"
								@click="OnChooseSize(index,item)">
								{{item.name}}
							</view>
						</view>
					</view>
					<view class="Specification"
						style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;"
						v-if='goodSizes.attribute_name && AttributeList.length >0'>
						<view class="Specification_title">
							{{goodSizes.attribute_name}}
						</view>
						<view class="Specification_contect" v-if='goodSizes.attribute_name'>
							<view class="Specification_contect_item " v-for="(item,index) in AttributeList" :key="index"
								:class="Attribute_styles === index?'Specification_contect_style':''"
								@click="OnChooseAttribute(index,item)">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<u-gap height="60" bgColor="#f5f5f5"></u-gap>
				<view class="goods-carts">
					<view class="goods-carts-btn" @click="buttonClick">
						确认
					</view>
				</view>
			</u-popup>
		</template>
		<!-- 弹出全部拼单列表 -->
		<template>
			<u-popup :show="showShareList" mode="bottom" @close="closeShowList" @open="open" :round="10"
				bgColor="#f3f3f3" height="700" :closeable="true">

				<!-- <u-gap height="60" bgColor="#f5f5f5"></u-gap> -->
				<scroll-view scroll-y="true" class="scroll-Y">
					<view style="padding: 20rpx;">
						<view class="Order_title">
							全部拼单
						</view>
						<view class="Corw_persons" v-for="(item,index) in DorderingList" :key="index">
							<view class="person_infor">
								<image :src="item.portrait" class="person_img"></image>
								{{item.user_name}}
							</view>
							<view class="add_Corw" @click="OnShare(item)">
								去拼单
							</view>
						</view>
					</view>
				</scroll-view>
			</u-popup>
		</template>
		<!-- 用户已领取红包列表 -->
		<template>
			<view>
				<u-popup :show="UsreInfopacket" @close="closeUserpacket" @open="open" mode="bottom" height="600"
					:closeable="true" z-index="10099">
					<view>
						<view class="Order_title">
							已领取店铺优惠券
						</view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<view style="padding: 20rpx;">
								<view class="" style="color: #ef5248; font-size: 28rpx;font-weight: 600">
									店铺优惠券
								</view>
								<view class="packetList" v-for="(item,index) in UserPacketList" :key="index"
									v-if="UserPacketList.length>0">
									<view class="packets_detail">
										<view style="display: flex;justify-content:flex-start;align-items: baseline;">
											<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;">
												￥
											</view>
											<view style="font-size: 48rpx;font-weight: 700;color: #ef5248;">
												{{item.amount}}
											</view>
										</view>
										<view style="margin-left: 40rpx;">
											<view style="font-size: 28rpx;font-weight: 500;color: #ef5248;">
												满{{item.limit_amount}}减{{item.amount}}元
											</view>
										</view>
									</view>
									<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;"
										@click="UseRedPacket(item)" v-if='item.status == 1'>
										使用
									</view>
									<view style="font-size: 28rpx;font-weight: 700;color: #222222; margin-left: 10rpx;"
										@click="delUseRedPacket(item)" v-if='item.status == 1'>
										取消
									</view>
									<view style="font-size: 28rpx;font-weight: 700;color: #6f6b6b;"
										v-if='item.status == 2'>
										已使用
									</view>
									<view style="font-size: 28rpx;font-weight: 700;color: #6f6b6b;"
										v-if='item.status == 3'>
										已过期
									</view>
								</view>
								<null-data title="暂无已领取店铺红包" v-if="UserPacketList.length == 0"></null-data>
							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</template>
		<!-- 默认选择地址列表-->
		<template>
			<view :catchtouchmove="true">
				<u-popup :show="showDelivery" bgColor="#F7F7F7" round="32rpx" :closeable="true"
					@close="showDelivery=false" zIndex="10099">
					<view class="win-delivery" v-if="address">
						<view class="f-32 f-b t-c w-100 mb40">选择收货地址</view>
						<scroll-view class="scroll" scroll-y="true">
							<radio-group @change="selAddressChange">
								<label class="dis-flex  pt24 pb24 pl24 pr24 flex-y-center radio-16 bg-white-ff mb20"
									v-for="(item,index) in delivery" :key="index">
									<radio class="mr15" color="#E73E46" :value="String(index)"
										:checked="address.id==item.id">
									</radio>
									<view class="w-80 mr35">
										<view class="f-28 f-b mb14">
											<text class="mr8">{{item.member_name}}</text>
											<text>{{item.member_tel}}</text>
										</view>
										<view class="twolist-hidden f-24">{{item.address+item.details}}</view>
									</view>
									<view class="w-15 dis-flex flex-x-end" @tap.stop="editAddress(item)">
										<u-icon name="arrow-right" size="28rpx"></u-icon>
									</view>

								</label>
							</radio-group>
						</scroll-view>
						<view class="radio-16 add-delivery w-100 t-c col-red-d9 f-28 bg-white-ff" @tap="addressList">+
							新增收货地址</view>
					</view>
				</u-popup>
			</view>
		</template>
		<!-- 自提点选择地址列表 -->
		<template>
			<view :catchtouchmove="true">
				<u-popup :show="showSelfPick" bgColor="#F7F7F7" round="32rpx" :closeable="true"
					@close="showSelfPick=false" zIndex="10099">
					<view class="win-delivery" v-if="PickLocation">
						<view class="f-32 f-b t-c w-100 mb40">选择自提点地址</view>
						<scroll-view class="scroll" scroll-y="true">
							<radio-group @change="selPickLocationChange">
								<label class="dis-flex  pt24 pb24 pl24 pr24 flex-y-center radio-16 bg-white-ff mb20"
									v-for="(item,index) in PickLocationList" :key="index">
									<radio class="mr15" color="#E73E46" :value="String(index)"
										:checked="PickLocation.id==item.id">
									</radio>
									<view class="w-80 mr35">
										<view class="f-28 f-b mb14">
											<text class="mr8">{{item.name}}</text>
											<!-- <text>{{item.member_tel}}</text> -->
										</view>
										<view class="twolist-hidden f-24">{{item.address}}</view>
									</view>
								</label>
							</radio-group>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</template>
		<!-- 店铺介绍 -->
		<template>
			<u-popup :show="Homepage" mode="bottom" @close="Homepage = false"  :round="10" bgColor="#ffffff"
				height="700" :closeable="true">
				<view class="store_introduce_body">
					<view style="margin-bottom: 20rpx">
						<view style="font-size: 28rpx;font-weight: 700;color: #333333;">
							服务保障
						</view>
						<view v-for="(item, index) in ShopServices" :key="index">
							<view style="font-size: 28rpx;color:#333333;margin-top: 28rpx;">
								• {{item.name}}
							</view>
							<view style="font-size: 24rpx;color: #888888;margin-top: 12rpx;margin-left: 20rpx;">
								{{item.desc}}
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</template>
		<!-- 商品分享 -->
		<shareWin :shopShow="shareShow" @cancel="cancelShare" :shareContent="shareContent"></shareWin>

		<!-- 提示信息 -->
		<template>
			<u-notify ref="iSshowPay" :show="iSshowPay"></u-notify>
		</template>
	</view>
</template>
<script>
	import {
		data
	} from 'uview-ui/libs/mixin/mixin'
	export default {
		data() {
			return {
				userId: uni.getStorageSync('userInfo').id, //用户ID
				share_school_id: '', //分享校区ID
				share_user_id: '', //分享用户Id
				goods_id: 2, //商品Id
				shop_id: '', //店铺id
				delivery: [], //地址列表 
				showShare: false, //提交订单
				address: '', //当前收货地址
				addressName: '', //当前收货地址省份
				regionsList: [], //邮费列表
				postageAddress: '', //当前地址邮费判断
				postAge: '0', //默认邮费
				remarkValue: '', //拼单备注
				choosAdress: 1, //默认地址为1，自提点为2
				list1: [{
					name: '默认地址',
				}, {
					name: '自提点地址',
				}],
				UserPacketList: [], //用户领取红包列表
				UserRedPacket: '', //用户使用的红包
				amount: '0', //用户使用红包金额
				limit_amount: '', //用户能使用红包条件
				objSizeStyle: '', //规格
				objAttributeStyle: '', //属性
				ArrStyles: [], //规格/属性数组
				ShopInfo: '', //店铺信息
				ShopServices: [], //店铺信息认证
				ShopGoods: [], //店铺商品信息
				showAddcar: false, //加入购物车
				showShareList: false, //全部拼单列表
				showPacket: false, //店铺红包列表
				UsreInfopacket: false, //用户当前店铺已领取红包列表
				popupScroll: false,
				iscollect: '', //是否收藏
				showDelivery: false, //是否显示地址选择
				buy_type: 1, //购买方式 1 单独购买 2 拼团
				attributePrice: '', //规格单独购买
				attribute_groop_Price: '', //拼团规格购买
				sizePrice: '', //属性单独购买
				size_group_Price: '', //拼团属性购买
				PickLocationList: [], //自提点列表
				PickLocation: '', //自提点当前地址
				PickLocationName: '', //自提点地址邮费判断
				selfpickname: '', //自提收货人姓名
				selfpicktel: '', //自提收货人电话
				commissionPrice: '0', //自提点配送费
				showSelfPick: false, //是否显示自提点选择
				isDiscount: false, //是否能使用红包
				collectUrl: require('../../static/shopDetails/start.png'),
				value: '',
				badge: {
					number: 100,
					absolute: true,
					offset: [-7, -7]
				},
				border: true,

				status: 'nomore',
				urls2: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				],
				ShopNums: 1, // 商品数量
				Attribute_styles: '',
				attribute_show: '',
				attributeId: '',
				AttributeList: [],
				Size_styles: '',
				size_show: '',
				sizeId: '',
				SizeList: [],
				options: [],
				goodsInfoList: '',
				goodSizes: '',
				shareContent: {}, //分享内容
				shareShow: false, //分享弹窗
				locationUrl: '',
				iSshowPay: false, //提示信息
				buyOneprice: 0, //单独购买商品价
				groupBuyprice: 0, //组团购买商品价
				picture: '', //弹窗商品图
				DorderingList: [], //拼单列表
				p_order_id: '', //拼团Id
				Servicename: '', //店铺认证
				Homepage:false,
			}
		},
		onLoad(item) {
			console.log(item);
			if (item.school_id) {
				this.share_school_id = item.school_id //分享用户校区ID
			}
			if (item.userId) {
				this.share_user_id = item.userId //分享用户ID
			}
			this.goods_id = item.goods_id
			this.getIsCollect()
			this.getAddressListData()
			this.getShopaddList()
		},
		onShow() {
			this.getGoodsInfo() // 商品详情
			this.getlistShoppingCart() // 购物车列表
			this.getDorderingList() //拼单列表

		},
		watch: {
			//默认地址改变
			address: {
				handler(newName, oldName) {
					console.log(newName, 'bbb_____');
					if (newName) {
						this.addressName = newName.address.slice(0, 2)

					}
				},
				immediate: true
			},
			//自提点地址改变
			PickLocation: {
				handler(newName, oldName) {
					if (newName) {
						this.PickLocationName = newName.address.slice(0, 2)

					}
				},
				immediate: true
			},
		},
		computed: {
			//单独总价
			totalPrice() {
				let totalPrice = 0
				let beforePacketPrice = 0
				let attributePrice = this.attributePrice * 1
				let sizePrice = this.sizePrice * 1
				let commissionPrice = this.commissionPrice * 1 //自提点费用
				let postAge = this.postAge * 1 //快递邮费
				beforePacketPrice += (attributePrice + sizePrice) * this.ShopNums //商品价格
				this.buyOneprice = beforePacketPrice.toFixed(2)
				if (this.UserPacketList.length > 0 && this.UserRedPacket.status == 1) {
					let UserRedPacket = this.UserRedPacket.amount //红包大小
					let UserRedPacketPrice = this.UserRedPacket.limit_amount * 1 //能使用红包条件
					if (beforePacketPrice >= UserRedPacketPrice) { //判断是否能够使用店铺红包
						this.isDiscount = true
						totalPrice += beforePacketPrice - UserRedPacket + commissionPrice + postAge
					} else {
						this.isDiscount = false
						totalPrice += beforePacketPrice + commissionPrice + postAge
					}
				} else {
					this.isDiscount = false
					totalPrice += beforePacketPrice + commissionPrice + postAge
				}


				return [beforePacketPrice.toFixed(2), totalPrice.toFixed(2)]
			},
			//单独购买券后价
			Afterprice() {
				let Afterprice = 0
				let beforePacketPrice = 0
				let attributePrice = this.attributePrice * 1
				let sizePrice = this.sizePrice * 1
				let commissionPrice = this.commissionPrice * 1 //自提点费用
				let postAge = this.postAge * 1 //快递邮费
				beforePacketPrice += (attributePrice + sizePrice) * this.ShopNums //商品价格
				this.buyOneprice = beforePacketPrice.toFixed(2)
				if (this.UserPacketList.length > 0 && this.UserRedPacket.status == 1) {
					let UserRedPacket = this.UserRedPacket.amount //红包大小
					let UserRedPacketPrice = this.UserRedPacket.limit_amount * 1 //能使用红包条件
					if (beforePacketPrice >= UserRedPacketPrice) { //判断是否能够使用店铺红包
						this.isDiscount = true
						Afterprice += beforePacketPrice - UserRedPacket + commissionPrice + postAge
					} else {
						this.isDiscount = false
						Afterprice += beforePacketPrice + commissionPrice + postAge
					}
				} else {
					Afterprice += beforePacketPrice + commissionPrice + postAge
				}
				return Afterprice.toFixed(2)
			},

			//拼单总价
			totalGroupPrice() {
				let totalGroupPrice = 0
				let before_group_PacketPrice = 0 //使用红包前价格
				let attribute_groop_Price = this.attribute_groop_Price * 1
				let size_group_Price = this.size_group_Price * 1
				let commissionPrice = this.commissionPrice * 1 //自提点费用
				let postAge = this.postAge * 1 //快递邮费

				before_group_PacketPrice += (attribute_groop_Price + size_group_Price) * this.ShopNums //拼单商品价格
				this.groupBuyprice = before_group_PacketPrice.toFixed(2)
				if (this.UserPacketList.length > 0 && this.UserRedPacket.status == 1) {
					let UserRedPacket = this.UserRedPacket.amount //红包大小
					let UserRedPacketPrice = this.UserRedPacket.limit_amount * 1 //能使用红包条件
					if (before_group_PacketPrice >= UserRedPacketPrice) { //判断是否能够使用店铺红包
						this.isDiscount = true
						totalGroupPrice += before_group_PacketPrice - UserRedPacket + commissionPrice + postAge
					} else {
						this.isDiscount = false
						totalGroupPrice += before_group_PacketPrice + commissionPrice + postAge
					}
				} else {
					totalGroupPrice += before_group_PacketPrice + commissionPrice + postAge
				}
				return [before_group_PacketPrice.toFixed(2), totalGroupPrice.toFixed(2)]
			},
			//拼单购买券后价
			GroupBuyprice() {
				let GroupPrice = 0
				let before_group_PacketPrice = 0 //使用红包前价格
				let attribute_groop_Price = this.attribute_groop_Price * 1
				let size_group_Price = this.size_group_Price * 1
				let commissionPrice = this.commissionPrice * 1 //自提点费用
				let postAge = this.postAge * 1 //快递邮费

				before_group_PacketPrice += (attribute_groop_Price + size_group_Price) * this.ShopNums //商品价格

				if (this.UserPacketList.length > 0 && this.UserRedPacket.status == 1) {
					let UserRedPacket = this.UserRedPacket.amount //红包大小
					let UserRedPacketPrice = this.UserRedPacket.limit_amount * 1 //能使用红包条件
					if (before_group_PacketPrice >= UserRedPacketPrice) { //判断是否能够使用店铺红包
						this.isDiscount = true
						GroupPrice += before_group_PacketPrice - UserRedPacket + commissionPrice + postAge
					} else {
						this.isDiscount = false
						GroupPrice += before_group_PacketPrice + commissionPrice + postAge
					}
				} else {
					GroupPrice += before_group_PacketPrice + commissionPrice + postAge
				}
				return GroupPrice.toFixed(2)
			},

			CountpostAge() {
				// return 11
				if (this.choosAdress == 1) { //默认地址
					let result = 0
					try {
            if (!this.goodsInfoList) return
						const findRes = this.goodsInfoList.regions.find(item => {
							return item.region.slice(0, 2) == this.addressName
						})
						if (findRes) {
							if (findRes.shipping_method == 1) {
								result += 0
								this.postAge = result
							} else if (findRes.shipping_method == 2) {
								result += Number(findRes.postage)
								this.postAge = result
							} else {
								result = '商品不支持配送'
								this.postAge = '0'
								throw Error()
							}
						} else {
							result = '商品不支持配送'
							this.postAge = '0'
							throw Error()

						}
					} catch (e) {
						console.log(e);
					}
					return result

				} else { //自提点
					let result = 0
					try {
						const findRes = this.goodsInfoList.regions.find(item => {
							return item.region.slice(0, 2) == this.PickLocationName
						})
						if (findRes) {
							if (findRes.shipping_method == 1) {
								result += 0
								this.postAge = result
							} else if (findRes.shipping_method == 2) {
								result += Number(findRes.postage)
								this.postAge = result
							} else {
								result = '商品不支持配送'
								this.postAge = '0'
								throw Error()
							}
						} else {
							result = '商品不支持配送'
							this.postAge = '0'
							throw Error()

						}
					} catch (e) {
						console.log(e);
					}
					return result
				}

			},
		},
		methods: {
			//获取收货列表
			async getAddressListData() {
				uni.showLoading({
					title: "正在加载中"
				})
				const {
					data,
					status
				} = await this.$api.getAddressList({
					limit: 1000,
					page: 1,
					// school_id: uni.getStorageSync('school').id
				})
				uni.hideLoading()
				if (status == 200) {
					this.delivery = data.data
					this.address = this.delivery[0]
				}
			},
			//选择收货地址--默认--自选
			isSwitch(item) {
				this.choosAdress = item.index + 1
				console.log(this.choosAdress)
				if (this.choosAdress == 1) {
					this.commissionPrice = "0"
					// console.log(typeof(this.commissionPrice), 'aaaa+');
				} else {
					if (this.PickLocationList.length > 0) {
						this.commissionPrice = this.PickLocation.commission
					} else {
						this.commissionPrice = "0"
					}

				}
			},

			//自提点列表
			getShopaddList() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id,
				}
				this.$http.post('/api/user/listPickLocation', data)
					.then(res => {
						if (res.code == 200) {
							this.PickLocationList = res.data.list
							this.PickLocation = this.PickLocationList[0]
						}
					})
			},
			// 商品详情
			async getGoodsInfo() {
				const data = {
					goods_id: this.goods_id,
				}
				await this.$http.post('/api/shop/getGoodsInfo', data)
					.then(res => {
						if (res.code == 200) {
							this.goodsInfoList = res.data
							this.shop_id = res.data.shop_id
							this.regionsList = res.data.regions

							this.getShopInfo() //获取店铺信息

							//商品分享
							this.locationUrl = window?.location.href;
							this.locationUrl = this.locationUrl + '&userId=' + uni.getStorageSync('userInfo')
								.id +
								'&school_id=' + uni.getStorageSync('school').id
							this.shareContent.title = data.name;
							this.shareContent.summary = '校园美食，来自校U'
							this.shareContent.imageUrl = data.img;
							this.shareContent.href = this.locationUrl;
							this.locationUrl = this.$mp.page.route;
						}
					})
			},
			// 获取商品属性列表
			getSize() {
				const data = {
					goods_id: this.goods_id,
				}
				this.$http.post('/api/shop/getSize', data)
					.then(res => {
						if (res.code == 200) {
							this.goodSizes = res.data

							this.SizeList = res.data.size
							console.log(this.SizeList, 'this.SizeList');
							this.size_show = this.SizeList[0].name
							this.sizePrice = this.SizeList[0].price //单独购买
							this.size_group_Price = this.SizeList[0].group_buy_price //拼团购买
							this.sizeId = this.SizeList[0].id //加入购物车属性
							this.Size_styles = 0
							let objSize = {
								id: this.SizeList[0].id,
								name: this.SizeList[0].name,
								url: this.SizeList[0].url,
								type: this.SizeList[0].type
							}
							this.objSizeStyle = objSize

							if (res.data.attribute_name && res.data.size[0].attr.length > 0) {
								// this.AttributeList = res.data.attribute.list
								this.AttributeList = res.data.size[0].attr
								this.attribute_show = this.AttributeList[0].name
								this.attributePrice = this.AttributeList[0].price //单独购买
								this.attribute_groop_Price = this.AttributeList[0].group_buy_price //拼团购买

								this.attributeId = this.AttributeList[0].id //加入购物车规格
								this.Attribute_styles = 0

								let objAttribute = {
									id: this.AttributeList[0].id,
									name: this.AttributeList[0].name,
									url: this.AttributeList[0].url,
									type: this.AttributeList[0].type
								}
								this.objAttributeStyle = objAttribute
							}



						}
					})
			},
			// 购物车列表
			getlistShoppingCart() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					goods_id: this.goods_id

				}
				this.$http.post('/api/user/listShoppingCart', data)
			},
			//获取用户领取店铺红包列表
			gethasRedPackets() {
				const data = {
					userId: this.userId,
					shop_id: this.shop_id
				}
				this.$http.post('/api/user/hasRedPackets', data)
					.then(res => {
						if (res.code == 200) {
							console.log(res.data);
							this.UserPacketList = res.data.list
							this.UserRedPacket = res.data.list[0]
						}
					})
			},
			// 是否收藏商品
			getIsCollect() {
				const data = {
					userId: this.userId,
					goods_id: this.goods_id
				}
				this.$http.post('/api/user/isCollect', data)
					.then(res => {
						if (res.code == 200) {
							this.iscollect = res.data.result
							if (this.iscollect) {
								this.collectUrl = require('../../static/shopDetails/icoyishoucangx.png')
							} else {
								this.collectUrl = require('../../static/shopDetails/start.png')
							}
						}
					})
			},
			// 商品收藏
			isCollect() {
				this.iscollect = !this.iscollect
				if (this.iscollect) {
					this.collectUrl = require('../../static/shopDetails/icoyishoucangx.png')
				} else {
					this.collectUrl = require('../../static/shopDetails/start.png')
				}
				const data = {
					userId: this.userId,
					goods_id: this.goods_id
				}
				this.$http.post('/api/user/collectGoods', data)
					.then(res => {
						if (res.code == 200) {

						} else {
							this.iSshowPay = true
							this.$refs.iSshowPay.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							this.collectUrl = require('../../static/shopDetails/start.png')
						}
					})
			},

			//店铺标签介绍
			HomepageShow() {
				this.Homepage = true
			},
			//前往聊天
			toChat() {
				let passUser = {
					uuid: 'merchant_send' + this.shop_id,
					name: this.ShopInfo.name,
					avatar: this.ShopInfo.logo,
					shop_id: this.shop_id
				}
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/chat/chat?toUser=' +
						encodeURIComponent(JSON.stringify(passUser))
				})
			},

			//分享商品
			isShowHref() {
				this.shareShow = true
			},

			cancelShare() {
				this.shareShow = false
			},
			// 展示商店红包列表
			OnShowPacket() {
				this.showPacket = true
			},
			//关闭商店红包列表
			closePacket() {
				this.showPacket = false
				this.popupScroll = false
			},
			// 领取店铺红包
			receiveCoupon(item) {
				const data = {
					userId: this.userId,
					red_packet_id: item.id
				}
				this.$http.post("/api/user/receiveRedPacket", data)
					.then(res => {
						if (res.code == 200) {
							uni.showModal({
								title: '提示',
								content: res.data,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else {
							uni.showModal({
								title: '提示',
								content: res.message,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					})
			},
			// 数量加减
			delNum() {
				if (this.ShopNums > 1) {
					this.ShopNums--
				}
			},
			addNum() {
				this.ShopNums++
			},
			// 加入购物车
			Addcar() {
				// 上架状态 1 上架  2 下架 3 售完 4 平台下架
				if (this.goodsInfoList.status == 1) {
					this.size_show = ''
					this.attribute_show = ''
					this.Size_styles = null
					this.Attribute_styles = null
					this.ShopNums = 1
					this.getSize()
					this.picture = this.goodsInfoList.picture
					this.showAddcar = true
				}
				if (this.goodsInfoList.status == 2 || this.goodsInfoList.status == 4) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已下架',
						safeAreaInsetTop: true
					})
					return
				}
				if (this.goodsInfoList.status == 3) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已售完',
						safeAreaInsetTop: true
					})
					return
				}


			},
			// 关闭购物车弹窗
			closeAddcar() {
				this.showAddcar = false
				this.popupScroll = false
			},
			//选择商品版本
			OnChooseSize(index, item) {
				this.Size_styles = index
				this.size_show = item.name
				this.sizePrice = item.price //单独购买
				this.size_group_Price = item.group_buy_price ////拼团购买

				//切换将之前选择的属性重置
				this.AttributeList = this.SizeList[index].attr
				this.Attribute_styles = ''
				this.attribute_show = ''
				this.attributePrice = '' //单独购买
				this.attribute_groop_Price = '' //拼团购买
				this.attributeId = ''
				this.objSizeStyle = '';

				if (item.url) {
					this.picture = item.url //选择商品图片
				}
				console.log(this.picture, 'this.picture');

				this.sizeId = item.id
				let objSize = {
					id: item.id,
					name: item.name,
					url: item.url,
					type: item.type
				}
				this.objSizeStyle = objSize
			},
			//选择商品属性
			OnChooseAttribute(index, item) {
				this.Attribute_styles = index
				this.attribute_show = item.name
				this.attributePrice = item.price //单独购买
				this.attribute_groop_Price = item.group_buy_price //拼团购买
				this.attributeId = item.id

				if (item.url) {
					this.picture = item.url //选择商品图片
				}

				let objAttribute = {
					id: item.id,
					name: item.name,
					url: item.url,
					type: item.type
				}
				this.objAttributeStyle = objAttribute
			},
			// 确定添加购物车按钮
			buttonClick() {
				if (!this.size_show) {
					uni.showToast({
						title: '请选择商品规格',
						//将值设置为 success 或者直接不用写icon这个参数
						icon: 'none',
						//显示持续时间为 2秒
						duration: 2000
					})
					return
				}
				if (this.goodSizes.attribute_name && this.AttributeList.length > 0) {
					if (!this.attribute_show) {
						uni.showToast({
							title: '请选择商品属性',
							//将值设置为 success 或者直接不用写icon这个参数
							icon: 'none',
							//显示持续时间为 2秒
							duration: 2000
						})
						return
					}
				}
				let arr = []
				if (this.attributeId) {
					arr.push(this.attributeId)
				}

				if (this.sizeId) {
					arr.push(this.sizeId)
				}
				console.log(arr, 'arr');
				const data = {
					userId: this.userId,
					goods_id: this.goods_id,
					num: this.ShopNums,
					styles: JSON.stringify(arr)
				}

				this.$http.post('/api/user/addToShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							this.showAddcar = false
							uni.showToast({
								title: '添加成功',
								//将值设置为 success 或者直接不用写icon这个参数
								icon: 'none',
								//显示持续时间为 2秒
								duration: 2000
							})
						}
					})
			},
			// 获取拼单列表
			getDorderingList() {
				const data = {
					goods_id: this.goods_id,
				}
				this.$http.post('/api/shop/listGroupOrder', data)
					.then(res => {
						if (res.code == 200) {
							this.DorderingList = res.data.list
						}
					})
			},
			// 查看全部拼单列表
			AllDorderingList() {
				this.showShareList = true

			},
			//关闭全部拼单列表
			closeShowList() {
				this.showShareList = false
				this.popupScroll = false
			},
			//去拼单
			OnShare(item) {
				if (this.goodsInfoList.status == 1) {
					this.p_order_id = item.id
					this.size_show = ''
					this.attribute_show = ''
					this.Size_styles = ''
					this.Attribute_styles = ''
					this.ShopNums = 1
					this.objSizeStyle = ''
					this.objAttributeStyle = ''
					this.ArrStyles = []
					this.buy_type = 2
					this.choosAdress = 1
					this.picture = this.goodsInfoList.picture
					this.getSize()
					this.gethasRedPackets()
					this.showShare = true
				}

				if (this.goodsInfoList.status == 3) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已售完',
						safeAreaInsetTop: true
					})
					return
				}

				if (this.goodsInfoList.status == 2 || this.goodsInfoList.status == 4) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已下架',
						safeAreaInsetTop: true
					})
					return
				}
			},
			// 关闭拼单弹窗
			closeShowShare() {
				this.showShare = false
				this.popupScroll = false
			},
			//跳转添加地址页面
			addressList() {
				uni.navigateTo({
					url: '/pagesUser/page/addAddress/addAddress'
				})
			},
			//选择默认地址
			selDelivery() {
				this.showDelivery = true
			},
			//更改选中的收货地址
			selAddressChange(e) {
				var index = e.detail.value
				this.address = this.delivery[index]
				// this.changeAddress()
			},
			//跳转修改地址
			editAddress(item) {
				uni.navigateTo({
					url: '/pagesUser/page/addAddress/addAddress?id=' + item.id + '&length=' + this.delivery
						.length
				})
			},
			//选择自提点
			selfPick() {
				this.showSelfPick = true
			},
			//更改选中的自提点地址
			selPickLocationChange(e) {
				var index = e.detail.value
				this.PickLocation = this.PickLocationList[index]
				// this.changeAddress()
			},
			// 用户领取商店红包列表
			UsrePacketList() {
				this.UsreInfopacket = true
			},
			// 关闭用户领取商店红包列表
			closeUserpacket() {
				this.UsreInfopacket = false
			},
			//提交订单
			SubmitGroupOrder() {
				this.ArrStyles = []

				this.ArrStyles.push(this.objSizeStyle)

				if (this.objAttributeStyle) { //判断属性是否存在
					this.ArrStyles.push(this.objAttributeStyle)
				}

				console.log(JSON.stringify(this.ArrStyles), '22222222222222');
				const data = {
					userId: this.userId,
					p_order_id: this.p_order_id, //拼团订单id
					p_user_id: this.share_user_id, //分享人用户id
					p_school_id: this.share_school_id, //分享人校区id
					school_id: uni.getStorageSync('school').id, //校区id
					goods_id: this.goods_id, //商品id
					num: this.ShopNums, //数量
					styles: JSON.stringify(this.ArrStyles), //规格属性数组 this.ArrStyles
					buy_type: this.buy_type, //购买方式 1 单独购买 2 拼团
					remark: this.remarkValue, //备注
				}
				//是否使用红包
				if (this.isDiscount) {
					data.user_red_packet_id = this.UserRedPacket.id
				} else {
					data.user_red_packet_id = ''
				}
				if (this.choosAdress == 1) {
					data.address_id = this.address.id //默认收货地址IDss
					data.name = this.address.member_name //姓名
					data.phone = this.address.member_tel // 电话

				} else {
					data.pick_up_location_id = this.PickLocation.id //自提点id
					data.name = this.selfpickname //自提点 姓名

					if (!this.selfpickname) {
						uni.showToast({
							icon: 'none',
							title: '请填写收货人'
						})
						// this.selfpicktel = '';
						return false;
					}
					let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/; //手机号校验
					if (!reg.test(this.selfpicktel)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的11位手机号'
						})
						// this.selfpicktel = '';
						return false;
					}

					data.phone = this.selfpicktel //自提点 电话
				}
				if (this.buy_type == 1) {
					data.should_pay_amount = this.totalPrice[1] //单独购买应付金额
				} else {
					data.should_pay_amount = this.totalGroupPrice[1] //拼团应付金额
				}
				this.$http.post('/api/user/submitOrder', data)
					.then(res => {
						if (res.code == 200) {
							this.showShare = false
							this.popupScroll = false
							this.pay_no = res.data.pay_no
							uni.navigateTo({
								url: `/pagesOptimization/pages/PayOrder/PayOrder?type=1&&pay_no=${this.pay_no}`
							})
						} else {
							this.$refs.iSshowPay.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
						}
					})

			},
			//使用红包
			UseRedPacket(item) {
				console.log(item);
				this.UserRedPacket = item
				setTimeout(() => {
					if (!this.isDiscount) {
						uni.showToast({
							title: '未满足红包使用条件',
							icon: 'none',
							duration: 1000
						})
						return
					}
					this.UsreInfopacket = false
				}, 50);
			},
			// 取消使用红包
			delUseRedPacket(item) {
				console.log(item);
				if (this.UserRedPacket.id == item.id) {
					this.UserRedPacket = ''
					this.UsreInfopacket = false
				} else {
					this.$u.toast('请选择当前所使用红包取消')
				}
			},
			//单独购买
			OnlyPayOrder() {
				if (this.goodsInfoList.status == 1) {
					this.showShare = true
					this.size_show = ''
					this.attribute_show = ''
					this.Size_styles = ''
					this.Attribute_styles = ''
					this.ShopNums = 1
					this.objSizeStyle = ''
					this.objAttributeStyle = ''
					this.ArrStyles = []
					this.buy_type = 1
					this.choosAdress = 1
					this.picture = this.goodsInfoList.picture
					this.getSize()
					this.gethasRedPackets()
				}

				if (this.goodsInfoList.status == 2 || this.goodsInfoList.status == 4) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已下架',
						safeAreaInsetTop: true
					})
					return
				}
				if (this.goodsInfoList.status == 3) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已售完',
						safeAreaInsetTop: true
					})
					return
				}
			},
			//发起拼单
			PayShareOrder() {
				if (this.goodsInfoList.status == 1) {
					this.showShare = true
					this.size_show = ''
					this.attribute_show = ''
					this.Size_styles = ''
					this.Attribute_styles = ''
					this.ShopNums = 1
					this.objSizeStyle = ''
					this.objAttributeStyle = ''
					this.ArrStyles = []
					this.buy_type = 2
					this.choosAdress = 1
					this.picture = this.goodsInfoList.picture
					this.getSize()
					this.gethasRedPackets()
				}

				if (this.goodsInfoList.status == 2 || this.goodsInfoList.status == 4) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已下架',
						safeAreaInsetTop: true
					})
					return
				}

				if (this.goodsInfoList.status == 3) {
					this.iSshowPay = true
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '商品已售完',
						safeAreaInsetTop: true
					})
					return
				}

			},
			// 获取店铺信息 店铺商品信息
			getShopInfo() {
				const data = {
					shop_id: this.shop_id
				}
				//店铺信息
				this.$http.post('/api/shop/getShopInfo', data)
					.then(res => {
						if (res.code == 200) {
							this.ShopInfo = res.data
							this.ShopServices = res.data.services
							if (res.data.services !== null && res.data.services.length > 0) {
								let name = res.data.services.map((item) => {
									return item.name
								}).join(' ')

								this.Servicename = name
							}
						}
					})

				//店铺商品信息
				this.$http.post('/api/shop/listShopGoods', data)
					.then(res => {
						if (res.code == 200) {
							this.ShopGoods = res.data.list
						}
					})
			},
			//
			open() {
				this.popupScroll = true
			},
			//跳转商品评价
			toGoodEvaluation() {
				uni.navigateTo({
					url: "/pagesOptimization/pages/StoreEvaluation/StoreEvaluation"
				})
			},
			// 跳转购物车
			toShopCar() {
				uni.navigateTo({
					url: "/pagesOptimization/pages/shopCar/shopCar"
				})
			},
			// 跳转店铺主页
			toStoreHome() {
				let shopid = this.shop_id
				console.log(shopid);
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${this.shop_id}`
				})
			},
			// 判断类型
			fileType(filePath) {
				//获取最后一个.的位置
				var index = filePath.lastIndexOf(".");
				//获取后缀
				var ext = filePath.substr(index + 1);

				//判断是否是视频类型
				if (['mp4', 'avi', 'mov', 'rmvb', 'rm', 'flv', '3gp'].indexOf(ext.toLowerCase()) != -1) {
					return 'video';
				}
				//判断是否是图片类型
				if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext
						.toLowerCase()) != -1) {
					return 'image';
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	.goods-carts-btn {
		width: 686rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 80rpx;
		margin-left: 32rpx;
	}

	.popupScroll {
		overflow: hidden;
		position: fixed;

	}

	.scroll {
		max-height: 520rpx;
		margin-bottom: 20rpx;
	}

	.scroll-Y {
		height: 900rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.u-content {
		margin-top: 100rpx;
	}

	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 10rpx;
			border-radius: 6rpx;
		}

		&__content {
			margin-left: 20rpx;
			flex: 1;
		}
	}

	.f-s-24 {
		font-size: 24rpx;
	}

	.color-8 {
		color: #8e8f8e;
	}

	.detail_scroll {
		position: relative;
		// display: flex;
	}

	.good_img {
		width: 750rpx;
		height: 744rpx;
	}

	.head_btn {
		position: absolute;
		top: 30rpx;
		right: 32rpx;
	}

	.collection {
		display: flex;
		align-items: center;
	}

	.collection_pic {
		display: flex;
		justify-content: center;
		width: 72rpx;
		height: 72rpx;
		margin-right: 32rpx;
		align-items: center;
		background: rgba(0, 0, 0, .7);
		border-radius: 100%;
	}

	.wh44 {
		width: 44rpx;
		height: 44rpx;
	}

	.detail_contect {
		box-sizing: border-box;
		padding: 24rpx 24rpx 24rpx 34rpx;
		margin-bottom: 20rpx;
		background-color: #fefefe;

	}

	.detail_title {
		font-size: 36rpx;
		font-weight: 700;
		color: #202020;
		margin-bottom: 20rpx;
	}

	.detail_price {
		display: flex;
		justify-content: space-between;
	}

	.ico_price {
		font-size: 28rpx;
		font-weight: 700;
		color: #d93038;
	}

	.ico_price_num {
		font-size: 48rpx;
		font-weight: 700;
		color: #d93038;
	}

	.before_price {
		font-size: 28rpx;
		color: #888;
		margin-left: 14rpx;
		text-decoration: line-through;
	}

	.SoldOut {
		font-size: 28rpx;
		color: #888;
		margin-left: 14rpx;
	}

	.discount {
		display: flex;
		align-items: center;
		margin-top: 24rpx;
		color: #d93038;
		font-size: 22rpx;

	}

	.discount_text {
		width: max-content;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		// border-radius: 4rpx;
		border: 2rpx solid #d93038;
		margin-right: 8rpx;
		color: #d93038;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.ShoppingCar {
		display: flex;
		justify-content: space-between;
		margin-top: 12rpx;
	}

	.Car_text {
		width: 260px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #888;
		font-size: 24rpx;
		padding-top: 8rpx;
	}

	.Carimg {
		width: 32rpx;
		height: 32rpx;
		margin-right: 14rpx;
	}

	.wh-32 {
		width: 32rpx;
		height: 32rpx;
	}

	.icon-box {
		width: 72rpx;
		height: 72rpx;
		background: rgba(0, 0, 0, .7);
		border-radius: 100%;
	}

	.add-cart {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		border: 1rpx solid #eb979b;
		font-size: 24rpx;
		color: #d93038;
	}

	.CrowDordering {
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.Corw_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.Corw_text {
		color: #202020;
		font-size: 32rpx;
		font-weight: 700;
	}

	.all_CorwDordering {
		display: flex;
		align-items: center;
	}

	.all_CorwDordering_text {
		font-size: 24rpx;
		color: #8e8f8e;
		margin-right: 8rpx;
	}

	.Corw_persons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.person_infor {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
	}

	.person_img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}

	.add_Corw {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		width: 120rpx;
		height: 56rpx;
		border-radius: 28rpx;
		// border: 1rpx solid #eb979b;
		background-color: #d93038;
		font-size: 24rpx;
		color: #fefefe;
	}

	.Customers_nav {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		background: #fff;
	}

	.Customers_nav_title {
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 4rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #101010;
		background: #eaeaea;
	}

	.Customers_nav_color {
		color: #fff;
		background: linear-gradient(313deg, #d62e36, #ec434b);
	}

	.Customers_person {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.Customers_person_infor {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Customers_person_time {}

	.Customers_person_rate {
		display: flex;
	}

	.Customers_person_content {
		margin-bottom: 30rpx;
		word-break: break-all;
		white-space: pre-line;
	}

	.Customers_img_content {
		display: flex;
		justify-content: flex-start;
	}

	.img_content {
		width: 200rpx;
		height: 200rpx;
	}

	.SeeAllCustomers {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80rpx;
		border-radius: 8rpx;
		line-height: 80rpx;
		border: 2rpx solid hsla(0, 0%, 86.7%, .9);
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.SeeAllCustomers_text {
		color: #202020;
		line-height: 80rpx;
	}

	.SeeAllCustomers_ico {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.pictures {
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.store_img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10%;
		margin-right: 20rpx;
	}

	.store_person_nick {
		font-weight: 700;
	}

	.store_shopping_show {
		display: flex;
		flex-direction: column;
		width: 30%;
		margin-right: 20rpx;
		word-break: break-all;
		white-space: pre-line;
	}

	.store_shop_nick {
		font-size: 24rpx;
		font-weight: 600;
		color: #202020;
	}

	.store_ico_price {
		font-size: 24rpx;
		color: #d93038;
	}

	.store_SoldOut {
		font-size: 24rpx;
		color: #888;
	}

	.shopDetail {
		// margin-bottom: 40rpx;
	}

	.add_pay_btn {
		position: fixed;
		bottom: 0;
		z-index: 22;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		padding: 14rpx 32rpx;
		background-color: #fff;
	}

	.ShopCar {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.shopping_car {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 30rpx;
	}

	.shopping_car_ico {
		position: relative;
	}

	.ico_car {
		position: relative;
		width: 48rpx;
		height: 48rpx;
	}

	.shoptip {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32rpx;
		height: 32rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
		border-radius: 24rpx;
		border: 2rpx solid #fff;
		position: absolute;
		top: -14rpx;
		right: -14rpx;
		color: #fff;
		font-size: 20rpx;
	}

	.ShopBtn {
		display: flex;
	}

	.ShopBtn_left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 216rpx;
		height: 80rpx;
		opacity: 0.6;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 200rpx 0rpx 0rpx 200rpx;
	}

	.ShopBtn_right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 216rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
		border-radius: 0rpx 200rpx 200rpx 0rpx;
	}

	.ShopBtn_style {
		font-size: 28rpx;
		color: #fff;
		font-weight: 600;
	}

	.Order_title {
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #202020;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
	}

	.Order_address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 40rpx;
		padding-bottom: 34rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.Order_address_left {
		display: flex;
		align-items: center;
	}

	.add_ico {
		width: 80rpx;
		height: 48rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}

	.add_ico_zt {
		width: 48rpx;
		height: 48rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}

	.add_address_text {
		width: 100%;
		font-size: 24rpx;
		color: #d93038;
		font-weight: 600;
	}

	.address_show_tel {
		font-weight: 600;
		font-size: 28rpx;
		text-align: left;
		color: #202020;
	}

	.address_show_text {
		font-size: 28rpx;
		width: 95%;
		font-weight: 500;
	}

	.Order_content_Show {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 240rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
	}

	.Order_shopping_img {
		width: 148rpx;
		height: 148rpx;
		border-radius: 8rpx;
	}

	.Order_content_text {
		width: 75%;
		height: 148rpx;
	}

	.Order_price {
		display: flex;
		align-items: center;
		// width: 85%;

	}

	.Order_price_before {
		color: #d93038;
		font-size: 24rpx;
	}

	.Order_price_ico {
		color: #d93038;
		font-size: 24rpx;
		font-weight: 700;
	}

	.Order_price_text {
		color: #d93038;
		font-size: 32rpx;
		font-weight: 700;
	}

	.Order_price_text2 {
		font-size: 24rpx;
		color: #8e8f8e;
		text-decoration: line-through;
	}

	.Order_choose {
		font-size: 24rpx;
		text-align: left;
		color: #202020;
	}

	.Order_num {
		display: flex;
		justify-content: flex-end;

	}

	.Order_num_contect {
		display: flex;
		align-items: center;
	}

	.Order_num_del {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		text-align: center;
		border: 2rpx solid #d4d4d4;
		border-radius: 8rpx;
	}

	.Order_num_total {
		min-width: 40rpx;
		text-align: center;
		font-size: 32rpx;
		color: #202020;
		margin: 0 10rpx;
	}

	.Order_num_add {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		text-align: center;
		color: #fff;
		border: 2rpx solid #d4d4d4;
		border-radius: 8rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
	}

	.Specification {
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 8rpx;
	}

	.Specification_title {
		font-size: 24rpx;
		font-weight: 600;
		margin-bottom: 16rpx;
		margin-left: 10rpx;
	}

	.Specification_contect {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.Specification_contect_item {
		min-width: 158rpx;
		max-width: 100%;
		width: max-content;
		// padding: 0 8rpx;
		box-sizing: border-box;
		height: 56rpx;
		text-align: center;
		line-height: 56rpx;
		margin: 10rpx;
		font-size: 24rpx;
		border-radius: 8rpx;
		background: #f6f6f8;
	}

	.Specification_contect_style {
		border: 2rpx solid #d93038;
		color: #d93038;
		border-radius: 8rpx;
	}

	.Order_detail {
		padding: 24rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
	}

	.Order_detail_text {
		display: flex;
		justify-content: space-between;
		padding-bottom: 14rpx;
		padding-top: 20rpx;
	}

	.Order_detail_discount {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.discount_text {
		font-size: 24rpx;
		color: #D93038;
	}

	.discount_ico {
		width: 28rpx;
		height: 28rpx;
	}

	.Order_text_style {
		font-weight: 600;
	}

	.Order_detail_remark {
		font-size: 24rpx;
		text-align: right;
	}

	.Order_price_total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 18rpx 32rpx;
		width: 100%;
		position: fixed;
		bottom: var(--window-bottom, 0);
		left: 0;
		z-index: 99;
		box-sizing: border-box;
	}

	.price_left {
		display: flex;
		flex-direction: column;
	}

	.price_right {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 40rpx;
		color: #fff;
	}

	.discount_coupon {
		text-align: justify;
		color: #d93038;
		margin-left: 8rpx;
	}

	.packetList {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffceb7;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.packets_detail {
		flex: 1;
		display: flex;
		align-items: center;
		// justify-content: flex-start;
	}

	.win-delivery {
		padding: 36rpx 24rpx;
		box-sizing: border-box;
	}

	.add-delivery {
		line-height: 72rpx;
		height: 72rpx;
	}
	.store_introduce_body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 26rpx;
	}
	
</style>
