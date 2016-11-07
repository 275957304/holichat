import * as types from '../../types'
const InitState = {
    loading : false,
    banner : {
        is_banner : false,
        list : []
    },
    recommend : {
        loading : false,
        list : []
    }
}

export default function home(state = InitState, action){
    switch(action.type){
        case types.GET_HOLICHAT_BANNER:
            return Object.assign({}, state,{ banner : action.payload});
        case types.GET_RECOMMENDED:
            return Object.assign({}, state,{ recommend : action.payload});
        default:
            return state
    }
}
