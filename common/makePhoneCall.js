//拨打电话
function callMobile(number) {
	//#ifdef APP-PLUS
	if (uni.getSystemInfoSync().platform === 'android') {
		var Intent = plus.android.importClass("android.content.Intent");
		var Uri = plus.android.importClass("android.net.Uri");
		var mainActivity = plus.android.runtimeMainActivity();
		var intent = new Intent();
		intent.setAction('android.intent.action.DIAL');
		var uri = Uri.parse("tel:" + number);
		intent.setData(uri);
		mainActivity.startActivity(intent);
	} else {
		uni.makePhoneCall({
			phoneNumber: number
		})
	}
	return
	//#endif
	uni.makePhoneCall({
		phoneNumber: number
	})
}

export { callMobile }
