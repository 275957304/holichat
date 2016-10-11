import * as types from '../../types'
const InitState = {
    loading : false,
    banner : {
        is_banner : false,
        list : []
    }
}


export default function home(state = InitState, action){
    switch(action.type){
        case types.GET_HOLICHAT_BANNER:
            return Object.assign({}, state,{banner : action.banner});
        default:
            return state
    }
}
