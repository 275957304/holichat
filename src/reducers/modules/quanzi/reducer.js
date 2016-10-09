import * as types from '../../types'

const InitState = {
    loading: false,
    banner : {
        is_banner : false,
        list : []
    }
}

export default function quanzi(state = InitState, action){
    switch(action.type){
        case types.GET_COMMUNITY_BANNER:
            return Object.assign({}, state,{banner : action.banner});
        default:
            return state
    }
}
