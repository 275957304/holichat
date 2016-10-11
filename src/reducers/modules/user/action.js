//import api from '../../../api'
import * as types from '../../types'
import api from '../../../api/'
import { Tool } from '../../../utils/'

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
    api.check_session.then(function(data){
        //console.log(data)
        if(data.ret != '0'){
			//history.pushState(null, '/signin');
			dispatch(loginUserError())
		}else{
			//这里要传入uid 与 seccess
			dispatch(loginSuccess({uid:data.data.uid,session:data.data.session}))
		}
    })
}

//用户登录
export function loginUser(formData,redirect="/"){
    return dispatch =>
        api.login(formData).then(function(data){
            console.log(JSON.stringify(formData))
            console.log(data)
            if(data.ret == '0'){
				//登录成功
				Tool.setItem('session',data.data.session);
				Tool.setItem('uid',data.data.uid);
				dispatch(loginSuccess(data.data))
				//dispatch(push('/'))
				//console.log(dispatch(push('/')))
			}else{
                alert('登录失败')
                console.log(data.ret)
			}
        })
}
