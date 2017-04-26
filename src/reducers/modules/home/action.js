//import api from '../../../api'
import * as types from '../../types'
import { httpRequest } from '../../../api/'
import { getItem } from '../../../utils/'
//活力圈首页广告位 createAction
function setBanner(data){
	return {
		type: types.GET_HOLICHAT_BANNER,
        payload: {is_banner : true,list : data}
    }
}

function recommendedAd(data){
	return {
		type : types.GET_RECOMMENDED,
		payload : {
			loading : true,
			list : data.list
		}
	}
}

//活力圈首页广告位
export function get_holichat_banner(){
	return dispatch =>
	httpRequest('get_holichat_banner').then(function(data){
		let banner=[]
        if(typeof data !== 'number'){
			data.map(item=>{
				const action = JSON.parse(item.action);
				if(action.type != 'news'){
					banner.push(item)
				}
			})
			//dispatch(setBanner(data))
			dispatch(setBanner(banner))
        }
    })
}


//主页推荐广告
export function get_holichat_recommended_ad(param){
	let params = param
	params['location_id'] = getItem('city_id')
	return dispatch =>
	httpRequest('get_holichat_recommended_ad',params).then(function(data){
    	dispatch(recommendedAd(data))
    })
}

//其它文件
