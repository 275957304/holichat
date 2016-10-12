const Tool = {
	setItem:function(a,b){
		if(window.localStorage){
			window.localStorage.setItem("hlq_"+a,b);
		}else{
			var c=new Date;
			c.setTime(c.getTime()+31536e6),
			document.cookie="hlq_"+a+"="+escape(b)+";expires="+c.toGMTString()
		}
	},
	getItem:function(a){
		if(window.localStorage){
			return window.localStorage.getItem("hlq_"+a);
		}else{
			var b=document.cookie.match(new RegExp("(^| )hlq_"+a+"=([^;]*)(;|$)"));
			return null!=b?unescape(b[2]):null
		}
	},
	removeItem: function(a) {
		var b, c;
		window.localStorage ? window.localStorage.removeItem("hlq_" + a) : (b = new Date, b.setTime(b.getTime() - 1), c = H.getItem(a), null != c && (document.cookie = "hlq_" + a + "=" + c + ";expires=" + b.toGMTString()))
	},
	formatTime : function(str){
		var date = new Date(str);
		var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
		if (time < 0) {
			return '';
		} else if (time / 1000 < 60) {
			return '刚刚';
		} else if ((time / 60000) < 60) {
			return parseInt((time / 60000)) + '分钟前';
		} else if ((time / 3600000) < 24) {
			return parseInt(time / 3600000) + '小时前';
		} else if ((time / 86400000) < 31) {
			return parseInt(time / 86400000) + '天前';
		} else if ((time / 2592000000) < 12) {
			return parseInt(time / 2592000000) + '月前';
		} else {
			return parseInt(time / 31536000000) + '年前';
		}
	}
};

export { Tool }
