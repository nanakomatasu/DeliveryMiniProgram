import App from './App'

// #ifndef VUE3

import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import uView from 'uview-ui'
Vue.use(uView)
import {
	VueJsonp
} from 'vue-jsonp'
Vue.use(VueJsonp)
import request from './common/request.js'
import api from './api/index.js'
import mapApi from './api/mapApi.js'
import url from './config/index.js'
import chat from './common/chat.js'
import share from './utils/share'

import * as http from "./common/http.js"


// #ifdef H5
import AMapLoader from '@amap/amap-jsapi-loader';
Vue.prototype.$AMapLoader = AMapLoader
// #endif
Vue.prototype.$request = request
Vue.prototype.$chat = chat
Vue.prototype.$mapApi = mapApi
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.prototype.$http = http;
Vue.mixin(share)

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

Vue.prototype.formatDate = function(t) {
	t = t || Date.now();
	let time = new Date(t);
	let str = time.getFullYear() + '-';
	str += time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
	str += '-';
	str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
	str += ' ';
	str += time.getHours();
	str += ':';
	str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
	console.log(str)
	return str;
};