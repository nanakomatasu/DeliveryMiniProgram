import request from '@/common/request.js'
const mapApi = {}
//逆地址解析 腾讯地图
mapApi.wsGeocoder=  params => request.globalRequest(`ws/geocoder/v1`, 'GET', params, 1,'map')

//获取省市区接口
mapApi.AreaInfo=  params => request.globalRequest(`api/getAreaInfo`, 'POST', params, 1)


export default  mapApi 