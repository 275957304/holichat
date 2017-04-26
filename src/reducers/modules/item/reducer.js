import * as types from '../../types'
const userInfo = {
    loading  : true,
    source : 'wx',
    type:'',
	brief : '',
    enroll : {
        loading : true ,
        data : []
    },
    check_enroll : false , //报名检查
    is_coupon : false,
    result : '',
    theme : ''
}
export default function item( state = userInfo, action ){
    switch(action.type){
		case types.GET_BRIEF :
            return Object.assign({}, state, action.payload )
        case types.GET_RESULT :
            return Object.assign({}, state, action.payload )
        case types.GET_ENROLL :
            return Object.assign({}, state, action.payload )
        case types.GET_CHECK_ENROLL :
            return Object.assign({}, state, action.payload )
        case types.GET_IS_COUPON:
            return Object.assign({}, state, action.payload )
        case types.SET_SOURCE:
            return Object.assign({}, state, action.payload )
        default:
            return state
    }
}
