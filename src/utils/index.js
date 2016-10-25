import category from './category/'

export const devLog = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log.apply(console, args)
  }
}

/*
获取类项
id:类项的ID
*/
export const getCategory = (id) => category[id].name ;

/*
设置localStorage
*/
export const setItem = (a,b) => {
	if(window.localStorage){
		window.localStorage.setItem("hlq_"+a,b);
	}else{
		let c=new Date;
		c.setTime(c.getTime()+31536e6),
		document.cookie="hlq_"+a+"="+escape(b)+";expires="+c.toGMTString()
	}
}

/*
获取localStorage
*/
export const getItem = (a) => {
	if(window.localStorage){
		return window.localStorage.getItem("hlq_"+a);
	}else{
		var b=document.cookie.match(new RegExp("(^| )hlq_"+a+"=([^;]*)(;|$)"));
		return null!=b?unescape(b[2]):null
	}
}

/*
删除localStorage
*/
export const removeItem = (a) => {
	var b, c;
	window.localStorage ? window.localStorage.removeItem("hlq_" + a) : (b = new Date, b.setTime(b.getTime() - 1), c = H.getItem(a), null != c && (document.cookie = "hlq_" + a + "=" + c + ";expires=" + b.toGMTString()))
}

/*
根椐时间判断赛事情况
signline: 报名开始时间
deadline:  报名截止
begin_date:  赛事开始时间
end_date:  赛事结束
*/
export const getCurrentStatus = (signline,deadline,begin_date,end_date) => {
	let signlineDate = signline.substring(0,10).split('-');
	let deadlineDate = deadline.substring(0,10).split('-');
	let beginDate = begin_date.substring(0,10).split('-');
	let endDate = end_date.substring(0,10).split('-');
	signlineDate = signlineDate[1] + '/' + signlineDate[2] + '/' + signlineDate[0] + ' ' + signline.substring(10, 19);
	deadlineDate = deadlineDate[1] + '/' + deadlineDate[2] + '/' + deadlineDate[0] + ' ' + deadline.substring(10, 19);
	beginDate = beginDate[1] + '/' + beginDate[2] + '/' + beginDate[0] + ' ' + begin_date.substring(10, 19);
	endDate = endDate[1] + '/' + endDate[2] + '/' + endDate[0] + ' ' + end_date.substring(10, 19);
	const today = new Date().getTime();
	if(today < Date.parse(signlineDate)){
		return '<span class="red yr">预热中</span>';
	}else if(today < Date.parse(deadlineDate)){
		return '<span class="green bm">报名中</span>';
	}else if(today < Date.parse(beginDate)){
		return '<span class="green ks">即将开始</span>';
	}else if(today < Date.parse(endDate)){
		return '<span class="warning jx">进行中</span>';
	}else{
		return '<span class="gary js">已结束</span>';
	}
}

/*
返回时间
*/
export const formatTime = (str) => {
	let date = new Date(str);
	let time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
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

/*
json参数转为url参数
*/
export const jsonParam = (param) => {
    let mergeUrl = "?"
    for(let key in param){
        mergeUrl += key + "=" + param[key] + "&"
    }
    return mergeUrl.substring(0,mergeUrl.length-1)
}
