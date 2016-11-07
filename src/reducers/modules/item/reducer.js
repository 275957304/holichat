import * as types from '../../types'
const userInfo = {
    loading  : true,
    type:'',
	brief : '',
    enroll : {loading : true}, //组别选择
    result : '',
    theme : ''
}
export default function item( state = userInfo, action ){
    switch(action.type){
		case types.GET_BRIEF: //getBrief
            return Object.assign({}, state, action.payload)
        case types.GET_RESULT :
            return Object.assign({}, state, action.payload)
        case types.GET_ENROLL :
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}
