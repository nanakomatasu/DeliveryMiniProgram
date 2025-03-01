<template>
	<view v-if="detail">
		<view class="head-bg"></view>
		<u-navbar style="z-index: 9999;" :placeholder="true" leftIconColor="#fff" :autoBack="true" title="提交订单"
			:titleStyle="{color:'#fff'}" :bgColor="bgColor" leftIconSize="32rpx" :safeAreaInsetTop="true"></u-navbar>
		<!-- 内容 -->

		<form @submit="getOrder" class="m-b-120">
			<scroll-view>
				<view class="pl24 mt20 pr24 box-size z-index2 " style="margin-bottom: 70px;">
					<view class="delivery dis-flex flex-dir-column ">
						<view class="dis-flex flex-y-center delivery-box p-r">
							<image
								:src="actDelivery==1?'/pagesIndex/static/delivery.png':'/pagesIndex/static/delivery02.png' ">
							</image>

							<view v-if="detail.store_info.delivery_home==1" class="w-50 t-c f-32 f-b"
								:class="actDelivery==1?'':'pt10'" @tap="changeDelivery(1)">
								外卖配送
							</view>
							<view v-if="detail.store_info.self_lifting==1" class="w-50 t-c f-32 f-b"
								:class="actDelivery==2?'':'pt10'" @tap="changeDelivery(2)">
								到店使用
							</view>
						</view>
						<view class=" bg-white-ff  address pl24 pr24 pb32">
							<block v-if="actDelivery==1">
								<!-- 无地址 -->
								<view class="dis-flex flex-y-center pt40 pb34  flex-x-between" @tap="addressList"
									v-if="delivery.length == 0">
									<view class="dis-flex flex-y-center">
										<image class="radio-100 wh36 mr20" src="/pagesIndex/static/add.png"></image>
										<view class="f-32 f-b">添加收货地址</view>
									</view>
									<u-icon name="arrow-right" size="24rpx"></u-icon>
								</view>
								<!-- 有地址 -->
								<view class="pt40 pb34 " @tap="selDelivery" v-else>
									<view class="dis-flex flex-y-center  flex-x-between">
										<view class="f-32 f-b w-90 onelist-hidden">
											{{address.address+address.details}}
										</view>
										<u-icon name="arrow-right" size="24rpx"></u-icon>
									</view>
									<view class="col-gray-88 w-100 onelist-hidden mt12 f-28">
										<text class="mr16">{{address.member_name}}</text>
										<text>{{address.member_tel}}</text>
									</view>
								</view>
								<view class="mt10 dis-flex flex-x-between flex-y-center">
									<view class="col-brank-22 f-b">
										{{detail.yj_time[dayIndex].time[timeIndex].isnow==1?'立即送出':detail.yj_time[dayIndex].dayTitle}}
									</view>
									<view class="dis-flex flex-y-center mb12" @tap="show=true">
										<view class="col-red-d9 f-24 mr15">
											预计{{detail.yj_time[dayIndex].time[timeIndex].timeTitle}} 送达</view>
										<u-icon name="arrow-right" size="24rpx"></u-icon>
									</view>
								</view>
								<view class="col-red-d9 f-24 mt5 pr36" v-if="detail.order_notice">
									{{detail.order_notice}}
								</view>
							</block>
							<block v-else>
								<view class="dis-flex flex-y-center pt20 flex-x-between p-r">
									<image class="add-order-img" src="/pagesIndex/static/add-order-img.png"></image>
									<view class="w-75 z-index1">
										<view class="twolist-hidden f-b f-32 mb30">{{detail.store_info.address}}
										</view>
										<view class="dis-flex flex-y-center w-100">
											<view class=" date">
												<view class="col-gray-88 f-24 mb10">取餐时间</view>
												<view class="dis-flex flex-y-center" @tap="show=true">
													<view class="f-24 col-brank-22 f-b ">
														{{detail.yj_time[dayIndex].time[timeIndex].isnow==1?'立即送出':(detail.yj_time[dayIndex].dayTitle +' '+ detail.yj_time[dayIndex].time[timeIndex].timeTitle)}}
													</view>
													<u-icon name="arrow-right" size="24rpx"></u-icon>
												</view>
											</view>
											<view class="w-60">
												<view class="col-gray-88 f-24 mb10">预留电话</view>
												<input class="f-26 col-brank-22 z-index2" name="user_tel"
													placeholder-style="color:#c2c2c2" type="number"
													placeholder="请输入取餐人预留电话" />
											</view>
										</view>
									</view>
									<view class="dis-flex flex-y-center flex-x-center flex-dir-column z-index1">
										<view class="f-24 col-brank-20 f-b mb5">距{{detail.store_info.distance}}km</view>
										<image class="wh72 shop-img" :src="detail.store_info.merchant_logo"></image>
									</view>
								</view>
							</block>
						</view>

					</view>
					<!-- 购买的信息 -->
					<view class="bg-white-ff mt20 radio-16 pb20 pl24 pr24">
						<view class="f-32 f-b pt24">{{detail.store_info.merchant_name}}</view>
						<view class="dis-flex pt20 pb18 flex-x-between flex-y-center goods-item"
							v-for="(item,index) in detail.goods_list" :key="index">
							<image class="radio-8" mode="aspectFill" :src="item.img"></image>
							<view class="w-80 goods-list-r dis-flex flex-x-between flex-dir-column">
								<view>
									<view class="dis-flex w-100 flex-y-center flex-x-between">
										<view class="flex-centerd w-70">
											<image v-if="item.is_discount==1" style=" width:15px;height:15px;"
												src="@/pagesIndex/static/break.png" mode=""></image>
											<view class="w-70 onelist-hidden f-b m-l-10">{{item.name}}</view>
										</view>

										<view class="flex-centerd">
											<view class="price f-40" v-if="item.is_discount==1">
												<text
													class="f-24 text-line ml10">¥{{parseFloat(item.scribe_price).toFixed(2)}}</text>
											</view>

											<view class="f-28 col-brank-20 f-b">
												<text>¥</text>
												<text
													class="f-32">{{ parseFloat(item.price * item.num ).toFixed(2)  }}</text>
											</view>
										</view>

									</view>
									<view class="f-24 col-gray-88 w-100 onelist-hidden">
										<text class="ml10" v-if="item.attribute">{{item.attribute}}</text>
										<text class="ml10" v-if="item.spec">{{item.spec}}</text>
										<text class="ml10" v-if="item.spec1">{{item.spec1}}</text>
									</view>
								</view>

								<view class="f-24 col-gray-88 mt10">x{{item.num}}</view>
							</view>
						</view>
						<view class="dis-flex flex-y-center mt15 flex-x-between">
							<view class="f-28 col-brank-20">打包费</view>
							<view class="f-24 col-brank-20 f-b">
								<text>¥</text>
								<text v-if="detail.packing_fee == '' || detail.packing_fee == null "
									class="f-32">0</text>
								<text v-else class="f-32">{{parseFloat(detail.packing_fee).toFixed(2)}}</text>
							</view>
						</view>
						<!-- 只有外卖上门才显示配送费 -->
						<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="actDelivery==1">
							<view class="f-28 col-brank-20">预估配送费</view>
							<view class="f-24 col-brank-20 f-b"><text>¥</text><text
									class="f-32">{{parseFloat(detail.delivery_money).toFixed(2)}} </text></view>
						</view>
						<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="detail.mj_money!=0">
							<view class="f-28 col-brank-20">店铺满减</view>
							<view class="f-24 col-red-d9 f-b"><text>-¥</text><text
									class="f-32">{{ parseFloat(detail.mj_money).toFixed(2)}}</text>
							</view>
						</view>
						<!--@click="redpocketShow=true"-->
						<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="actDelivery==1"
							@click="envelopes('商家红包',detail.red_packet_list)">
							<view class="dis-flex flex-y-center">
								<image class="wh28 mr10" src="/static/img/red-back.png"></image>
								<view class="f-28 col-brank-20">商家红包</view>
							</view>

							<view class="dis-flex flex-y-center flex-x-between">
								<view class="f-24 col-red-d9 f-b mr5">
									<!-- <text v-if="redPockex">-¥</text> -->
									<text class="f-32" v-if="arr.length==0">-¥{{redPockex || 0}}</text>
									<text class="f-30" v-if="arr.length!=0">{{redPockex || '未选中红包,最高'+arr+'元可用'}}</text>
								</view>
								<u-icon name="arrow-right" size="24rpx"></u-icon>
							</view>

						</view>
						<!-- 平台红包 @click="tjhb=true"-->
						<view class="dis-flex flex-y-center mt30 flex-x-between" v-if="actDelivery==1"
							@click="envelopes('平台红包',detail.pt_red_packet_list)">
							<view class="dis-flex flex-y-center">
								<image class="wh28 mr10" src="/static/img/red-back.png"></image>
								<view class="f-28 col-brank-20">平台红包</view>
							</view>
							<view class="dis-flex flex-y-center flex-x-between">
								<view class="f-24 col-red-d9 f-b mr5">
									<!-- <text v-if="redPockexr">-¥</text> -->
									<text class="f-32" v-if="arrx.length==0">-¥{{redPockexr || 0}}</text>
									<text class="f-30"
										v-if="arrx.length!=0">{{redPockexr || '未选中红包,最高'+Number(arrx)+'元可用'}}</text>
								</view>
								<u-icon name="arrow-right" size="24rpx"></u-icon>
							</view>
						</view>
						<!-- <view class="dis-flex flex-y-center mt30 flex-x-between" @tap="envelopes()">
							<view class="dis-flex flex-y-center">
								<image class="wh28 mr10" src="/static/img/red-back.png"></image>
								<view class="f-28 col-brank-20">校U送红包</view>
							</view>
							<view class="dis-flex flex-y-center flex-x-between">
								<view class="f-24 col-red-d9 f-b mr5"><text>-¥</text><text class="f-32">0</text></view>
								<u-icon name="arrow-right" size="24rpx"></u-icon>
							</view>
						</view> -->
					</view>
					<!-- 是否送寝 -->

					<view class="bg-white-ff mt20 pt24 box-size radio-16 pb24 pl24 pr24 "
						v-if="actDelivery==1&&address &&detail.school_info.distribution_mode==3&&detail.school_info.is_sq==1">

						<view class="dis-flex  flex-y-center flex-x-between">
							<view class="f-28 f-b col-brank-20">是否送寝</view>
							<view>
								<radio-group @change="needRadioChange" class="dis-flex flex-y-center" name="need_sq">
									<label class="dis-flex flex-y-center mr40">
										<radio class="mr5" value="1" :checked="need_sq==1" color="#D62E36"></radio>
										<view class="f-28 col-brank-20">是</view>
									</label>
									<label class="dis-flex flex-y-center">
										<radio class="mr5" value="0" :checked="need_sq==0" color="#D62E36"></radio>
										<view class="f-28 col-brank-20">否</view>
									</label>
								</radio-group>
							</view>
						</view>
						<view>
							<view class="dis-flex mt20 flex-y-center flex-x-between">
								<view class="f-28 f-b col-brank-20">详细地址</view>
								<input class="t-r f-26 w-80" v-model="qs_address" placeholder="请输入详细楼号和宿舍号"></input>
							</view>
							<view class="f-24 col-red-d9 mt5">预计新增配送费¥{{detail.sq_fee}}元</view>
						</view>


					</view>

					<!-- 是否就餐 -->
					<view class="bg-white-ff mt20 pt24 box-size radio-16 pb24 pl24 pr24 " v-if="actDelivery==2">
						<view class="dis-flex  flex-y-center flex-x-between">
							<view class="f-28 f-b col-brank-20">就餐方式</view>
							<view>
								<radio-group @change="radioChange" class="dis-flex flex-y-center" name="dining_type">
									<label class="dis-flex flex-y-center mr40">
										<radio class="mr5" value="1" color="#D62E36" :checked="dining_type==1"></radio>
										<view class="f-28 col-brank-20">打包带走</view>
									</label>
									<label class="dis-flex flex-y-center">
										<radio class="mr5" value="2" color="#D62E36" :checked="dining_type==2"></radio>
										<view class="f-28 col-brank-20">在店堂食</view>
									</label>
								</radio-group>
							</view>
						</view>
					</view>
					<!-- 其他 -->
					<view class="bg-white-ff mt20 box-size radio-16 pb24 pl24 pr24 ">
						<view class="dis-flex flex-y-center flex-x-between pt20 pb15" @tap.stop="notes">
							<view class="f-28 f-b col-brank-20">备注</view>
							<input class="t-r f-26 w-85" name="remark" v-model="remark" disabled placeholder="请输入备注"></input>
						</view>
						<view class="dis-flex flex-y-center flex-x-between pt15 pb15">
							<view class="f-28 f-b col-brank-20">餐具数量</view>
							<view class="dis-flex flex-y-center w-80 flex-x-end col-gray-88" @tap="showx=true">
								{{!tableware_num?'无需餐具':tableware_num+'份'}}
							</view>
						</view>
						<view class="dis-flex flex-y-center flex-x-between pt15 pb15">
							<view class="f-28 f-b col-brank-20">发票</view>
							<view class="f-26 col-gray-88">
								该店暂不支持线上开票，请联系商家
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 按钮 -->
			<view class="bg-gray-f6 submit-box">
				<view class="dis-flex flex-y-center radio-48  flex-x-between">
					<view class="btn-l dis-flex flex-dir-column flex-x-center">
						<view class="price col-white-ff  f-40 ">
							<text class="f-32 f-b">￥</text>{{parseFloat(detail.money).toFixed(2)}}
							<text
								class="f-24 col-white-ff text-line ml10">¥{{parseFloat(detail.origin_money).toFixed(2)}}</text>
						</view>
						<view class="col-white-f5 f-24  other-price">
							预估配送费<text class="ml5"
								name='delivery_money'>¥{{parseFloat(detail.delivery_money).toFixed(2)}}</text>
						</view>
					</view>
					<button form-type="submit" class="submit col-white-ff f-32 bg-red-d6-ec">提交订单</button>
				</view>
			</view>


		</form>
		<!-- 选择地址 -->
		<view :catchtouchmove="true">
			<u-popup :show="showDelivery" bgColor="#F7F7F7" round="32rpx" :closeable="true" @close="showDelivery=false">
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
		<!-- 配送时间 -->
		<view :catchtouchmove="true">
			<u-popup :show="show" round="32rpx">
				<view>
					<view class=" f-b t-c flex-right" style="margin-right: 20px; margin-top: 10px; font-size: 20px;"
						@tap="show=false">
						x
					</view>
					<view class="f-32 f-b t-c pt24 pb24 mb30">选择送达时间</view>
					<view class="dis-flex scroll-time">
						<scroll-view scroll-y="true" class="scroll-view-data w-30 bg-gray-f7 ">
							<view class="pl20 box-size pt24 pb24 w-100 onelist-hidden"
								:class="dayIndex==index?'col-red-d9 bg-white-ff':''"
								v-for="(items,index) in detail.yj_time" :key="index" @tap="dayIndex=index">
								{{items.dayTitle}}
							</view>
						</scroll-view>
						<scroll-view scroll-y="true" class="pl30 pr30 box-size scroll-view-time w-70">
							<view
								class="box-size pt24 dis-flex flex-y-center flex-x-between pb24 w-100 onelist-hidden border-b-f7"
								:class="timeIndex==index?'col-red-d9':''"
								v-for="(item,index) in detail.yj_time[dayIndex].time"
								@tap="timeIndex=index,show=false,yd(item)">
								<view class="dis-flex flex-y-center">
									<text class="mr10" v-if="item.isnow==1">立即送达</text>
									{{item.timeTitle}}
									<text
										class="f-26 ml10 col-gray-88">{{Number.parseInt(detail.delivery_money).toFixed(2)}}元配送费</text>
								</view>
								<u-icon name="checkmark-circle-fill" color="#D93038" size="32rpx"
									v-if="timeIndex==index"></u-icon>
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>


			<!--餐具弹窗-->
			<u-popup :show="showx" mode="bottom" @close="showx=false" :round="10">
				<view class="contentx">
					<text>是否需要餐具</text>
					<view class="flex-about m-t-15">
						<view :class="indes==1?'smip flex-center':'chunk flex-center'" @tap="need(1)">需要餐具</view>
						<view :class="indes==2?'smip flex-center':'chunk flex-center'" @tap="need(2)">无需餐具</view>
					</view>

					<view class="m-t-15" v-if="types==true">
						<view class="">选择餐具数量</view>
						<view class="flex-space m-t-10">
							<view :class="indexr==index?'coverx':'cover'  " v-for="(item,index) in service" :key="index"
								@tap="spot(item.id,item.name,index)">
								{{item.name}}
							</view>
						</view>
					</view>


					<view class="m-t-30 flex-right p-b-32 bot-AB" v-if="typex==true">
						<view class="flex-centerd">
							<u--input class="t-r  w-85 f-26" inputAlign="right" placeholder="请输入餐具数量" border="none"
								v-model="tableware_num">
							</u--input>
							<view class="f-28 tip">份</view>
						</view>
					</view>

					<view class="m-t-25 btn f-32 col-white-ff bg-red-d6-ec radio-48 t-c flex-center"
						style="height: 80rpx;" @tap="showx=false">确认</view>

				</view>

			</u-popup>

			<u-popup :show="redpocketShow" round="32rpx" @close="redpocketShow=false" zIndex="997" :closeable="true">
				<view style="height: auto;background-color:#f2f2f2; border-radius: 38rpx 38rpx 0rpx 0rpx;"
					class="dis-flex  flex-dir-column paddall3624">
					<view class="f-30 w-100 flex-center mb30">本店代金券</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" style="height: 200px;">
						<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
							v-for="(item,index) in detail.red_packet_list" :key="index">
							<view class="dis-flex flex-dir-column">
								<view class="dis-flex flex-dir-row">
									<view class="col-red-d3 mr15">￥{{item.money}}</view>
									<view>{{item.coupon_details}}</view>
								</view>
								<view class="f-24 c-20">有效期至{{item.use_end_time}}</view>
							</view>
							<view v-if="item.can_use ==0">不可用</view>

							<image class="swoosh"
								:src="typesx==false&&indesx==index?'/static/img/select.png':'/static/img/unchecked.png'"
								v-if="item.can_use ==1" @tap.stop="swooshx(item,index)"></image>

							<!-- <radio v-if="item.can_use ==1" color="#E73E46" :value="String(index)"
								:checked="redPocket.id ==item.id"></radio>-->
						</view>
					</scroll-view>
				</view>
			</u-popup>
			<!-- 平台红包 -->
			<u-popup :show="tjhb" round="32rpx" @close="tjhb=false" zIndex="997" :closeable="true">

				<view style="height: auto;background-color:#f2f2f2; border-radius: 38rpx 38rpx 0rpx 0rpx;"
					class="dis-flex  flex-dir-column paddall3624">
					<view class="f-30 w-100 flex-center mb30">平台红包</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" style="height: 200px;">
						<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
							v-for="(item,index) in detail.pt_red_packet_list" :key="index" v-if="item.can_use==1">
							<view class="dis-flex flex-dir-column">
								<view class="dis-flex flex-dir-row">
									<view class="col-red-d3 mr15">￥{{item.money}}</view>
									<view>{{item.coupon_details}}</view>
								</view>
								<view class="f-24 c-20">有效期至{{item.use_end_time}}</view>
							</view>
							<view v-if="item.can_use ==0">不可用</view>
							<image class="swoosh"
								:src="typesxr==false&&indesxr==index?'/static/img/select.png':'/static/img/unchecked.png'"
								v-if="item.can_use ==1" @tap.stop="swooshxr(item,index)"></image>
						</view>
					</scroll-view>
				</view>


				<!-- <view style="height: auto;background-color:#f2f2f2; border-radius: 38rpx 38rpx 0rpx 0rpx;"
					class="dis-flex  flex-dir-column paddall3624">
					<view class="f-30 w-100 flex-center mb30">平台红包</view>
					
					<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
						v-for="(item,index) in detail.pt_red_packet_list" :key="index" v-if="item.can_use==1">
						<view class="dis-flex flex-dir-column">
							<view class="dis-flex flex-dir-row">
								<view class="col-red-d3 mr15">￥{{item.money}}</view>
								<view>{{item.coupon_details}}</view>
							</view>
							<view class="f-24 c-20">有效期至{{item.use_end_time}}</view>
						</view>
						<view v-if="item.can_use ==0">不可用</view>
						<image class="swoosh"
							:src="typesxr==false&&indesxr==index?'/static/img/select.png':'/static/img/unchecked.png'"
							v-if="item.can_use ==1" @tap.stop="swooshxr(item,index)"></image>
					</view>
					
				</view> -->


			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		dateTimeStr
	} from '@/utils/time.js'
	export default {
		data() {
			return {
				indesxr: -1,
				indesx: -1,
				indes: "",
				indexr: "",
				typesxr: true,
				types: false,
				typex: false,
				showx: false, //餐具弹窗
				show: false, //是否显示配送时间弹窗
				bgColor: "rgba(0,0,0,0)",
				deliveryList: [{ //配送列表
					name: "外卖配送",
					id: 1
				}, {
					name: "到店使用",
					id: 2
				}],
				actDelivery: 1,
				need_sq: 0, //是否送寝
				detail: null, //订单详情
				id: "", //商户id
				timeIndex: 0, //选中的配送时间下标
				dayIndex: 0, //选中的配送天数下标
				showDelivery: false, //是否显示地址选择
				delivery: [], //地址列表
				address: null, //收货地址信息
				lat: "",
				lng: "",
				dining_type: 1, //就餐方式
				qs_type: "", //寝室类型
				qs_address: "", //寝室详细地址
				service: [{
					name: "1份",
					id: 1
				}, {
					name: "2份",
					id: 2
				}, {
					name: "3份",
					id: 3
				}, {
					name: "4份",
					id: 4
				}, {
					name: "5份",
					id: 5
				}, {
					name: "更多"
				}, ],
				formData: {},
				tableware_num: "",
				redPocket: "", //商家红包
				redpocketShow: false, //展示商家红包
				currentUser: {}, //当前用户
				redPockex: "",
				typesx: true,
				tjhb: false, //展示平台红包
				tjhb_list: [],
				pt_redPocket: "", //平台红包
				redPocketr: "",
				redPockexr: "",
				arr: [],
				isyd: "",

				arrx: [],
				scrollTop: "",
				isnow: "",
				remark: "",
				sjhb: "",
				dateTimeStrs: "",
			};
		},
		onPageScroll(e) {
			if (e.scrollTop > 40) {
				this.bgColor = "#D93038"
			} else {
				this.bgColor = "rgba(0,0,0,0)"
			}
		},
		onLoad(e) {
			this.id = e.id || ''
			console.log(e.id)
			this.getLocationAddress()


		},
		onShow() {
			this.initChat()
			this.getAddressListData()
			this.getOrderSettlement()
			this.otherFun()
			console.log(dateTimeStr('h:i'), "1213")
			this.dateTimeStrs = dateTimeStr('y-m-d')



		},
		methods: {
			otherFun(object) {
				if (object) {
					this.redPocket = object.id
				}
			},
			otherFunr(object) {
				if (object) {
					console.log(object)
					this.remark = object
				}
			},

			otherFunrx(object, id) {
				console.log(object.id, "111")
				if (object) {
					if (object.coupon_type == 1) {
						this.redPocketr = object.id //平台红包
						this.redPockexr = object.money
					} else if (object.coupon_type == 2) {
						this.redPocket = object.id //商家红包
						this.redPockex = object.money
					}
					this.getOrderSettlement();

				}
			},


			// //校u红包
			envelopes(title, item) {
				console.log(title, item)
				if (title == '平台红包') {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/addOrder/orderredpacket/orderredpacket?title=' +
							title + '&item=' + JSON.stringify(item) + '&id=' + this.redPocketr
					});
				} else if (title == '商家红包') {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/addOrder/orderredpacket/orderredpacket?title=' +
							title + '&item=' + JSON.stringify(item) + '&id=' + this.redPocket
					});
				}
				// uni.navigateTo({
				// 	url: '/pagesIndex/page/campusTakeout/index/addOrder/orderredpacket/orderredpacket?title=' +
				// 		title + '&item=' + JSON.stringify(item)+'&id='+this.redPocketr
				// });
			},

			cancelx(object) {

				if (object == '平台红包') {
					this.redPocketr = "" //平台红包
					this.redPockexr = ""
					this.getOrderSettlement();
				} else if (object == '商家红包') {
					this.redPocket = "" //商家红包
					this.redPockex = ""
					this.getOrderSettlement();
				}

				// this.redPocketr = ""
				// this.redPockexr =""

				console.log(object, "xq")
				// this.getOrderSettlement();
			},



			//连接IM服务
			initChat() {
				let userInfo = uni.getStorageSync('userInfo');
				if (!userInfo) {
					console.log('尚未登录，无法连接')
					return
				}
				//设置测试用户
				this.currentUser = {
					uuid: "user" + userInfo.id,
					name: userInfo.user_name,
					avatar: userInfo.portrait
				}
				uni.setStorageSync('currentUser', this.currentUser);
				let connectionStatus = this.$chat.getConnectionStatus();
				if (connectionStatus === 'disconnected') {
					console.log('开始连接');
					this.$chat.connect(this.currentUser);
				} else {
					console.log('已经连接成功，无需重新连接')
				}
			},
			//订阅群聊
			subscribeGroup(groupIDs) {
				this.$chat.subscribeGroup(groupIDs);
			},
			//创建并发送消息
			createTextMessage(group) {
				let body = '您有新的订单'
				console.log('创建消息')
				console.log(this.currentUser)
				console.log(group)
				let message = this.$chat.createMsg(body, this.currentUser, group, 'group');
				console.log(message)
				//发送
				this.$chat.sendTextMsg(message);
			},
			need(index) {
				console.log(index)
				if (index == 1) {
					this.indes = index
					this.types = true
				} else {
					this.types = false
					this.indes = index
					this.indexr = -1
					this.tableware_num = ''
				}

			},

			spot(id, name, index) {
				this.indexr = index
				if (name == '更多') {
					this.typex = true
				} else {
					this.typex = false
				}
				this.tableware_num = id
				console.log(this.formData)
			},
			//选择红包
			selRedpacket(e) {
				console.log(e)
				let val = e.detail.value;
				this.redPocket = this.detail.red_packet_list[val];
				this.redpocketShow = false;
				this.getOrderSettlement();
			},

			//代金卷
			swooshx(item, index) {
				this.typesx = 1 == 1 ? (!this.typesx) : false
				if (this.typesx == true) {
					this.indesx = index
					this.redpocketShow = false;
					this.redPocket = ''
					this.getOrderSettlement();
					this.redPockex = ''

				} else {
					this.redpocketShow = false;
					this.indesx = index
					this.redPocket = item.id
					this.getOrderSettlement();
					this.redPockex = item.money
				}
			},


			swooshxr(item, index) {
				this.typesxr = 1 == 1 ? (!this.typesxr) : false
				if (this.typesxr == true) {
					this.tjhb = false;
					this.indesxr = index
					this.redPocketr = ''
					this.getOrderSettlement();
					this.redPockexr = ''

				} else {
					this.tjhb = false;
					this.indesxr = index
					this.redPocketr = item.id
					this.getOrderSettlement();
					this.redPockexr = item.money
				}
			},


			notes() {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/addOrder/orderremarks/orderremarks?remark=' + this
						.remark
				});
			},


			redpocketShows() {
				uni.navigateTo({
					url: '/pagesUser/page/couponList/couponList'
				});
			},

			//跳转修改地址
			editAddress(item) {
				uni.navigateTo({
					url: '/pagesUser/page/addAddress/addAddress?id=' + item.id + '&length=' + this.delivery.length
				})
			},
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
					school_id: uni.getStorageSync('school').id
				})
				uni.hideLoading()
				if (status == 200) {
					this.delivery = data.data
					this.address = this.delivery[0]
				}
			},
			//获取定位
			getLocationAddress() {
				var that = this
				uni.getLocation({
					type: "wgs84",
					altitude: true,
					highAccuracyExpireTime: 100,
					success: (res) => {
						//获取经纬度
						that.lng = res.longitude
						that.lat = res.latitude
					},
				});
			},
			//获取订单信息
			async getOrderSettlement() {
				var that = this
				const {
					data,
					status
				} = await that.$api.orderSettlement({
					store_id: this.id, //到店的id
					lat: this.lat || '',
					lng: this.lng || '',
					address_id: this.address ? this.address.id : '',
					delivery_mode: this.actDelivery,
					need_sq: this.need_sq, //不送寝配送费不一样
					dining_type: this.dining_type, //不打包不计算打包费
					school_id: uni.getStorageSync('school').id,
					red_packet_id: this.redPocket,
					pt_red_packet_id: this.redPocketr
				})
				if (status == 200) {
					if (data.store_info.delivery_home == 0) {
						//this.deliveryList.splice(0)
						if (data.store_info.self_lifting == 1) {
							this.changeDelivery(2)
						}

					}
					if (this.address == null) {
						this.address = data.address
					}

					this.detail = data;

					if (data.red_packet_list&&data.red_packet_list.length != 0) {
						data.red_packet_list.forEach((item, index) => {
							if (item.can_use == 1) {
								// console.log(data.red_packet_list[index].money)
								if (data.red_packet_list[index].money >= item.money) {
									this.arr.push(item.money)
								}
							}
						})
						this.arr = Math.max(...this.arr)
						if (this.arr == -Infinity) {
							this.arr = 0
						}
					}

					if (data.pt_red_packet_list&&data.pt_red_packet_list.length != 0) {
						data.pt_red_packet_list.forEach((item, index) => {
							if (item.can_use == 1) {
								// console.log(data.red_packet_list[index].money)
								if (data.pt_red_packet_list[index].money >= item.money) {
									this.arrx.push(item.money)
									this.arrx = Math.max(...this.arrx)
								}
							}
						})
					}

					if (data.yj_time[0].time[0].isnow === 0) {
            uni.showModal({
              title: '期望到达时间提醒',
              content: `请注意，离现在最近的可选择到达时间是${data.yj_time[0].dayTitle}${data.yj_time[0].time[0].timeTitle}`,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
						this.isyd = 1
					} else {
						this.isyd = 0
					}

				}
			},


			yd(item) {
				if (item.isnow == 0) {
					this.isyd = 1
				} else {
					this.isyd = 0
				}
			},

			//跳转添加地址页面
			addressList() {
				uni.navigateTo({
					url: '/pagesUser/page/addAddress/addAddress'
				})
			},
			//选择地址
			selDelivery() {
				this.showDelivery = true

			},
			//提交订单 跳转支付
			getOrder(e) {
				console.log(e)
				var formData = e.detail.value
				formData.store_id = this.id //店铺id
				formData.delivery_mode = this.actDelivery //送货方式 外卖上门还是自提
				formData.address_id = (this.address && this.actDelivery == 1) ? this.address.id : '' //外卖的送货地址id
				formData.lat = this.actDelivery == 2 ? this.lat : '' //自提的时候 当前用户所在经纬度
				formData.lng = this.actDelivery == 2 ? this.lng : '' //自提的时候 当前用户所在经纬度
				formData.user_tel = this.actDelivery == 2 ? formData.user_tel : '' //自提预留电话
				formData.is_sq = this.detail.need_sq //是否送寝
				formData.qs_address = this.qs_address
				formData.qs_type = this.qs_type
				formData.red_packet_id = this.redPocket
				formData.tableware_num = this.tableware_num
				formData.pt_red_packet_id = this.redPocketr
				formData.remark = this.remark
				formData.is_yd = this.isyd
				// #ifdef APP-PLUS
				formData.app_type = 1
				// #endif
				// #ifdef H5
				if (this.isWxBrowser()) {
					formData.app_type = 3
				} else {
					formData.app_type = 2;
				}
				// #endif
				formData.school_id = uni.getStorageSync('school').id
				formData.service_at = this.detail.yj_time[this.dayIndex].time[this.timeIndex].timeTitle //送达时间
				formData.service_time = this.detail.yj_time[this.dayIndex].time[this.timeIndex].time //预计送达时间，自取时间
				console.log(formData.school_id)
				if (this.actDelivery == 1 && !formData.address_id) {
					this.$u.toast("请选择外卖配送地址")
				} else if (this.actDelivery == 2 && formData.user_tel == '') {
					this.$u.toast("请输入取餐人预留电话")
				} else if (this.actDelivery == 2 && !this.$u.test.mobile(formData.user_tel)) {
					this.$u.toast("请输入正确的11位手机号")
				} else if (this.actDelivery == 1 && formData.is_sq == 1 && formData.qs_address == '') {
					this.$u.toast("请输入寝室详细楼号和宿舍号")
				} else {
					console.log(this.formData, 'orderSettlementPost')
					this.postOrderSettlementPost(formData)
				}

			},

			//提交订单
			async postOrderSettlementPost(formData) {
				var that = this
				uni.showLoading({
					title: "正在提交"
				})

				const {
					data,
					status,
					msg
				} = await that.$api.orderSettlementPost(formData)
				uni.hideLoading()
				if (status == 200) {
					//群聊信息 ID为订单ID，群头像为店铺头像， 群名字为店铺名字
					let group = {
						uuid: data.order_id,
						avatar: that.detail.store_info.merchant_logo,
						name: that.detail.store_info.merchant_name,
					}
					this.$chat.subscribeGroup([data.order_id]);
					this.createTextMessage(group) //发送消息
					//创建群聊
					uni.redirectTo({
						url: '/pagesIndex/page/pay/pay?id=' + data.order_id + "&return_type=1"
					})
				} else {
					console.log("11111")
					uni.showToast({
						title: msg
					})
				}
			},
			//切换配送方式
			changeDelivery(id) {
				this.actDelivery = id
				this.getOrderSettlement()

			},
			//就餐方式更改
			radioChange(e) {
				this.dining_type = e.detail.value
				this.getOrderSettlement()
			},
			//是否送寝
			needRadioChange(e) {
				this.need_sq = e.detail.value
				this.getOrderSettlement()
			},
			//更改选中的收货地址
			selAddressChange(e) {
				console.log(e)
				var index = e.detail.value
				this.address = this.delivery[index]

				this.getOrderSettlement()
			},
			//更改寝室类型
			changeType(e) {
				this.qs_type = e.detail.value
			},
			//校u红包
			// envelopes() {
			// 	uni.navigateTo({
			// 		url: '/pagesUser/page/couponList/couponList?id=' + this.id + '&type=1'
			// 	});
			// },

			confirmDate(e) {
				//确认选择的配送时间
				this.dateIndex = e.indexs[0]
				this.show = false
			},
			//是否微信内部浏览器
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			},

		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}

	radio {
		transform: scale(0.75);
	}

	.head-bg {
		width: 750rpx;
		height: 520rpx;
		background: linear-gradient(#ec000f 0%, #EC444C 29%, #F7F7F7 100%, );
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.z-index2 {
		z-index: 2;
		position: relative;
		// margin-bottom: 120rpx;
	}

	.delivery-box {
		height: 88rpx;
	}

	.delivery-box>image {
		width: 100%;
		height: 88rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.delivery-box>view {
		position: relative;
		z-index: 2;
		height: 88rpx;
		line-height: 88rpx;
	}

	.address {
		border-radius: 0 0 16rpx 16rpx;
	}

	.goods-item>image {
		width: 112rpx;
		height: 112rpx;
	}

	.goods-list-r {
		height: 112rpx;
	}

	.submit-box {
		padding: 16rpx 24rpx calc(16rpx + env(safe-area-inset-bottom)) 24rpx;
		width: 100%;
		position: fixed;
		box-sizing: border-box;
		left: 0;
		bottom: 0;
		z-index: 2;
	}

	.submit-box>view {
		height: 96rpx;
		overflow: hidden;
	}

	.btn-l {
		width: 522rpx;
		background: #202020;
		padding-left: 60rpx;
		box-sizing: border-box;
		height: 96rpx;
		border-radius: 48rpx 0 0 48rpx;
	}

	.price {
		line-height: 32rpx;
	}

	.submit {
		width: 180rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 0;
		padding: 0;
		text-align: center;
		border-radius: 0 48rpx 48rpx 0;

	}

	.submit::after {
		content: none;
	}

	.date {
		max-width: 40%;
		box-sizing: border-box;
		padding-right: 16rpx;
		margin-right: 16rpx;
		position: relative;
	}

	.date::after {
		background: #EAEAEA;
		height: 80%;
		width: 1px;
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.add-order-img {
		position: absolute;
		width: 246rpx;
		height: 248rpx;
		right: -24rpx;
		bottom: 0;
	}

	.z-index1 {
		position: relative;
		z-index: 1;
	}

	.shop-img {
		border-radius: 12rpx;
		border: 4rpx solid #fff;
	}

	input {
		height: 28rpx;
		line-height: 28rpx;
	}

	.tip {
		height: 28rpx;
		line-height: 28rpx;
		margin-left: 10rpx;
	}

	.win-delivery {
		padding: 36rpx 24rpx;
		box-sizing: border-box;
	}

	.add-delivery {
		line-height: 72rpx;
		height: 72rpx;
	}

	.scroll {
		max-height: 520rpx;
		margin-bottom: 20rpx;
	}

	.scroll-time {
		height: 520rpx;
	}


	.contentx {
		padding: 25rpx;
	}

	.chunk {
		width: 300rpx;
		height: 120rpx;
		border: 1rpx rgba(230, 230, 230, 1) solid;
		border-radius: 8rpx;

	}

	.cover {
		padding: 5rpx 20rpx 5rpx 20rpx;
		border: 1rpx rgba(230, 230, 230, 1) solid;
		border-radius: 8rpx;
	}

	.coverx {
		padding: 5rpx 20rpx 5rpx 20rpx;
		border: 1rpx #FF8C00 solid;
		border-radius: 8rpx;
		background-image: linear-gradient(#fffee3, #fffee3);
		color: #FF8C00;
	}


	.smip {
		width: 300rpx;
		height: 120rpx;
		border: 1rpx #FF8C00 solid;
		border-radius: 8rpx;
		background-image: linear-gradient(#f7f4574f, #f7f4573d);
		color: #FF8C00;
	}

	.swoosh {
		width: 38rpx;
		height: 38rpx;
	}
</style>