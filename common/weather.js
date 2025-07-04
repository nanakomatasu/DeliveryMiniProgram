
const iconWeatherMap = {
  'qing': ['晴', '热'],
  'feng': ['有风', '平静', '微风', '和风', '清风', '强风/劲风', '疾风', '大风', '烈风', '风暴', '狂爆风', '飓风', '热带风暴', '龙卷风'],
  'duoyun': ['少云', '晴间多云', '多云'],
  'xue': ['雪', '阵雪', '小雪', '中雪', '大雪', '暴雪', '小雪-中雪', '中雪-大雪', '大雪-暴雪', '冷'],
  'wu': ['浮尘', '扬沙', '沙尘暴', '强沙尘暴', '雾', '浓雾', '强浓雾', '轻雾', '大雾', '特强浓雾'],
  'yuxue': ['雨雪天气', '雨夹雪', '阵雨夹雪'],
  'yu': ['阵雨', '雷阵雨', '雷阵雨并伴有冰雹', '小雨', '中雨', '大雨', '暴雨', '大暴雨', '特大暴雨', '强阵雨', '强雷阵雨', '极端降雨', '毛毛雨/细雨', '雨', '小雨-中雨', '中雨-大雨', '大雨-暴雨', '暴雨-大暴雨', '大暴雨-特大暴雨', '冻雨'],
  'yintian': ['阴', '霾', '中度霾', '重度霾', '严重霾', '未知']
}

export default function getWeatherImg(weather) {
	let url = require('@/static/img/weather/qing.png')
	
	  for (const weatherKey in iconWeatherMap) {
	    if (Object.hasOwnProperty.call(iconWeatherMap, weatherKey)) {
	      const weatherNames = iconWeatherMap[weatherKey]
	      const findWeatherItem = weatherNames.find(name => weather === name)
	
	      if (findWeatherItem) {
	        // 这里的weatherKey和icon的名字一一对应了
	        url = require(`@/static/img/weather/${weatherKey}.png`)
	        // console.debug('@find weather key = ', weatherKey)
	        break
	      }
	    }
	  }
	  return url
}