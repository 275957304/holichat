import * as types from '../../types'
import {httpRequest} from '../../../api/'
import { getItem, setItem } from '../../../utils/'
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

//用户登录检查
export function loginCheck(){
	return dispatch =>
    httpRequest('check_session',{'target_uid':uid,'save_session':session,'device':device}).then(function(data){
        if(data == '6056' || data == '6066'){
            //history.pushState(null, '/signin');
            //console.log('登录失败')
			dispatch(loginUserError())
        }else{
            //这里要传入uid 与 seccess
            //console.log('登录成功')
            dispatch(loginSuccess({uid:data.uid,session:data.session,loginState:true}))
        }
    })
}

//用户登录 login
export function loginUser(formData){
    return dispatch =>
    httpRequest('login',formData).then(function(data){
        if(typeof data !== 'number'){
            //登录成功
			setItem('session',data.session);
			setItem('uid',data.uid);
			dispatch(loginSuccess(data))
			//dispatch(push('/'))
			//console.log(dispatch(push('/')))
        }
    })
}

//用户定位
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
console.log(getItem('city_id'))
console.log(getItem('city_name'))


export function userLocation(data){
    return dispatch =>
    console.log(data)
    dispatch(setLocation(data))
}
