import Api from './api';
import httpConfig from './httpConfig'
import errorCode from './httpErrorCodeConfig'
import { getItem } from '../utils/'
import { Toast } from 'antd-mobile';
const device = '';
// const baseURI = 'https://app.holichat.com/'
// const imgPathUrl = 'https://img.holichat.com/uploads/'
const baseURI = 'https://inside.holichat.com/'
const imgPathUrl = 'http://holichat-res-inside.img-cn-hangzhou.aliyuncs.com/uploads/'

const fetch = new Api({
	baseURI: baseURI
});

/**
 * url 请求接口
 * params 参数json格式
 * method 请求类型
 */
export const httpRequest = (url,params) => {
	if(!httpConfig.hasOwnProperty(url)) return console.log('配制表时没有这个接口')
	const setUrl = httpConfig[url].action;
	const method = httpConfig[url].method;
	const uid = getItem('uid') || '';
	const session = getItem('session') || '';
	let param = params || {};
	if(typeof url !== 'string'){
		alert('接口写类型错误')
	}
	// resolve ，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
	return new Promise(function(resolve,reject){
		//做一些异步操作
		if(method == 'get'){
			if(!param["session"]){
				param["session"] = session
			}
			if(!param["uid"]){
				param["uid"] = uid
			}
			//console.log(param)
			fetch.get(setUrl,param).then(
				(data) => {httpCallback(data)},
          		(err) => {httpCallback(err)}
			)
		}else if(method == 'post'){
			param += `&session=${session}&uid=${uid}`
			console.log(param)
			fetch.post(setUrl,param).then(
				(data) => { httpCallback(data) },
          		(err) => { httpCallback(err) }
			)
		}
		//检查查接口返回
		function httpCallback(data){
			//console.log(data)
			if(data && data["status"]){
				Toast.fail(setUrl + ',网络接口异常')
				return reject(new Error(data["status"]))
			}else if(data == 'fail'){
				Toast.offline('网络异常');
				return reject( setUrl + '网络异常')
			}else if(typeof(data) == "number"){
				return reject(data);
			}else if(data['ret']!=0){
				console.log('ret----' + setUrl )
				const code_num = data['ret']
				Toast.info(errorCode[code_num].tips);
				return resolve(data)
			}
			return resolve(data['data'] ||"")
		}

	});
}

//返回图片地址
export const getImageUrlPath = (src) =>{
	return src.length > 1 ? imgPathUrl + src : imgPathUrl + 'm/df/icon_256.png'
	// const imgObj = new Image()
	// imgObj.src = imgPathUrl + imageStr
	// if(imgObj.width > 0 && imgObj.height > 0){
	// 	return imgPathUrl + imageStr
	// }else{
	// 	return imgPathUrl + 'm/df/icon_256.png'
	// }
}
