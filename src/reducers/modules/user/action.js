//import api from '../../../api'
import * as types from '../../types'
import api from '../../../api/'
import { Tool } from '../../../utils/'
import 'whatwg-fetch';

const uid = Tool.getItem('uid');
const session = Tool.getItem('session');
console.log(uid)
const device = '';


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

export function loginCheck(){
	return dispatch =>
	fetch(api.check_session + `target_uid=${uid}&save_session=${session}&device=${device}`)
	.then(response => response.json())
	.then(function(json){
		if(json.ret != '0'){
			//history.pushState(null, '/signin');
			dispatch(loginUserError())
		}else{
			//这里要传入uid 与 seccess
			dispatch(loginSuccess({uid:uid,session:session}))
		}
	})
	.catch(err => console.log(err));
}


//用户登录
export function loginUser(data, redirect="/") {
    return function(dispatch) {
		return fetch(api.login,
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
                        console.log(json)
						//登录成功
						Tool.setItem('session',json.data.session);
						Tool.setItem('uid',json.data.uid);
						dispatch(loginSuccess(json.data))
						//dispatch(push('/'))
						//console.log(dispatch(push('/')))
					}else{
                        alert('登录失败')
                        console.log(json.ret)
					}
                });
            }else{
                alert('请求失败')
            }

        })
		.catch(function(res){ console.log(res) })
    }
}
