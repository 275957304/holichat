//import api from '../../../api'
import * as types from '../../types'
import api from '../../../api/'


//活力圈首页广告位 createAction
function setBanner(data){
	return {
		type: types.GET_HOLICHAT_BANNER,
        banner: {is_banner : true,list : data}
    }
}

//活力圈首页广告位
export function get_holichat_banner(){
	return dispatch =>
	api.get_holichat_banner.then(function(data){
		data.ret == '0' ? dispatch(setBanner(data.data)) : console.log(data.ret)
	})
}
