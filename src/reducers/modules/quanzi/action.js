//import api from '../../../api'
import * as types from '../../types'
import { httpRequest } from '../../../api/'

// E:\APP源文件\trunk\jsCode\appCode\table  错误提示码

function setBanner(data){
	return {
        type: types.GET_COMMUNITY_BANNER,
        banner: {
			is_banner : true,
			list : data
		}
    }
}

//获取圈子广告
export function get_community_banner(){
	return dispatch =>
	httpRequest('get_community_banner').then(function(data){
        if(typeof data !== 'number'){
			let banner = data.holichat;
			data.community.map(function(item){
				banner.push(item)
			})
			dispatch(setBanner(banner))
        }
    })
}

//设置圈子首页
export function set_home_community(param){
	return dispatch =>
	httpRequest('set_home_community').then(function(data){
		// console.log("---------------")
    	// console.log(data)
		// console.log("---------------")
    })
}
