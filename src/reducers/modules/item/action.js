//import api from '../../../api'
import * as types from '../../types'
import { httpRequest } from '../../../api/'
import { setItem } from '../../../utils/'

function setBrief(data){
    return {
        type: types.GET_BRIEF,
        payload: data
    }
}

function setResult(data){
    return {
        type: types.GET_RESULT,
        payload: data
    }
}

function setEnroll(data){
    return {
        type: types.GET_ENROLL,
        payload: data
    }
}

//设置来源是城市服务
export function setCity(){
    return {
        type: types.SET_SOURCE,
        payload: { source : 'city' }
    }
}

//简介信息
export function get_introduction(url,param){
	return dispatch =>
    httpRequest(url,param).then(function(data){
        dispatch(setBrief({brief:data,loading:false}))
    })
}

//成绩
export function get_result(url,param){
	return dispatch =>
    httpRequest(url,param).then(function(data){
        dispatch(setResult({result:data}))
    })
}

//组别信息
export function get_enroll_info(url,param){
	return dispatch =>
    httpRequest(url,param).then(function(data){
        dispatch(setEnroll({enroll:{loading:false,check:false,data:data.project}}))
    })
}


//报名检测
export function check_enroll(){
    return dispatch => dispatch({type: types.GET_CHECK_ENROLL, payload: {check_enroll:true} })
}

//报名表返回 HideApplyForm
export function HideApplyForm(){
    return dispatch => dispatch({type: types.GET_CHECK_ENROLL, payload: {check_enroll:false} })
}


//优惠码
export function is_coupon(url,param){
	return dispatch =>
    httpRequest(url,param).then(function(data){
        if(data.is_coupon == '1'){
            dispatch(isCoupon({ is_coupon : true}))
        }
    })
}
function isCoupon(data){
    return {
        type: types.GET_IS_COUPON,
        payload: data
    }
}
