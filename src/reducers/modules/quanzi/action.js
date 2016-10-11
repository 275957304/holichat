//import api from '../../../api'
import * as types from '../../types'
import api from '../../../api/'

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
	api.get_community_banner.then(function(data){
		let banner = data.data.holichat;
		data.data.community.map(function(item){
			banner.push(item)
		})
		data.ret == '0' ? dispatch(setBanner(banner)) : console.log(data.ret)
	})
}
