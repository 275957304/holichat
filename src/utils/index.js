import category from './category/'
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
	},
	getCategory : (id) => category[id].name,
	// getCurrentStatus : function(signline,deadline,begin_date,end_date){
	// 	const signlineDate = signline.substring(0,10).split('-'); //报名开始时间
	// 	const deadlineDate = deadline.substring(0,10).split('-'); //报名截止
	// 	const beginDate = begin_date.substring(0,10).split('-'); //赛事开始时间
	// 	const endDate = end_date.substring(0,10).split('-'); //赛事结束
	// 	signlineDate = signlineDate[1] + '/' + signlineDate[2] + '/' + signlineDate[0] + ' ' + signline.substring(10, 19);
	// 	deadlineDate = deadlineDate[1] + '/' + deadlineDate[2] + '/' + deadlineDate[0] + ' ' + deadline.substring(10, 19);
	// 	beginDate = beginDate[1] + '/' + beginDate[2] + '/' + beginDate[0] + ' ' + begin_date.substring(10, 19);
	// 	endDate = endDate[1] + '/' + endDate[2] + '/' + endDate[0] + ' ' + end_date.substring(10, 19);
	// 	const today = new Date().getTime();
	// 	if(today < Date.parse(signlineDate)){
	// 		return '<span class="red yr">预热中</span>';
	// 	}else if(today < Date.parse(deadlineDate)){
	// 		return '<span class="green bm">报名中</span>';
	// 	}else if(today < Date.parse(beginDate)){
	// 		return '<span class="green ks">即将开始</span>';
	// 	}else if(today < Date.parse(endDate)){
	// 		return '<span class="warning jx">进行中</span>';
	// 	}else{
	// 		return '<span class="gary js">已结束</span>';
	// 	}
	// }

};

export { Tool }
