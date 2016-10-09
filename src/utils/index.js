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
	}
};

export { Tool }
