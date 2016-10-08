export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
export const PAGE_DIALOG = 'PAGE_DIALOG' //页面提示
export const PAGE_DIALOG_CLOSE = 'PAGE_DIALOG_CLOSE' //页面提示

import { routerMiddleware, push } from 'react-router-redux'
import 'whatwg-fetch';

import { API, Tool} from '../utils/base'
const uid = Tool.getItem('uid');
const session = Tool.getItem('session');
console.log(uid)

const device = '';

function loginUserError() {
  return {
    type: LOGIN_USER_ERROR,
    payload: {
      loginState: false,
	  loginStateText : '登录验证末通过'
    }
  }
}

function loginUserSuccess(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data
  }
}

function loginCheckSuccess(data){
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data
  }
}


function dialog(data){
  return {
    type: PAGE_DIALOG,
    payload: {
      msg : true,
	  msgTxt : data
    }
  }
}
export function loginCheck(){
	return dispatch =>
	fetch(API.check_session + `target_uid=${uid}&save_session=${session}&device=${device}`)
	.then(response => response.json())
	.then(function(json){
		if(json.ret != '0'){
			//history.pushState(null, '/signin');
			dispatch(loginUserError())
		}else{
			//这里要传入uid 与 seccess
			dispatch(loginCheckSuccess({uid : uid,session : session}))
		}
	})
	.catch(err => { throw err; });
}

export function loginUser(data, redirect="/") {
    return function(dispatch) {
		return fetch(API.login,
		{
			headers: {
				//'Cache-Control': 'no-cache',
				'Accept': 'application/json',
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			body:`phone=${data.username}&pwd=${data.password}&device=''&platform=weixin&channel=5000`
		})
		.then(function (res) {
            //console.log("fetch request", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then(function (json){
					//console.log(push)
					if(json.ret == '0'){
						//登录成功
						Tool.setItem('session',json.data.session);
						Tool.setItem('uid',json.data.uid);
						dispatch(loginUserSuccess(json.data))
						//dispatch(push('/'))
						//console.log(dispatch(push('/')))
					}else{
						dispatch(dialog('登录失败'))
					}
                });
            }else{
				dispatch(dialog('请求失败'))
            }

        })
		.catch(function(res){ console.log(res) })
    }
}
