let url_config = ""

if (process.env.NODE_ENV === 'development') {
	// 开发环境

    //这里写上你们的域名
    url_config = 'https://ceshi.12d3.cn/'
} else {
	// 生产环境
   url_config = 'https://ceshi.12d3.cn/'
}

export default url_config
