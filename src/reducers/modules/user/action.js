import * as types from '../../types'
import {httpRequest} from '../../../api/'
import { getItem, setItem, removeItem } from '../../../utils/'
const uid = getItem('uid');
const session = getItem('session');
const device = getItem('device') || 'phone';

function loginUserError() {
    return {
            type: types.LOGIN_USER_ERROR,
            payload: {
            loginState: false,
            loginStateText : '登录验证末通过'
        }
    }
}

function loginSuccess(data){
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: data
    }
}

//微信登录
export function otherLogin(url,param){
	return dispatch =>
    httpRequest(url,param).then(function(data){
        console.log(data)
        if(typeof data !== 'number'){
			setItem('session',data.session);
			setItem('uid',data.uid);
			setItem('device',data.device);
			setItem('platform','weixin');
			dispatch(loginSuccess({uid:data.uid,session:data.session,device:data.device ||'', loginState:true}))
        }
    })
}

//用户登录检查
export function loginCheck(){
	return dispatch =>
    httpRequest('check_session',{'target_uid':uid,'save_session':session,'device':device}).then(function(data){
        if(data.ret == '6056' || data.ret == '6066'  || data.ret == '6484'){
            console.log('登录失败')
			dispatch(loginUserError())
        }else{
            console.log('登录成功')
            dispatch(loginSuccess({uid:data.uid,session:data.session,loginState:true}))
        }
    })
}

//用户登录 login
export function login(url,param){
	return dispatch =>
    httpRequest(url,param).then(function(data){
        console.log( data )
        if(typeof data !== 'number'){
            //登录成功
			setItem('session',data.session);
			setItem('uid',data.uid);
            console.log(getItem('session'))
			dispatch(loginSuccess({uid:data.uid,session:data.session,loginState:true}))
        }
    })
}


//用户定位
// http://lbs.amap.com/api/javascript-api/summary/
// https://www.npmjs.com/package/amap
if(!getItem('city_id')){
    console.log('高德定位')
    const map = new AMap.Map('iCenter')
    map.plugin('AMap.Geolocation', function() {
        const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        });
        map.addControl(geolocation)
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);
    });
    //解析定位结果
    function onComplete(data) {
        var str=['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        str.push('精度：' + data.accuracy + ' 米');
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
		regeocoder(data.position.getLng(),data.position.getLat())
    }
    //解析定位错误信息
    function onError(data) {
        setItem("city_id", '000000')
        setItem("city_name", '全国')
        console.log('解析定位错误信息')
    }
    //高德逆编辑获取城市与城市ID
    function regeocoder(longitude,latitude){
        const lnglatXY = (longitude + ',' + latitude).split(',');
        const geocoder = new AMap.Geocoder({radius: 1000,extensions: "all"});
        geocoder.getAddress(lnglatXY, function(status, result){
			if (status === 'complete' && result.info === 'OK') {
                const city_id = result.regeocode.addressComponent.adcode.substring(0,4) + '00'
                const city_name = result.regeocode.addressComponent.city
                setItem("city_id", city_id)
                setItem("city_name", city_name)
			}
		});
    }
}
// console.log(getItem('city_id'))
// console.log(getItem('city_name'))

export function userLocation(data){
    return dispatch =>
    dispatch(setLocation(data))
}

//微信签名
fetch("https://app.holichat.com/other/api/wx_js_sign?appid=wxcc5c198d146a1779", {method: 'GET',headers: {'Accept': 'application/json'}})
.then( (response) => {
    if(!response.ok){
        console.log("签名接口失败");
        return false
    }
    return response.json()
})
.then( (response) => {
    //console.log( response.data )
    wx.config({
		debug     : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId     : "wxcc5c198d146a1779", // 必填，公众号的唯一标识
		timestamp : response.data.timestamp, // 必填，生成签名的时间戳
		nonceStr  : response.data.noncestr, // 必填，生成签名的随机串
		signature : response.data.signature,// 必填，签名，见附录1
		jsApiList : [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "openLocation",
            "getLocation",
            'checkJsApi',
            'chooseWXPay'
        ]
	});
})
.catch( (err) => {
    console.log('微信签名接口-' + err)
})
