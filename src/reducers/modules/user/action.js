//import api from '../../../api'
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
        if(data == '6056'){
            //history.pushState(null, '/signin');
			dispatch(loginUserError())
        }else{
            //这里要传入uid 与 seccess
            dispatch(loginSuccess({uid:data.uid,session:data.session}))
        }
    })
}

//用户登录 login
export function loginUser(formData,redirect="/"){
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
