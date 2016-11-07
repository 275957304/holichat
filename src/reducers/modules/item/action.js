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

//活动简介信息
export function get_activity_introduction(param){
	return dispatch =>
    httpRequest('get_activity_introduction',param).then(function(data){
        dispatch(setBrief({brief:data,loading:false}))
    })
}

//赛事简介信息
export function get_competition_introduction(param){
	return dispatch =>
    httpRequest('get_competition_introduction',param).then(function(data){
        dispatch(setBrief({brief:data,loading:false}))
    })
}

//赛事简介信息
export function get_training_introduction(param){
	return dispatch =>
    httpRequest('get_training_introduction',param).then(function(data){
        dispatch(setBrief({brief:data,loading:false}))
    })
}


//赛事成绩
export function get_competition_result(param){
	return dispatch =>
    httpRequest('get_competition_result',param).then(function(data){
        dispatch(setResult({result:data}))
    })
}

//活动成绩
export function get_activity_result(param){
	return dispatch =>
    httpRequest('get_activity_result',param).then(function(data){
        dispatch(setResult({result:data}))
    })
}

//培训成绩
export function get_training_result(param){
	return dispatch =>
    httpRequest('get_training_result',param).then(function(data){
        dispatch(setResult({result:data}))
    })
}


//赛事报名表信息
export function get_competition_enroll_info(param){
	return dispatch =>
    httpRequest('get_competition_enroll_info',param).then(function(data){
        //console.log(data)
        dispatch(setEnroll({enroll:{loading:false,data:data}}))
    })
}
