import * as types from '../actions/';

const userInfo = {
    loginState : false
}

export default function user(state = userInfo,action){
    switch(action.type){
        case types.LOGIN_USER_SUCCESS:
            return Object.assign({}, state,{loginState: true},action.payload);
		case types.LOGIN_USER_ERROR:
            return Object.assign({},state,action.payload)
        default:
            return state
    }
}
