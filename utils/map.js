
export default function MapLoader() {
	window._AMapSecurityConfig = {
		securityJsCode:'ac8572252cfcab72c5dbea5a1ff8cc6e',
	}
	return new Promise((resolve, reject) => {
		if (window.AMap) {
			resolve(window.AMap);
		} else {
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.async = true;
			script.src =
				"https://webapi.amap.com/maps?v=1.4.15&key=facd74d8896c3ad45879f9df22b29f5e";
			script.onerror = reject;
			document.head.appendChild(script);
		}
		window.initAMap = () => {
			resolve(window.AMap);
		};
	});
}

