import * as types from '../../types'
const userInfo = {
    loading  : true,
	brief : '',
}
export default function item( state = userInfo, action ){
    switch(action.type){
		case types.GET_BRIEF: //getBrief
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}
