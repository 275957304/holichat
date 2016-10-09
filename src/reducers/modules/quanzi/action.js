//import api from '../../../api'
import * as types from '../../types'
import api from '../../../api/'
import { Tool } from '../../../utils/'
import 'whatwg-fetch';


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
	fetch(api.get_community_banner)
	.then(response => response.json())
	.then(function(json){
		if(json.ret == '0'){
			dispatch(setBanner(json.data.holichat));
		}else{
			console.log(json.ret)
		}
	})
	.catch(err => console.log(err));
}
