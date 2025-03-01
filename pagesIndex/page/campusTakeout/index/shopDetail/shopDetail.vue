<template>
	<view class="dis-flex flex-dir-column" :class="shareShow?'over-hide':''" @tap="isMore=false"
		style="padding-bottom: calc(138rpx + env(safe-area-inset-bottom)); box-sizing: border-box;">
		<view class="dis-flex flex-dir-column" id="top">
			<!-- 当导航条固定在顶部时 一个盒子占位  防止页面闪烁 -->
			<view :style="{height:navHeight+'px'}" v-if="bgColor!=='rgba(255,255,255,0)'"></view>
			<!-- <view :style="{height:tabHeight+'px'}" v-if="isTabTop"></view> -->
			<!-- 顶部的评论类型 -->
			<view v-if="scrollTop>navHeight+tabHeight&&commTop>130&&tabAct==2"
				class="dis-flex  flex-y-center pt24 pb24 bg-white-ff pr24 pl24 fixed-top box-size"
				:style="{top:navHeight+tabHeight+'px'}">
				<view class="f-24 comment-tab-item "
					:class="commentTabAct==item.id?'bg-red-d6-ec col-white-ff':'col-brank-10 bg-gray-ea'"
					v-for="(item,index) in commentTab" :key="index" @tap.stop="changeCommentTab(item.id)">
					{{item.name}}<text v-if="item.num">{{item.num}}</text>
				</view>
			</view>

			<!-- 顶部-->
			<image class="shop-head-bg" mode="aspectFill" :src="detail.front_img"></image>
			<!-- 顶部固定内容  -->
			<view class="fixed-top dis-flex flex-dir-column">
				<!-- 导航栏 -->
				<view id="nav" class="p-r">
					<u-navbar leftIconSize="36rpx" :safeAreaInsetTop="true" :fixed="false" :bgColor="bgColor"
						leftIconColor="#fff" :autoBack="false" @leftClick="leftClick">

						<view class="dis-flex flex-y-center p-r" :style="{marginRight: mr+'px'}" slot="right">
							<image class="wh44 mr32" src="/pagesIndex/static/shop-icon01.png"
								@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/search/search?id='+id)"></image>

							<image v-if="isCollected==0" @tap="getJoininfoAdd" class="wh44 mr32"
								src="/pagesIndex/static/shop-icon02.png"></image>

							<image v-if="isCollected==1" @tap="getJoininfoAdd" class="wh44 mr32"
								src="/pagesIndex/static/icoyishoucangx.png"></image>

							<image class="wh44 mr32" src="/pagesIndex/static/shop-icon03.png" @tap.stop="tochat">
							</image>
							<image class="wh44 mr32" id="more" @tap.stop="isMore=true"
								src="/pagesIndex/static/shop-icon04.png">
							</image>
						</view>
					</u-navbar>
					<!-- 更多的弹窗 -->
					<view class="more-win radio-16 pt12 pb12 pl24 pr24 box-size bg-white-ff" v-if="isMore" id="moreWin">
						<!-- 	<view class="dis-flex flex-y-center pt20 pb20" @tap.stop="isMore=false;shareShow=true">
							<image class="wh32 mr16" src="/pagesIndex/static/more-win01.png"></image>
							<view class="f-24 col-brank-20">分享商家</view>
						</view> -->
						<view class="dis-flex flex-y-center pt20 pb20"
							@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/report/report?id='+id)">
							<image class="wh32 mr16" src="/pagesIndex/static/more-win02.png"></image>
							<view class="f-24 col-brank-20">投诉举报</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shop-detail  bg-white-ff" :class="isOpen?'':'border-b-f7 '">
				<!-- 店铺头部基础信息 -->
				<view class="dis-flex flex-center flex-x-between shop-head">
					<image class="wh128 radio-8" :src="detail.logo"></image>
					<view class="shop-r dis-flex flex-x-center flex-dir-column">
						<view class="w-100 f-40 f-b onelist-hidden ">{{detail.name}}</view>
						<view class="price-l dis-flex flex-y-center w-100 col-gray-88 f-24">
							<view class="dis-flex flex-y-center f-24 col-orange-ff95  case">
								<image class="wh24 mr10" src="/static/img/case.png"></image>
								<view class="f-b">{{detail.score}}</view>
							</view>
							<view class=" onelist-hidden pl10">月售{{detail.month_sales}}</view>
							<view class="m-l-10 onelist-hidden">配送约{{detail.delivery_time}}分钟</view>
							<view class="m-l-10 onelist-hidden">人均¥{{detail.per_capita_order_price}}
							</view>
						</view>
						<view class="dis-flex flex-y-center mt5" style="width: 100%;height: 16px;">
							<view class="label radio-4 mr16  f-22 border-red-eb col-red-dd"
								v-for="(item,index) in detail.reduce" :key="index">{{item}}</view>
						</view>
					</view>
				</view>

				<view class="m-t-20 ">
					<!-- 领优惠券、红包 -->
					<scroll-view class="label-scroll m-t-12" scroll-x="true">
						<view class="flex-al-c">
							<view class="redPokect " :class=" item.is_received==0 ? 'bgc-FF473D' : 'bgc-888' "
								v-for="(item,index) in detail.redPacket" :key="index" @click="redpocketShow =true">
								<view class="left">￥{{item.amount}}</view>
								<view class="right" v-if="item.is_received==0">领</view>
								<view class="right" v-else>已领</view>
							</view>
						</view>
					</scroll-view>
					<scroll-view class="label-scroll m-t-12" scroll-x="true">
						<view class="label dis-line-b radio-4 mr16  f-22 border-red-eb col-red-dd"
							v-for="(item,index) in detail.reduce" :key="index">{{item}}</view>
					</scroll-view>
				</view>
				<view class="f-24 color-20 fw-500 m-t-20 flex-al-c">
					<text>营业时间：</text>
					<view v-if="detail.time_open==1 && detail.status ==1">
						<text>上午:{{detail.am_business_hours_start}}</text>
						-
						<text>{{detail.am_business_hours_end}}</text>

						<text class=" ml10">下午:{{detail.pm_business_hours_start}}</text>
						-
						<text>{{detail.pm_business_hours_end}}</text>
					</view>
					<view v-else>
            <view class="dis-flex flex-y-center" v-if="detail.is_support_yd == 1">
              <text>可预定</text>
              <view class="border-o-ff9c col-orange-ff9c f-22 radio-rt-rb-8 pr10 pl0 ml15">{{detail.next_delivery_time}}后开始配送</view>
            </view>
            <view v-else>已打烊</view>
          </view>
					<!-- <image class="wh-28 m-l-8" src="@/pagesIndex/static/shop-detail08.png" mode=""></image> -->
				</view>
				<!-- 店铺信息展开的内容 -->
				<view class="" v-if="isOpen">
					<view class="mt30  dis-flex flex-y-center flex-x-between">
						<view class="w-90">
							<view class="f-28 col-brank-22 f-b mb12">优惠</view>
							<scroll-view class="label-scroll" scroll-x="true">
								<view class="label dis-line-b radio-4 mr16  f-22 border-red-eb col-red-dd"
									v-for="(item,index) in detail.reduce" :key="idex">{{item}}</view>
							</scroll-view>
						</view>
						<image class="wh28" @tap.stop="isOpen=false" src="/pagesIndex/static/top.png"></image>
					</view>
					<view class="mt30">
						<view class="f-28 col-brank-22 f-b mb12">商家服务</view>
						<scroll-view class="label-scroll col-red-d9 f-22" scroll-x="true">
							<view class="label-bg dis-line-b bg-red-F7  radio-4 mr8"
								v-for="(item,index) in detail.labels" :key="index">{{item||'暂无'}}</view>
						</scroll-view>
					</view>
					<view class="mt30">
						<view class="f-28 col-brank-22 f-b mb12">公告</view>
						<view class="col-gray-88 f-24">
							{{detail.notice||'暂无公告'}}
						</view>
					</view>
				</view>
				<!-- 展开店铺信息的时候不显示 -->
				<block v-if="isOpen==false">
					<!-- 店铺标签 -->
					<view class="dis-flex flex-y-center col-red-d9 f-22 mt24" v-if="detail.labels">
						<view class="label-bg bg-red-F7 radio-4 mr8" v-for="(item,index) in detail.labels" :key="index">
							{{item||'暂无公告'}}
						</view>
					</view>
					<!-- 店铺介绍 -->
					<view class="dis-flex flex-y-center mt12 flex-x-between" @tap.stop="isOpen=true">
						<view class="w-85 onelist-hidden f-24 col-gray-88">{{detail.notice||'暂无公告'}}</view>
						<image class="wh28" src="/pagesIndex/static/bottom.png"></image>
					</view>
					<!-- tab切换-->
					<view class="dis-flex flex-y-center tab-box mt8" id="tab">
						<view class="f-32 mr80 f-b " :class="tabAct==item.id?'tab-act col-brank-20':'col-gray-8e'"
							v-for="(item,index) in tabList" :key="index" @tap.stop="tabAct=item.id">{{item.name}}</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 店家信息展开的时候不显示 :style="{paddingBottom:bottomHeight+'px'}"-->
		<block v-if="isOpen==false">
			<view class=" box-size" :class="tabAct==1?'dis-flex':''">
				<!-- 商品模块 -->
				<block v-if="tabAct==1">
					<block>
						<scroll-view :scroll-y="isTopTab" :scroll-with-animation="true" :scroll-into-view="clickToId" :style="{ height: windowHeight }" class="goods-l bg-gray-f7">
							<view class="type-item f-24 t-c col-brank-20" :id="'to' + index"
								:class="currentNum==index?'bg-white-ff f-b f-28 type-act':''"
								v-for="(item,index) in typeListx" :key="index" @tap.stop="setId(index)">
								{{item.name}}
							</view>
						</scroll-view>
						<!-- 商品 -->

						<scroll-view :scroll-y="isTopTab" class="goods-r bg-white-ff" :style="{ height: windowHeight }" :scroll-into-view="clickId"
							:scroll-with-animation="true" @scroll="goodsScroll">

								<!-- <null-data v-if="typeList.length==0"></null-data> -->
								<!-- <view class="pt20 pl20 pb10 box-size col-gray-88 f-28">{{item.name}}</view> -->
                <view v-for="(item, index) in typeListx" :key="index">
                  <view class="pt20 pl20 pb10 box-size col-gray-88 f-28 right_title" :id="'po' + index">{{item.name}}</view>
                  <view class="goods-item flex-x-between dis-flex flex-y-center p-r"
                    v-for="(items,indexs) in item.goods" :key="indexs"
                    @tap.stop="onLink('/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id='+items.goods_id+'&fee='+detail.packing_fee+'&idx='+detail.merchant_id+'&starting_price='+detail.starting_price + '&merchant_id=' + id)">
                    <image v-if="items.img" class="radio-8 wh180"
                      :src="items.img.split(',')[0]||items.img" mode="aspectFill"></image>
                    <image v-else class="radio-8 wh180" src="../../../../../static/img/food_default.png"
                      mode="aspectFill"></image>
										<text v-if="items.is_special" class="special-price">特价</text>
                    <view class="goods-item-r dis-flex flex-dir-column flex-x-between ">
                      <view>
                        <view class="f-28 col-brank-20 w-100 onelist-hidden mb10 f-b">
                          {{items.name}}
                        </view>
                        <view class="label-num dis-flex flex-y-center mb10" v-if="items.attribute">
                          <view class="bg-gray-ee  onelist-hidden  f-20 radio-4 mr8"
                            v-for="(itemLabel,indexLabel) in items.attribute.split(',')"
                            :key="indexLabel" v-if="indexLabel<2">{{itemLabel}}</view>
                        </view>
                        <view class="f-22 col-gray-88 w-100  onelist-hidden">
                          <text class="mr20">月售{{items.month_sales||'0'}}</text>
                        </view>
                      </view>

                      <view class="w-100 dis-flex flex-y-center flex-x-between">
                        <view class="dis-flex flex-y-center w-70">
                          <view class="f-24 mr5 col-red-d9 w-100 t-b onelist-hidden f-b">￥<text
                              class="f-32">{{items.price}}</text>
                            <block
                              v-if="(items.attribute&&items.attribute.split(',').length>0)||(items.specs&&JSON.parse(items.specs).length>0)">
                              <text class="col-gray-8e f-n">起</text>
                            </block>
                            <text
                              class="m-l-10 f-h f-n col-gray-8e">￥{{items.scribe_price}}</text>
                          </view>
                        </view>

                        <view class=""
                          v-if="detail.am_business_hours_end&&detail.status==1&&(detail.time_open==1 || detail.is_support_yd == 1)">
                          <!-- 有规格的按钮 -->
                          <view class="p-r"
                            v-if="(items.attribute&&items.attribute.split(',').length>0)||(items.specs&&JSON.parse(items.specs).length>0)">
                            <view class=" radio-8 pl10 pr10 bg-red-d6-ec f-24 col-white-f5" 
                              @tap.stop="addCard(items)">选规格</view>
                            <view class="p-a cart-sku-num" v-if="items.cart_num">
                              {{items.cart_num}}
                            </view>
                          </view>
                          <!-- 没有规格的按钮 -->
                          <block v-else>
                            <view class="dis-flex flex-y-center" v-if="items.in_cart!=0">
                              <view class="del radio-8"
                                :class="items.cart_num<=1?'border-d4':'bg-red-d6-ec col-white-ff'"
                                @tap.stop="delNum(items,item)">-</view>
                              <view class="f-24 col-brank-20 cart-num" type="number">
                                {{items.cart_num || 0}}
                              </view>

                              <view class="del radio-8 bg-red-d6-ec col-white-ff"
                                @tap.stop="addNum(items,item)">+</view>
                            </view>

                            <image class="wh36" src="/pagesIndex/static/add.png" v-else
                              @tap.stop="addCard(items)"></image>
                          </block>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
								<null-data v-if="typeListx.length==0"></null-data>
						</scroll-view>
					</block>
					<!-- <view class="dis-flex  flex-x-center w-100" v-else>
						<null-data :title="nullDataText"></null-data>
					</view> -->
				</block>
				<!-- 评价模块 -->
				<block v-else-if="tabAct==2">
					<view class="padd-b-160">
						<scroll-view :scroll-y="isTabTop?true:false"
							class="pl32 h-100 pt20 pb20 bg-white-ff pr32 box-size" @scroll="commScroll"
							@scrolltolower="getOrderCommentList(true)">
							<view id="comment-type">
								<view class="dis-flex flex-y-center mb28">
									<view class="f-64 mr16 f-DINPro f-b">{{detail.score}}</view>
									<view class="">
										<view class="f-24 col-gray-88">商家评分 </view>
										<view class="dis-flex  mt5 flex-y-center">
											<u-rate :count="detail.score" v-model="detail.score" readonly
												:activeColor="'#FF9531'"></u-rate>
										</view>
									</view>
								</view>
							</view>
							<commentItem :list="commentList" :commentTab="commentTab"
								@changeCommentTab="changeCommentTab"></commentItem>
							<!-- <u-loadmore v-if="commentList.length!=0" color="#888" fontSize="28rpx" :status="status" /> -->
						</scroll-view>
					</view>

				</block>
				<block v-else>
					<scroll-view class="f-28 h-100 col-brank-22" :scroll-y="isTabTop?true:false">
						<!-- 地址\档案-->
						<view class="bg-white-ff pl32 pt12 pb12 box20-f7  pr32 box-size">
							<view class="dis-flex pt20 pb20 flex-y-center flex-x-between">
								<view class="dis-flex flex-y-center w-90" @tap="openMap">
									<image class="wh32 mr20" src="/pagesIndex/static/shop-detail01.png"></image>
									<view class="w-85">{{detail.address}}</view>
								</view>
								<image class="wh32 mr12" src="/pagesIndex/static/shop-detail02.png"
									@tap.stop="callMobile(detail.contacts_tel)"></image>
							</view>
							<view class="dis-flex pt20 pb20 flex-y-center flex-x-between"
								@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/safetyArchives/safetyArchives?id='+id)">
								<view class="dis-flex flex-y-center w-90">
									<image class="wh32 mr20" src="/pagesIndex/static/shop-detail03.png"></image>
									<view class="w-85">查看食品安全档案</view>
								</view>
								<image class="wh28" src="/pagesIndex/static/shop-detail08.png"></image>
							</view>
						</view>
						<!-- 配送 -->
						<view class="bg-white-ff pl32 pt12 box20-f7 pb12   pr32 box-size">
							<view class="dis-flex pt20 pb20 flex-y-center">
								<image class="wh32 mr20" src="/pagesIndex/static/shop-detail04.png"></image>
								<view class="w-90" v-if="detail.distribution_type==1">配送服务：由平台提供配送</view>
								<view class="w-90" v-if="detail.distribution_type==2">配送服务：由商家提供配送</view>
							</view>
							<view class="dis-flex pt20 pb20 flex-y-center" v-if="detail.am_business_hours_start">
								<image class="wh32 mr20" src="/pagesIndex/static/shop-detail05.png"></image>
								<view class="w-90">
									配送时间：{{detail.am_business_hours_start+'-'+detail.am_business_hours_end+' '+detail.pm_business_hours_start+'-'+detail.pm_business_hours_end}}
								</view>
							</view>
						</view>
						<!-- 公告和服务 -->
						<view class="bg-white-ff pl32 box20-f7 pt12 pb12   pr32 box-size">
							<view class="dis-flex pt20 pb20 flex-y-center flex-x-between" @tap.stop="isOpen=true">
								<view class="dis-flex flex-y-center w-90">
									<image class="wh32 mr20" src="/pagesIndex/static/shop-detail06.png"></image>
									<view class="w-85 onelist-hidden">{{detail.notice||'暂无公告'}}</view>
								</view>
								<image class="wh32 mr12" src="/pagesIndex/static/shop-detail08.png"></image>
							</view>
							<view class="dis-flex pt20 pb20 flex-y-center" v-if="detail.self_lifting!=0">
								<image class="wh32 mr20" src="/pagesIndex/static/shop-detail07.png"></image>
								<view class="w-90">商家服务：到店自取</view>
								<!-- <view class="w-90" v-if="self_lifting==1">商家服务：到店自取</view> -->
							</view>
						</view>
						<!-- 商家相册 -->
						<view class="bg-white-ff  pl32 pt32  mb20  pr32 box-size" style="padding-bottom:160px;">
							<view class="f-32 col-brank-22 f-b mb20">商家相册</view>
							<view class="dis-flex flex-y-center flex-wrap comment-item-cover"
								v-if="detail.album.length >0">
								<image class="radio-8 mb20 wh216" mode="aspectFill" :src="item"
									v-for="(item,index) in detail.album" :key="index" @tap.stop="previewImage(index)">
								</image>
							</view>
							<div v-else>
								<null-data title="暂无"></null-data>
							</div>
						</view>
					</scroll-view>
				</block>
			</view>
			<!-- 多规格弹窗 -->
			<sku :show="skuShow" @skuCanel="skuCanel" @addCard="addSpecCard" :specsObject="specsObject"></sku>
			<!-- 固定在底部的购物车 &&detail.time_open==1 -->
			<view id="bottom">
				<view class="" v-show="typeList.length>0"
					v-if="detail.am_business_hours_end&&detail.status==1&&(detail.time_open==1 || detail.is_support_yd == 1)">
					<riderBottom v-if="cd!=0" :type="0" :cardData="cardData" :isMustGoodsList="isMustGoodsList" @clearCart="clearCart"
						@delNum="delNumBottom" @addNum="addNumBottom" @isHaveMustGoodsScroll="isHaveMustGoodsScroll">
					</riderBottom>

				</view>
				<view class="tis flex-center" v-else>
					商家已休息，请在营业时间内下单
				</view>
			</view>



		</block>
		<shareWin :shopShow="shareShow" @cancel="cancelShare" :shareContent="shareContent"></shareWin>
		<u-popup :show="redpocketShow" round="32rpx" @close="redpocketShow=false" zIndex="997" :closeable="true">
			<view style="height: 520rpx;background-color:#f2f2f2; border-radius: 32rpx 32rpx 0rpx 0rpx;"
				class="dis-flex  flex-dir-column paddall3624">
				<view class="f-30 w-100 flex-center mb30">本店代金券</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Ys" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">

					<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
						v-for="(item,index) in detail.redPacket" :key="index">
						<view class="dis-flex flex-dir-column">
							<view class="dis-flex flex-dir-row">
								<view class="col-red-d3 mr15">￥{{item.amount}}</view>
								<view>{{item.amount}}元代金券（满{{item.use_threshold}}元可用）</view>
							</view>
							<view class="f-24 c-20">有效期至{{formateTime(item.end_time)}}</view>
						</view>
						<view v-if="item.is_received==0" class="col-red-d3  m-tb-40" @click="getRedPocket(item)">领取
						</view>
						<view v-else class="col-gray-33  m-tb-40">已领取</view>
					</view>

				</scroll-view>
			</view>

		</u-popup>
		<!-- 红包列表 -->
		<!-- <view class="" v-if="pttj_lists.length != 0">
			<view class="" v-if="pttj_lists.length > 3">
				<u-popup :show="showred" @open="openred" mode="center" bgColor="transparent">
					<view class="redimg" style="width: 750rpx; height: 846rpx;">
						<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
							@scrolltolower="lower" @scroll="scroll">
							<view class="flex-c-c flex-column scroll-view-item" style="margin-top: 100rpx;">
								<view class="flex bgc-ff bor-r-16 redbao_box m-t-20" style=""
									v-for="(item,index) in pttj_lists">
									<view class="color-D93038">
										<view class="f-20 redbao_xywm redbao_left">{{ item.type_str }}</view>
										<view class="m-l-24 m-t-10">
											<text class="f-28 fw-700">￥</text>
											<text class="f-56 fw-700">{{ item.amount.substring(0,3) }}</text>
										</view>
										<view class="f-20 color-D93038 m-l-24">
											满{{ item.use_threshold.substring(0,3) }}可用</view>
									</view>
									<view class="flex-al-c m-l-43 ">
										<view class="">
											<view class="f-32 color-20 fw-700">外卖通用券</view>
											<view class="f-24 color-8E8F8E m-t-12">有效期至{{ item.registration_deadline }}
											</view>
										</view>
										<view class="redbao_btn m-l-16" v-if="item.has_gain==0"
											@click="redbtn(item.id)">领取</view>
										<view class="redbao_btn m-l-16" v-if="item.has_gain==1">已领取</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<view class="redbao_tips ">
							<view class="flex-c-c">券可在【我的】-【红包卡券】中查看</view>
						</view>
						<view class=" redbao_guanbi">
							<view class="flex-c-c">
								<image class="wh-72" @click="closered" src="/static/img/ico_redguanbi.png" mode="">
								</image>
							</view>
						</view>
					</view>
				</u-popup>
			</view>

			<view class="" v-if="pttj_lists.length <= 3">
				<u-popup :show="showred" @open="openred" mode="center" bgColor="transparent">
					<view class="redimg" style="width: 750rpx; height: 846rpx;">
						<view class="flex-al-c flex-column scroll-view-item" style="margin-top: 180rpx;">
							<view class="flex bgc-ff bor-r-16 redbao_box m-t-20" style=""
								v-for="(item,index) in pttj_lists">
								<view class="color-D93038">
									<view class="f-20 redbao_xywm redbao_left">{{ item.type_str }}</view>
									<view class="m-l-24 m-t-10">
										<text class="f-28 fw-700">￥</text>
										<text class="f-56 fw-700">{{ item.amount.substring(0,3) }}</text>
									</view>
									<view class="f-20 color-D93038 m-l-24">满{{ item.use_threshold.substring(0,3) }}可用
									</view>
								</view>
								<view class="flex-al-c m-l-43 ">
									<view class="">
										<view class="f-32 color-20 fw-700">外卖通用券</view>
										<view class="f-24 color-8E8F8E m-t-12">有效期至{{ item.registration_deadline }}
										</view>
									</view>
									<view class="redbao_btn m-l-16" v-if="item.has_gain==0" @click="redbtn(item.id)">领取
									</view>
									<view class="redbao_btn m-l-16" v-if="item.has_gain==1">已领取</view>
								</view>
							</view>
						</view>
						<view class="redbao_tips ">
							<view class="flex-c-c">券可在【我的】-【红包卡券】中查看</view>
						</view>
						<view class=" redbao_guanbi">
							<view class="flex-c-c">
								<image class="wh-72" @click="closered" src="/static/img/ico_redguanbi.png" mode="">
								</image>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
		</view> -->


	</view>
</template>

<script>
	import * as Util from '@/common/util.js'
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				cd: '',
				nullDataText: '暂无商品',
				isCollected: "",
				mr: 0, //距离右边胶囊的宽度
				skuShow: false, //是否显示多规格弹窗
				isMore: false, //是否显示更多的弹窗
				scrollTop: 0, //页面滚动距离
				navHeight: 0, //导航条高度 包含状态栏
				topHeight: 0, //id为top元素的高度
				bottomHeight: 0, //id为bottom元素的高度
				tabHeight: 0, //id为tab的高度 单位px
				windowHeight: '0px',
				clickId: '',
				clickToId: '',
				currentNum: 0,
				topList: [],
				isLeftClick: false,
				id: "", //店铺id
				bgColor: "rgba(255,255,255,0)", //导航栏背景颜色
				isTabTop: false, //是否显示顶部的切换栏
        isTopTab: true, //判断导航栏是否到顶部
        tabTop: 0,
				detail: {}, //商家详情
				tabList: [{
					name: "商品",
					id: 1
				}, {
					name: "评价",
					id: 2
				}, {
					name: "商家",
					id: 3
				}, ],
				tabAct: 1, //当前选中的tab页id 对应tablist
				scrollHeight: 0, //滚动条高度
				typeList: [], //商品列表
				typeListx: [],
				scrollGoodsId: '', //当前滚动到的商品id
				HeightArr: [], //商品滚动条里面的每一项的高度区间
				typeIndex: 0, //选中的分类下标
				commentTab: [{ //评价类型
					name: "全部",
					id: 0,
					num: 0,
				}, {
					name: "最新",
					id: 1,
					num: 0,
				}, {
					name: "好评",
					id: 2,
					num: 0
				}, {
					name: "差评",
					id: 3,
					num: 0
				}],
				commentTabAct: 0, //选中的评论类型id
				commentList: [], //评论相关数据
				status: "nomore", //评论的加载更多
				commTop: 0, //评论滚动条距离顶部的距离
				shareShow: false, //是否显示分享弹窗
				isOpen: false, //是否展开商家信息
				cardData: {
					amount: 0,
					starting_price: 0,
					scribe_amount: 0
				}, //购物车数据
				specsObject: {
					name: "",
					specs: [],
					specs1: [],
					price: 0,
					attribute: [],
          catch: null
				}, //规格弹窗的数据
				orderId: '',
				shareContent: {}, //分享店铺内容
				type: "", //不同页面跳进来的标识
				xself_lifting: "",
				spec: "",
				spec1: "",
				redpocketShow: false, //显示红包弹窗
				labels: [],
				showred: true, //是否显示红包弹窗
				pttj_lists: [],
				shareType: 0, //来源是否是分享 0 不是 1是
        isMustGoodsList: [], //必买商品列表
				isMustGoodsListIndex: 0
			}
		},
		onLoad(e) {
			this.id = e.id
			this.type = e.type
			console.log(e)
			if (e.labels) {
				this.labels = JSON.parse(e.labels)
			}
			if (e.shareType) {
				this.shareType = e.shareType
			}

			this.orderId = e.orderId || ''
			if (this.orderId != '') {
				this.getOrderAgain()
			}
			//#ifdef  MP-WEIXIN
			this.mr = uni.getMenuButtonBoundingClientRect().width + 16
			//#endif	

			this.Getsjtj_lists()
      this.innerHeight()
		},
		onShow() {
			this.getOrderCommentList()
			this.getMerchantInfo();
			this.cs()
		},
		onShareAppMessage() {
			return {
				title: this.detail.name,
				path: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" +
					this.id + "&type=" + this.type + "&labels=" + JSON.stringify(this.labels) + "&shareType=1",
				imageUrl: this.detail.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShareTimeline() {
			return {
				title: this.detail.name,
				path: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" +
					this.id + "&type=" + this.type + "&labels=" + JSON.stringify(this.labels) + "&shareType=1",
				imageUrl: this.detail.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		mounted() {

			//h5放在这个生命周期才生效 初始化滚动高度
		},
		onPageScroll(e) {
			this.isMore = false
			// this.scrollTop = e.scrollTop
			// console.log(e.scrollTop);
			if (e.scrollTop >= 50) {
				this.bgColor = "#D93038"
			} else {
				this.bgColor = "rgba(255,255,255,0)"
			}
			// if (e.scrollTop >= this.topHeight - this.tabHeight) {
			// 	this.isTabTop = true
			// } else {
			// 	this.isTabTop = false
			// }
      if(e.scrollTop > this.tabTop-10) {
        this.isTopTab = true
      } else {
        this.isTopTab = true
      }
			this.$forceUpdate()
		},
		methods: {
      innerHeight() {
        let windowHeight = 0
        uni.getSystemInfo({
          success: (res) => {
            windowHeight = res.windowHeight;
            uni.createSelectorQuery().in(this).select('#tab').boundingClientRect((rect1) =>{
              uni.createSelectorQuery().in(this).select('#nav').boundingClientRect((rect2) =>{
                this.windowHeight = (windowHeight - rect1.height - rect2.height*2) + 'px';
              }).exec();
            }).exec();
          }
        });
      },
			cs() {
				this.cd = uni.getStorageSync('tokens').token.length
			},
			// 领取红包
			redbtn(id) {
				this.Gettj_gain(id)
			},
			//领取红包接口
			async Gettj_gain(id) {
				const res = await this.$api.tj_gain({
					id: id
				})
				if (res.status == 200) {
					this.$u.toast("领取成功")
					this.Getsjtj_lists()
				}
			},

			closered() {
				this.showred = false
			},

			// 商家天降红包列表接口
			async Getsjtj_lists() {
				const res = await this.$api.sjtj_lists({
					merchant_id: this.id
				})
				if (res.status == 200) {
					this.pttj_lists = res.data.list
				}
			},

			leftClick() {
				console.log(this.shareType)
				if (this.shareType == 1) {
					uni.navigateTo({
						url: "/pages/index/index"
					})
					// uni.navigateBack()
				} else {
					uni.navigateBack()
				}
			},
			formateTime(time) {
				return Util.formatDay(time * 1000)
			},
			//领取红包
			async getRedPocket(item) {
				let that = this;
				const {
					data,
					status
				} = await that.$api.getRedPokect({
					red_packet_id: item.red_packet_id,
				})
				if (status == 200) {
					this.getMerchantInfo();
				}
			},

			//再来一单
			async getOrderAgain() {
				var that = this
				const {
					data,
					status
				} = await that.$api.orderAgain({
					order_id: this.orderId,
					order_type: 1, //1外卖，2附近，3优选
				})
				if (status == 200) {

				}
			},
			//跳转聊天
			tochat() {
				let passUser = {
					uuid: 'merchant' + this.id,
					name: this.detail.name,
					avatar: this.detail.logo,
				}
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/chat/chat?toUser=' +
						encodeURIComponent(JSON.stringify(passUser))
				})
			},
			//清空了购物车 刷新购物车列表和商家商品列表
			async clearCart() {
				this.getTakeoutGoodsLists()
				this.getTakeoutCartLists()
			},
			//获取商家商品列表
			async getTakeoutGoodsLists() {
				uni.showLoading({
					title: '加载中...'
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.takeoutGoodsLists({
					merchant_id: this.id,
				})
				uni.hideLoading();
				if (status == 200) {
					let typeListCur = []
					data.list.map(item => item.goods.map(n => typeListCur.push(n)))
					this.typeList = typeListCur
					this.typeListx = data.list
					if (data.list.length > 0) {
						this.scrollGoodsId = 'a' + data.list[0].type_id
					}
          let filteredArray = []
          this.typeListx.map((subArray, subArrayIndex) =>
            subArray.goods.map(item => {
              if (item.is_must_buy == 1) {
                filteredArray.push(item)
								this.isMustGoodsListIndex = subArrayIndex
              }
            })
          );
          this.isMustGoodsList = filteredArray
					setTimeout(function() {
						that.getNodesInfo();
					}, 700)

				}
			},
			//获取商家商品列表
			async getOrderCommentList(isPage) {
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.commentList = []
					this.status = 'loadmore'
				}
				var commentList = this.commentList;
				const {
					data,
					status
				} = await that.$api.orderCommentList({
					store_id: this.id,
					order_type: 1, //1外卖，2附近，3优选
					limit: 10,
					page: this.page,
					type: this.commentTabAct, //评论类型 0全部，1最新，2好评，3差评
				})
				uni.hideLoading()
				if (status == 200) {
					this.commentTab[0].num = data.total_count
					this.commentTab[2].num = data.hp_count
					this.commentTab[3].num = data.cp_count
					if (!data.list.data) {
						that.status = 'nomore'
						return
					}
					commentList = commentList.concat(data.list.data)
					that.commentList = commentList
				}
			},
			//获取商家详情
			async getMerchantInfo() {
				var that = this
				const {
					data,
					status
				} = await that.$api.merchantInfo({
					merchant_id: this.id,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
				})
				if (status == 200) {
					if (data.album == "") {
						data.album = [];
					} else {
						data.album = data.album.split(",") || []
					}
					this.detail = data
					this.isCollected = data.user_is_collect
					uni.setNavigationBarTitle({
						title: data.name
					});
					this.shareContent.title = data.name;
					this.shareContent.summary = '好店分享，来自校U'
					this.shareContent.imageUrl = data.logo;
					this.shareContent.href = urlConfig + 'h5';
					this.getTakeoutCartLists()
					//已打烊设置
					if (!this.detail.am_business_hours_end) {
						this.typeList = [];
						this.nullDataText = '本店已打烊'
					}
					this.getTakeoutGoodsLists()
				}
			},
			//点击关闭规格弹窗
			skuCanel() {
				this.skuShow = false
			},
			//点击打开地图
			openMap() {
				uni.openLocation({
					latitude: Number(this.detail.lat),
					longitude: Number(this.detail.lng),
					name: "商家位置",
					address: this.detail.address,
					success: function() {
						console.log('success');
					}
				});
			},

			//加入购物车
			addCard(items) {
				console.log(items)
				var attribute = items.attribute
        // 解决点击同一个商品规格时无法监听问题
        this.$set(this.specsObject, 'catch', null)
				if (attribute != null && attribute != 'null' && attribute != '') {
					attribute = items.attribute.split(',')
				} else {
					attribute = []
				}
				// 有规格的加入展示弹框
				if ((items.specs && JSON.parse(items.specs).length > 0) || attribute.length > 0) {
					console.log(items.specs1)
					//判断是不是多规格属性商品 是就改变skuShow=true
					this.$set(this.specsObject, 'goods_id', items.goods_id)
					this.$set(this.specsObject, 'name', items.name)
					this.$set(this.specsObject, 'price', items.price)
					if (items.specs) {
						this.$set(this.specsObject, 'specs', JSON.parse(items.specs) || [])
					} else {
						console.log('无规格1')
						this.$set(this.specsObject, 'specs', [])
					}
					if (items.specs1) {
						this.$set(this.specsObject, 'specs1', JSON.parse(items.specs1) || [])
					} else {
						console.log('无规格2')
						this.$set(this.specsObject, 'specs1', [])
					}
					this.$set(this.specsObject, 'attribute', attribute)
          this.$nextTick(() => {
            this.$set(this.specsObject, 'catch', items.name)
          });
					this.skuShow = true
				} else {
					//没有规格的直接加入购物车
					this.getTakeoutCartAdd(items)
				}
			},
			//多规格弹窗的加入购物车事件
			addSpecCard(e) {
				// this.getTakeoutCartAdd(e.items, e.spec, e.attribute)
				// if(e.type==1){
				// 	this.spec1=''
				// 	this.spec=	e.spec
				// 	this.getTakeoutCartAdd(e.items, e.attribute)
				// }else if(e.type==2){
				// 	this.spec=''
				// 	this.spec1= e.spec1
				// 	this.getTakeoutCartAdd(e.items,  e.attribute)
				// }
				this.spec = e.spec
				this.spec1 = e.spec1
				this.getTakeoutCartAdd(e.items, e.attribute)
				this.skuShow = false
			},
			//商品列表减少加入购物车的数量
			delNum(items, item) {
				this.getTakeoutCartSub(items.cart_id)
			},
			//商品列表添加加入购物车的数量
			addNum(items, item) {
				this.spec = ""
				this.getTakeoutCartAdd(items)
			},
			//底部购物车弹窗减少加入购物车的数量 
			delNumBottom(items) {
				this.getTakeoutCartSub(items.cart_id)
			},
			//底部购物车弹窗添加加入购物车的数量
			addNumBottom(items) {
				this.getTakeoutCartAddx(items, items.spec, items.attribute)
			},
			//获取加入购物车接口
			async getTakeoutCartAdd(items, attribute, spec1) {
				// this.spec=""
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: this.id,
					goods_id: items.goods_id,
					num: 1,
					spec: this.spec,
					spec1: this.spec1,
					attribute: attribute || "",
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.clearCart()
					this.spec = ""
				}
			},

			//获取加入购物车接口
			async getTakeoutCartAddx(items, attribute, spec1) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: this.id,
					goods_id: items.goods_id,
					num: 1,
					spec: items.spec,
					spec1: items.spec1,
					attribute: items.attribute || "",
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.clearCart()
				}
			},

			//购物车列表接口
			async getTakeoutCartLists() {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartLists({
					merchant_id: this.id,
				})
				if (status == 200) {
					data.merchant_id = this.id
					data.starting_price = this.detail.starting_price
					this.cardData = data
				}
			},
			//减少购物车接口
			async getTakeoutCartSub(cart_id) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartSub({
					cart_id: cart_id
				})
				if (status == 200) {
					uni.showToast({
						title: "数量减少成功",
						icon: "none"
					})
					this.clearCart()
				}
			},
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//拨打商家电话
			callMobile(mobile) {
				uni.showModal({
					title: "温馨提示",
					content: "请确认联系商家" + mobile,
					confirmText: "拨打",
					cancelText: "取消",
					success(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: mobile
							})
						}
					}
				})

			},
			//预览评论图片
			previewImage(index, cover) {
				if (this.detail.album) {
					console.log(this.detail.album)
					uni.previewImage({
						urls: this.detail.album,
						current: index,
						indicator: true,
						loop: true,
						fail(e) {
							console.log(e)
						}
					});
				} else {
					console.log("没有图片")
				}

			},
			//评论滚动
			commScroll(e) {
				this.commTop = e.detail.scrollTop //记录评论滚动 滚动到一定距离固定在顶部
			},
			//修改当前选中的评论类型
			changeCommentTab(id) {
				this.commentTabAct = id
				this.getOrderCommentList()
			},
			isHaveMustGoodsScroll() {
				this.setId(this.isMustGoodsListIndex)
			},
			//初始化商品滚动条的高度
      setId(index) {
				this.clickId = 'po' + index;
				this.isLeftClick = true;
				this.currentNum = index;
			},
			goodsScroll(e) {
				if (this.isLeftClick) {
					this.isLeftClick = false;
					return;
				}
				let scrollTop = e.target.scrollTop + 2;
        // console.log(this.topList, e.target.scrollTop);
				for (let i = 0; i < this.topList.length; i++) {
					let h1 = this.topList[i];
					let h2 = this.topList[i + 1];
					if (scrollTop >= h1 && scrollTop < h2) {
						this.currentNum = i;
						this.clickToId = 'to' + i;
					}
					//解决滚动到最后选项左侧不会选中
					let length = this.topList.length;
					if (scrollTop >= this.topList[length - 1]) {
						this.currentNum = length - 1;
						this.clickToId = 'to' + length - 1;
					}
				}
			},
			getNodesInfo() {
				//获取节点为.right_title距离顶部的距离，返回值放在数组中
				const query = uni.createSelectorQuery().in(this);
				query
					.selectAll('.right_title')
					.boundingClientRect()
					.exec(res => {
						// console.log(res);
						let nodes = res[0];
						let rel = [];
						nodes.map(item => {
							rel.push(item.top - 283);
						});
						// console.log(rel);
						this.topList = rel;
					});
          query.select('#tab').boundingClientRect(data => {
            if (data) {
              // data.top就是元素距离页面顶部的距离
              // console.log('tab元素距离顶部的高度:', data.top);
              this.tabTop = data.top;
            }
          }).exec();
          uni.createSelectorQuery().in(this).select('#nav').boundingClientRect((rect2) =>{
            if(rect2){
              this.navHeight = rect2.height;
            }
          }).exec();
			},
			//取消分享
			cancelShare() {
				this.shareShow = false;
			},

			//收藏
			async getJoininfoAdd() {
				var that = this
				const result = await that.$api.collection({
					collection_id: this.detail.merchant_id,
					type: 1,
				})
				if (result.status == 200) {
					this.isCollected = this.isCollected == 0 ? 1 : 0
				}
			},
		}
	}
</script>

<style>
	page {
		background: #fff !important;
	}

	.shop-head-bg {
		width: 100%;
		height: 260rpx;
	}

	.shop-detail {
		border-radius: 32rpx 32rpx 0px 0px;
		position: relative;
		margin-top: -44rpx;
		padding: 32rpx 24rpx 0 32rpx;
		box-sizing: border-box;
		/* background: #f6f6f6 !important; */
	}

	.shop-r {
		width: 78%;
	}

	.bgc-FF473D {
		background-color: #FF473D;
	}

	.bgc-888 {
		background-color: #888;
	}

	.redPokect {
		height: 5.6vw;
		/* background: #FF473D; */
		color: #FFFFFF;
		border-radius: 0.53333333vw;
		margin-right: 1.06666667vw;
		display: flex;
		flex-direction: row;
	}

	.redPokect .left {
		padding: 0 1.6vw 0 2.666vw;
		height: 100%;
		border-right: 1px dashed #FFFFFF;
		box-sizing: border-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
	}

	.redPokect .right {
		padding: 0 1.6vw 0 2.666vw;
		height: 100%;
		box-sizing: border-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
	}

	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.label-bg {
		width: max-content;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.tab-box {
		padding: 26rpx 0;
	}

	.tab-box-top {
		padding: 26rpx 32rpx;
		box-sizing: border-box;
	}

	.tab-item {}

	.tab-act {
		position: relative;
	}

	.tab-act::after {
		content: '';
		width: 32rpx;
		height: 10rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 5rpx;
		position: absolute;
		bottom: -18rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	#bottom {
		height: calc(128rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
	}

	.goods-l {
		width: 176rpx;
	}

	.goods-r {
		width: 574rpx;
		box-sizing: border-box;
	}

	.type-item {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		line-height: 100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.goods-item {
		padding: 20rpx 24rpx;
		box-sizing: border-box;
	}

	.goods-item-r {
		width: 61%;
		height: 180rpx;
	}

	.label-num view {
		max-width: 50%;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
	}

	.comment-tab-item {
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 4rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
	}



	.more-win {
		width: 192rpx;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
		position: absolute;
		bottom: -182rpx;
		right: 42rpx;
	}



	.label-scroll {
		width: 100%;
		white-space: nowrap;
	}

	.comment-item-cover>image {
		margin-right: 18rpx;
	}

	.comment-item-cover>image:nth-child(3n) {
		margin-right: 0;
	}

	.del {
		width: 40rpx;
		line-height: 36rpx;
		text-align: center;
		height: 40rpx;
	}

	.cart-num {
		width: 40rpx;
		text-align: center;
	}

	.cart-sku-num {
		transform: scale(0.85);
		position: absolute;
		min-width: 15px;
		height: 15px;
		background: #F7D6D7;
		border-radius: 7px;
		border: 1px solid #D93038;
		padding: 0 3px;
		box-sizing: border-box;
		font-size: 10px;
		text-align: center;
		line-height: 15px;
		color: #D93038;
		right: -8px;
		top: -8px;
	}

	.redimg {
		background-image: url('https://api.yzgl.top/h5/static/img/redbao.png');
		background-repeat: no-repeat;
		background-size: 750rpx 846rpx;
	}

	.redbao_box {
		width: 566rpx;
		height: 160rpx;
		/* // box-sizing: border-box; */
		padding-bottom: 8rpx;
		position: relative;
	}

	.redbao_left {
		/* // width: 104rpx; */
		/* // height: 32rpx; */
		box-sizing: border-box;
		padding: 2rpx 12rpx;
		text-align: center;
		line-height: 32rpx;
	}

	.redbao_xywm {
		border-top-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		background-color: #F7D6D7;
	}

	.redbao_btn {
		width: 112rpx;
		height: 48rpx;
		/* // box-sizing: border-box; */
		/* // padding: 6rpx 18rpx; */
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 28px;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		font-size: 24rpx;
	}

	.redbao_tips {
		color: #fff;
		font-size: 24rpx;
		position: absolute;
		bottom: 38rpx;
		/* // margin-left: 176rpx; */
		width: 100%;

	}

	.redbao_guanbi {
		position: absolute;
		bottom: -134rpx;
		width: 100%;
	}

	.scroll-Y {
		margin-top: 180rpx;
		height: 560rpx;
	}

	.scroll-view-item {
		height: 520rpx;
		/* // line-height: 520rpx; */
		text-align: center;
		/* // font-size: 36rpx; */
	}

	.scroll-Ys {
		margin-top: 0rpx;
		height: 420rpx;
	}

	.scroll-view-item {
		height: 420rpx;
		text-align: center;
	}

	.tis {
		padding: 26rpx;
		width: 93%;
		background-color: #000000;
		opacity: 0.5;
		color: #fff;
		position: fixed;
		bottom: var(--window-bottom, 0);
		left: 0;
		z-index: 99;
	}
	.special-price {
      position: absolute;
    top: 20rpx;
    left: 24rpx;
    background-color: rgb(255, 72, 72);
    color: #fff;
    border-radius: 0 0 24rpx 0;
    padding: 4rpx 14rpx;
    font-size: 22rpx;
	}
</style>