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

//赛事简介信息
export function getBrief(param){
	return dispatch =>
    httpRequest('get_competition_introduction',param).then(function(data){
        dispatch(setBrief({brief:data,loading:false}))
    })
}
